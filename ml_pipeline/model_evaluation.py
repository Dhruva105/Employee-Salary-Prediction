
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib
import os
from datetime import datetime

class ModelEvaluator:
    def __init__(self):
        self.evaluation_results = {}
        self.feature_columns = []
        
    def load_model_and_data(self, model_name='random_forest'):
        """Load trained model and test data"""
        try:
            # Load model
            model = joblib.load(f'models/{model_name}_model.pkl')
            
            # Load test data
            X_test = pd.read_csv('data/X_test_processed.csv').values
            y_test = pd.read_csv('data/y_test.csv').values.ravel()
            
            # Load feature columns
            self.feature_columns = joblib.load('models/feature_columns.pkl')
            
            return model, X_test, y_test
        except Exception as e:
            print(f"Error loading model or data: {e}")
            return None, None, None
    
    def evaluate_model(self, model, X_test, y_test):
        """Comprehensive model evaluation"""
        # Make predictions
        y_pred = model.predict(X_test)
        
        # Calculate metrics
        r2 = r2_score(y_test, y_pred)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        mae = mean_absolute_error(y_test, y_pred)
        mse = mean_squared_error(y_test, y_pred)
        
        # Calculate additional metrics
        mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100
        
        # Residuals analysis
        residuals = y_test - y_pred
        residual_mean = np.mean(residuals)
        residual_std = np.std(residuals)
        
        metrics = {
            'r2_score': r2,
            'rmse': rmse,
            'mae': mae,
            'mse': mse,
            'mape': mape,
            'residual_mean': residual_mean,
            'residual_std': residual_std,
            'predictions': y_pred,
            'residuals': residuals
        }
        
        return metrics
    
    def plot_actual_vs_predicted(self, y_test, y_pred, model_name):
        """Plot actual vs predicted values"""
        plt.figure(figsize=(10, 8))
        
        # Scatter plot
        plt.scatter(y_test, y_pred, alpha=0.5, color='blue', s=30)
        
        # Perfect prediction line
        min_val = min(y_test.min(), y_pred.min())
        max_val = max(y_test.max(), y_pred.max())
        plt.plot([min_val, max_val], [min_val, max_val], 'r--', lw=2, label='Perfect Prediction')
        
        # Labels and title
        plt.xlabel('Actual Salary')
        plt.ylabel('Predicted Salary')
        plt.title(f'Actual vs Predicted Salary - {model_name}')
        plt.legend()
        plt.grid(True, alpha=0.3)
        
        # Add R² score to plot
        r2 = r2_score(y_test, y_pred)
        plt.text(0.05, 0.95, f'R² = {r2:.4f}', transform=plt.gca().transAxes, 
                bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
        
        plt.tight_layout()
        plt.savefig(f'models/{model_name}_actual_vs_predicted.png', dpi=300, bbox_inches='tight')
        plt.close()
    
    def plot_residuals(self, residuals, model_name):
        """Plot residuals distribution"""
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
        
        # Residuals distribution
        ax1.hist(residuals, bins=50, alpha=0.7, color='skyblue', edgecolor='black')
        ax1.set_xlabel('Residuals')
        ax1.set_ylabel('Frequency')
        ax1.set_title(f'Residuals Distribution - {model_name}')
        ax1.grid(True, alpha=0.3)
        
        # Q-Q plot
        from scipy import stats
        stats.probplot(residuals, dist="norm", plot=ax2)
        ax2.set_title(f'Q-Q Plot - {model_name}')
        ax2.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(f'models/{model_name}_residuals.png', dpi=300, bbox_inches='tight')
        plt.close()
    
    def plot_feature_importance(self, model, model_name):
        """Plot feature importance for tree-based models"""
        if hasattr(model, 'feature_importances_'):
            importance = model.feature_importances_
            
            # Create feature importance dataframe
            feature_importance_df = pd.DataFrame({
                'feature': self.feature_columns,
                'importance': importance
            }).sort_values('importance', ascending=False)
            
            # Plot
            plt.figure(figsize=(10, 8))
            sns.barplot(data=feature_importance_df, x='importance', y='feature', palette='viridis')
            plt.title(f'Feature Importance - {model_name}')
            plt.xlabel('Importance')
            plt.ylabel('Features')
            plt.tight_layout()
            plt.savefig(f'models/{model_name}_feature_importance.png', dpi=300, bbox_inches='tight')
            plt.close()
            
            return feature_importance_df
        
        return None
    
    def generate_evaluation_report(self, model_name, metrics, feature_importance_df=None):
        """Generate comprehensive evaluation report"""
        report = f"""
# Model Evaluation Report: {model_name}

## Performance Metrics
- **R² Score**: {metrics['r2_score']:.4f}
- **RMSE**: ${metrics['rmse']:,.2f}
- **MAE**: ${metrics['mae']:,.2f}
- **MSE**: ${metrics['mse']:,.2f}
- **MAPE**: {metrics['mape']:.2f}%

## Residuals Analysis
- **Residual Mean**: {metrics['residual_mean']:.2f}
- **Residual Std**: {metrics['residual_std']:.2f}

## Model Interpretation
"""
        
        # Add interpretation based on R² score
        if metrics['r2_score'] >= 0.8:
            report += "- **Excellent model performance** with high predictive accuracy.\n"
        elif metrics['r2_score'] >= 0.6:
            report += "- **Good model performance** with reasonable predictive accuracy.\n"
        else:
            report += "- **Moderate model performance** - consider feature engineering or different algorithms.\n"
        
        # Add feature importance if available
        if feature_importance_df is not None:
            report += "\n## Top 5 Most Important Features\n"
            for idx, row in feature_importance_df.head().iterrows():
                report += f"- **{row['feature']}**: {row['importance']:.4f}\n"
        
        report += f"\n## Evaluation Date
{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        
        # Save report
        with open(f'models/{model_name}_evaluation_report.md', 'w') as f:
            f.write(report)
        
        return report
    
    def evaluate_all_models(self):
        """Evaluate all trained models"""
        model_files = [f for f in os.listdir('models') if f.endswith('_model.pkl')]
        
        results = {}
        
        for model_file in model_files:
            model_name = model_file.replace('_model.pkl', '')
            print(f"Evaluating {model_name}...")
            
            model, X_test, y_test = self.load_model_and_data(model_name)
            
            if model is not None:
                metrics = self.evaluate_model(model, X_test, y_test)
                
                # Generate visualizations
                self.plot_actual_vs_predicted(y_test, metrics['predictions'], model_name)
                self.plot_residuals(metrics['residuals'], model_name)
                feature_importance_df = self.plot_feature_importance(model, model_name)
                
                # Generate report
                report = self.generate_evaluation_report(model_name, metrics, feature_importance_df)
                
                results[model_name] = {
                    'metrics': metrics,
                    'report': report
                }
                
                print(f"  R² Score: {metrics['r2_score']:.4f}")
                print(f"  RMSE: ${metrics['rmse']:,.2f}")
        
        return results

def main():
    evaluator = ModelEvaluator()
    
    # Evaluate all models
    results = evaluator.evaluate_all_models()
    
    # Create comparison summary
    print("\n" + "="*60)
    print("MODEL COMPARISON SUMMARY")
    print("="*60)
    
    comparison_data = []
    for model_name, result in results.items():
        metrics = result['metrics']
        comparison_data.append({
            'Model': model_name,
            'R² Score': metrics['r2_score'],
            'RMSE': metrics['rmse'],
            'MAE': metrics['mae'],
            'MAPE': metrics['mape']
        })
    
    comparison_df = pd.DataFrame(comparison_data)
    comparison_df = comparison_df.sort_values('R² Score', ascending=False)
    
    print(comparison_df.to_string(index=False))
    
    # Save comparison
    comparison_df.to_csv('models/model_comparison.csv', index=False)
    
    print(f"\nEvaluation completed! Check the 'models' directory for detailed reports and visualizations.")

if __name__ == "__main__":
    main()
