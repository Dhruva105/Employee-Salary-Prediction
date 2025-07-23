
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Target, Clock, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const CareerPathPredictor: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string>('fullstack');

  const careerPaths = {
    fullstack: {
      title: 'Full Stack Developer',
      description: 'Complete web development with frontend and backend expertise',
      progression: [
        { year: 0, level: 'Junior Full Stack', salary: 450000, skills: ['HTML', 'CSS', 'JavaScript', 'React'] },
        { year: 2, level: 'Mid Full Stack', salary: 850000, skills: ['Node.js', 'MongoDB', 'AWS', 'Docker'] },
        { year: 4, level: 'Senior Full Stack', salary: 1500000, skills: ['Microservices', 'DevOps', 'System Design'] },
        { year: 6, level: 'Tech Lead', salary: 2200000, skills: ['Team Leadership', 'Architecture', 'Mentoring'] },
        { year: 8, level: 'Engineering Manager', salary: 3000000, skills: ['People Management', 'Strategy', 'Business'] }
      ],
      marketDemand: 85,
      growthRate: 15,
      nextSkills: ['GraphQL', 'TypeScript', 'Kubernetes', 'React Native']
    },
    backend: {
      title: 'Backend Engineer',
      description: 'Server-side development and system architecture specialist',
      progression: [
        { year: 0, level: 'Junior Backend', salary: 500000, skills: ['Python', 'SQL', 'REST APIs'] },
        { year: 2, level: 'Mid Backend', salary: 900000, skills: ['Django', 'PostgreSQL', 'Redis', 'Docker'] },
        { year: 4, level: 'Senior Backend', salary: 1600000, skills: ['Microservices', 'System Design', 'Kafka'] },
        { year: 6, level: 'Principal Engineer', salary: 2500000, skills: ['Architecture', 'Scalability', 'Performance'] },
        { year: 8, level: 'Staff Engineer', salary: 3500000, skills: ['Technical Strategy', 'Cross-team', 'Innovation'] }
      ],
      marketDemand: 82,
      growthRate: 18,
      nextSkills: ['Go', 'Rust', 'Event Streaming', 'Distributed Systems']
    },
    devops: {
      title: 'DevOps Engineer',
      description: 'Infrastructure automation and deployment pipeline specialist',
      progression: [
        { year: 0, level: 'Junior DevOps', salary: 600000, skills: ['Linux', 'Git', 'CI/CD', 'Docker'] },
        { year: 2, level: 'Mid DevOps', salary: 1100000, skills: ['Kubernetes', 'AWS', 'Terraform', 'Monitoring'] },
        { year: 4, level: 'Senior DevOps', salary: 1800000, skills: ['Infrastructure as Code', 'Security', 'Automation'] },
        { year: 6, level: 'DevOps Architect', salary: 2700000, skills: ['Cloud Architecture', 'Cost Optimization', 'Compliance'] },
        { year: 8, level: 'Platform Engineer', salary: 3800000, skills: ['Platform Strategy', 'Developer Experience', 'Innovation'] }
      ],
      marketDemand: 88,
      growthRate: 22,
      nextSkills: ['Service Mesh', 'GitOps', 'Observability', 'Security']
    },
    ml: {
      title: 'ML Engineer',
      description: 'Machine learning and AI systems development specialist',
      progression: [
        { year: 0, level: 'Junior ML', salary: 700000, skills: ['Python', 'Pandas', 'Scikit-learn', 'Statistics'] },
        { year: 2, level: 'Mid ML', salary: 1200000, skills: ['TensorFlow', 'PyTorch', 'MLOps', 'Feature Engineering'] },
        { year: 4, level: 'Senior ML', salary: 2000000, skills: ['Deep Learning', 'Model Optimization', 'A/B Testing'] },
        { year: 6, level: 'ML Architect', salary: 3000000, skills: ['AI Strategy', 'Research', 'Team Leadership'] },
        { year: 8, level: 'AI Research Lead', salary: 4200000, skills: ['Research Direction', 'Publications', 'Innovation'] }
      ],
      marketDemand: 92,
      growthRate: 28,
      nextSkills: ['LLMs', 'Computer Vision', 'NLP', 'Reinforcement Learning']
    }
  };

  const cities = [
    { name: 'Bangalore', multiplier: 1.2, description: 'Tech Hub' },
    { name: 'Mumbai', multiplier: 1.15, description: 'Financial Center' },
    { name: 'Delhi NCR', multiplier: 1.1, description: 'Corporate Hub' },
    { name: 'Hyderabad', multiplier: 1.08, description: 'IT City' },
    { name: 'Pune', multiplier: 1.05, description: 'Manufacturing + IT' },
    { name: 'Chennai', multiplier: 1.0, description: 'South India Hub' }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  const currentPath = careerPaths[selectedPath];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-success/5 to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">AI Career Path Predictor</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ML-powered career progression insights with salary projections and skill recommendations
          </p>
        </div>

        {/* Career Path Selection */}
        <div className="mb-12">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Choose Your Career Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(careerPaths).map(([key, path]) => (
                  <Button
                    key={key}
                    variant={selectedPath === key ? "default" : "outline"}
                    onClick={() => setSelectedPath(key)}
                    className="h-auto p-4 flex flex-col items-start gap-2"
                  >
                    <span className="font-semibold">{path.title}</span>
                    <span className="text-xs text-left opacity-80">{path.description}</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">+{path.growthRate}% growth</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Progression Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                {currentPath.title} Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={currentPath.progression}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    tickFormatter={(value) => `${value} years`}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Salary']}
                    labelFormatter={(label) => `Experience: ${label} years`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="salary" 
                    stroke="hsl(var(--success))"
                    fill="hsl(var(--success))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                City Impact on Salary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cities.map((city) => {
                  const adjustedSalary = currentPath.progression[2].salary * city.multiplier;
                  return (
                    <div key={city.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-accent"></div>
                        <div>
                          <p className="font-medium">{city.name}</p>
                          <p className="text-sm text-muted-foreground">{city.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(adjustedSalary)}</p>
                        <p className="text-xs text-muted-foreground">{((city.multiplier - 1) * 100).toFixed(0)}% premium</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progression Timeline */}
        <Card className="bg-white/90 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Career Progression Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentPath.progression.map((stage, index) => (
                <div key={stage.year} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {stage.year}
                    </div>
                    {index < currentPath.progression.length - 1 && (
                      <div className="w-0.5 h-12 bg-primary/30 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{stage.level}</h3>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {formatCurrency(stage.salary)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-0">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {currentPath.marketDemand}%
              </div>
              <div className="text-sm text-muted-foreground">Market Demand</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/10 to-accent/10 border-0">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">
                +{currentPath.growthRate}%
              </div>
              <div className="text-sm text-muted-foreground">Annual Growth Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-0">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                {currentPath.nextSkills.length}
              </div>
              <div className="text-sm text-muted-foreground">Recommended Next Skills</div>
            </CardContent>
          </Card>
        </div>

        {/* Next Skills Recommendations */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border-0">
          <CardHeader>
            <CardTitle className="text-center">Recommended Next Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-3">
              {currentPath.nextSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-4 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CareerPathPredictor;
