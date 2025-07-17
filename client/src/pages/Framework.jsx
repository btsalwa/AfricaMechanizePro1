import { FrameworkGrid } from "../components/FrameworkGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Framework() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            F-SAMA Framework
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            Framework for Sustainable Agricultural Mechanization in Africa
          </p>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            A comprehensive approach to transforming agricultural practices across Africa through 
            sustainable mechanization solutions that empower farmers and strengthen food security.
          </p>
        </div>
      </section>

      <FrameworkGrid />

      {/* Framework Overview */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Framework Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-primary">Key Principles</Badge>
                  <h3 className="text-xl font-semibold mb-3">Sustainable Development</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    The framework emphasizes environmentally sustainable practices that protect 
                    natural resources while increasing agricultural productivity.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-secondary">Implementation</Badge>
                  <h3 className="text-xl font-semibold mb-3">Collaborative Approach</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Success requires coordination between governments, private sector, 
                    development partners, and farming communities across Africa.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-accent">Innovation</Badge>
                  <h3 className="text-xl font-semibold mb-3">Technology Integration</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Leveraging modern technology and innovative business models to make 
                    mechanization accessible to smallholder farmers.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-success">Impact</Badge>
                  <h3 className="text-xl font-semibold mb-3">Measurable Results</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Focused on delivering tangible improvements in productivity, 
                    food security, and economic opportunities for African farmers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
