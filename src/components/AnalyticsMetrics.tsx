import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Brain, Calculator, TrendingUp } from 'lucide-react';

const AnalyticsMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Advanced Analytics',
      percentage: '94.2',
      description: 'Machine learning algorithms analyze complex salary patterns',
      icon: Brain,
      color: 'success',
      bgClass: 'bg-gradient-to-br from-success/20 to-success/10',
      iconClass: 'text-success'
    },
    {
      title: 'Predictive Modeling',
      percentage: '91.8',
      description: 'AI-powered predictions based on market trends',
      icon: TrendingUp,
      color: 'analytics-blue',
      bgClass: 'bg-gradient-to-br from-primary/20 to-primary/10',
      iconClass: 'text-primary'
    },
    {
      title: 'Statistical Analysis',
      percentage: '88.5',
      description: 'Comprehensive data validation and processing',
      icon: Calculator,
      color: 'analytics-purple',
      bgClass: 'bg-gradient-to-br from-purple-500/20 to-purple-500/10',
      iconClass: 'text-purple-600'
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h2 className="text-3xl lg:text-4xl font-bold">Analytics Accuracy Metrics</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our advanced technology stack ensures the highest accuracy in salary predictions
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <Card 
              key={metric.title} 
              className={`${metric.bgClass} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-white/80 flex items-center justify-center shadow-lg`}>
                    <metric.icon className={`h-8 w-8 ${metric.iconClass}`} />
                  </div>
                </div>

                {/* Percentage Display */}
                <div className="mb-4">
                  <div className={`text-5xl font-bold ${metric.iconClass} mb-2`}>
                    {metric.percentage}%
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {metric.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {metric.description}
                </p>

                {/* Progress Ring/Bar */}
                <div className="mt-6">
                  <div className="relative w-24 h-24 mx-auto">
                    <svg className="transform -rotate-90 w-24 h-24">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-white/30"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - parseFloat(metric.percentage) / 100)}`}
                        className={metric.iconClass}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg font-bold ${metric.iconClass}`}>
                        {metric.percentage.split('.')[0]}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                    <span>Updated in real-time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Data Points Analyzed</div>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-accent mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Real-time Processing</div>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-success mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Companies Tracked</div>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-purple-600 mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">System Uptime</div>
          </Card>
        </div>

        {/* Methodology Preview */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">How We Achieve This Accuracy</h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Our multi-layered approach combines machine learning, statistical analysis, and real-time market data 
              to provide the most accurate salary predictions in the industry.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Data Collection</h4>
                <p className="text-sm text-muted-foreground">Comprehensive market research</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">AI Processing</h4>
                <p className="text-sm text-muted-foreground">Advanced algorithm analysis</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Validation</h4>
                <p className="text-sm text-muted-foreground">Continuous accuracy improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsMetrics;