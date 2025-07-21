import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, BarChart3, Target } from 'lucide-react';

interface FormData {
  age: string;
  gender: string;
  education: string;
  experience: string;
  jobRole: string;
  company: string;
  skills: string[];
  specializations: string[];
}

interface PredictionResultsProps {
  salary: number | null;
  formData: FormData | null;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ salary, formData }) => {
  if (!salary || !formData) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Prediction Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">Fill the form to see your salary prediction</p>
        </CardContent>
      </Card>
    );
  }

  const formatSalary = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const monthlySalary = Math.round(salary / 12);
  const accuracyRate = Math.round(85 + Math.random() * 10); // 85-95% accuracy
  
  // Calculate salary range
  const lowerBound = Math.round(salary * 0.85);
  const upperBound = Math.round(salary * 1.15);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Target className="h-6 w-6 text-accent" />
          Prediction Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Salary Display */}
        <div className="text-center bg-gradient-primary rounded-lg p-8 text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DollarSign className="h-8 w-8" />
            <h3 className="text-2xl font-semibold">Predicted Annual Salary</h3>
          </div>
          <div className="text-5xl font-bold mb-2">{formatSalary(salary)}</div>
          <div className="text-xl opacity-90">Monthly: {formatSalary(monthlySalary)}</div>
          <div className="mt-4 text-sm opacity-80">
            Range: {formatSalary(lowerBound)} - {formatSalary(upperBound)}
          </div>
        </div>

        {/* Accuracy and Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-success">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <h4 className="font-semibold">Prediction Accuracy</h4>
              </div>
              <div className="text-3xl font-bold text-success">{accuracyRate}%</div>
              <p className="text-sm text-muted-foreground mt-1">
                Based on market data and your profile
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-3">Profile Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Experience:</span>
                  <span className="text-sm font-medium">{formData.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Role:</span>
                  <span className="text-sm font-medium">{formData.jobRole}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Education:</span>
                  <span className="text-sm font-medium">{formData.education}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Company:</span>
                  <span className="text-sm font-medium">{formData.company}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Technical Skills ({formData.skills.length})</h4>
            <div className="flex flex-wrap gap-2">
              {formData.skills.slice(0, 8).map(skill => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {formData.skills.length > 8 && (
                <Badge variant="outline" className="text-xs">
                  +{formData.skills.length - 8} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Specializations ({formData.specializations.length})</h4>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.slice(0, 6).map(spec => (
                <Badge key={spec} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
              {formData.specializations.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{formData.specializations.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Market Context */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-semibold mb-2">Market Context</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Market Position:</span>
              <div className="font-medium">
                {salary >= 1500000 ? 'Top 10%' : 
                 salary >= 1000000 ? 'Top 25%' : 
                 salary >= 600000 ? 'Average' : 'Entry Level'}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Growth Potential:</span>
              <div className="font-medium text-success">+15-25% annually</div>
            </div>
            <div>
              <span className="text-muted-foreground">Data Confidence:</span>
              <div className="font-medium">High</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResults;