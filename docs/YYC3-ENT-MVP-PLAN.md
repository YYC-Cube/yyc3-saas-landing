# YYC³ 实体经管行业 MVP 执行计划

> **目标**：在4周内完成一个可用的实体经管 CRM 系统，获得前3个付费用户

---

## Week 1：场景设计与用户调研

### 核心场景定义

#### 场景1：客户获取与转化流程 🎯 **最高优先级**

**用户故事**：
> 作为一名销售经理，我需要快速记录潜在客户信息，跟踪跟进进度，并在客户准备购买时及时转化。

**最小可用流程（MVP）**：
\`\`\`
1. 客户信息录入
   - 基本信息：姓名、电话、来源渠道
   - 意向信息：产品兴趣、预算范围、购买时间
   - 快速录入（30秒内完成）

2. 跟进记录
   - 添加跟进记录（时间、方式、内容、下次跟进时间）
   - 查看跟进历史
   - 跟进提醒（今日待跟进列表）

3. 客户转化
   - 标记客户阶段（潜在→意向→成交）
   - 记录成交信息（金额、产品、日期）
   - 自动生成销售报表
\`\`\`

**核心功能清单**：
- [ ] 客户信息表单（简化版，5个必填字段）
- [ ] 客户列表页（支持搜索、筛选、排序）
- [ ] 客户详情页（基本信息 + 跟进记录）
- [ ] 添加跟进记录弹窗
- [ ] 今日待跟进列表
- [ ] 客户阶段变更功能
- [ ] 简单的销售统计看板

**技术实现**：
\`\`\`typescript
// 数据库表（简化版）
customers: {
  id, name, phone, source, 
  interest, budget, stage, 
  created_at, updated_at
}

follow_ups: {
  id, customer_id, content, 
  method, next_follow_date,
  created_by, created_at
}

deals: {
  id, customer_id, amount, 
  product, deal_date, 
  created_by, created_at
}
\`\`\`

**成功标准**：
- 销售人员能在1分钟内录入一个新客户
- 能快速查看今日需要跟进的客户列表
- 能记录每次跟进的详细内容
- 能看到本月的成交统计

---

#### 场景2：客户维护与复购流程 🎯 **中优先级**

**用户故事**：
> 作为一名客户经理，我需要定期回访老客户，了解他们的使用情况，并在合适的时机推荐新产品。

**最小可用流程（MVP）**：
\`\`\`
1. 客户分层管理
   - 按成交金额自动分层（A/B/C类客户）
   - 按最后联系时间标记（活跃/沉睡）
   - 按复购次数标记（新客/老客）

2. 定期回访
   - 自动生成回访任务（成交后7天、30天、90天）
   - 回访记录（满意度、问题反馈、复购意向）
   - 回访提醒

3. 复购推荐
   - 查看客户购买历史
   - AI推荐适合的产品（基于购买记录）
   - 记录推荐结果
\`\`\`

**核心功能清单**：
- [ ] 客户分层标签系统
- [ ] 自动回访任务生成
- [ ] 回访记录表单
- [ ] 客户购买历史展示
- [ ] 简单的产品推荐逻辑（规则引擎）

**技术实现**：
\`\`\`typescript
// 新增表
customer_visits: {
  id, customer_id, visit_type,
  satisfaction, feedback, 
  repurchase_intent,
  created_by, created_at
}

customer_tags: {
  id, customer_id, tag_type,
  tag_value, auto_generated,
  created_at
}
\`\`\`

**成功标准**：
- 系统自动提醒需要回访的客户
- 能快速记录回访结果
- 能看到客户的完整购买历史
- 能识别高价值客户

---

#### 场景3：团队协作与管理流程 🎯 **低优先级**

**用户故事**：
> 作为一名销售总监，我需要了解团队的工作进度，查看每个人的业绩，并合理分配客户资源。

**最小可用流程（MVP）**：
\`\`\`
1. 团队成员管理
   - 添加团队成员（姓名、角色、权限）
   - 查看成员列表
   - 分配客户给成员

2. 工作日报
   - 每日工作记录（拜访客户数、跟进数、成交数）
   - 查看团队日报汇总
   - 简单的工作统计

3. 业绩看板
   - 个人业绩统计（本月成交额、成交数）
   - 团队业绩排名
   - 目标完成率
\`\`\`

**核心功能清单**：
- [ ] 团队成员管理页面
- [ ] 客户分配功能
- [ ] 日报提交表单
- [ ] 团队日报汇总页
- [ ] 简单的业绩统计看板

**技术实现**：
\`\`\`typescript
// 新增表
team_members: {
  id, name, role, phone,
  status, created_at
}

daily_reports: {
  id, member_id, report_date,
  visits, follow_ups, deals,
  notes, created_at
}

performance: {
  id, member_id, period,
  target_amount, actual_amount,
  deal_count, created_at
}
\`\`\`

**成功标准**：
- 管理者能看到团队的实时工作进度
- 能合理分配客户资源
- 能快速了解每个人的业绩情况

---

## MVP 功能优先级矩阵

| 功能模块 | 优先级 | 开发时间 | 用户价值 | 技术难度 |
|---------|--------|---------|---------|---------|
| 客户信息录入 | P0 | 2天 | ⭐⭐⭐⭐⭐ | 低 |
| 跟进记录管理 | P0 | 2天 | ⭐⭐⭐⭐⭐ | 低 |
| 今日待跟进列表 | P0 | 1天 | ⭐⭐⭐⭐⭐ | 低 |
| 客户阶段管理 | P0 | 1天 | ⭐⭐⭐⭐ | 低 |
| 销售统计看板 | P0 | 2天 | ⭐⭐⭐⭐ | 中 |
| 客户分层标签 | P1 | 2天 | ⭐⭐⭐⭐ | 中 |
| 回访任务管理 | P1 | 2天 | ⭐⭐⭐ | 中 |
| 团队成员管理 | P2 | 1天 | ⭐⭐⭐ | 低 |
| 工作日报系统 | P2 | 2天 | ⭐⭐⭐ | 低 |
| 业绩看板 | P2 | 2天 | ⭐⭐⭐ | 中 |

**开发顺序**：
\`\`\`
Week 1: 场景设计 + 用户调研
Week 2: P0 功能开发（场景1核心功能）
Week 3: P1 功能开发（场景2核心功能）+ 用户测试
Week 4: P2 功能开发（场景3核心功能）+ 优化迭代
\`\`\`

---

## 目标用户画像

### 用户类型1：小型实体店老板（首要目标）

**基本信息**：
- 年龄：30-45岁
- 行业：美容美发、健身房、教育培训、汽车服务等
- 团队规模：3-10人
- 月营业额：10-50万

**痛点**：
- 客户信息散落在微信、纸质本、Excel中，难以管理
- 忘记跟进客户，错失成交机会
- 不知道哪些客户需要回访
- 团队工作进度不透明

**期望**：
- 简单易用，不需要培训就能上手
- 手机端随时随地记录
- 自动提醒跟进和回访
- 能看到团队的工作情况

**付费意愿**：
- 月费：200-500元
- 年费：2000-5000元（打折）

---

### 用户类型2：销售团队负责人（次要目标）

**基本信息**：
- 年龄：28-40岁
- 行业：房产中介、保险销售、B2B销售等
- 团队规模：10-50人
- 月营业额：50-200万

**痛点**：
- 客户资源分配不均
- 无法实时了解团队工作进度
- 业绩统计耗时费力
- 客户流失率高

**期望**：
- 能合理分配客户资源
- 实时查看团队工作进度
- 自动生成业绩报表
- 能识别高价值客户

**付费意愿**：
- 月费：1000-3000元
- 年费：10000-30000元

---

## Week 1 具体行动计划

### Day 1-2：深度用户访谈

**目标**：找到3-5个潜在用户，深入了解他们的真实需求

**访谈对象**：
1. 美容美发店老板（1-2人）
2. 健身房/瑜伽馆老板（1-2人）
3. 教育培训机构负责人（1人）

**访谈问题清单**：
\`\`\`
1. 现在如何管理客户信息？（微信、Excel、纸质本？）
2. 平均每天需要跟进多少客户？
3. 最头疼的客户管理问题是什么？
4. 有没有用过其他CRM系统？为什么不用了？
5. 如果有一个简单的客户管理工具，最希望有什么功能？
6. 愿意为这样的工具付费吗？能接受的价格是多少？
7. 更喜欢手机端还是电脑端？
8. 团队有多少人？如何分配客户？
9. 如何统计业绩？
10. 客户流失的主要原因是什么？
\`\`\`

**访谈记录模板**：
\`\`\`markdown
## 用户访谈记录

**基本信息**：
- 姓名：[保密]
- 行业：
- 团队规模：
- 月营业额：
- 访谈时间：

**当前痛点**：
1. 
2. 
3. 

**核心需求**：
1. 
2. 
3. 

**付费意愿**：
- 是否愿意付费：
- 可接受价格：
- 付费方式偏好：

**关键洞察**：


**下一步行动**：
- [ ] 是否愿意成为测试用户
- [ ] 预计开始测试时间
- [ ] 特殊需求记录
\`\`\`

---

### Day 3-4：场景流程细化

**目标**：根据用户访谈结果，细化3个核心场景的流程

**输出物**：
1. 场景1的详细流程图（Figma/手绘）
2. 场景2的详细流程图
3. 场景3的详细流程图
4. 每个场景的关键页面原型（低保真）

**工具**：
- Figma（推荐）
- 或者手绘拍照
- 或者用 Excalidraw

---

### Day 5-7：技术准备与数据库设计

**目标**：完成技术架构设计和数据库表结构

**任务清单**：
- [ ] 确认技术栈（Next.js + MySQL 已确定）
- [ ] 设计数据库表结构（基于3个核心场景）
- [ ] 创建数据库迁移脚本
- [ ] 搭建开发环境
- [ ] 准备测试数据

**数据库表设计**：
\`\`\`sql
-- 核心表（MVP版本）
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  source VARCHAR(50),
  interest TEXT,
  budget VARCHAR(50),
  stage ENUM('lead', 'prospect', 'customer') DEFAULT 'lead',
  assigned_to INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_stage (stage),
  INDEX idx_assigned (assigned_to)
);

CREATE TABLE follow_ups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  content TEXT NOT NULL,
  method ENUM('phone', 'wechat', 'visit', 'other') DEFAULT 'phone',
  next_follow_date DATE,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  INDEX idx_customer (customer_id),
  INDEX idx_next_date (next_follow_date)
);

CREATE TABLE deals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  product VARCHAR(100),
  deal_date DATE NOT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  INDEX idx_customer (customer_id),
  INDEX idx_date (deal_date)
);

CREATE TABLE team_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  role ENUM('admin', 'manager', 'sales') DEFAULT 'sales',
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

---

## Week 1 成功标准

**必须完成**：
- [x] 完成3-5个用户访谈
- [x] 确定3个核心场景的详细流程
- [x] 完成数据库表设计
- [x] 找到2-3个愿意测试的用户

**加分项**：
- [ ] 完成低保真原型设计
- [ ] 准备好开发环境
- [ ] 写好第一版产品介绍文案

---

## 下周预告：Week 2 开发计划

**目标**：完成场景1的所有核心功能

**开发任务**：
1. 客户信息录入页面
2. 客户列表页面
3. 客户详情页面
4. 跟进记录功能
5. 今日待跟进列表
6. 简单的统计看板

**时间分配**：
- Day 1-2: 客户管理基础功能
- Day 3-4: 跟进记录功能
- Day 5: 统计看板
- Day 6-7: 测试和优化

---

## 关键提醒

1. **保持简单**：MVP 阶段不要追求完美，能用就行
2. **快速验证**：每完成一个功能就让用户试用
3. **记录反馈**：用户的每一句话都很重要
4. **灵活调整**：如果用户需求和计划不符，优先满足用户需求
5. **控制范围**：坚决不做计划外的功能

---

## 需要帮助时

如果遇到以下情况，随时找我：
- 用户访谈不知道怎么问
- 流程设计遇到困难
- 技术实现有疑问
- 需要调整优先级
- 需要产品建议

**记住**：完成比完美更重要，用户比技术更重要！

加油，期待看到你的第一个真实用户反馈！🚀
