
import React, { useState, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import SalaryPredictionForm from '@/components/SalaryPredictionForm';
import PredictionResults from '@/components/PredictionResults';
import SimplifiedModelInfo from '@/components/SimplifiedModelInfo';
import ComparisonChart from '@/components/ComparisonChart';
import SimplifiedTechStack from '@/components/SimplifiedTechStack';
import Footer from '@/components/Footer';

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

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<{
    salary: number;
    formData: FormData;
  } | null>(null);
  
  const predictionSectionRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    predictionSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handlePrediction = (salary: number, formData: FormData) => {
    setPredictionResult({ salary, formData });
    
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
          <SalaryPredictionForm onPrediction={handlePrediction} />
        </div>
      </section>

      {/* Prediction Results Section */}
      <section id="prediction-results" className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <PredictionResults 
            salary={predictionResult?.salary || null} 
            formData={predictionResult?.formData || null} 
          />
        </div>
      </section>

      {/* Simplified Model Information */}
      <SimplifiedModelInfo />

      {/* Salary Comparison Chart */}
      <ComparisonChart />

      {/* Tech Stack & GitHub */}
      <SimplifiedTechStack />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
