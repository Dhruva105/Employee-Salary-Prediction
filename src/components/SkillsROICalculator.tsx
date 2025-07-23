
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, Target, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SkillsROICalculator: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Real Indian market data for skills ROI
  const skillsData = [
    { skill: 'AWS Cloud', impact: 28, avgSalary: 1850000, demand: 'High', category: 'Cloud' },
    { skill: 'React.js', impact: 22, avgSalary: 1200000, demand: 'Very High', category: 'Frontend' },
    { skill: 'Node.js', impact: 24, avgSalary: 1350000, demand: 'High', category: 'Backend' },
    { skill: 'Python', impact: 26, avgSalary: 1450000, demand: 'Very High', category: 'Programming' },
    { skill: 'DevOps', impact: 32, avgSalary: 2100000, demand: 'High', category: 'Infrastructure' },
    { skill: 'Machine Learning', impact: 35, avgSalary: 2200000, demand: 'Very High', category: 'AI/ML' },
    { skill: 'Kubernetes', impact: 30, avgSalary: 1950000, demand: 'High', category: 'Container' },
    { skill: 'Angular', impact: 20, avgSalary: 1150000, demand: 'Medium', category: 'Frontend' },
    { skill: 'Java', impact: 18, avgSalary: 1100000, demand: 'High', category: 'Programming' },
    { skill: 'Docker', impact: 25, avgSalary: 1400000, demand: 'High', category: 'Container' },
    { skill: 'MongoDB', impact: 19, avgSalary: 1180000, demand: 'Medium', category: 'Database' },
    { skill: 'PostgreSQL', impact: 16, avgSalary: 1050000, demand: 'Medium', category: 'Database' }
  ];

  const certificationData = [
    { name: 'AWS Solution Architect', roi: 45, cost: 15000, timeToComplete: '3 months' },
    { name: 'Google Cloud Professional', roi: 40, cost: 12000, timeToComplete: '2 months' },
    { name: 'Kubernetes CKA', roi: 38, cost: 20000, timeToComplete: '4 months' },
    { name: 'Azure Developer Associate', roi: 35, cost: 13000, timeToComplete: '2.5 months' },
    { name: 'TensorFlow Developer', roi: 42, cost: 8000, timeToComplete: '6 months' },
    { name: 'React Developer', roi: 28, cost: 5000, timeToComplete: '2 months' }
  ];

  const marketDemand = [
    { category: 'AI/ML', demand: 85, color: '#8b5cf6' },
    { category: 'Cloud', demand: 82, color: '#3b82f6' },
    { category: 'Frontend', demand: 78, color: '#10b981' },
    { category: 'Backend', demand: 75, color: '#f59e0b' },
    { category: 'DevOps', demand: 88, color: '#ef4444' },
    { category: 'Mobile', demand: 65, color: '#6b7280' }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const calculateTotalROI = () => {
    return selectedSkills.reduce((total, skill) => {
      const skillData = skillsData.find(s => s.skill === skill);
      return total + (skillData?.impact || 0);
    }, 0);
  };

  const topSkills = [...skillsData].sort((a, b) => b.impact - a.impact).slice(0, 6);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Skills ROI Calculator</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover which skills provide the highest salary impact in the Indian tech market
          </p>
        </div>

        {/* Skills Selection */}
        <div className="mb-12">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Select Your Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                {skillsData.map((skill) => (
                  <Button
                    key={skill.skill}
                    variant={selectedSkills.includes(skill.skill) ? "default" : "outline"}
                    onClick={() => toggleSkill(skill.skill)}
                    className="h-auto p-3 flex flex-col items-center gap-1"
                  >
                    <span className="text-sm font-medium">{skill.skill}</span>
                    <span className="text-xs text-muted-foreground">+{skill.impact}%</span>
                  </Button>
                ))}
              </div>
              
              {selectedSkills.length > 0 && (
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Your Skills Impact</h4>
                    <div className="text-3xl font-bold text-primary mb-2">+{calculateTotalROI()}%</div>
                    <p className="text-sm text-muted-foreground">
                      Potential salary increase with selected skills
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Top Skills by Impact */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Top Skills by Salary Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topSkills}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="skill" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Salary Impact']}
                    labelFormatter={(label) => `Skill: ${label}`}
                  />
                  <Bar dataKey="impact" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Market Demand Distribution */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Market Demand by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={marketDemand}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, demand }) => `${category}: ${demand}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="demand"
                  >
                    {marketDemand.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Market Demand']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Skills Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {topSkills.map((skill) => (
            <Card key={skill.skill} className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{skill.skill}</h3>
                  <Badge className={getDemandColor(skill.demand)}>
                    {skill.demand}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Salary Impact:</span>
                    <span className="font-bold text-success">+{skill.impact}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Salary:</span>
                    <span className="font-bold">{formatCurrency(skill.avgSalary)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <Badge variant="outline">{skill.category}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certification ROI */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center justify-center">
              <Star className="h-5 w-5 text-accent" />
              High-ROI Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificationData.map((cert) => (
                <div key={cert.name} className="bg-white/80 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">{cert.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ROI:</span>
                      <span className="font-bold text-success">+{cert.roi}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cost:</span>
                      <span className="font-medium">{formatCurrency(cert.cost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{cert.timeToComplete}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SkillsROICalculator;
