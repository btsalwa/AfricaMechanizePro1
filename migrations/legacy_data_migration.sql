-- Legacy Data Migration from Original AfricaMechanize.org Database
-- This file contains PostgreSQL-compatible migration scripts to import data from the original MySQL database

-- 1. Admin Accounts Migration
-- Original: afmz_admin_accounts
-- Target: admin_users (create new table for legacy compatibility)

CREATE TABLE IF NOT EXISTS legacy_admin_accounts (
  id SERIAL PRIMARY KEY,
  legacy_admin_id INTEGER NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  password_hash VARCHAR(100), -- Will need to be reset
  admin_type INTEGER DEFAULT 2,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Content Management Migration
-- Original: Multiple content tables
-- Target: Enhanced news_events and resources tables

-- Add columns to existing news_events table for legacy compatibility
ALTER TABLE news_events ADD COLUMN IF NOT EXISTS legacy_id INTEGER;
ALTER TABLE news_events ADD COLUMN IF NOT EXISTS legacy_type VARCHAR(50);
ALTER TABLE news_events ADD COLUMN IF NOT EXISTS access_level VARCHAR(50) DEFAULT 'public';
ALTER TABLE news_events ADD COLUMN IF NOT EXISTS hits INTEGER DEFAULT 0;
ALTER TABLE news_events ADD COLUMN IF NOT EXISTS seo_keywords TEXT;

-- Add columns to existing resources table for legacy compatibility  
ALTER TABLE resources ADD COLUMN IF NOT EXISTS legacy_id INTEGER;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS legacy_type VARCHAR(50);
ALTER TABLE resources ADD COLUMN IF NOT EXISTS access_level VARCHAR(50) DEFAULT 'public';
ALTER TABLE resources ADD COLUMN IF NOT EXISTS hits INTEGER DEFAULT 0;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS seo_keywords TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS file_size BIGINT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS file_type VARCHAR(50);

-- 3. Menu and Navigation Structure
CREATE TABLE IF NOT EXISTS legacy_menu_structure (
  id SERIAL PRIMARY KEY,
  legacy_id INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  title_alias VARCHAR(200),
  seo_name VARCHAR(200),
  section_id INTEGER,
  menu_type INTEGER DEFAULT 1,
  link_url VARCHAR(500),
  meta_keywords TEXT,
  access_level INTEGER DEFAULT 1,
  parent_id INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  language VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Configuration and Choices
CREATE TABLE IF NOT EXISTS legacy_config_choices (
  id SERIAL PRIMARY KEY,
  choice_level VARCHAR(20) DEFAULT 'Child',
  category VARCHAR(150) NOT NULL,
  choice_item VARCHAR(500) NOT NULL,
  choice_seo VARCHAR(150),
  parent_choice VARCHAR(50),
  description TEXT,
  extras TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Gallery and Media Files
CREATE TABLE IF NOT EXISTS legacy_gallery (
  id SERIAL PRIMARY KEY,
  legacy_id INTEGER NOT NULL,
  title VARCHAR(200),
  filename VARCHAR(500) NOT NULL,
  file_type VARCHAR(10),
  gallery_category INTEGER,
  gallery_code VARCHAR(50),
  parent_type VARCHAR(50),
  parent_id INTEGER,
  tags TEXT,
  site_code VARCHAR(20) DEFAULT 'afmz_',
  upload_date TIMESTAMP DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true
);

-- 6. Cache and Performance Data
CREATE TABLE IF NOT EXISTS legacy_cache_data (
  cache_key VARCHAR(50) NOT NULL,
  language VARCHAR(5) DEFAULT 'en',
  cache_date TIMESTAMP NOT NULL,
  cache_content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (cache_key, language)
);

-- 7. Application Registrations and Forms
CREATE TABLE IF NOT EXISTS legacy_registrations (
  id SERIAL PRIMARY KEY,
  legacy_id INTEGER NOT NULL,
  post_type VARCHAR(50) NOT NULL,
  post_date TIMESTAMP DEFAULT NOW(),
  account_info VARCHAR(100),
  title VARCHAR(200),
  details TEXT,
  status VARCHAR(20) DEFAULT 'Open',
  admin_actions TEXT,
  action_date TIMESTAMP,
  is_published BOOLEAN DEFAULT true,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Projects and Initiatives
CREATE TABLE IF NOT EXISTS legacy_projects (
  id SERIAL PRIMARY KEY,
  legacy_id INTEGER NOT NULL,
  department_id INTEGER,
  title VARCHAR(250) NOT NULL,
  description TEXT,
  location VARCHAR(125),
  financial_year VARCHAR(20),
  budget_amount DECIMAL(25,2),
  budget_currency VARCHAR(100) DEFAULT 'USD',
  implementing_agency TEXT,
  project_status VARCHAR(20),
  remarks TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_legacy_admin_username ON legacy_admin_accounts(username);
CREATE INDEX IF NOT EXISTS idx_legacy_admin_email ON legacy_admin_accounts(email);
CREATE INDEX IF NOT EXISTS idx_news_events_legacy_id ON news_events(legacy_id);
CREATE INDEX IF NOT EXISTS idx_resources_legacy_id ON resources(legacy_id);
CREATE INDEX IF NOT EXISTS idx_legacy_menu_seo ON legacy_menu_structure(seo_name);
CREATE INDEX IF NOT EXISTS idx_legacy_menu_parent ON legacy_menu_structure(parent_id);
CREATE INDEX IF NOT EXISTS idx_legacy_config_category ON legacy_config_choices(category);
CREATE INDEX IF NOT EXISTS idx_legacy_gallery_parent ON legacy_gallery(parent_type, parent_id);
CREATE INDEX IF NOT EXISTS idx_legacy_cache_key ON legacy_cache_data(cache_key, language);