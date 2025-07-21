import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, MapPin, Briefcase } from 'lucide-react';

const MarketInsights: React.FC = () => {
  const cityData = [
    { city: 'Bangalore', avgSalary: '12.5L', growth: '+18%' },
    { city: 'Mumbai', avgSalary: '11.8L', growth: '+15%' },
    { city: 'Delhi NCR', avgSalary: '11.2L', growth: '+16%' },
    { city: 'Hyderabad', avgSalary: '10.8L', growth: '+20%' },
    { city: 'Pune', avgSalary: '10.2L', growth: '+14%' },
    { city: 'Chennai', avgSalary: '9.8L', growth: '+12%' }
  ];

  const experienceTrends = [
    { experience: '0-2 years', salary: '4.5L', trend: 'entry' },
    { experience: '2-5 years', salary: '8.2L', trend: 'growing' },
    { experience: '5-8 years', salary: '15.6L', trend: 'peak' },
    { experience: '8+ years', salary: '25.4L', trend: 'senior' }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'entry': return 'bg-blue-100 text-blue-700';
      case 'growing': return 'bg-green-100 text-green-700';
      case 'peak': return 'bg-accent/10 text-accent';
      case 'senior': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Market Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover salary trends and patterns across the Indian job market
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Average Salary by City */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Average Salary by City
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityData.map((city, index) => (
                  <div key={city.city} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-primary rounded-full" style={{ height: `${20 + index * 8}px` }}></div>
                      <div>
                        <div className="font-semibold">{city.city}</div>
                        <div className="text-sm text-muted-foreground">₹{city.avgSalary} per annum</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-success font-medium">{city.growth}</div>
                      <div className="text-xs text-muted-foreground">YoY Growth</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="mt-6 h-40 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Interactive Chart Coming Soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience vs Salary Trend */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Experience vs Salary Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {experienceTrends.map((trend, index) => (
                  <div key={trend.experience} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTrendColor(trend.trend)}`}>
                        {trend.trend}
                      </div>
                      <div>
                        <div className="font-semibold">{trend.experience}</div>
                        <div className="text-sm text-muted-foreground">Experience Range</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">₹{trend.salary}</div>
                      <div className="text-xs text-muted-foreground">Average</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trend Visualization */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Salary Growth Rate</span>
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold">+15% per year</span>
                  </div>
                </div>
                <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-4/5"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on market analysis of 50,000+ professionals
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6 border-primary/20">
            <div className="text-3xl font-bold text-primary mb-2">15%</div>
            <div className="text-sm text-muted-foreground">Average Annual Growth</div>
          </Card>
          <Card className="text-center p-6 border-accent/20">
            <div className="text-3xl font-bold text-accent mb-2">8.5L</div>
            <div className="text-sm text-muted-foreground">National Average Salary</div>
          </Card>
          <Card className="text-center p-6 border-success/20">
            <div className="text-3xl font-bold text-success mb-2">85%</div>
            <div className="text-sm text-muted-foreground">Market Coverage</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;