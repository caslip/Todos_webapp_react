"""
待办事项API路由
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.crud.todo import todo_crud
from app.schemas.todo import TodoCreate, TodoUpdate, TodoResponse
from app.core.database import get_db

router = APIRouter()


@router.get("/todos", response_model=List[TodoResponse])
def get_todos(
    db: Session = Depends(get_db),
    filter: str = Query("all", description="筛选条件：all全部、active未完成、completed已完成"),
    skip: int = Query(0, ge=0, description="跳过的记录数"),
    limit: int = Query(100, ge=1, le=1000, description="返回的记录数限制")
):
    """
    获取待办事项列表
    
    Args:
        db: 数据库会话
        filter: 筛选条件
        skip: 分页偏移量
        limit: 分页大小
        
    Returns:
        List[TodoResponse]: 待办事项列表
    """
    if filter == "active":
        return todo_crud.get_active_todos(db, skip=skip, limit=limit)
    elif filter == "completed":
        return todo_crud.get_completed_todos(db, skip=skip, limit=limit)
    else:
        return todo_crud.get_todos(db, skip=skip, limit=limit)


@router.get("/todos/{todo_id}", response_model=TodoResponse)
def get_todo(
    todo_id: int,
    db: Session = Depends(get_db)
):
    """
    获取单个待办事项
    
    Args:
        todo_id: 待办事项ID
        db: 数据库会话
        
    Returns:
        TodoResponse: 待办事项详情
        
    Raises:
        HTTPException: 当待办事项不存在时抛出404错误
    """
    db_todo = todo_crud.get_todo(db, todo_id=todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return db_todo


@router.post("/todos", response_model=TodoResponse)
def create_todo(
    todo: TodoCreate,
    db: Session = Depends(get_db)
):
    """
    创建新的待办事项
    
    Args:
        todo: 待创建的待办事项数据
        db: 数据库会话
        
    Returns:
        TodoResponse: 创建成功的待办事项详情
    """
    return todo_crud.create_todo(db=db, todo=todo)


@router.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(
    todo_id: int,
    todo: TodoUpdate,
    db: Session = Depends(get_db)
):
    """
    更新待办事项
    
    Args:
        todo_id: 待办事项ID
        todo: 更新的待办事项数据
        db: 数据库会话
        
    Returns:
        TodoResponse: 更新后的待办事项详情
        
    Raises:
        HTTPException: 当待办事项不存在时抛出404错误
    """
    db_todo = todo_crud.update_todo(db, todo_id=todo_id, todo=todo)
    if not db_todo:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return db_todo


@router.delete("/todos/{todo_id}")
def delete_todo(
    todo_id: int,
    db: Session = Depends(get_db)
):
    """
    删除待办事项
    
    Args:
        todo_id: 待办事项ID
        db: 数据库会话
        
    Returns:
        dict: 删除成功信息
        
    Raises:
        HTTPException: 当待办事项不存在时抛出404错误
    """
    success = todo_crud.delete_todo(db, todo_id=todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return {"message": "待办事项删除成功"}


@router.put("/todos/{todo_id}/complete")
def complete_todo(
    todo_id: int,
    db: Session = Depends(get_db)
):
    """
    标记待办事项为完成状态
    
    Args:
        todo_id: 待办事项ID
        db: 数据库会话
        
    Returns:
        TodoResponse: 更新后的待办事项详情
        
    Raises:
        HTTPException: 当待办事项不存在时抛出404错误
    """
    from app.schemas.todo import TodoUpdate
    update_data = TodoUpdate(completed=True)
    db_todo = todo_crud.update_todo(db, todo_id=todo_id, todo=update_data)
    if not db_todo:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return db_todo


@router.put("/todos/{todo_id}/uncomplete")
def uncomplete_todo(
    todo_id: int,
    db: Session = Depends(get_db)
):
    """
    标记待办事项为未完成状态
    
    Args:
        todo_id: 待办事项ID
        db: 数据库会话
        
    Returns:
        TodoResponse: 更新后的待办事项详情
        
    Raises:
        HTTPException: 当待办事项不存在时抛出404错误
    """
    from app.schemas.todo import TodoUpdate
    update_data = TodoUpdate(completed=False)
    db_todo = todo_crud.update_todo(db, todo_id=todo_id, todo=update_data)
    if not db_todo:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return db_todo


@router.delete("/todos/completed")
def delete_completed_todos(
    db: Session = Depends(get_db)
):
    """
    删除所有已完成的待办事项
    
    Args:
        db: 数据库会话
        
    Returns:
        dict: 删除成功信息，包含删除的记录数
    """
    deleted_count = todo_crud.delete_completed_todos(db)
    return {"message": f"成功删除 {deleted_count} 个已完成的待办事项"}


@router.delete("/todos")
def delete_all_todos(
    db: Session = Depends(get_db)
):
    """
    删除所有待办事项
    
    Args:
        db: 数据库会话
        
    Returns:
        dict: 删除成功信息，包含删除的记录数
    """
    deleted_count = todo_crud.delete_all_todos(db)
    return {"message": f"成功删除 {deleted_count} 个待办事项"}
