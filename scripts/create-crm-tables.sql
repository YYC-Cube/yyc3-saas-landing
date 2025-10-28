-- ============================================
-- YYC³ 智能 CRM 系统数据库表结构
-- ============================================

-- 1. 客户管理相关表
-- ============================================

-- 客户主表
CREATE TABLE IF NOT EXISTS customers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  -- 基本信息
  name VARCHAR(100) NOT NULL COMMENT '客户姓名',
  phone VARCHAR(20) UNIQUE COMMENT '手机号',
  email VARCHAR(100) COMMENT '邮箱',
  gender ENUM('male', 'female', 'unknown') DEFAULT 'unknown' COMMENT '性别',
  birthday DATE COMMENT '生日',
  avatar VARCHAR(255) COMMENT '头像URL',
  
  -- 来源信息
  source VARCHAR(50) COMMENT '来源渠道',
  source_detail VARCHAR(255) COMMENT '来源详情',
  referrer_id BIGINT COMMENT '推荐人ID',
  
  -- 客户阶段
  stage ENUM('lead', 'prospect', 'customer', 'vip', 'churned') DEFAULT 'lead' COMMENT '客户阶段',
  stage_updated_at TIMESTAMP COMMENT '阶段更新时间',
  
  -- 评分
  quality_score INT DEFAULT 0 COMMENT '质量评分 0-100',
  intent_score INT DEFAULT 0 COMMENT '意向度评分 0-100',
  activity_score INT DEFAULT 0 COMMENT '活跃度评分 0-100',
  
  -- 价值
  lifetime_value DECIMAL(10,2) DEFAULT 0 COMMENT '生命周期价值',
  total_orders INT DEFAULT 0 COMMENT '总订单数',
  total_revenue DECIMAL(10,2) DEFAULT 0 COMMENT '总消费金额',
  avg_order_value DECIMAL(10,2) DEFAULT 0 COMMENT '平均订单金额',
  
  -- 分配信息
  assigned_to BIGINT COMMENT '分配给哪个销售',
  assigned_at TIMESTAMP COMMENT '分配时间',
  
  -- 状态
  is_active BOOLEAN DEFAULT TRUE COMMENT '是否活跃',
  last_contact_at TIMESTAMP COMMENT '最后联系时间',
  last_order_at TIMESTAMP COMMENT '最后下单时间',
  
  -- 标签和自定义字段
  tags JSON COMMENT '标签数组',
  custom_fields JSON COMMENT '自定义字段',
  
  -- AI 分析
  ai_insights JSON COMMENT 'AI 洞察',
  churn_probability DECIMAL(3,2) COMMENT '流失概率',
  next_purchase_date DATE COMMENT '预测下次购买日期',
  
  -- 时间戳
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL COMMENT '软删除时间',
  
  INDEX idx_phone (phone),
  INDEX idx_stage (stage),
  INDEX idx_assigned (assigned_to),
  INDEX idx_quality (quality_score),
  INDEX idx_intent (intent_score),
  INDEX idx_last_contact (last_contact_at),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户主表';

