
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Database, Cpu, CheckCircle, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MLModelDashboard: React.FC = () => {
  // Mock ML model performance data
  const modelMetrics = {
    r2Score: 0.84,
    mse: 131076370.20,
    mae: 89245.67,
    rmse: 11445.42,
    trainingSize: 45000,
    validationSize: 15000,
    algorithm: 'Random Forest Regressor',
    features: 23,
    lastUpdated: '2024-01-15'
  };

  // Mock feature importance data
  const featureImportance = [
    { feature: 'Experience Years', importance: 0.32 },
    { feature: 'Technical Skills', importance: 0.24 },
    { feature: 'Company Size', importance: 0.18 },
    { feature: 'Location', importance: 0.12 },
    { feature: 'Education Level', importance: 0.08 },
    { feature: 'Industry', importance: 0.06 }
  ];

  // Mock actual vs predicted data
  const actualVsPredicted = [
    { actual: 450000, predicted: 465000, experience: 2 },
    { actual: 780000, predicted: 755000, experience: 4 },
    { actual: 1200000, predicted: 1180000, experience: 6 },
    { actual: 1800000, predicted: 1750000, experience: 8 },
    { actual: 2500000, predicted: 2450000, experience: 10 },
    { actual: 3200000, predicted: 3150000, experience: 12 }
  ];

  // Mock residuals data
  const residuals = [
    { predicted: 400000, residual: 15000 },
    { predicted: 600000, residual: -25000 },
    { predicted: 800000, residual: 20000 },
    { predicted: 1000000, residual: -18000 },
    { predicted: 1200000, residual: 22000 },
    { predicted: 1400000, residual: -15000 },
    { predicted: 1600000, residual: 12000 },
    { predicted: 1800000, residual: -20000 }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">ML Model Performance Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into our machine learning model's performance and accuracy metrics
          </p>
        </div>

        {/* Model Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">R² Score</p>
                  <p className="text-2xl font-bold text-primary">{modelMetrics.r2Score}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">Excellent</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">RMSE</p>
                  <p className="text-2xl font-bold text-accent">{formatCurrency(modelMetrics.rmse)}</p>
                </div>
                <Database className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">Low Error</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Training Size</p>
                  <p className="text-2xl font-bold text-success">{modelMetrics.trainingSize.toLocaleString()}</p>
                </div>
                <Cpu className="h-8 w-8 text-success" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">Robust Dataset</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Algorithm</p>
                  <p className="text-lg font-bold text-purple-600">Random Forest</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">Ensemble Method</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Feature Importance Chart */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Feature Importance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featureImportance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 0.35]} />
                  <YAxis dataKey="feature" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Importance']} />
                  <Bar dataKey="importance" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Actual vs Predicted Chart */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Actual vs Predicted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={actualVsPredicted}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="actual" 
                    type="number" 
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={formatCurrency}
                  />
                  <YAxis 
                    dataKey="predicted" 
                    type="number" 
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip 
                    formatter={(value, name) => [formatCurrency(Number(value)), name === 'predicted' ? 'Predicted' : 'Actual']}
                  />
                  <Scatter name="Predictions" dataKey="predicted" fill="hsl(var(--accent))" />
                  <Line dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Residuals Distribution */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-success" />
                Residuals Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={residuals}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="predicted" 
                    tickFormatter={formatCurrency}
                  />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Residual']}
                    labelFormatter={(label) => `Predicted: ${formatCurrency(label)}`}
                  />
                  <Bar dataKey="residual" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Model Timeline */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-600" />
                Model Training Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <div>
                    <p className="font-medium">Data Collection & Preprocessing</p>
                    <p className="text-sm text-muted-foreground">60,000 salary records from Indian companies</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <div>
                    <p className="font-medium">Feature Engineering</p>
                    <p className="text-sm text-muted-foreground">23 features extracted and normalized</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <div>
                    <p className="font-medium">Model Training & Validation</p>
                    <p className="text-sm text-muted-foreground">Cross-validation with 5-fold technique</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                  <div>
                    <p className="font-medium">Production Deployment</p>
                    <p className="text-sm text-muted-foreground">Real-time prediction API with 99.9% uptime</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Specifications */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0">
          <CardHeader>
            <CardTitle className="text-center">Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h4 className="font-semibold mb-4">Model Architecture</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Algorithm:</span>
                    <span className="font-medium">Random Forest</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimators:</span>
                    <span className="font-medium">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Depth:</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Features:</span>
                    <span className="font-medium">23</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-4">Performance Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>R² Score:</span>
                    <span className="font-medium text-primary">0.84</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RMSE:</span>
                    <span className="font-medium">{formatCurrency(modelMetrics.rmse)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MAE:</span>
                    <span className="font-medium">{formatCurrency(modelMetrics.mae)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-medium text-success">94%</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-4">Data Pipeline</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Training Set:</span>
                    <span className="font-medium">45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Validation Set:</span>
                    <span className="font-medium">15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span className="font-medium">Jan 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Update Frequency:</span>
                    <span className="font-medium">Weekly</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MLModelDashboard;
