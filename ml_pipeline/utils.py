
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import os
import json
import logging

def setup_logging(log_level='INFO', log_file='ml_pipeline.log'):
    """Setup logging configuration"""
    logging.basicConfig(
        level=getattr(logging, log_level.upper()),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler()
        ]
    )
    return logging.getLogger(__name__)

def load_dataset(file_path, encoding='utf-8'):
    """Load dataset with error handling"""
    try:
        df = pd.read_csv(file_path, encoding=encoding)
        logger = logging.getLogger(__name__)
        logger.info(f"Dataset loaded successfully: {df.shape}")
        return df
    except FileNotFoundError:
        print(f"Error: File not found - {file_path}")
        return None
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return None

def validate_data(df, required_columns):
    """Validate dataset structure"""
    missing_columns = set(required_columns) - set(df.columns)
    if missing_columns:
        print(f"Error: Missing required columns: {missing_columns}")
        return False
    
    # Check for empty dataframe
    if df.empty:
        print("Error: Dataset is empty")
        return False
    
    return True

def detect_outliers(df, column, method='iqr', threshold=1.5):
    """Detect outliers using IQR or Z-score method"""
    if method == 'iqr':
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - threshold * IQR
        upper_bound = Q3 + threshold * IQR
        outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    
    elif method == 'zscore':
        z_scores = np.abs((df[column] - df[column].mean()) / df[column].std())
        outliers = df[z_scores > threshold]
    
    else:
        raise ValueError("Method must be 'iqr' or 'zscore'")
    
    return outliers

def remove_outliers(df, column, method='iqr', threshold=1.5):
    """Remove outliers from dataset"""
    outliers = detect_outliers(df, column, method, threshold)
    cleaned_df = df.drop(outliers.index)
    
    print(f"Removed {len(outliers)} outliers from {column}")
    print(f"Dataset shape: {df.shape} -> {cleaned_df.shape}")
    
    return cleaned_df

def create_salary_bins(df, salary_column='salary', bins=5):
    """Create salary bins for analysis"""
    df['salary_bin'] = pd.cut(df[salary_column], bins=bins, labels=[
        'Low', 'Medium-Low', 'Medium', 'Medium-High', 'High'
    ])
    return df

def format_currency(amount, currency='INR'):
    """Format currency amounts"""
    if currency == 'INR':
        if amount >= 10000000:  # 1 Crore
            return f"₹{amount/10000000:.1f}Cr"
        elif amount >= 100000:  # 1 Lakh
            return f"₹{amount/100000:.1f}L"
        else:
            return f"₹{amount:,.0f}"
    else:
        return f"${amount:,.0f}"

def calculate_statistics(df, column):
    """Calculate comprehensive statistics for a column"""
    stats = {
        'count': df[column].count(),
        'mean': df[column].mean(),
        'median': df[column].median(),
        'std': df[column].std(),
        'min': df[column].min(),
        'max': df[column].max(),
        'q1': df[column].quantile(0.25),
        'q3': df[column].quantile(0.75),
        'iqr': df[column].quantile(0.75) - df[column].quantile(0.25),
        'skewness': df[column].skew(),
        'kurtosis': df[column].kurtosis()
    }
    return stats

def plot_distribution(df, column, title=None, figsize=(10, 6)):
    """Plot distribution of a numerical column"""
    plt.figure(figsize=figsize)
    
    # Create subplots
    fig, axes = plt.subplots(1, 2, figsize=figsize)
    
    # Histogram
    axes[0].hist(df[column], bins=30, alpha=0.7, color='skyblue', edgecolor='black')
    axes[0].set_xlabel(column)
    axes[0].set_ylabel('Frequency')
    axes[0].set_title(f'Distribution of {column}')
    axes[0].grid(True, alpha=0.3)
    
    # Box plot
    axes[1].boxplot(df[column])
    axes[1].set_ylabel(column)
    axes[1].set_title(f'Box Plot of {column}')
    axes[1].grid(True, alpha=0.3)
    
    if title:
        fig.suptitle(title, fontsize=16)
    
    plt.tight_layout()
    plt.show()

def plot_correlation_matrix(df, figsize=(12, 8)):
    """Plot correlation matrix for numerical columns"""
    numerical_cols = df.select_dtypes(include=[np.number]).columns
    
    plt.figure(figsize=figsize)
    correlation_matrix = df[numerical_cols].corr()
    
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0,
                square=True, fmt='.2f', cbar_kws={'shrink': 0.8})
    
    plt.title('Correlation Matrix')
    plt.tight_layout()
    plt.show()

