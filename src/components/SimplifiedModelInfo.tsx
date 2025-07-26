import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Cpu, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SimplifiedModelInfo: React.FC = () => {
  // Simple feature importance data for internship demo
  const featureImportance = [
    { feature: 'Experience', importance: 0.32 },
    { feature: 'Skills', importance: 0.24 },
    { feature: 'Company', importance: 0.18 },
    { feature: 'Location', importance: 0.12 },
    { feature: 'Education', importance: 0.14 }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">ML Model Information</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding how our machine learning model predicts salaries
          </p>
        </div>

        {/* Model Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Model Type</p>
                  <p className="text-xl font-bold text-primary">Random Forest</p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">Ensemble Learning</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Accuracy</p>
                  <p className="text-xl font-bold text-accent">84%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">High Performance</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dataset Size</p>
                  <p className="text-xl font-bold text-success">45K+</p>
                </div>
                <Cpu className="h-8 w-8 text-success" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">Large Dataset</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Importance Chart */}
        <Card className="bg-card/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              What Affects Salary Predictions?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureImportance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="feature" />
                <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Importance']} />
                <Bar dataKey="importance" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SimplifiedModelInfo;