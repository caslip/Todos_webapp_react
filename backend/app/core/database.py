"""
数据库连接配置
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# 数据库URL配置
# 使用SQLite数据库，数据库文件位于项目根目录下的todos.db
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todos.db")

# 创建数据库引擎
# connect_args用于SQLite连接配置，检查_same_thread=False允许多线程访问
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 创建Base类，用于SQLAlchemy模型继承
Base = declarative_base()

# 依赖注入函数，用于获取数据库会话
def get_db():
    """
    获取数据库会话的依赖函数
    用于FastAPI的依赖注入系统
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
