"""
待办事项API测试用例
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import SessionLocal, engine
from app.models.todo import Base
from app.crud.todo import todo_crud
from app.schemas.todo import TodoCreate

# 创建测试数据库表
Base.metadata.create_all(bind=engine)

client = TestClient(app)


@pytest.fixture(scope="module")
def db():
    """数据库会话fixture"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_test_todo(db, title="测试待办事项"):
    """创建测试待办事项"""
    todo_data = TodoCreate(title=title, description="这是一个测试待办事项")
    return todo_crud.create_todo(db=db, todo=todo_data)


class TestTodos:
    """待办事项测试类"""
    
    def test_create_todo(self, db):
        """测试创建待办事项"""
        todo_data = {
            "title": "测试创建待办事项",
            "description": "这是一个测试描述"
        }
        response = client.post("/api/v1/todos", json=todo_data)
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == todo_data["title"]
        assert data["description"] == todo_data["description"]
        assert data["completed"] is False
        assert "id" in data
        assert "created_at" in data
    
    def test_get_todos(self, db):
        """测试获取待办事项列表"""
        # 先创建一个待办事项
        create_test_todo(db)
        
        response = client.get("/api/v1/todos")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
    
    def test_get_todos_with_filter(self, db):
        """测试带筛选条件的待办事项列表"""
        # 创建不同状态的待办事项
        create_test_todo(db, "未完成的任务")
        create_test_todo(db, "已完成的任务")
        
        # 标记第二个任务为已完成
        todos = client.get("/api/v1/todos").json()
        completed_todo_id = todos[-1]["id"]
        client.put(f"/api/v1/todos/{completed_todo_id}/complete")
        
        # 测试筛选全部
        response = client.get("/api/v1/todos?filter=all")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 2
        
        # 测试筛选未完成
        response = client.get("/api/v1/todos?filter=active")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        
        # 测试筛选已完成
        response = client.get("/api/v1/todos?filter=completed")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
    
    def test_get_todo_by_id(self, db):
        """测试根据ID获取待办事项"""
        # 创建测试待办事项
        created_todo = create_test_todo(db)
        
        response = client.get(f"/api/v1/todos/{created_todo.id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == created_todo.id
        assert data["title"] == created_todo.title
    
    def test_get_todo_not_found(self):
        """测试获取不存在的待办事项"""
        response = client.get("/api/v1/todos/999")
        assert response.status_code == 404
    
    def test_update_todo(self, db):
        """测试更新待办事项"""
        # 创建测试待办事项
        created_todo = create_test_todo(db)
        
        update_data = {
            "title": "更新后的标题",
            "description": "更新后的描述",
            "completed": True
        }
        
        response = client.put(f"/api/v1/todos/{created_todo.id}", json=update_data)
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == update_data["title"]
        assert data["description"] == update_data["description"]
        assert data["completed"] is True
    
    def test_update_todo_not_found(self):
        """测试更新不存在的待办事项"""
        update_data = {"title": "更新标题"}
        response = client.put("/api/v1/todos/999", json=update_data)
        assert response.status_code == 404
    
    def test_complete_todo(self, db):
        """测试标记待办事项为完成"""
        # 创建测试待办事项
        created_todo = create_test_todo(db)
        
        response = client.put(f"/api/v1/todos/{created_todo.id}/complete")
        assert response.status_code == 200
        data = response.json()
        assert data["completed"] is True
    
    def test_uncomplete_todo(self, db):
        """测试标记待办事项为未完成"""
        # 创建测试待办事项
        created_todo = create_test_todo(db)
        
        # 先标记为完成
        client.put(f"/api/v1/todos/{created_todo.id}/complete")
        
        # 再标记为未完成
        response = client.put(f"/api/v1/todos/{created_todo.id}/uncomplete")
        assert response.status_code == 200
        data = response.json()
        assert data["completed"] is False
    
    def test_delete_todo(self, db):
        """测试删除待办事项"""
        # 创建测试待办事项
        created_todo = create_test_todo(db)
        
        response = client.delete(f"/api/v1/todos/{created_todo.id}")
        assert response.status_code == 200
        assert "待办事项删除成功" in response.json()["message"]
        
        # 验证已删除
        response = client.get(f"/api/v1/todos/{created_todo.id}")
        assert response.status_code == 404
    
    def test_delete_todo_not_found(self):
        """测试删除不存在的待办事项"""
        response = client.delete("/api/v1/todos/999")
        assert response.status_code == 404
    
    def test_delete_completed_todos(self, db):
        """测试删除所有已完成的待办事项"""
        # 创建多个待办事项
        todo1 = create_test_todo(db, "任务1")
        todo2 = create_test_todo(db, "任务2")
        todo3 = create_test_todo(db, "任务3")
        
        # 标记部分任务为已完成
        client.put(f"/api/v1/todos/{todo2.id}/complete")
        client.put(f"/api/v1/todos/{todo3.id}/complete")
        
        # 删除已完成的任务
        response = client.delete("/api/v1/todos/completed")
        assert response.status_code == 200
        assert "成功删除 2 个已完成的待办事项" in response.json()["message"]
        
        # 验证未完成的任务仍然存在
        response = client.get("/api/v1/todos?filter=active")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]["title"] == "任务1"
    
    def test_delete_all_todos(self, db):
        """测试删除所有待办事项"""
        # 创建多个待办事项
        create_test_todo(db, "任务1")
        create_test_todo(db, "任务2")
        
        # 删除所有任务
        response = client.delete("/api/v1/todos")
        assert response.status_code == 200
        assert "成功删除 2 个待办事项" in response.json()["message"]
        
        # 验证所有任务已被删除
        response = client.get("/api/v1/todos")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 0
