# 待办事项管理应用

一个现代化的全栈待办事项管理应用，采用前后端分离架构，提供直观的用户界面和完整的任务管理功能。

## 🚀 功能特性

### 核心功能
- ✅ **任务管理**: 添加、编辑、删除待办事项
- ✅ **状态管理**: 标记任务为完成/未完成状态
- ✅ **筛选功能**: 按状态筛选（全部、未完成、已完成）
- ✅ **批量操作**: 清除已完成任务、清除所有任务
- ✅ **实时反馈**: 操作成功/失败提示
- ✅ **数据持久化**: 与后端API集成，数据存储在SQLite数据库

### 用户体验
- 🎨 **现代化设计**: 简洁美观的界面设计
- 📱 **响应式布局**: 适配不同屏幕尺寸
- ⚡ **流畅交互**: 平滑的动画效果和过渡
- 🔍 **实时统计**: 显示任务总数、已完成数、未完成数
- ⌨️ **快捷操作**: 支持键盘快捷键（Enter提交，Escape取消）

## 🛠️ 技术栈

### 后端
- **框架**: FastAPI
- **数据库**: SQLite
- **ORM**: SQLAlchemy
- **数据验证**: Pydantic
- **测试**: Pytest
- **文档**: OpenAPI/Swagger

### 前端
- **前端框架**: React 18.2.0
- **语言**: TypeScript 4.9.5
- **HTTP客户端**: Axios 1.6.0
- **样式**: CSS3 + 响应式设计
- **构建工具**: Create React App 5.0.1

## 📁 项目结构

```
todo-app/
├── backend/                 # FastAPI 后端
│   ├── app/
│   │   ├── main.py         # 主应用入口
│   │   ├── models/         # 数据模型
│   │   ├── schemas/        # Pydantic 模式
│   │   ├── crud/           # 数据库操作
│   │   ├── api/            # API路由
│   │   └── core/           # 核心配置
│   ├── requirements.txt    # Python依赖
│   ├── tests/              # 测试文件
│   └── README.md           # 后端说明文档
└── frontend/               # React 前端
    ├── src/
    │   ├── components/     # React组件
    │   │   ├── TodoForm.tsx   # 添加任务表单
    │   │   ├── TodoList.tsx   # 任务列表
    │   │   ├── TodoItem.tsx   # 单个任务项
    │   │   ├── FilterButtons.tsx  # 筛选按钮
    │   │   └── ActionButtons.tsx  # 批量操作按钮
    │   ├── services/       # API服务
    │   │   └── api.ts      # API调用封装
    │   ├── styles/         # 样式文件
    │   │   └── App.css     # 全局样式
    │   ├── types/          # TypeScript类型定义
    │   │   └── todo.ts     # 待办事项相关类型
    │   ├── App.tsx         # 主应用组件
    │   └── index.tsx       # 应用入口
    ├── package.json        # 项目依赖
    ├── tsconfig.json       # TypeScript配置
    └── README.md           # 前端说明文档
```

## 📋 数据库设计

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

## 🚀 快速开始

### 环境要求

- **Python**: >= 3.8
- **Node.js**: >= 16.0.0
- **npm**: >= 7.0.0

### 1. 克隆项目

```bash
git clone <repository-url>
cd todo-app
```

### 2. 启动后端服务

```bash
cd backend

# 安装Python依赖
pip install -r requirements.txt

# 启动后端服务
python run.py
```

后端服务将在 `http://localhost:8000` 启动。

### 3. 启动前端服务

```bash
cd frontend

# 安装Node.js依赖
npm install

# 启动前端开发服务器
npm start
```

前端应用将在 `http://localhost:3000` 启动。

### 4. 访问应用

打开浏览器访问 `http://localhost:3000` 开始使用待办事项管理应用。

### 5. 查看API文档

后端API文档可在 `http://localhost:8000/api/v1/docs` 查看。

## 📚 API接口

### 待办事项管理

| 方法 | 路径 | 功能描述 |
|------|------|----------|
| GET | /api/v1/todos | 获取所有待办事项列表 |
| GET | /api/v1/todos/{todo_id} | 获取单个待办事项详情 |
| POST | /api/v1/todos | 创建新的待办事项 |
| PUT | /api/v1/todos/{todo_id} | 更新指定待办事项 |
| DELETE | /api/v1/todos/{todo_id} | 删除指定待办事项 |
| PUT | /api/v1/todos/{todo_id}/complete | 标记任务为完成状态 |
| PUT | /api/v1/todos/{todo_id}/uncomplete | 标记任务为未完成状态 |
| DELETE | /api/v1/todos/completed | 批量删除所有已完成的任务 |
| DELETE | /api/v1/todos | 批量删除所有任务 |

