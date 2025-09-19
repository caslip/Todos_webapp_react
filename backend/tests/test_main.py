"""
主应用测试用例
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_read_root():
    """测试根路径"""
    response = client.get("/")
    assert response.status_code == 200
    assert "欢迎使用待办事项应用API" in response.json()["message"]


def test_health_check():
    """测试健康检查接口"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_api_docs():
    """测试API文档访问"""
    response = client.get("/api/v1/docs")
    assert response.status_code == 200
