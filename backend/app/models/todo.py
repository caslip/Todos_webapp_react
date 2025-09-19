"""
待办事项数据模型
"""
from sqlalchemy import Column, Integer, Text, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base


class Todo(Base):
    """
    待办事项数据模型
    对应数据库中的todos表
    """
    __tablename__ = "todos"
    
    # 主键ID
    id = Column(Integer, primary_key=True, index=True)
    # 任务标题，必填字段
    title = Column(Text, nullable=False)
    # 任务描述，可选字段
    description = Column(Text, nullable=True)
    # 是否完成，默认为False
    completed = Column(Boolean, default=False)
    # 创建时间，默认为当前时间
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    # 更新时间，默认为当前时间，更新时自动更新
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
