-- 创建知识库文档表
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  embedding vector(1536), -- OpenAI 嵌入向量维度
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建向量相似度搜索索引
CREATE INDEX IF NOT EXISTS knowledge_documents_embedding_idx 
ON knowledge_documents 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 创建类别索引
CREATE INDEX IF NOT EXISTS knowledge_documents_category_idx 
ON knowledge_documents(category);

-- 创建全文搜索索引
CREATE INDEX IF NOT EXISTS knowledge_documents_search_idx 
ON knowledge_documents 
USING gin(to_tsvector('chinese', title || ' ' || content));

-- 创建客服工单表
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
  assigned_to TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- 创建工单索引
CREATE INDEX IF NOT EXISTS support_tickets_user_id_idx ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS support_tickets_status_idx ON support_tickets(status);
CREATE INDEX IF NOT EXISTS support_tickets_created_at_idx ON support_tickets(created_at DESC);

-- 创建工单消息表
CREATE TABLE IF NOT EXISTS ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_type TEXT CHECK (sender_type IN ('user', 'agent', 'system')) NOT NULL,
  sender_id TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建工单消息索引
CREATE INDEX IF NOT EXISTS ticket_messages_ticket_id_idx ON ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS ticket_messages_created_at_idx ON ticket_messages(created_at);

-- 插入示例知识库文档
INSERT INTO knowledge_documents (title, content, category, tags) VALUES
('如何升级订阅方案', '升级订阅方案步骤：1. 登录您的 YYC³ 账户...', '账户管理', ARRAY['订阅', '升级', '付费']),
('智能数据分析功能使用指南', '智能数据分析助手可以帮您：通过自然语言查询业务数据...', '产品功能', ARRAY['数据分析', 'AI', '可视化']),
('账户安全与密码重置', '密码重置步骤：1. 在登录页面点击"忘记密码"...', '账户安全', ARRAY['密码', '安全', '重置']),
('支付方式与发票管理', '支持的支付方式：1. 信用卡/借记卡...', '计费问题', ARRAY['支付', '发票', '退款']),
('AI 协作助手使用指南', 'AI 协作助手功能：1. 会议纪要自动生成...', '产品功能', ARRAY['AI', '协作', '任务管理']),
('数据隐私与安全保护', 'YYC³ 的数据安全承诺：1. 数据加密...', '安全与隐私', ARRAY['安全', '隐私', '合规']);
