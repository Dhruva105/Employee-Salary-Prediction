import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, Star } from 'lucide-react';

const TopPayingCompanies: React.FC = () => {
  const companies = [
    {
      name: 'Google India',
      avgSalary: '45L',
      growth: '+22%',
      tier: 'FAANG',
      logo: '🔍',
      positions: '2.5K+ openings',
      rating: 4.8
    },
    {
      name: 'Microsoft India',
      avgSalary: '42L',
      growth: '+20%',
      tier: 'FAANG',
      logo: '🖥️',
      positions: '1.8K+ openings',
      rating: 4.7
    },
    {
      name: 'Amazon India',
      avgSalary: '38L',
      growth: '+18%',
      tier: 'FAANG',
      logo: '📦',
      positions: '3.2K+ openings',
      rating: 4.5
    },
    {
      name: 'Flipkart',
      avgSalary: '28L',
      growth: '+25%',
      tier: 'Unicorn',
      logo: '🛒',
      positions: '1.5K+ openings',
      rating: 4.4
    },
    {
      name: 'Paytm',
      avgSalary: '25L',
      growth: '+15%',
      tier: 'Fintech',
      logo: '💳',
      positions: '800+ openings',
      rating: 4.2
    },
    {
      name: 'Zomato',
      avgSalary: '22L',
      growth: '+28%',
      tier: 'Unicorn',
      logo: '🍽️',
      positions: '600+ openings',
      rating: 4.3
    },
    {
      name: 'TCS',
      avgSalary: '8L',
      growth: '+12%',
      tier: 'IT Services',
      logo: '🏢',
      positions: '15K+ openings',
      rating: 4.0
    },
    {
      name: 'Infosys',
      avgSalary: '9L',
      growth: '+14%',
      tier: 'IT Services',
      logo: '💼',
      positions: '12K+ openings',
      rating: 4.1
    },
    {
      name: 'Wipro',
      avgSalary: '7.5L',
      growth: '+10%',
      tier: 'IT Services',
      logo: '⚡',
      positions: '10K+ openings',
      rating: 3.9
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'FAANG': return 'bg-accent/10 text-accent border-accent/20';
      case 'Unicorn': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Fintech': return 'bg-green-100 text-green-700 border-green-200';
      case 'IT Services': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <h2 className="text-3xl lg:text-4xl font-bold">Top Paying Companies in India</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore salary packages and opportunities at India's most competitive employers
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <Card key={company.name} className="shadow-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
              <CardContent className="p-6">
                {/* Company Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{company.logo}</div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(company.rating)}
                        <span className="text-xs text-muted-foreground ml-1">
                          {company.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={getTierColor(company.tier)}>
                    {company.tier}
                  </Badge>
                </div>

                {/* Salary Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Salary</span>
                    <span className="text-2xl font-bold text-primary">₹{company.avgSalary}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Growth Rate</span>
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">{company.growth}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Open Positions</span>
                    <span className="font-medium">{company.positions}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Market Position</span>
                    <span>{index < 3 ? 'Premium' : index < 6 ? 'High' : 'Standard'}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        index < 3 ? 'bg-accent' : 
                        index < 6 ? 'bg-primary' : 'bg-blue-400'
                      }`}
                      style={{ width: `${Math.max(30, 100 - index * 8)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Company Highlights */}
                <div className="mt-4 pt-4 border-t border-muted">
                  <div className="flex flex-wrap gap-1">
                    {index < 3 && (
                      <Badge variant="secondary" className="text-xs">Global Leader</Badge>
                    )}
                    {company.growth.includes('2') && (
                      <Badge variant="secondary" className="text-xs">Fast Growing</Badge>
                    )}
                    {parseInt(company.positions.replace(/[^\d]/g, '')) > 5000 && (
                      <Badge variant="secondary" className="text-xs">Mass Hiring</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="text-2xl font-bold text-accent mb-1">500+</div>
            <div className="text-sm text-muted-foreground">Companies Tracked</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-2xl font-bold text-primary mb-1">50K+</div>
            <div className="text-sm text-muted-foreground">Job Openings</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-success/10 to-success/5">
            <div className="text-2xl font-bold text-success mb-1">₹18L</div>
            <div className="text-sm text-muted-foreground">Average Package</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
            <div className="text-2xl font-bold text-purple-600 mb-1">94%</div>
            <div className="text-sm text-muted-foreground">Placement Rate</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TopPayingCompanies;