def save_model_artifacts(model, model_name, metrics, model_dir='models'):
    """Save model and its artifacts"""
    import joblib
    
    os.makedirs(model_dir, exist_ok=True)
    
    # Save model
    model_path = f'{model_dir}/{model_name}_model.pkl'
    joblib.dump(model, model_path)
    
    # Save metrics
    metrics_path = f'{model_dir}/{model_name}_metrics.json'
    with open(metrics_path, 'w') as f:
        json.dump(metrics, f, indent=2)
    
    # Save timestamp
    timestamp_path = f'{model_dir}/{model_name}_timestamp.txt'
    with open(timestamp_path, 'w') as f:
        f.write(datetime.now().isoformat())
    
    print(f"Model artifacts saved in {model_dir}")

def load_model_artifacts(model_name, model_dir='models'):
    """Load model and its artifacts"""
    import joblib
    
    try:
        # Load model
        model_path = f'{model_dir}/{model_name}_model.pkl'
        model = joblib.load(model_path)
        
        # Load metrics
        metrics_path = f'{model_dir}/{model_name}_metrics.json'
        with open(metrics_path, 'r') as f:
            metrics = json.load(f)
        
        # Load timestamp
        timestamp_path = f'{model_dir}/{model_name}_timestamp.txt'
        with open(timestamp_path, 'r') as f:
            timestamp = f.read().strip()
        
        return model, metrics, timestamp
    
    except Exception as e:
        print(f"Error loading model artifacts: {e}")
        return None, None, None

def generate_prediction_report(y_true, y_pred, model_name):
    """Generate prediction report"""
    from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
    
    # Calculate metrics
    r2 = r2_score(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    mae = mean_absolute_error(y_true, y_pred)
    mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100
    
    # Create report
    report = f"""
# Prediction Report: {model_name}

## Model Performance Metrics
- **R² Score**: {r2:.4f}
- **RMSE**: {format_currency(rmse)}
- **MAE**: {format_currency(mae)}
- **MAPE**: {mape:.2f}%

## Model Interpretation
"""
    
    if r2 >= 0.9:
        report += "- **Excellent**: Model shows outstanding predictive performance\n"
    elif r2 >= 0.8:
        report += "- **Very Good**: Model shows strong predictive performance\n"
    elif r2 >= 0.7:
        report += "- **Good**: Model shows acceptable predictive performance\n"
    elif r2 >= 0.6:
        report += "- **Fair**: Model shows moderate predictive performance\n"
    else:
        report += "- **Poor**: Model needs significant improvement\n"
    
    report += f"\n## Report Generated
{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
    
    return report

def create_feature_importance_plot(model, feature_names, model_name, top_n=10):
    """Create feature importance plot"""
    if hasattr(model, 'feature_importances_'):
        importance = model.feature_importances_
        
        # Create dataframe
        importance_df = pd.DataFrame({
            'feature': feature_names,
            'importance': importance
        }).sort_values('importance', ascending=False).head(top_n)
        
        # Plot
        plt.figure(figsize=(10, 6))
        sns.barplot(data=importance_df, x='importance', y='feature', palette='viridis')
        plt.title(f'Top {top_n} Feature Importance - {model_name}')
        plt.xlabel('Importance')
        plt.ylabel('Features')
        plt.tight_layout()
        plt.show()
        
        return importance_df
    else:
        print(f"Model {model_name} does not have feature_importances_ attribute")
        return None

def validate_input_data(input_data, required_fields):
    """Validate input data for predictions"""
    errors = []
    
    # Check required fields
    for field in required_fields:
        if field not in input_data:
            errors.append(f"Missing required field: {field}")
    
    # Check data types and ranges
    if 'experience_years' in input_data:
        if not isinstance(input_data['experience_years'], (int, float)) or input_data['experience_years'] < 0:
            errors.append("experience_years must be a non-negative number")
    
    if 'remote_ratio' in input_data:
        if not isinstance(input_data['remote_ratio'], (int, float)) or not (0 <= input_data['remote_ratio'] <= 100):
            errors.append("remote_ratio must be between 0 and 100")
    
    return errors

def create_directory_structure():
    """Create necessary directory structure"""
    directories = [
        'data',
        'models',
        'logs',
        'reports',
        'visualizations'
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
    
    print("Directory structure created successfully")

# Initialize logging
logger = setup_logging()
