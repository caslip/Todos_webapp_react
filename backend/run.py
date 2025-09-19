#!/usr/bin/env python3
"""
待办事项应用启动脚本
"""
import uvicorn
from app.core.config import settings

def start_app():
    """启动应用并打印控制台信息"""
    print("=" * 60)
    print(f"🚀 {settings.app_name} 启动成功!")
    print(f"📝 版本: {settings.app_version}")
    print(f"🌐 服务地址: http://localhost:8000")
    print(f"📚 API文档: http://localhost:8000/api/v1/docs")
    print(f"🔍 ReDoc文档: http://localhost:8000/api/v1/redoc")
    print(f"❤️  健康检查: http://localhost:8000/health")
    print(f"📁 数据库: SQLite (todos.db)")
    print("=" * 60)
    print("💡 提示: 按Ctrl+C停止服务")
    print("=" * 60)
    
    # 启动Uvicorn服务器
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

if __name__ == "__main__":
    start_app()
