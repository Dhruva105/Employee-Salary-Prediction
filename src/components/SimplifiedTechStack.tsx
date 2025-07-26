import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code2 } from 'lucide-react';

const SimplifiedTechStack: React.FC = () => {
  const techStack = [
    { name: 'Python', icon: '🐍', description: 'Machine Learning & Data Processing' },
    { name: 'React', icon: '⚛️', description: 'Frontend User Interface' },
    { name: 'Scikit-learn', icon: '🤖', description: 'ML Model Training' },
    { name: 'Pandas', icon: '🐼', description: 'Data Manipulation' },
    { name: 'TypeScript', icon: '📘', description: 'Type-safe Development' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Responsive Styling' }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Technologies Used</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with modern technologies for both frontend and machine learning
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {techStack.map((tech, index) => (
            <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Code Sample */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Model Training Code Sample
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-card rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">
{`# Training the Random Forest model
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    features, target, test_size=0.2, random_state=42
)

# Train the model
model = RandomForestRegressor(
    n_estimators=100, 
    max_depth=15, 
    random_state=42
)
model.fit(X_train, y_train)

# Model accuracy: 84%`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            View Full Code on GitHub
          </Button>
          <Button variant="outline" size="lg" className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Project Documentation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SimplifiedTechStack;