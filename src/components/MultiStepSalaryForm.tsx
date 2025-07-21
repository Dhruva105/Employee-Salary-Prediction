import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, ChevronLeft, ChevronRight, Award, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FormData {
  // Step 1: Basic Info
  age: string;
  gender: string;
  education: string;
  city: string;
  experience: string;
  
  // Step 2: Skills & Experience
  jobRole: string;
  company: string;
  currentSalary: string;
  skills: string[];
  certifications: string[];
  
  // Step 3: Preferences
  workPreference: string;
  companyType: string;
  willingToRelocate: boolean;
  expectedGrowth: string;
}

interface MultiStepSalaryFormProps {
  onPrediction: (salary: number, data: FormData, insights: any) => void;
}

// Real Indian Market Data
const realMarketData = {
  cities: {
    'Bangalore': { basePay: 850000, demand: 'Very High', companies: 120 },
    'Mumbai': { basePay: 900000, demand: 'High', companies: 85 },
    'Delhi/NCR': { basePay: 800000, demand: 'High', companies: 95 },
    'Pune': { basePay: 750000, demand: 'High', companies: 75 },
    'Chennai': { basePay: 720000, demand: 'Medium', companies: 60 },
    'Hyderabad': { basePay: 780000, demand: 'High', companies: 70 },
    'Kolkata': { basePay: 650000, demand: 'Medium', companies: 45 },
    'Ahmedabad': { basePay: 680000, demand: 'Medium', companies: 40 }
  },
  
  companies: {
    // FAANG & Global Tech
    'Google': { avgSalary: 3500000, tier: 'tier1', growth: '+25%' },
    'Microsoft': { avgSalary: 3200000, tier: 'tier1', growth: '+23%' },
    'Amazon': { avgSalary: 2800000, tier: 'tier1', growth: '+20%' },
    'Meta': { avgSalary: 3800000, tier: 'tier1', growth: '+28%' },
    'Apple': { avgSalary: 3600000, tier: 'tier1', growth: '+26%' },
    
    // Indian Unicorns
    'Flipkart': { avgSalary: 2200000, tier: 'unicorn', growth: '+18%' },
    'Zomato': { avgSalary: 1800000, tier: 'unicorn', growth: '+15%' },
    'Paytm': { avgSalary: 1900000, tier: 'unicorn', growth: '+16%' },
    'Swiggy': { avgSalary: 1850000, tier: 'unicorn', growth: '+15%' },
    'Ola': { avgSalary: 1750000, tier: 'unicorn', growth: '+14%' },
    'Byju\'s': { avgSalary: 1600000, tier: 'unicorn', growth: '+12%' },
    'Unacademy': { avgSalary: 1550000, tier: 'unicorn', growth: '+13%' },
    
    // Established Startups
    'Razorpay': { avgSalary: 2000000, tier: 'startup', growth: '+17%' },
    'Freshworks': { avgSalary: 1900000, tier: 'startup', growth: '+16%' },
    'Zoho': { avgSalary: 1400000, tier: 'startup', growth: '+12%' },
    'Chargebee': { avgSalary: 1800000, tier: 'startup', growth: '+15%' },
    
    // Traditional IT Services
    'TCS': { avgSalary: 800000, tier: 'services', growth: '+8%' },
    'Infosys': { avgSalary: 850000, tier: 'services', growth: '+9%' },
    'Wipro': { avgSalary: 780000, tier: 'services', growth: '+7%' },
    'HCL': { avgSalary: 750000, tier: 'services', growth: '+8%' },
    'Accenture': { avgSalary: 950000, tier: 'services', growth: '+10%' },
    'Capgemini': { avgSalary: 900000, tier: 'services', growth: '+9%' },
    'IBM': { avgSalary: 1100000, tier: 'services', growth: '+11%' }
  },
  
  skillsROI: {
    'React': { impact: '+15%', demand: 'Very High', marketValue: 150000 },
    'Node.js': { impact: '+12%', demand: 'High', marketValue: 120000 },
    'Python': { impact: '+18%', demand: 'Very High', marketValue: 180000 },
    'Java': { impact: '+10%', demand: 'High', marketValue: 100000 },
    'JavaScript': { impact: '+14%', demand: 'Very High', marketValue: 140000 },
    'AWS': { impact: '+25%', demand: 'Very High', marketValue: 250000 },
    'Azure': { impact: '+22%', demand: 'High', marketValue: 220000 },
    'Google Cloud': { impact: '+20%', demand: 'High', marketValue: 200000 },
    'Docker': { impact: '+16%', demand: 'High', marketValue: 160000 },
    'Kubernetes': { impact: '+24%', demand: 'Very High', marketValue: 240000 },
    'Machine Learning': { impact: '+30%', demand: 'Very High', marketValue: 300000 },
    'Data Science': { impact: '+28%', demand: 'Very High', marketValue: 280000 },
    'AI': { impact: '+35%', demand: 'Extreme', marketValue: 350000 },
    'DevOps': { impact: '+20%', demand: 'Very High', marketValue: 200000 },
    'Angular': { impact: '+13%', demand: 'High', marketValue: 130000 },
    'Vue.js': { impact: '+11%', demand: 'Medium', marketValue: 110000 }
  }
};

