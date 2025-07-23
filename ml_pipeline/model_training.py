
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib
import os
from datetime import datetime

class ModelTrainer:
    def __init__(self):
        self.models = {}
        self.best_model = None
        self.best_score = -np.inf
        self.training_history = []
        
    def initialize_models(self):
        """Initialize different ML models"""
        self.models = {
            'linear_regression': LinearRegression(),
            'ridge_regression': Ridge(alpha=1.0),
            'lasso_regression': Lasso(alpha=1.0),
            'random_forest': RandomForestRegressor(
                n_estimators=100,
                max_depth=15,
                random_state=42,
                n_jobs=-1
            ),
            'gradient_boosting': GradientBoostingRegressor(
                n_estimators=100,
                learning_rate=0.1,
                max_depth=6,
                random_state=42
            ),
            'support_vector': SVR(kernel='rbf', C=100, gamma='scale')
        }
    
    def train_model(self, model_name, X_train, y_train, X_test, y_test):
        """Train a specific model and return performance metrics"""
        print(f"Training {model_name}...")
        
        model = self.models[model_name]
        
        # Train the model
        start_time = datetime.now()
        model.fit(X_train, y_train)
        training_time = (datetime.now() - start_time).total_seconds()
        
        # Make predictions
        y_pred_train = model.predict(X_train)
        y_pred_test = model.predict(X_test)
        
        # Calculate metrics
        train_r2 = r2_score(y_train, y_pred_train)
        test_r2 = r2_score(y_test, y_pred_test)
        train_rmse = np.sqrt(mean_squared_error(y_train, y_pred_train))
        test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
        train_mae = mean_absolute_error(y_train, y_pred_train)
        test_mae = mean_absolute_error(y_test, y_pred_test)
        
        metrics = {
            'model_name': model_name,
            'train_r2': train_r2,
            'test_r2': test_r2,
            'train_rmse': train_rmse,
            'test_rmse': test_rmse,
            'train_mae': train_mae,
            'test_mae': test_mae,
            'training_time': training_time,
            'timestamp': datetime.now().isoformat()
        }
        
        self.training_history.append(metrics)
        
        # Check if this is the best model
        if test_r2 > self.best_score:
            self.best_score = test_r2
            self.best_model = model_name
            self.save_model(model, model_name)
        
        print(f"{model_name} - Test R²: {test_r2:.4f}, Test RMSE: {test_rmse:.2f}")
        
        return model, metrics
    
    def train_all_models(self, X_train, y_train, X_test, y_test):
        """Train all models and compare performance"""
        self.initialize_models()
        
        results = {}
        
        for model_name in self.models.keys():
            try:
                model, metrics = self.train_model(model_name, X_train, y_train, X_test, y_test)
                results[model_name] = {
                    'model': model,
                    'metrics': metrics
                }
            except Exception as e:
                print(f"Error training {model_name}: {e}")
                continue
        
        return results
    
    def save_model(self, model, model_name, model_dir='models'):
        """Save trained model"""
        os.makedirs(model_dir, exist_ok=True)
        model_path = f'{model_dir}/{model_name}_model.pkl'
        joblib.dump(model, model_path)
        print(f"Model saved: {model_path}")
    
    def save_training_history(self, model_dir='models'):
        """Save training history"""
        os.makedirs(model_dir, exist_ok=True)
        history_df = pd.DataFrame(self.training_history)
        history_df.to_csv(f'{model_dir}/training_history.csv', index=False)
        
        # Save best model info
        best_model_info = {
            'best_model': self.best_model,
            'best_score': self.best_score,
            'timestamp': datetime.now().isoformat()
        }
        joblib.dump(best_model_info, f'{model_dir}/best_model_info.pkl')
    
    def load_model(self, model_name, model_dir='models'):
        """Load a trained model"""
        model_path = f'{model_dir}/{model_name}_model.pkl'
        return joblib.load(model_path)
    
    def get_feature_importance(self, model_name):
        """Get feature importance for tree-based models"""
        if model_name in ['random_forest', 'gradient_boosting']:
            model = self.models[model_name]
            if hasattr(model, 'feature_importances_'):
                return model.feature_importances_
        return None

def load_processed_data():
    """Load processed training data"""
    try:
        X_train = pd.read_csv('data/X_train_processed.csv').values
        X_test = pd.read_csv('data/X_test_processed.csv').values
        y_train = pd.read_csv('data/y_train.csv').values.ravel()
        y_test = pd.read_csv('data/y_test.csv').values.ravel()
        return X_train, X_test, y_train, y_test
    except Exception as e:
        print(f"Error loading processed data: {e}")
        return None, None, None, None

def main():
    # Load processed data
    X_train, X_test, y_train, y_test = load_processed_data()
    
    if X_train is not None:
        # Initialize trainer
        trainer = ModelTrainer()
        
        # Train all models
        results = trainer.train_all_models(X_train, y_train, X_test, y_test)
        
        # Save training history
        trainer.save_training_history()
        
        # Print summary
        print("\n" + "="*50)
        print("TRAINING SUMMARY")
        print("="*50)
        print(f"Best Model: {trainer.best_model}")
        print(f"Best R² Score: {trainer.best_score:.4f}")
        
        # Display all results
        for model_name, result in results.items():
            metrics = result['metrics']
            print(f"\n{model_name.upper()}")
            print(f"  Test R²: {metrics['test_r2']:.4f}")
            print(f"  Test RMSE: {metrics['test_rmse']:.2f}")
            print(f"  Test MAE: {metrics['test_mae']:.2f}")
            print(f"  Training Time: {metrics['training_time']:.2f}s")
        
        print("\nModel training completed successfully!")
    else:
        print("Please run data_processing.py first to prepare the data.")

if __name__ == "__main__":
    main()
