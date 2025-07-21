import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Database, Cpu, TrendingUp, RefreshCw, CheckCircle } from 'lucide-react';
import methodologyImage from '@/assets/methodology-image.jpg';

const MethodologySection: React.FC = () => {
  const methodologySteps = [
    {
      icon: Database,
      title: 'Market Research',
      description: 'We collect comprehensive Indian salary records from Indian companies across diverse industries',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Cpu,
      title: 'Data Processing', 
      description: 'Our advanced algorithms process market data, trends, normalization, and economic data validation',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'We use statistical models using historical regression and advanced analytics systems',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: RefreshCw,
      title: 'Continuous Updates',
      description: 'Regular data validation ensures continuous salary market movement results',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const stats = [
    { label: 'Data Points', value: '50K+' },
    { label: 'Accuracy', value: '94%' },
    { label: 'Availability', value: '24/7' }
  ];

  const features = [
    'Real-time salary tracking across 500+ companies',
    'AI-powered trend analysis and prediction models',
    'Comprehensive industry and location-based insights',
    'Regular data validation and accuracy improvements',
    'Advanced statistical modeling and machine learning',
    'Continuous market research and data collection'
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Methodology</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how we provide accurate salary insights using comprehensive market research and data analytics
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden shadow-lg">
              <div className="aspect-[4/3] relative">
                <img 
                  src={methodologyImage} 
                  alt="Professional working with data analytics"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Professional Data Analytics</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 space-y-8">
            {methodologySteps.map((step, index) => (
              <Card 
                key={step.title} 
                className="p-6 hover:shadow-lg transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${step.bgColor} flex-shrink-0`}>
                      <step.icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Key Features & Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{feature}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className="text-center p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-0 shadow-lg"
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Our Data Processing Pipeline</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-2">1</div>
              <div className="text-sm font-medium">Data Collection</div>
              <div className="text-xs text-muted-foreground">Market Research</div>
            </div>
            <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold mb-2">2</div>
              <div className="text-sm font-medium">AI Processing</div>
              <div className="text-xs text-muted-foreground">Algorithm Analysis</div>
            </div>
            <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-accent to-success"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center text-white font-bold mb-2">3</div>
              <div className="text-sm font-medium">Validation</div>
              <div className="text-xs text-muted-foreground">Quality Assurance</div>
            </div>
            <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-success to-purple-600"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-2">4</div>
              <div className="text-sm font-medium">Delivery</div>
              <div className="text-xs text-muted-foreground">Real-time Results</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;