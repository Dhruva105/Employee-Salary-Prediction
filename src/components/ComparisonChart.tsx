import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const ComparisonChart: React.FC = () => {
  // Sample salary data by experience level
  const salaryData = [
    { experience: '0-1 years', avgSalary: 450000, predictedSalary: 420000 },
    { experience: '2-3 years', avgSalary: 750000, predictedSalary: 780000 },
    { experience: '4-5 years', avgSalary: 1200000, predictedSalary: 1150000 },
    { experience: '6-7 years', avgSalary: 1800000, predictedSalary: 1850000 },
    { experience: '8+ years', avgSalary: 2800000, predictedSalary: 2750000 }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Salary Comparison by Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            How our predictions compare with industry averages across different experience levels
          </p>
        </div>

        {/* Chart */}
        <Card className="bg-card/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Average vs Predicted Salaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="experience" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip 
                  formatter={(value, name) => [
                    formatCurrency(Number(value)), 
                    name === 'avgSalary' ? 'Industry Average' : 'Our Prediction'
                  ]}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="avgSalary" fill="hsl(var(--muted-foreground))" name="Industry Average" />
                <Bar dataKey="predictedSalary" fill="hsl(var(--primary))" name="Our Prediction" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary mb-2">84%</div>
              <div className="text-sm text-muted-foreground">Model Accuracy</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent mb-2">₹11.4K</div>
              <div className="text-sm text-muted-foreground">Average Error (RMSE)</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success mb-2">45K+</div>
              <div className="text-sm text-muted-foreground">Training Records</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComparisonChart;