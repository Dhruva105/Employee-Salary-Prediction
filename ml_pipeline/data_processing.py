
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler, MinMaxScaler
from sklearn.model_selection import train_test_split
import joblib
import os

class DataProcessor:
    def __init__(self):
        self.label_encoders = {}
        self.scaler = StandardScaler()
        self.feature_columns = []
        
    def load_data(self, file_path):
        """Load salary dataset from CSV file"""
        try:
            df = pd.read_csv(file_path)
            print(f"Dataset loaded successfully. Shape: {df.shape}")
            return df
        except Exception as e:
            print(f"Error loading dataset: {e}")
            return None
    
    def clean_data(self, df):
        """Clean and preprocess the dataset"""
        # Remove duplicates
        df = df.drop_duplicates()
        
        # Handle missing values
        df = df.dropna()
        
        # Remove outliers using IQR method
        Q1 = df['salary'].quantile(0.25)
        Q3 = df['salary'].quantile(0.75)
        IQR = Q3 - Q1
        df = df[~((df['salary'] < (Q1 - 1.5 * IQR)) | (df['salary'] > (Q3 + 1.5 * IQR)))]
        
        print(f"Data cleaned. Final shape: {df.shape}")
        return df
    
    def encode_categorical_features(self, df):
        """Encode categorical variables"""
        categorical_columns = ['company_name', 'job_title', 'job_location', 'education_level', 
                             'company_size', 'employment_type']
        
        for col in categorical_columns:
            if col in df.columns:
                le = LabelEncoder()
                df[col] = le.fit_transform(df[col])
                self.label_encoders[col] = le
        
        return df
    
    def create_features(self, df):
        """Create additional features"""
        # Experience categories
        df['experience_category'] = pd.cut(df['experience_years'], 
                                         bins=[0, 2, 5, 10, float('inf')], 
                                         labels=['Entry', 'Mid', 'Senior', 'Expert'])
        
        # Remote work binary
        df['is_remote'] = (df['remote_ratio'] > 0).astype(int)
        
        # Education level mapping
        education_mapping = {
            'Bachelor': 1, 'Master': 2, 'PhD': 3, 'High School': 0
        }
        
        # Company size mapping
        size_mapping = {
            'Small': 1, 'Medium': 2, 'Large': 3
        }
        
        return df
    
    def prepare_features(self, df):
        """Prepare features for model training"""
        # Select feature columns
        feature_columns = ['experience_years', 'education_level', 'remote_ratio', 
                         'company_size', 'employment_type', 'work_year', 'company_name', 
                         'job_title', 'job_location']
        
        # Filter existing columns
        self.feature_columns = [col for col in feature_columns if col in df.columns]
        
        X = df[self.feature_columns]
        y = df['salary']
        
        return X, y
    
    def scale_features(self, X_train, X_test):
        """Scale numerical features"""
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        return X_train_scaled, X_test_scaled
    
    def split_data(self, X, y, test_size=0.2, random_state=42):
        """Split data into training and testing sets"""
        return train_test_split(X, y, test_size=test_size, random_state=random_state)
    
    def save_preprocessors(self, model_dir='models'):
        """Save label encoders and scaler"""
        os.makedirs(model_dir, exist_ok=True)
        
        joblib.dump(self.label_encoders, f'{model_dir}/label_encoders.pkl')
        joblib.dump(self.scaler, f'{model_dir}/scaler.pkl')
        joblib.dump(self.feature_columns, f'{model_dir}/feature_columns.pkl')
    
    def load_preprocessors(self, model_dir='models'):
        """Load saved preprocessors"""
        self.label_encoders = joblib.load(f'{model_dir}/label_encoders.pkl')
        self.scaler = joblib.load(f'{model_dir}/scaler.pkl')
        self.feature_columns = joblib.load(f'{model_dir}/feature_columns.pkl')

def main():
    # Initialize processor
    processor = DataProcessor()
    
    # Load and process data
    df = processor.load_data('data/salary_dataset.csv')
    if df is not None:
        df = processor.clean_data(df)
        df = processor.encode_categorical_features(df)
        df = processor.create_features(df)
        
        X, y = processor.prepare_features(df)
        X_train, X_test, y_train, y_test = processor.split_data(X, y)
        
        # Scale features
        X_train_scaled, X_test_scaled = processor.scale_features(X_train, X_test)
        
        # Save processed data
        os.makedirs('data', exist_ok=True)
        pd.DataFrame(X_train_scaled).to_csv('data/X_train_processed.csv', index=False)
        pd.DataFrame(X_test_scaled).to_csv('data/X_test_processed.csv', index=False)
        pd.DataFrame(y_train).to_csv('data/y_train.csv', index=False)
        pd.DataFrame(y_test).to_csv('data/y_test.csv', index=False)
        
        # Save preprocessors
        processor.save_preprocessors()
        
        print("Data processing completed successfully!")

if __name__ == "__main__":
    main()
