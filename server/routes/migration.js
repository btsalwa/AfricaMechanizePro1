const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { db } = require('../db');
const { sql } = require('drizzle-orm');

// Migration utilities for importing legacy data
class LegacyDataMigration {
  constructor() {
    this.importLog = [];
  }

  // Log migration activities
  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, message, type };
    this.importLog.push(logEntry);
    console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
  }

  // Parse MySQL dump file and extract data
  async parseMySQLDump(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const tables = this.extractTablesFromDump(content);
      this.log(`Parsed MySQL dump file: ${filePath}`);
      this.log(`Found ${Object.keys(tables).length} tables`);
      return tables;
    } catch (error) {
      this.log(`Error parsing MySQL dump: ${error.message}`, 'error');
      throw error;
    }
  }

  // Extract table data from MySQL dump
  extractTablesFromDump(content) {
    const tables = {};
    const lines = content.split('\n');
    let currentTable = null;
    let inInsert = false;
    let insertData = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Detect table creation
      if (line.startsWith('CREATE TABLE `')) {
        const match = line.match(/CREATE TABLE `([^`]+)`/);
        if (match) {
          currentTable = match[1];
          tables[currentTable] = {
            structure: [],
            data: []
          };
        }
      }

      // Detect insert statements
      if (line.startsWith('INSERT INTO `')) {
        const match = line.match(/INSERT INTO `([^`]+)`/);
        if (match) {
          currentTable = match[1];
          inInsert = true;
          // Extract VALUES part
          const valuesMatch = line.match(/VALUES\s+(.+);?$/);
          if (valuesMatch && tables[currentTable]) {
            const values = this.parseInsertValues(valuesMatch[1]);
            tables[currentTable].data.push(...values);
          }
        }
      }
    }

    return tables;
  }

  // Parse INSERT VALUES statement
  parseInsertValues(valuesString) {
    const values = [];
    const regex = /\(([^)]+)\)/g;
    let match;

    while ((match = regex.exec(valuesString)) !== null) {
      const rowData = match[1].split(',').map(val => {
        val = val.trim();
        if (val.startsWith("'") && val.endsWith("'")) {
          return val.slice(1, -1).replace(/\\'/g, "'");
        }
        if (val === 'NULL') return null;
        return val;
      });
      values.push(rowData);
    }

    return values;
  }

  // Migrate admin accounts
  async migrateAdminAccounts(adminData) {
    if (!adminData || !adminData.data) {
      this.log('No admin accounts data found', 'warning');
      return;
    }

    this.log(`Migrating ${adminData.data.length} admin accounts`);

    for (const row of adminData.data) {
      try {
        const [id, username, email, fullName, password, adminType, lastLogin] = row;
        
        await db.execute(sql`
          INSERT INTO legacy_admin_accounts 
          (legacy_admin_id, username, email, full_name, password_hash, admin_type, last_login)
          VALUES (${id}, ${username}, ${email}, ${fullName}, ${password}, ${adminType}, 
                  ${lastLogin ? new Date(parseInt(lastLogin) * 1000) : null})
          ON CONFLICT (username) DO NOTHING
        `);

        this.log(`Migrated admin account: ${username}`);
      } catch (error) {
        this.log(`Error migrating admin account ${row[1]}: ${error.message}`, 'error');
      }
    }
  }

  // Migrate content data to news_events table
  async migrateContent(contentData) {
    if (!contentData || !contentData.data) {
      this.log('No content data found', 'warning');
      return;
    }

    this.log(`Migrating ${contentData.data.length} content items`);

    for (const row of contentData.data) {
      try {
        // Map content fields based on the original table structure
        const contentItem = this.mapContentFields(row);
        
        if (contentItem) {
          await db.execute(sql`
            INSERT INTO news_events 
            (title, content, event_type, legacy_id, legacy_type, status, created_at)
            VALUES (${contentItem.title}, ${contentItem.content}, ${contentItem.type}, 
                    ${contentItem.id}, ${contentItem.legacyType}, 'published', ${contentItem.date})
          `);

          this.log(`Migrated content: ${contentItem.title}`);
        }
      } catch (error) {
        this.log(`Error migrating content item: ${error.message}`, 'error');
      }
    }
  }

  // Map legacy content fields to new structure
  mapContentFields(row) {
    try {
      return {
        id: row[0],
        title: row[1] || 'Untitled',
        content: row[2] || '',
        type: this.mapContentType(row[3]),
        legacyType: row[3],
        date: row[4] ? new Date(row[4]) : new Date(),
        status: 'published'
      };
    } catch (error) {
      this.log(`Error mapping content fields: ${error.message}`, 'error');
      return null;
    }
  }

  // Map legacy content types to new event types
  mapContentType(legacyType) {
    const typeMap = {
      'news': 'news',
      'event': 'conference',
      'webinar': 'workshop',
      'announcement': 'announcement',
      'meeting': 'meeting'
    };
    return typeMap[legacyType] || 'news';
  }

  // Migrate configuration choices
  async migrateConfigChoices(choicesData) {
    if (!choicesData || !choicesData.data) {
      this.log('No configuration choices data found', 'warning');
      return;
    }

    this.log(`Migrating ${choicesData.data.length} configuration choices`);

    for (const row of choicesData.data) {
      try {
        await db.execute(sql`
          INSERT INTO legacy_config_choices 
          (choice_level, category, choice_item, choice_seo, parent_choice, description, extras)
          VALUES (${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}, ${row[5]}, ${row[6]}, ${row[7]})
        `);

        this.log(`Migrated config choice: ${row[3]} in ${row[2]}`);
      } catch (error) {
        this.log(`Error migrating config choice: ${error.message}`, 'error');
      }
    }
  }

  // Generate migration summary
  generateSummary() {
    const summary = {
      totalOperations: this.importLog.length,
      errors: this.importLog.filter(log => log.type === 'error').length,
      warnings: this.importLog.filter(log => log.type === 'warning').length,
      successful: this.importLog.filter(log => log.type === 'info').length,
      log: this.importLog
    };

    return summary;
  }
}

// Migration routes
router.post('/import-legacy-data', async (req, res) => {
  try {
    const migration = new LegacyDataMigration();
    const filePath = path.join(__dirname, '../../attached_assets/localhost mecha sql_1755426540972.sql');
    
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Legacy database file not found' 
      });
    }

    // Parse the MySQL dump
    const tables = await migration.parseMySQLDump(filePath);

    // Migrate different data types
    if (tables.afmz_admin_accounts) {
      await migration.migrateAdminAccounts(tables.afmz_admin_accounts);
    }

    if (tables.afmz_conf_choices) {
      await migration.migrateConfigChoices(tables.afmz_conf_choices);
    }

    // Generate summary
    const summary = migration.generateSummary();

    res.json({
      success: true,
      message: 'Legacy data migration completed',
      summary
    });

  } catch (error) {
    console.error('Migration error:', error);
    res.status(500).json({
      success: false,
      message: 'Migration failed',
      error: error.message
    });
  }
});

// Get migration status
router.get('/migration-status', async (req, res) => {
  try {
    // Check if migration tables exist
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'legacy_%'
    `);

    res.json({
      success: true,
      migrationTablesExist: tables.length > 0,
      tables: tables.map(t => t.table_name)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Preview legacy data
router.get('/preview-legacy/:tableName', async (req, res) => {
  try {
    const { tableName } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    const result = await db.execute(sql`
      SELECT * FROM ${sql.identifier(tableName)} 
      LIMIT ${limit}
    `);

    res.json({
      success: true,
      tableName,
      data: result,
      count: result.length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;