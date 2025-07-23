
import os
from dataclasses import dataclass
from typing import Dict, List, Any

@dataclass
class ModelConfig:
    """Configuration for ML models"""
    # Random Forest Configuration
    random_forest_params: Dict[str, Any] = None
    
    # Gradient Boosting Configuration
    gradient_boosting_params: Dict[str, Any] = None
    
    # Linear Models Configuration
    linear_models_params: Dict[str, Any] = None
    
    # Data Processing Configuration
    test_size: float = 0.2
    random_state: int = 42
    
    def __post_init__(self):
        if self.random_forest_params is None:
            self.random_forest_params = {
                'n_estimators': 100,
                'max_depth': 15,
                'min_samples_split': 2,
                'min_samples_leaf': 1,
                'random_state': self.random_state,
                'n_jobs': -1
            }
        
        if self.gradient_boosting_params is None:
            self.gradient_boosting_params = {
                'n_estimators': 100,
                'learning_rate': 0.1,
                'max_depth': 6,
                'random_state': self.random_state
            }
        
        if self.linear_models_params is None:
            self.linear_models_params = {
                'ridge_alpha': 1.0,
                'lasso_alpha': 1.0
            }

@dataclass
class DataConfig:
    """Configuration for data processing"""
    # File paths
    raw_data_path: str = 'data/salary_dataset.csv'
    processed_data_dir: str = 'data'
    models_dir: str = 'models'
    
    # Feature columns
    categorical_features: List[str] = None
    numerical_features: List[str] = None
    target_column: str = 'salary'
    
    # Data cleaning parameters
    outlier_method: str = 'iqr'  # 'iqr' or 'zscore'
    outlier_threshold: float = 1.5
    
    def __post_init__(self):
        if self.categorical_features is None:
            self.categorical_features = [
                'company_name', 'job_title', 'job_location', 
                'education_level', 'company_size', 'employment_type'
            ]
        
        if self.numerical_features is None:
            self.numerical_features = [
                'experience_years', 'remote_ratio', 'work_year'
            ]

@dataclass
class APIConfig:
    """Configuration for API server"""
    host: str = '0.0.0.0'
    port: int = 5000
    debug: bool = True
    
    # Model settings
    default_model: str = 'random_forest'
    model_dir: str = 'models'
    
    # API rate limiting
    rate_limit: str = '100/hour'
    
    # Logging
    log_level: str = 'INFO'
    log_file: str = 'api.log'

class Config:
    """Main configuration class"""
    
    def __init__(self):
        self.model = ModelConfig()
        self.data = DataConfig()
        self.api = APIConfig()
        
        # Environment variables
        self.load_env_variables()
    
    def load_env_variables(self):
        """Load configuration from environment variables"""
        # Data paths
        self.data.raw_data_path = os.getenv('RAW_DATA_PATH', self.data.raw_data_path)
        self.data.models_dir = os.getenv('MODELS_DIR', self.data.models_dir)
        
        # API settings
        self.api.host = os.getenv('API_HOST', self.api.host)
        self.api.port = int(os.getenv('API_PORT', self.api.port))
        self.api.debug = os.getenv('API_DEBUG', 'True').lower() == 'true'
        
        # Model settings
        self.api.default_model = os.getenv('DEFAULT_MODEL', self.api.default_model)
    
    def get_model_params(self, model_name: str) -> Dict[str, Any]:
        """Get parameters for a specific model"""
        param_map = {
            'random_forest': self.model.random_forest_params,
            'gradient_boosting': self.model.gradient_boosting_params,
            'linear_models': self.model.linear_models_params
        }
        return param_map.get(model_name, {})
    
    def create_directories(self):
        """Create necessary directories"""
        directories = [
            self.data.processed_data_dir,
            self.data.models_dir,
            'logs'
        ]
        
        for directory in directories:
            os.makedirs(directory, exist_ok=True)
    
    def validate_config(self) -> bool:
        """Validate configuration settings"""
        # Check if required files exist
        if not os.path.exists(self.data.raw_data_path):
            print(f"Warning: Raw data file not found: {self.data.raw_data_path}")
            return False
        
        # Validate model parameters
        if self.model.test_size <= 0 or self.model.test_size >= 1:
            print(f"Error: Invalid test_size: {self.model.test_size}")
            return False
        
        # Validate API settings
        if self.api.port < 1024 or self.api.port > 65535:
            print(f"Error: Invalid port number: {self.api.port}")
            return False
        
        return True

# Global configuration instance
config = Config()

# Environment-specific configurations
DEVELOPMENT_CONFIG = {
    'debug': True,
    'log_level': 'DEBUG',
    'model_validation': True
}

PRODUCTION_CONFIG = {
    'debug': False,
    'log_level': 'INFO',
    'model_validation': False
}

def get_config(environment: str = 'development') -> Config:
    """Get configuration for specific environment"""
    config_instance = Config()
    
    if environment == 'production':
        for key, value in PRODUCTION_CONFIG.items():
            if hasattr(config_instance.api, key):
                setattr(config_instance.api, key, value)
    else:
        for key, value in DEVELOPMENT_CONFIG.items():
            if hasattr(config_instance.api, key):
                setattr(config_instance.api, key, value)
    
    return config_instance
