"""
应用配置
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    应用配置类
    使用环境变量来配置应用
    """
    # 应用配置
    app_name: str = "待办事项应用"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # 数据库配置
    database_url: str = "sqlite:///./todos.db"
    
    # CORS配置
    backend_cors_origins: list = ["http://localhost:3000", "http://localhost:8000"]
    
    # API配置
    api_prefix: str = "/api/v1"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# 创建全局配置实例
settings = Settings()