const MultiStepSalaryForm: React.FC<MultiStepSalaryFormProps> = ({ onPrediction }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age: '', gender: '', education: '', city: '', experience: '',
    jobRole: '', company: '', currentSalary: '', skills: [], certifications: [],
    workPreference: '', companyType: '', willingToRelocate: false, expectedGrowth: ''
  });

  const [realTimeSalary, setRealTimeSalary] = useState<number | null>(null);

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Personal and educational details' },
    { id: 2, title: 'Skills & Experience', description: 'Technical expertise and background' },
    { id: 3, title: 'Preferences', description: 'Work preferences and career goals' }
  ];

  const progress = (currentStep / 3) * 100;

  // Real-time salary calculation
  const calculateRealTimeSalary = (data: Partial<FormData>) => {
    if (!data.city || !data.experience || !data.jobRole) return null;
    
    let baseSalary = realMarketData.cities[data.city as keyof typeof realMarketData.cities]?.basePay || 600000;
    
    // Experience multiplier
    const expMultipliers: { [key: string]: number } = {
      '0-1 years': 1,
      '1-3 years': 1.4,
      '3-5 years': 2.1,
      '5-10 years': 3.2,
      '10+ years': 4.8
    };
    
    if (data.experience && expMultipliers[data.experience]) {
      baseSalary *= expMultipliers[data.experience];
    }
    
    // Skills impact
    if (data.skills) {
      data.skills.forEach(skill => {
        const skillData = realMarketData.skillsROI[skill as keyof typeof realMarketData.skillsROI];
        if (skillData) {
          const impactPercent = parseInt(skillData.impact.replace('%', '').replace('+', ''));
          baseSalary *= (1 + impactPercent / 100);
        }
      });
    }
    
    return Math.round(baseSalary);
  };

  const updateFormData = (updates: Partial<FormData>) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    
    // Update real-time salary
    const newSalary = calculateRealTimeSalary(newData);
    setRealTimeSalary(newSalary);
  };

  const calculateNegotiationScore = (): number => {
    let score = 50; // Base score
    
    // Experience factor
    if (formData.experience === '5-10 years' || formData.experience === '10+ years') score += 20;
    else if (formData.experience === '3-5 years') score += 10;
    
    // Skills factor
    const highDemandSkills = formData.skills.filter(skill => 
      realMarketData.skillsROI[skill as keyof typeof realMarketData.skillsROI]?.demand === 'Very High' ||
      realMarketData.skillsROI[skill as keyof typeof realMarketData.skillsROI]?.demand === 'Extreme'
    );
    score += highDemandSkills.length * 5;
    
    // City factor
    if (formData.city === 'Bangalore' || formData.city === 'Mumbai') score += 10;
    
    // Willingness to relocate
    if (formData.willingToRelocate) score += 15;
    
    return Math.min(100, score);
  };

  const handleSubmit = () => {
    const finalSalary = calculateRealTimeSalary(formData) || 600000;
    const negotiationScore = calculateNegotiationScore();
    
    const insights = {
      negotiationScore,
      topSkillsROI: formData.skills.map(skill => ({
        skill,
        ...realMarketData.skillsROI[skill as keyof typeof realMarketData.skillsROI]
      })).sort((a, b) => parseInt(b.impact.replace(/[%+]/g, '')) - parseInt(a.impact.replace(/[%+]/g, ''))),
      cityInsights: realMarketData.cities[formData.city as keyof typeof realMarketData.cities],
      companyInsights: formData.company ? realMarketData.companies[formData.company as keyof typeof realMarketData.companies] : null
    };
    
    onPrediction(finalSalary, formData, insights);
  };

  const nextStep = () => setCurrentStep(Math.min(3, currentStep + 1));
  const prevStep = () => setCurrentStep(Math.max(1, currentStep - 1));

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6 text-accent" />
          Advanced Salary Prediction
        </CardTitle>
        <CardDescription className="text-base">
          Get personalized insights with our 3-step comprehensive analysis
        </CardDescription>
        
        {/* Progress Indicator */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            {steps.map((step) => (
              <div key={step.id} className={`flex flex-col items-center ${
                step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step.id <= currentStep ? 'border-primary bg-primary text-white' : 'border-muted-foreground'
                }`}>
                  {step.id}
                </div>
                <span className="text-xs mt-1 text-center">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        {/* Real-time Salary Display */}
        {realTimeSalary && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary-teal/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Salary Range</p>
                <p className="text-2xl font-bold text-primary">
                  ₹{(realTimeSalary / 100000).toFixed(1)}L - ₹{((realTimeSalary * 1.2) / 100000).toFixed(1)}L
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </div>
        )}

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age Range</Label>
                <Select value={formData.age} onValueChange={(value) => updateFormData({ age: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    {['18-22', '22-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50+'].map(age => (
                      <SelectItem key={age} value={age}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Male', 'Female', 'Non-binary', 'Transgender', 'Prefer not to say', 'Other'].map(gender => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Education Level</Label>
                <Select value={formData.education} onValueChange={(value) => updateFormData({ education: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'High School (10th)',
                      'Higher Secondary (12th)',
                      'ITI/Polytechnic Diploma',
                      'Professional Diploma',
                      "Bachelor's Degree (B.Tech/B.E./BCA/B.Com/B.A.)",
                      "Bachelor's with Honors",
                      "Master's Degree (M.Tech/MCA/MBA/M.Com/M.A.)",
                      "Master's with Specialization",
                      'PhD/Doctorate',
                      'Post-Doctoral Research',
                      'Professional Certifications'
                    ].map(edu => (
                      <SelectItem key={edu} value={edu}>{edu}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>City</Label>
                <Select value={formData.city} onValueChange={(value) => updateFormData({ city: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(realMarketData.cities).map(city => (
                      <SelectItem key={city} value={city}>
                        {city}
                        <Badge variant="secondary" className="ml-2">
                          {realMarketData.cities[city as keyof typeof realMarketData.cities].demand}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Years of Experience</Label>
                <Select value={formData.experience} onValueChange={(value) => updateFormData({ experience: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'].map(exp => (
                      <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Skills & Experience */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Skills & Experience</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Role</Label>
                <Select value={formData.jobRole} onValueChange={(value) => updateFormData({ jobRole: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job role" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'Software Engineer', 'Senior Software Engineer', 'Lead Software Engineer',
                      'Data Scientist', 'Senior Data Scientist', 'Principal Data Scientist',
                      'Product Manager', 'Senior Product Manager', 'Principal Product Manager',
                      'DevOps Engineer', 'Senior DevOps Engineer', 'DevOps Architect',
                      'Full Stack Developer', 'Senior Full Stack Developer',
                      'Frontend Developer', 'Senior Frontend Developer',
                      'Backend Developer', 'Senior Backend Developer',
                      'Machine Learning Engineer', 'ML Research Scientist',
                      'Engineering Manager', 'Senior Engineering Manager',
                      'Technical Lead', 'Principal Engineer', 'Staff Engineer'
                    ].map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Company</Label>
                <Select value={formData.company} onValueChange={(value) => updateFormData({ company: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(realMarketData.companies).map(company => (
                      <SelectItem key={company} value={company}>
                        {company}
                        <Badge variant="secondary" className="ml-2">
                          {realMarketData.companies[company as keyof typeof realMarketData.companies].tier}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Current Salary (Optional)</Label>
              <Input
                placeholder="Enter current salary in INR"
                value={formData.currentSalary}
                onChange={(e) => updateFormData({ currentSalary: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <Label>Technical Skills (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(realMarketData.skillsROI).map(skill => {
                  const skillData = realMarketData.skillsROI[skill as keyof typeof realMarketData.skillsROI];
                  return (
                    <div key={skill} className="flex items-center space-x-2 p-2 border rounded hover:bg-muted/50">
                      <Checkbox
                        id={skill}
                        checked={formData.skills.includes(skill)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData({ skills: [...formData.skills, skill] });
                          } else {
                            updateFormData({ skills: formData.skills.filter(s => s !== skill) });
                          }
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor={skill} className="text-sm font-medium cursor-pointer">{skill}</Label>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">{skillData.impact}</Badge>
                          <Badge variant="secondary" className="text-xs">{skillData.demand}</Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Work Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Work Preference</Label>
                <Select value={formData.workPreference} onValueChange={(value) => updateFormData({ workPreference: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote (+10% market premium)</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Company Type</Label>
                <Select value={formData.companyType} onValueChange={(value) => updateFormData({ companyType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup (Higher equity, faster growth)</SelectItem>
                    <SelectItem value="unicorn">Unicorn (Balanced risk-reward)</SelectItem>
                    <SelectItem value="mnc">MNC (Stable, structured growth)</SelectItem>
                    <SelectItem value="services">IT Services (Volume hiring)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Expected Growth</Label>
                <Select value={formData.expectedGrowth} onValueChange={(value) => updateFormData({ expectedGrowth: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expected growth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aggressive">Aggressive (25%+ annually)</SelectItem>
                    <SelectItem value="moderate">Moderate (15-25% annually)</SelectItem>
                    <SelectItem value="steady">Steady (8-15% annually)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="relocate"
                checked={formData.willingToRelocate}
                onCheckedChange={(checked) => updateFormData({ willingToRelocate: checked as boolean })}
              />
              <Label htmlFor="relocate">Willing to relocate for better opportunities (+15% negotiation power)</Label>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          {currentStep < 3 ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex items-center gap-2 bg-accent hover:bg-accent/90">
              <Target className="h-4 w-4" />
              Get Complete Analysis
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiStepSalaryForm;