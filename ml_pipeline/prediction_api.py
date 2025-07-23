
from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from datetime import datetime
import os

app = Flask(__name__)

class SalaryPredictor:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.label_encoders = {}
        self.feature_columns = []
        self.model_info = {}
        
    def load_model(self, model_name='random_forest'):
        """Load trained model and preprocessors"""
        try:
            # Load model
            self.model = joblib.load(f'models/{model_name}_model.pkl')
            
            # Load preprocessors
            self.scaler = joblib.load('models/scaler.pkl')
            self.label_encoders = joblib.load('models/label_encoders.pkl')
            self.feature_columns = joblib.load('models/feature_columns.pkl')
            
            # Load model info
            self.model_info = joblib.load('models/best_model_info.pkl')
            
            print(f"Model {model_name} loaded successfully!")
            return True
        except Exception as e:
            print(f"Error loading model: {e}")
            return False
    
    def preprocess_input(self, input_data):
        """Preprocess input data for prediction"""
        try:
            # Create DataFrame from input
            df = pd.DataFrame([input_data])
            
            # Encode categorical variables
            for col, encoder in self.label_encoders.items():
                if col in df.columns:
                    # Handle unknown categories
                    try:
                        df[col] = encoder.transform(df[col])
                    except ValueError:
                        # Use most frequent class for unknown categories
                        df[col] = encoder.transform([encoder.classes_[0]])
            
            # Select and reorder features
            df = df[self.feature_columns]
            
            # Scale features
            scaled_features = self.scaler.transform(df)
            
            return scaled_features
        except Exception as e:
            print(f"Error preprocessing input: {e}")
            return None
    
    def predict_salary(self, input_data):
        """Make salary prediction"""
        if self.model is None:
            return None, "Model not loaded"
        
        # Preprocess input
        processed_input = self.preprocess_input(input_data)
        
        if processed_input is None:
            return None, "Error preprocessing input"
        
        try:
            # Make prediction
            prediction = self.model.predict(processed_input)[0]
            
            # Get confidence interval (for tree-based models)
            confidence_interval = None
            if hasattr(self.model, 'estimators_'):
                predictions = [tree.predict(processed_input)[0] for tree in self.model.estimators_]
                std_dev = np.std(predictions)
                confidence_interval = {
                    'lower': prediction - 1.96 * std_dev,
                    'upper': prediction + 1.96 * std_dev
                }
            
            return {
                'predicted_salary': float(prediction),
                'confidence_interval': confidence_interval,
                'model_used': self.model_info.get('best_model', 'unknown'),
                'model_accuracy': self.model_info.get('best_score', 0),
                'prediction_timestamp': datetime.now().isoformat()
            }, None
            
        except Exception as e:
            return None, f"Error making prediction: {e}"

# Initialize predictor
predictor = SalaryPredictor()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'model_loaded': predictor.model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Salary prediction endpoint"""
    try:
        # Get input data
        input_data = request.json
        
        # Validate required fields
        required_fields = ['experience_years', 'education_level', 'company_size', 
                          'employment_type', 'remote_ratio', 'work_year']
        
        for field in required_fields:
            if field not in input_data:
                return jsonify({
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Make prediction
        result, error = predictor.predict_salary(input_data)
        
        if error:
            return jsonify({'error': error}), 500
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get model information"""
    return jsonify({
        'model_info': predictor.model_info,
        'feature_columns': predictor.feature_columns,
        'available_encoders': list(predictor.label_encoders.keys()),
        'model_loaded': predictor.model is not None
    })

@app.route('/predict-batch', methods=['POST'])
def predict_batch():
    """Batch prediction endpoint"""
    try:
        # Get input data
        input_data = request.json
        
        if not isinstance(input_data, list):
            return jsonify({'error': 'Input must be a list of records'}), 400
        
        results = []
        for record in input_data:
            result, error = predictor.predict_salary(record)
            if error:
                results.append({'error': error})
            else:
                results.append(result)
        
        return jsonify({'predictions': results})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def main():
    # Load model
    if predictor.load_model():
        print("Starting Flask API server...")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("Failed to load model. Please train the model first.")

if __name__ == '__main__':
    main()
