# 待办事项管理应用 - 前端

这是一个现代化的待办事项管理应用前端，使用React + TypeScript构建，提供直观的用户界面和完整的任务管理功能。

## 功能特性

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

## 技术栈

- **前端框架**: React 18.2.0
- **语言**: TypeScript 4.9.5
- **HTTP客户端**: Axios 1.6.0
- **样式**: CSS3 + 响应式设计
- **构建工具**: Create React App 5.0.1
- **开发工具**: ESLint + Prettier

## 项目结构

```
front/
├── public/                 # 静态资源
│   └── index.html         # HTML模板
├── src/                   # 源代码
│   ├── components/        # React组件
│   │   ├── TodoForm.tsx   # 添加任务表单
│   │   ├── TodoList.tsx   # 任务列表
│   │   ├── TodoItem.tsx   # 单个任务项
│   │   ├── FilterButtons.tsx  # 筛选按钮
│   │   └── ActionButtons.tsx  # 批量操作按钮
│   ├── services/          # API服务
│   │   └── api.ts         # API调用封装
│   ├── styles/            # 样式文件
│   │   └── App.css        # 全局样式
│   ├── types/             # TypeScript类型定义
│   │   └── todo.ts        # 待办事项相关类型
│   ├── App.tsx            # 主应用组件
│   └── index.tsx          # 应用入口
├── package.json           # 项目依赖
├── tsconfig.json          # TypeScript配置
└── README.md              # 项目说明
```

## 组件架构

### 主要组件说明

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

### 状态管理

应用采用React Hooks进行状态管理：

- **useState**: 管理组件内部状态
- **useEffect**: 处理副作用（如数据获取）
- **props**: 父子组件通信

## API集成

### 后端接口

前端与后端FastAPI应用通过RESTful API进行通信：

```typescript
// 主要API端点
GET    /api/v1/todos           // 获取任务列表
POST   /api/v1/todos           // 创建新任务
PUT    /api/v1/todos/{id}      // 更新任务
DELETE /api/v1/todos/{id}      // 删除任务
PUT    /api/v1/todos/{id}/complete  // 标记完成
PUT    /api/v1/todos/{id}/uncomplete // 标记未完成
DELETE /api/v1/todos/completed       // 清除已完成
DELETE /api/v1/todos                 // 清除所有
```

### API服务封装

`src/services/api.ts` 文件封装了所有API调用：

- **错误处理**: 统一的错误处理机制
- **类型安全**: 使用TypeScript类型定义
- **超时控制**: 10秒请求超时
- **响应格式**: 标准化的响应处理

## 样式设计

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

### 动画效果

- **按钮悬停**: 轻微上移和阴影效果
- **状态切换**: 平滑的过渡动画
- **加载状态**: 旋转的加载动画
- **消息提示**: 渐入渐出效果

## 开发指南

### 环境要求

- **Node.js**: >= 16.0.0
- **npm**: >= 7.0.0

### 安装依赖

```bash
cd front
npm install
```

### 启动开发服务器

```bash
npm start
```

应用将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
npm run build
```

构建后的文件将输出到 `build/` 目录。

### 代码规范

项目使用ESLint进行代码规范检查：

```bash
npm run lint
```

## 部署说明

### 开发环境部署

1. 启动后端服务：
   ```bash
   cd backend
   python run.py
   ```

2. 启动前端服务：
   ```bash
   cd front
   npm start
   ```

### 生产环境部署

1. 构建前端应用：
   ```bash
   cd front
   npm run build
   ```

2. 使用Nginx或其他Web服务器部署 `build/` 目录。

3. 确保后端API服务在生产环境中正常运行。

## 测试策略

### 单元测试
- 组件渲染测试
- 事件处理测试
- 状态管理测试

### 集成测试
- API调用测试
- 组件交互测试
- 数据流测试

### 端到端测试
- 用户操作流程测试
- 跨浏览器兼容性测试

## 常见问题

### Q: 如何修改API基础URL？
A: 在 `src/services/api.ts` 文件中修改 `baseURL` 配置。

### Q: 如何添加新的筛选条件？
A: 在 `src/types/todo.ts` 中扩展 `FilterType` 类型，并在 `FilterButtons.tsx` 中添加对应按钮。

### Q: 如何自定义样式？
A: 修改 `src/styles/App.css` 文件，或添加新的CSS模块。

### Q: 如何处理API错误？
A: 在各组件的 `onError` 回调中处理错误，或修改 `src/services/api.ts` 中的错误处理逻辑。

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 创建 Issue
- 发送邮件
- 提交 Pull Request

---

**注意**: 本前端应用需要与后端FastAPI应用配合使用，确保后端服务正常运行。
