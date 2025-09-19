"""
待办事项Pydantic模式
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TodoBase(BaseModel):
    """
    待办事项基础模式
    包含创建和更新待办事项时需要的字段
    """
    title: str
    description: Optional[str] = None
    completed: bool = False


class TodoCreate(TodoBase):
    """
    创建待办事项模式
    继承自TodoBase，用于创建新待办事项
    """
    pass


class TodoUpdate(BaseModel):
    """
    更新待办事项模式
    用于更新现有待办事项
    """
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


class TodoResponse(TodoBase):
    """
    待办事项响应模式
    继承自TodoBase，用于API响应，包含数据库字段
    """
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        """
        配置选项
        允许从ORM模型中读取数据
        """
        orm_mode = True
