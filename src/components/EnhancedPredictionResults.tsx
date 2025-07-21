import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Target, MapPin, Building2, Briefcase, Brain, Star } from 'lucide-react';

interface PredictionResultsProps {
  salary: number | null;
  formData: any;
  insights?: {
    negotiationScore: number;
    topSkillsROI: Array<{
      skill: string;
      impact: string;
      demand: string;
      marketValue: number;
    }>;
    cityInsights: {
      basePay: number;
      demand: string;
      companies: number;
    };
    companyInsights?: {
      avgSalary: number;
      tier: string;
      growth: string;
    };
  };
}

const EnhancedPredictionResults: React.FC<PredictionResultsProps> = ({ salary, formData, insights }) => {
  if (!salary || !insights) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="text-muted-foreground">
            <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Complete the form to see your personalized analysis</h3>
            <p>Get insights on salary prediction, negotiation power, and skill ROI</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Main Salary Prediction */}
      <Card className="shadow-lg border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="h-6 w-6 text-primary" />
            Your Predicted Salary
          </CardTitle>
          <CardDescription>Based on current Indian market trends and your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-1">Estimated Range</p>
              <p className="text-3xl font-bold text-primary">
                ₹{(salary / 100000).toFixed(1)}L - ₹{((salary * 1.2) / 100000).toFixed(1)}L
              </p>
              <p className="text-sm text-muted-foreground mt-1">Per annum</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Market Position</p>
              <div className="text-lg font-semibold">
                {salary > 2000000 ? (
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">Top 10%</Badge>
                ) : salary > 1200000 ? (
                  <Badge className="bg-blue-100 text-blue-800 px-3 py-1">Top 25%</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800 px-3 py-1">Average</Badge>
                )}
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground mb-1">Growth Potential</p>
              <p className="text-lg font-semibold text-green-600">
                +{Math.round(12 + (insights.topSkillsROI.length * 2))}% annually
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Negotiation Confidence Score */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              Negotiation Confidence Score
            </CardTitle>
            <CardDescription>Your position strength in salary negotiations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{insights.negotiationScore}/100</span>
                <Badge className={getScoreColor(insights.negotiationScore).replace('text-', 'bg-').replace('-600', '-100 ') + getScoreColor(insights.negotiationScore)}>
                  {getScoreLevel(insights.negotiationScore)}
                </Badge>
              </div>
              
              <Progress value={insights.negotiationScore} className="h-3" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Experience Level:</span>
                  <span className="font-medium">{formData.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span>High-Demand Skills:</span>
                  <span className="font-medium">{insights.topSkillsROI.filter(s => s.demand === 'Very High' || s.demand === 'Extreme').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location Advantage:</span>
                  <span className="font-medium">{insights.cityInsights.demand}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mobility Factor:</span>
                  <span className="font-medium">{formData.willingToRelocate ? 'Flexible' : 'Location-bound'}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Recommendation:</strong> {
                    insights.negotiationScore >= 80 
                      ? "You're in an excellent position to negotiate. Consider asking for 15-20% above the offered salary."
                      : insights.negotiationScore >= 60
                      ? "You have good leverage. Aim for 10-15% above the initial offer."
                      : "Focus on skill development and experience building before major negotiations."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills ROI Calculator */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              Skills ROI Calculator
            </CardTitle>
            <CardDescription>Impact of your skills on salary potential</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.topSkillsROI.slice(0, 5).map((skill, index) => (
                <div key={skill.skill} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{skill.skill}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">{skill.demand}</Badge>
                        <Badge variant="secondary" className="text-xs text-green-700">
                          ₹{(skill.marketValue / 1000).toFixed(0)}K value
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{skill.impact}</p>
                    <p className="text-xs text-muted-foreground">salary boost</p>
                  </div>
                </div>
              ))}
              
              {insights.topSkillsROI.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Add skills to see their ROI impact</p>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>Next Steps:</strong> Consider adding AWS (+25%), Machine Learning (+30%), or AI (+35%) to maximize your earning potential.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Intelligence */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            Market Intelligence
          </CardTitle>
          <CardDescription>Insights about your market position and opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* City Analysis */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <MapPin className="h-5 w-5 text-blue-600" />
                {formData.city} Market
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Salary:</span>
                  <span className="font-medium">₹{(insights.cityInsights.basePay / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Demand:</span>
                  <Badge variant={insights.cityInsights.demand === 'Very High' ? 'default' : 'secondary'}>
                    {insights.cityInsights.demand}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Active Companies:</span>
                  <span className="font-medium">{insights.cityInsights.companies}+</span>
                </div>
              </div>
            </div>

            {/* Company Analysis */}
            {insights.companyInsights && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  {formData.company}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Avg. Salary:</span>
                    <span className="font-medium">₹{(insights.companyInsights.avgSalary / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Company Tier:</span>
                    <Badge variant="outline" className="capitalize">
                      {insights.companyInsights.tier}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Salary Growth:</span>
                    <span className="font-medium text-green-600">{insights.companyInsights.growth}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Career Trajectory */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Briefcase className="h-5 w-5 text-green-600" />
                Career Path
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current Level:</span>
                  <span className="font-medium">{formData.jobRole}</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span className="font-medium">{formData.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Milestone:</span>
                  <span className="font-medium text-blue-600">
                    {formData.experience === '0-1 years' ? '1-3 years (+40%)' :
                     formData.experience === '1-3 years' ? '3-5 years (+50%)' :
                     formData.experience === '3-5 years' ? '5-10 years (+52%)' :
                     'Senior/Lead Role (+50%)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPredictionResults;