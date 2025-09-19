# 待办事项应用后端

这是一个基于FastAPI和SQLite的待办事项应用后端API。

## 功能特性

- 创建、读取、更新、删除待办事项
- 标记待办事项为完成/未完成状态
- 按状态筛选待办事项（全部、未完成、已完成）
- 批量删除已完成待办事项
- 批量删除所有待办事项
- RESTful API设计
- 完整的测试覆盖

## 技术栈

- **框架**: FastAPI
- **数据库**: SQLite
- **ORM**: SQLAlchemy
- **数据验证**: Pydantic
- **测试**: Pytest
- **文档**: OpenAPI/Swagger

## 项目结构

```
backend/
├── app/
│   ├── main.py              # FastAPI应用入口
│   ├── core/
│   │   ├── config.py        # 应用配置
│   │   └── database.py      # 数据库连接配置
│   ├── models/
│   │   └── todo.py          # 数据模型
│   ├── schemas/
│   │   └── todo.py          # Pydantic模式
│   ├── crud/
│   │   └── todo.py          # 数据库操作
│   └── api/
│       └── v1/
│           └── todos.py     # API路由
├── tests/                   # 测试文件
│   ├── test_main.py
│   └── test_todos.py
├── requirements.txt         # 依赖包列表
└── README.md               # 项目说明文档
```

## 安装和运行

### 1. 安装依赖

```bash
cd backend
pip install -r requirements.txt
```

### 2. 运行应用

```bash
uvicorn app.main:app --reload
```

应用将在 `http://localhost:8000` 启动。

### 3. 访问API文档

打开浏览器访问 `http://localhost:8000/api/v1/docs` 查看Swagger文档。

## API接口

### 待办事项管理

#### 创建待办事项
```
POST /api/v1/todos
```
请求体:
```json
{
    "title": "学习Python",
    "description": "完成Python基础教程",
    "completed": false
}
```

#### 获取待办事项列表
```
GET /api/v1/todos?filter=all&skip=0&limit=100
```
参数:
- `filter`: 筛选条件 (all/active/completed)
- `skip`: 跳过的记录数 (默认0)
- `limit`: 返回的记录数限制 (默认100)

#### 获取单个待办事项
```
GET /api/v1/todos/{todo_id}
```

#### 更新待办事项
```
PUT /api/v1/todos/{todo_id}
```
请求体:
```json
{
    "title": "更新后的标题",
    "description": "更新后的描述",
    "completed": true
}
```

#### 标记为完成
```
PUT /api/v1/todos/{todo_id}/complete
```

#### 标记为未完成
```
PUT /api/v1/todos/{todo_id}/uncomplete
```

#### 删除待办事项
```
DELETE /api/v1/todos/{todo_id}
```

#### 删除所有已完成的待办事项
```
DELETE /api/v1/todos/completed
```

#### 删除所有待办事项
```
DELETE /api/v1/todos
```

### 其他接口

#### 根路径
```
GET /
```
返回应用信息。

#### 健康检查
```
GET /health
```
返回服务健康状态。

## 数据库设计

### todos表

```sql
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
);
```

字段说明:
- `id`: 主键，自增
- `title`: 待办事项标题，必填
- `description`: 待办事项描述，可选
- `completed`: 是否完成，默认为false
- `created_at`: 创建时间，默认为当前时间
- `updated_at`: 更新时间，更新时自动更新

## 测试

### 运行所有测试

```bash
pytest
```

### 运行特定测试文件

```bash
pytest tests/test_todos.py
```

### 运行测试并生成覆盖率报告

```bash
pytest --cov=app
```

## 开发说明

### 环境变量

可以通过创建 `.env` 文件来配置应用:

```env
DATABASE_URL=sqlite:///./todos.db
DEBUG=True
```

### 代码格式化

使用 `black` 进行代码格式化:

```bash
black .
```

### 代码检查

使用 `flake8` 进行代码风格检查:

```bash
flake8 .
```

### 类型检查

使用 `mypy` 进行类型检查:

```bash
mypy .
```

## 部署

### 使用Docker

创建 `Dockerfile`:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

构建和运行:

```bash
docker build -t todo-backend .
docker run -p 8000:8000 todo-backend
```

### 使用Gunicorn

```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系:

- 创建 Issue
- 发送邮件
