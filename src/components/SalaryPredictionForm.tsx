import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, TrendingUp } from 'lucide-react';

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

interface SalaryPredictionFormProps {
  onPrediction: (salary: number, data: FormData) => void;
}

const SalaryPredictionForm: React.FC<SalaryPredictionFormProps> = ({ onPrediction }) => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    education: '',
    experience: '',
    jobRole: '',
    company: '',
    skills: [],
    specializations: []
  });

  const ageRanges = ['22-25', '25-30', '30-35', '35-40', '40-45', '45+'];
  const genders = ['Male', 'Female', 'Other'];
  const educationLevels = ['Diploma', "Bachelor's", "Master's", 'PhD'];
  const experienceRanges = ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
  const jobRoles = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'Business Analyst',
    'DevOps Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Machine Learning Engineer',
    'Project Manager',
    'UX/UI Designer',
    'Quality Assurance Engineer'
  ];
  const companies = [
    'TCS', 'Infosys', 'Wipro', 'Accenture', 'IBM', 'Google', 'Microsoft', 'Amazon',
    'Flipkart', 'Paytm', 'Zomato', 'Swiggy', 'Ola', 'Byju\'s', 'Freshworks', 'Zoho'
  ];

  const technicalSkills = [
    'Python', 'Java', 'JavaScript', 'C++', 'R', 'React', 'Angular', 'Node.js',
    'Django', 'Flask', 'AWS', 'Azure', 'Google Cloud', 'Machine Learning',
    'Data Science', 'AI', 'SQL', 'DevOps', 'Docker', 'Kubernetes'
  ];

  const specializationOptions = [
    'Project Management', 'Team Management', 'Client Management', 'Business Analysis',
    'Data Analysis', 'Product Management', 'Strategic Planning', 'Budget Management',
    'Quality Economics', 'Process Improvement', 'Stakeholder Management'
  ];

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      skills: checked
        ? [...prev.skills, skill]
        : prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specializations: checked
        ? [...prev.specializations, specialization]
        : prev.specializations.filter(s => s !== specialization)
    }));
  };

  // Mock salary calculation logic
  const calculateSalary = (): number => {
    let baseSalary = 400000; // Base salary in INR
    
    // Experience multiplier
    const expMultipliers: { [key: string]: number } = {
      '0-1 years': 1,
      '1-3 years': 1.5,
      '3-5 years': 2.2,
      '5-10 years': 3.5,
      '10+ years': 5
    };
    
    // Education bonus
    const eduBonus: { [key: string]: number } = {
      'Diploma': 0,
      "Bachelor's": 50000,
      "Master's": 150000,
      'PhD': 250000
    };
    
    // Job role multiplier
    const roleMultipliers: { [key: string]: number } = {
      'Software Engineer': 1.2,
      'Data Scientist': 1.8,
      'Product Manager': 2.0,
      'Machine Learning Engineer': 1.9,
      'DevOps Engineer': 1.4,
      'Full Stack Developer': 1.3
    };
    
    // Company tier bonus
    const companyBonus: { [key: string]: number } = {
      'Google': 800000,
      'Microsoft': 750000,
      'Amazon': 700000,
      'TCS': 100000,
      'Infosys': 120000
    };
    
    if (formData.experience) {
      baseSalary *= expMultipliers[formData.experience] || 1;
    }
    
    if (formData.education) {
      baseSalary += eduBonus[formData.education] || 0;
    }
    
    if (formData.jobRole) {
      baseSalary *= roleMultipliers[formData.jobRole] || 1;
    }
    
    if (formData.company) {
      baseSalary += companyBonus[formData.company] || 0;
    }
    
    // Skills bonus
    baseSalary += formData.skills.length * 25000;
    baseSalary += formData.specializations.length * 15000;
    
    return Math.round(baseSalary);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const predictedSalary = calculateSalary();
    onPrediction(predictedSalary, formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6 text-accent" />
          Predict Your Salary
        </CardTitle>
        <CardDescription className="text-base">
          Enter your professional details to get an accurate salary prediction based on current Indian job market trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age Range</Label>
                <Select value={formData.age} onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRanges.map(age => (
                      <SelectItem key={age} value={age}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map(gender => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education Level</Label>
                <Select value={formData.education} onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map(edu => (
                      <SelectItem key={edu} value={edu}>{edu}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceRanges.map(exp => (
                      <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobRole">Job Role</Label>
                <Select value={formData.jobRole} onValueChange={(value) => setFormData(prev => ({ ...prev, jobRole: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job role" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobRoles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select value={formData.company} onValueChange={(value) => setFormData(prev => ({ ...prev, company: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map(company => (
                      <SelectItem key={company} value={company}>{company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Technical Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {technicalSkills.map(skill => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={formData.skills.includes(skill)}
                    onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                  />
                  <Label htmlFor={skill} className="text-sm">{skill}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Specializations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {specializationOptions.map(specialization => (
                <div key={specialization} className="flex items-center space-x-2">
                  <Checkbox
                    id={specialization}
                    checked={formData.specializations.includes(specialization)}
                    onCheckedChange={(checked) => handleSpecializationChange(specialization, checked as boolean)}
                  />
                  <Label htmlFor={specialization} className="text-sm">{specialization}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3"
            size="lg"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Predict My Salary
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SalaryPredictionForm;