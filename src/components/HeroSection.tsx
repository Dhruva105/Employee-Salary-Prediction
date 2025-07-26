import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Target, Building2 } from 'lucide-react';
import dashboardPreview from '@/assets/dashboard-preview.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const stats = [
    { label: 'Premium Users', value: '25K+', icon: Users },
    { label: 'Accuracy Rate', value: '94%', icon: Target },
    { label: 'Companies Covered', value: '500+', icon: Building2 }
  ];

  return (
    <section className="bg-gradient-hero text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Logo/Brand */}
            <div className="flex items-center gap-2 text-2xl font-bold">
              <TrendingUp className="h-8 w-8 text-accent" />
              <span className="text-accent">Salary</span>
              <span>Scope</span>
            </div>

            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Employee Salary
                <span className="block text-accent">Prediction Dashboard</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold opacity-90">
                ML-Powered Salary Predictions
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg lg:text-xl opacity-80 leading-relaxed max-w-2xl">
              Predict salaries using machine learning trained on 45,000+ data points. 
              Built as an internship project showcasing full-stack development with 
              Python ML models and React frontend.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="accent" 
                size="lg" 
                onClick={onGetStarted}
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              >
                Start Prediction
              </Button>
              <Button 
                variant="hero-secondary" 
                size="lg"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              >
                Learn More
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative animate-float">
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <div className="aspect-video rounded-lg overflow-hidden bg-white">
                <img 
                  src={dashboardPreview} 
                  alt="SalaryScope Dashboard Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-80">Live Market Trends</span>
                  <span className="text-accent font-semibold">+15.3%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full w-3/4 animate-pulse"></div>
                </div>
              </div>
            </Card>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-accent text-white p-3 rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-primary p-3 rounded-full shadow-lg animate-float" style={{ animationDelay: '2s' }}>
              <Target className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;