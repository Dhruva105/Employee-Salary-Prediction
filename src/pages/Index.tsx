import React, { useState, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import MultiStepSalaryForm from '@/components/MultiStepSalaryForm';
import EnhancedPredictionResults from '@/components/EnhancedPredictionResults';
import MarketInsights from '@/components/MarketInsights';
import TopPayingCompanies from '@/components/TopPayingCompanies';
import AnalyticsMetrics from '@/components/AnalyticsMetrics';
import MethodologySection from '@/components/MethodologySection';
import Footer from '@/components/Footer';

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<{
    salary: number;
    formData: any;
    insights?: any;
  } | null>(null);
  
  const predictionSectionRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    predictionSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handlePrediction = (salary: number, formData: any, insights: any) => {
    setPredictionResult({ salary, formData, insights });
    
    // Scroll to results after a brief delay
    setTimeout(() => {
      const resultsElement = document.getElementById('prediction-results');
      resultsElement?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Prediction Form Section */}
      <section ref={predictionSectionRef} className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <MultiStepSalaryForm onPrediction={handlePrediction} />
        </div>
      </section>

      {/* Prediction Results Section */}
      <section id="prediction-results" className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <EnhancedPredictionResults 
            salary={predictionResult?.salary || null} 
            formData={predictionResult?.formData || null}
            insights={predictionResult?.insights}
          />
        </div>
      </section>

      {/* Market Insights */}
      <MarketInsights />

      {/* Top Paying Companies */}
      <TopPayingCompanies />

      {/* Analytics Metrics */}
      <AnalyticsMetrics />

      {/* Methodology */}
      <MethodologySection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
