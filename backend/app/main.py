"""
FastAPI主应用入口
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.core.config import settings
from app.api.v1.todos import router as todos_router
import uvicorn

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 创建FastAPI应用
app = FastAPI(
    title=settings.app_name,
    description="待办事项应用API",
    version=settings.app_version,
    debug=settings.debug,
    openapi_url=f"{settings.api_prefix}/openapi.json",
    docs_url=f"{settings.api_prefix}/docs",
    redoc_url=f"{settings.api_prefix}/redoc"
)

# 配置CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(todos_router, prefix=settings.api_prefix)


@app.get("/")
async def root():
    """
    根路径，返回应用信息
    """
    return {
        "message": "欢迎使用待办事项应用API",
        "version": settings.app_version,
        "docs": f"{settings.api_prefix}/docs"
    }


@app.get("/health")
async def health_check():
    """
    健康检查接口
    """
    return {"status": "healthy", "message": "服务运行正常"}


# 启动函数
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