-- 客户跟进记录表
CREATE TABLE IF NOT EXISTS customer_followups (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL COMMENT '客户ID',
  user_id BIGINT NOT NULL COMMENT '跟进人ID',
  
  -- 跟进信息
  type ENUM('call', 'visit', 'wechat', 'email', 'sms', 'other') COMMENT '跟进方式',
  subject VARCHAR(255) COMMENT '主题',
  content TEXT COMMENT '跟进内容',
  duration INT COMMENT '时长(分钟)',
  
  -- 结果
  result ENUM('success', 'failed', 'pending', 'no_answer') COMMENT '跟进结果',
  intent_level ENUM('high', 'medium', 'low', 'none') COMMENT '意向等级',
  
  -- 下次跟进
  next_followup_date DATETIME COMMENT '下次跟进时间',
  next_followup_content TEXT COMMENT '下次跟进计划',
  
  -- AI 辅助
  ai_suggestions JSON COMMENT 'AI 建议',
  ai_score INT COMMENT 'AI 评分',
  
  -- 附件
  attachments JSON COMMENT '附件列表',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_customer (customer_id),
  INDEX idx_user (user_id),
  INDEX idx_next_date (next_followup_date),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户跟进记录表';

-- 客户行为轨迹表
CREATE TABLE IF NOT EXISTS customer_behaviors (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL COMMENT '客户ID',
  
  -- 行为信息
  behavior_type VARCHAR(50) NOT NULL COMMENT '行为类型',
  behavior_name VARCHAR(100) COMMENT '行为名称',
  behavior_data JSON COMMENT '行为数据',
  
  -- 来源
  source VARCHAR(50) COMMENT '来源',
  page_url VARCHAR(500) COMMENT '页面URL',
  referrer VARCHAR(500) COMMENT '来源页面',
  
  -- 设备信息
  device_type VARCHAR(50) COMMENT '设备类型',
  browser VARCHAR(50) COMMENT '浏览器',
  os VARCHAR(50) COMMENT '操作系统',
  ip VARCHAR(50) COMMENT 'IP地址',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_customer (customer_id),
  INDEX idx_type (behavior_type),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户行为轨迹表';

-- 客户标签表
CREATE TABLE IF NOT EXISTS customer_tags (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL COMMENT '标签名称',
  category VARCHAR(50) COMMENT '标签分类',
  color VARCHAR(20) COMMENT '标签颜色',
  description TEXT COMMENT '标签描述',
  auto_generated BOOLEAN DEFAULT FALSE COMMENT '是否AI自动生成',
  usage_count INT DEFAULT 0 COMMENT '使用次数',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户标签表';

-- 客户标签关联表
CREATE TABLE IF NOT EXISTS customer_tag_relations (
  customer_id BIGINT NOT NULL COMMENT '客户ID',
  tag_id BIGINT NOT NULL COMMENT '标签ID',
  created_by BIGINT COMMENT '创建人',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (customer_id, tag_id),
  INDEX idx_customer (customer_id),
  INDEX idx_tag (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户标签关联表';

-- 2. 团队管理相关表
-- ============================================

-- 员工表
CREATE TABLE IF NOT EXISTS employees (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  -- 基本信息
  name VARCHAR(100) NOT NULL COMMENT '姓名',
  employee_no VARCHAR(50) UNIQUE COMMENT '工号',
  phone VARCHAR(20) COMMENT '手机号',
  email VARCHAR(100) COMMENT '邮箱',
  avatar VARCHAR(255) COMMENT '头像',
  
  -- 组织信息
  department_id BIGINT COMMENT '部门ID',
  position VARCHAR(50) COMMENT '职位',
  level VARCHAR(20) COMMENT '职级',
  manager_id BIGINT COMMENT '直属上级',
  
  -- 入职信息
  entry_date DATE COMMENT '入职日期',
  contract_type ENUM('full_time', 'part_time', 'intern', 'contract') COMMENT '合同类型',
  
  -- 状态
  status ENUM('active', 'inactive', 'resigned', 'suspended') DEFAULT 'active' COMMENT '状态',
  
  -- 权限
  role VARCHAR(50) COMMENT '角色',
  permissions JSON COMMENT '权限列表',
  
  -- 绩效
  current_performance_score DECIMAL(5,2) COMMENT '当前绩效分',
  current_rank INT COMMENT '当前排名',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_department (department_id),
  INDEX idx_status (status),
  INDEX idx_manager (manager_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='员工表';

-- 部门表
CREATE TABLE IF NOT EXISTS departments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL COMMENT '部门名称',
  parent_id BIGINT COMMENT '父部门ID',
  manager_id BIGINT COMMENT '部门经理ID',
  level INT COMMENT '层级',
  path VARCHAR(500) COMMENT '路径',
  description TEXT COMMENT '部门描述',
  status ENUM('active', 'inactive') DEFAULT 'active' COMMENT '状态',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_parent (parent_id),
  INDEX idx_manager (manager_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='部门表';

-- 工作日报表
CREATE TABLE IF NOT EXISTS daily_reports (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  employee_id BIGINT NOT NULL COMMENT '员工ID',
  report_date DATE NOT NULL COMMENT '日期',
  
  -- 工作内容
  work_summary TEXT COMMENT '工作总结',
  completed_tasks JSON COMMENT '完成的任务',
  
  -- 客户相关
  followup_count INT DEFAULT 0 COMMENT '跟进客户数',
  new_customers INT DEFAULT 0 COMMENT '新增客户数',
  deals_closed INT DEFAULT 0 COMMENT '成交数',
  revenue DECIMAL(10,2) DEFAULT 0 COMMENT '业绩',
  
  -- 问题和计划
  issues TEXT COMMENT '遇到的问题',
  tomorrow_plans TEXT COMMENT '明日计划',
  
  -- AI 评估
  ai_score INT COMMENT 'AI评分 0-100',
  ai_suggestions JSON COMMENT 'AI建议',
  
  -- 审批
  approved_by BIGINT COMMENT '审批人',
  approved_at TIMESTAMP COMMENT '审批时间',
  status ENUM('draft', 'submitted', 'approved', 'rejected') DEFAULT 'draft',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY uk_employee_date (employee_id, report_date),
  INDEX idx_date (report_date),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工作日报表';

-- 绩效记录表
CREATE TABLE IF NOT EXISTS performance_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  employee_id BIGINT NOT NULL COMMENT '员工ID',
  period VARCHAR(20) NOT NULL COMMENT '考核周期',
  period_type ENUM('daily', 'weekly', 'monthly', 'quarterly', 'yearly') COMMENT '周期类型',
  
  -- 业绩指标
  revenue DECIMAL(10,2) DEFAULT 0 COMMENT '销售额',
  deals_count INT DEFAULT 0 COMMENT '成交数',
  avg_deal_value DECIMAL(10,2) DEFAULT 0 COMMENT '客单价',
  new_customers INT DEFAULT 0 COMMENT '新增客户数',
  
  -- 过程指标
  followup_count INT DEFAULT 0 COMMENT '跟进次数',
  response_time INT DEFAULT 0 COMMENT '平均响应时间(分钟)',
  customer_satisfaction DECIMAL(3,2) DEFAULT 0 COMMENT '客户满意度',
  completion_rate DECIMAL(3,2) DEFAULT 0 COMMENT '任务完成率',
  
  -- 能力指标
  learning_hours INT DEFAULT 0 COMMENT '学习时长',
  team_contribution INT DEFAULT 0 COMMENT '团队贡献分',
  innovation_score INT DEFAULT 0 COMMENT '创新分',
  
  -- 综合评分
  total_score DECIMAL(5,2) COMMENT '总分',
  rank INT COMMENT '排名',
  level VARCHAR(20) COMMENT '等级 S/A/B/C/D',
  
  -- 奖惩
  bonus DECIMAL(10,2) DEFAULT 0 COMMENT '奖金',
  penalty DECIMAL(10,2) DEFAULT 0 COMMENT '罚款',
  
  -- AI 分析
  ai_analysis JSON COMMENT 'AI分析',
  improvement_suggestions JSON COMMENT '改进建议',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY uk_employee_period (employee_id, period),
  INDEX idx_period (period),
  INDEX idx_score (total_score),
  INDEX idx_rank (rank)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='绩效记录表';

-- 奖惩记录表
CREATE TABLE IF NOT EXISTS reward_penalty_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  employee_id BIGINT NOT NULL COMMENT '员工ID',
  type ENUM('reward', 'penalty') NOT NULL COMMENT '类型',
  category VARCHAR(50) COMMENT '类别',
  amount DECIMAL(10,2) COMMENT '金额',
  points INT COMMENT '积分',
  reason TEXT COMMENT '原因',
  evidence JSON COMMENT '证据',
  
  -- 审批
  submitted_by BIGINT COMMENT '提交人',
  approved_by BIGINT COMMENT '审批人',
  approved_at TIMESTAMP COMMENT '审批时间',
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  reject_reason TEXT COMMENT '拒绝原因',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_employee (employee_id),
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='奖惩记录表';

-- 团队奖金池表
CREATE TABLE IF NOT EXISTS team_bonus_pool (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  period VARCHAR(20) NOT NULL COMMENT '周期',
  department_id BIGINT COMMENT '部门ID',
  
  -- 金额
  total_amount DECIMAL(10,2) DEFAULT 0 COMMENT '总金额',
  distributed_amount DECIMAL(10,2) DEFAULT 0 COMMENT '已分配金额',
  remaining_amount DECIMAL(10,2) DEFAULT 0 COMMENT '剩余金额',
  
  -- 规则
  rules JSON COMMENT '分配规则',
  distribution_records JSON COMMENT '分配记录',
  
  -- 状态
  status ENUM('active', 'distributing', 'distributed', 'closed') DEFAULT 'active',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_period (period),
  INDEX idx_department (department_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='团队奖金池表';

-- 3. 智能表单相关表
-- ============================================

-- 表单模板表
CREATE TABLE IF NOT EXISTS form_templates (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL COMMENT '表单名称',
  description TEXT COMMENT '表单描述',
  industry VARCHAR(50) COMMENT '行业类型',
  scenario VARCHAR(50) COMMENT '应用场景',
  
  -- 表单配置
  fields JSON NOT NULL COMMENT '字段配置',
  validation_rules JSON COMMENT '验证规则',
  ai_config JSON COMMENT 'AI配置',
  
  -- 样式
  theme JSON COMMENT '主题配置',
  
  -- 状态
  is_active BOOLEAN DEFAULT TRUE COMMENT '是否启用',
  is_template BOOLEAN DEFAULT FALSE COMMENT '是否为模板',
  usage_count INT DEFAULT 0 COMMENT '使用次数',
  
  created_by BIGINT COMMENT '创建人',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_industry (industry),
  INDEX idx_scenario (scenario),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='表单模板表';

-- 表单提交记录表
CREATE TABLE IF NOT EXISTS form_submissions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  form_id BIGINT NOT NULL COMMENT '表单ID',
  customer_id BIGINT COMMENT '客户ID',
  
  -- 提交数据
  data JSON NOT NULL COMMENT '提交数据',
  
  -- 来源信息
  source VARCHAR(50) COMMENT '来源',
  ip VARCHAR(50) COMMENT 'IP地址',
  user_agent TEXT COMMENT 'User Agent',
  
  -- AI 处理
  ai_processed BOOLEAN DEFAULT FALSE COMMENT '是否AI处理',
  ai_result JSON COMMENT 'AI处理结果',
  quality_score INT COMMENT '质量评分',
  
  -- 状态
  status ENUM('pending', 'processed', 'converted', 'invalid') DEFAULT 'pending',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_form (form_id),
  INDEX idx_customer (customer_id),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='表单提交记录表';

-- 4. 通讯记录表
-- ============================================

-- 短信记录表
CREATE TABLE IF NOT EXISTS sms_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL COMMENT '客户ID',
  phone VARCHAR(20) NOT NULL COMMENT '手机号',
  
  -- 短信内容
  template_id VARCHAR(50) COMMENT '模板ID',
  content TEXT NOT NULL COMMENT '短信内容',
  variables JSON COMMENT '变量',
  
  -- 发送信息
  sent_by BIGINT COMMENT '发送人',
  sent_at TIMESTAMP COMMENT '发送时间',
  
  -- 状态
  status ENUM('pending', 'sent', 'delivered', 'failed') DEFAULT 'pending',
  error_message TEXT COMMENT '错误信息',
  
  -- 效果
  is_read BOOLEAN DEFAULT FALSE COMMENT '是否已读',
  read_at TIMESTAMP COMMENT '阅读时间',
  is_clicked BOOLEAN DEFAULT FALSE COMMENT '是否点击',
  clicked_at TIMESTAMP COMMENT '点击时间',
  
  -- 成本
  cost DECIMAL(6,4) COMMENT '成本',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_customer (customer_id),
  INDEX idx_phone (phone),
  INDEX idx_status (status),
  INDEX idx_sent (sent_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='短信记录表';

-- 通话记录表
CREATE TABLE IF NOT EXISTS call_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL COMMENT '客户ID',
  employee_id BIGINT NOT NULL COMMENT '员工ID',
  
  -- 通话信息
  phone VARCHAR(20) NOT NULL COMMENT '手机号',
  direction ENUM('inbound', 'outbound') COMMENT '呼叫方向',
  duration INT COMMENT '通话时长(秒)',
  
  -- 录音
  recording_url VARCHAR(500) COMMENT '录音URL',
  transcript TEXT COMMENT '通话文字稿',
  
  -- AI 分析
  ai_analysis JSON COMMENT 'AI分析结果',
  sentiment_score DECIMAL(3,2) COMMENT '情感分数',
  intent_detected VARCHAR(100) COMMENT '检测到的意图',
  keywords JSON COMMENT '关键词',
  
  -- 状态
  status ENUM('ringing', 'answered', 'no_answer', 'busy', 'failed') COMMENT '状态',
  
  -- 时间
  started_at TIMESTAMP COMMENT '开始时间',
  ended_at TIMESTAMP COMMENT '结束时间',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_customer (customer_id),
  INDEX idx_employee (employee_id),
  INDEX idx_started (started_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='通话记录表';

-- 5. AI 模型和预测表
-- ============================================

-- AI 预测记录表
CREATE TABLE IF NOT EXISTS ai_predictions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL COMMENT '客户ID',
  prediction_type VARCHAR(50) NOT NULL COMMENT '预测类型',
  
  -- 预测结果
  prediction_value DECIMAL(10,2) COMMENT '预测值',
  probability DECIMAL(3,2) COMMENT '概率',
  confidence DECIMAL(3,2) COMMENT '置信度',
  
  -- 详细信息
  details JSON COMMENT '详细信息',
  factors JSON COMMENT '影响因素',
  suggestions JSON COMMENT '建议',
  
  -- 验证
  actual_value DECIMAL(10,2) COMMENT '实际值',
  is_accurate BOOLEAN COMMENT '是否准确',
  
  -- 模型信息
  model_version VARCHAR(50) COMMENT '模型版本',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP COMMENT '过期时间',
  
  INDEX idx_customer (customer_id),
  INDEX idx_type (prediction_type),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI预测记录表';

-- 6. 系统配置表
-- ============================================

-- 系统配置表
CREATE TABLE IF NOT EXISTS system_configs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  config_key VARCHAR(100) UNIQUE NOT NULL COMMENT '配置键',
  config_value TEXT COMMENT '配置值',
  config_type VARCHAR(50) COMMENT '配置类型',
  description TEXT COMMENT '描述',
  is_encrypted BOOLEAN DEFAULT FALSE COMMENT '是否加密',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_key (config_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统配置表';

-- 操作日志表
CREATE TABLE IF NOT EXISTS operation_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT COMMENT '用户ID',
  action VARCHAR(100) NOT NULL COMMENT '操作',
  resource_type VARCHAR(50) COMMENT '资源类型',
  resource_id BIGINT COMMENT '资源ID',
  details JSON COMMENT '详情',
  ip VARCHAR(50) COMMENT 'IP地址',
  user_agent TEXT COMMENT 'User Agent',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_user (user_id),
  INDEX idx_action (action),
  INDEX idx_resource (resource_type, resource_id),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';
