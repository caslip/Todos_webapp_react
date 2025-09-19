"""
待办事项CRUD操作
"""
from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List, Optional
from app.models.todo import Todo
from app.schemas.todo import TodoCreate, TodoUpdate


class TodoCRUD:
    """
    待办事项CRUD操作类
    提供创建、读取、更新、删除待办事项的方法
    """
    
    def create_todo(self, db: Session, todo: TodoCreate) -> Todo:
        """
        创建新的待办事项
        
        Args:
            db: 数据库会话
            todo: 待创建的待办事项数据
            
        Returns:
            Todo: 创建成功的待办事项对象
        """
        db_todo = Todo(**todo.dict())
        db.add(db_todo)
        db.commit()
        db.refresh(db_todo)
        return db_todo
    
    def get_todo(self, db: Session, todo_id: int) -> Optional[Todo]:
        """
        获取单个待办事项
        
        Args:
            db: 数据库会话
            todo_id: 待办事项ID
            
        Returns:
            Optional[Todo]: 找到的待办事项对象，未找到则返回None
        """
        return db.query(Todo).filter(Todo.id == todo_id).first()
    
    def get_todos(self, db: Session, skip: int = 0, limit: int = 100) -> List[Todo]:
        """
        获取待办事项列表
        
        Args:
            db: 数据库会话
            skip: 跳过的记录数，用于分页
            limit: 返回的记录数限制
            
        Returns:
            List[Todo]: 待办事项列表
        """
        return db.query(Todo).offset(skip).limit(limit).all()
    
    def get_active_todos(self, db: Session, skip: int = 0, limit: int = 100) -> List[Todo]:
        """
        获取未完成的待办事项
        
        Args:
            db: 数据库会话
            skip: 跳过的记录数，用于分页
            limit: 返回的记录数限制
            
        Returns:
            List[Todo]: 未完成的待办事项列表
        """
        return db.query(Todo).filter(Todo.completed == False).offset(skip).limit(limit).all()
    
    def get_completed_todos(self, db: Session, skip: int = 0, limit: int = 100) -> List[Todo]:
        """
        获取已完成的待办事项
        
        Args:
            db: 数据库会话
            skip: 跳过的记录数，用于分页
            limit: 返回的记录数限制
            
        Returns:
            List[Todo]: 已完成的待办事项列表
        """
        return db.query(Todo).filter(Todo.completed == True).offset(skip).limit(limit).all()
    
    def update_todo(self, db: Session, todo_id: int, todo: TodoUpdate) -> Optional[Todo]:
        """
        更新待办事项
        
        Args:
            db: 数据库会话
            todo_id: 待办事项ID
            todo: 更新的待办事项数据
            
        Returns:
            Optional[Todo]: 更新后的待办事项对象，未找到则返回None
        """
        db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
        if db_todo:
            update_data = todo.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_todo, key, value)
            db.commit()
            db.refresh(db_todo)
        return db_todo
    
    def delete_todo(self, db: Session, todo_id: int) -> bool:
        """
        删除待办事项
        
        Args:
            db: 数据库会话
            todo_id: 待办事项ID
            
        Returns:
            bool: 删除成功返回True，未找到返回False
        """
        db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
        if db_todo:
            db.delete(db_todo)
            db.commit()
            return True
        return False
    
    def delete_completed_todos(self, db: Session) -> int:
        """
        删除所有已完成的待办事项
        
        Args:
            db: 数据库会话
            
        Returns:
            int: 删除的记录数
        """
        deleted_count = db.query(Todo).filter(Todo.completed == True).count()
        db.query(Todo).filter(Todo.completed == True).delete()
        db.commit()
        return deleted_count
    
    def delete_all_todos(self, db: Session) -> int:
        """
        删除所有待办事项
        
        Args:
            db: 数据库会话
            
        Returns:
            int: 删除的记录数
        """
        deleted_count = db.query(Todo).count()
        db.query(Todo).delete()
        db.commit()
        return deleted_count


# 创建全局CRUD实例
todo_crud = TodoCRUD()