### 其他接口

- **根路径**: `GET /` - 返回应用信息
- **健康检查**: `GET /health` - 返回服务健康状态

## 🎨 组件架构

### 前端组件说明

#### App.tsx
- **作用**: 主应用组件，管理全局状态
- **功能**: 
  - 维护当前筛选状态
  - 处理消息提示
  - 协调各子组件

#### TodoForm.tsx
- **作用**: 添加新任务的表单组件
- **功能**:
  - 任务标题输入（必填）
  - 任务描述输入（可选）
  - 表单验证
  - 提交处理

#### TodoList.tsx
- **作用**: 任务列表容器组件
- **功能**:
  - 根据筛选条件获取任务
  - 显示任务统计信息
  - 管理任务列表状态
  - 处理加载和错误状态

#### TodoItem.tsx
- **作用**: 单个任务项组件
- **功能**:
  - 显示任务详情
  - 编辑任务信息
  - 切换完成状态
  - 删除任务

#### FilterButtons.tsx
- **作用**: 筛选按钮组件
- **功能**:
  - 提供筛选选项（全部、未完成、已完成）
  - 管理当前筛选状态

#### ActionButtons.tsx
- **作用**: 批量操作按钮组件
- **功能**:
  - 清除已完成任务
  - 清除所有任务
  - 操作确认对话框

## 🧪 测试

### 后端测试

```bash
cd backend

# 运行所有测试
pytest

# 运行特定测试文件
pytest tests/test_todos.py

# 运行测试并生成覆盖率报告
pytest --cov=app
```

### 前端测试

```bash
cd frontend

# 运行测试
npm test
```

## 📦 构建和部署

### 构建前端生产版本

```bash
cd frontend
npm run build
```

构建后的文件将输出到 `build/` 目录。

### 使用Docker部署后端

创建 `backend/Dockerfile`:

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
cd backend
docker build -t todo-backend .
docker run -p 8000:8000 todo-backend
```

### 生产环境部署

1. 构建前端应用：
   ```bash
   cd frontend
   npm run build
   ```

2. 使用Nginx或其他Web服务器部署 `build/` 目录。

3. 确保后端API服务在生产环境中正常运行。

## 🎨 样式设计

### 设计原则

- **简洁性**: 界面简洁，突出功能
- **一致性**: 统一的颜色和字体
- **可访问性**: 良好的对比度和可读性
- **响应式**: 适配不同设备

### 颜色方案

- **主色调**: #3498db (蓝色)
- **成功色**: #27ae60 (绿色)
- **警告色**: #f39c12 (橙色)
- **错误色**: #e74c3c (红色)
- **中性色**: #95a5a6 (灰色)

## 📝 开发指南

### 代码规范

#### 后端

```bash
cd backend

# 代码格式化
black .

# 代码风格检查
flake8 .

# 类型检查
mypy .
```

#### 前端

```bash
cd frontend

# 代码规范检查
npm run lint
```

### 环境变量

可以通过创建 `.env` 文件来配置后端应用:

```env
DATABASE_URL=sqlite:///./todos.db
DEBUG=True
```

## 🔧 故障排除

### 常见问题

#### Q: 如何修改API基础URL？
A: 在 `frontend/src/services/api.ts` 文件中修改 `baseURL` 配置。

#### Q: 如何添加新的筛选条件？
A: 在 `frontend/src/types/todo.ts` 中扩展 `FilterType` 类型，并在 `FilterButtons.tsx` 中添加对应按钮。

#### Q: 如何自定义样式？
A: 修改 `frontend/src/styles/App.css` 文件，或添加新的CSS模块。

#### Q: 如何处理API错误？
A: 在各组件的 `onError` 回调中处理错误，或修改 `frontend/src/services/api.ts` 中的错误处理逻辑。

#### Q: 后端启动失败？
A: 检查Python依赖是否正确安装，以及数据库文件是否有写入权限。

#### Q: 前端无法连接后端？
A: 确保后端服务正在运行，检查CORS配置是否正确。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系:

- 创建 Issue
- 发送邮件
- 提交 Pull Request

---

**注意**: 本应用需要同时运行前端和后端服务，确保两个服务都正常运行以获得完整体验。
