-- 创建隐私设置表
CREATE TABLE IF NOT EXISTS user_privacy_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  allow_ai_processing BOOLEAN DEFAULT true,
  allow_data_collection BOOLEAN DEFAULT true,
  allow_personalization BOOLEAN DEFAULT true,
  data_retention_days INTEGER DEFAULT 90,
  auto_delete_history BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建数据处理审计日志表
CREATE TABLE IF NOT EXISTS data_processing_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,
  data_type VARCHAR(100) NOT NULL,
  purpose TEXT NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 AI 使用日志表
CREATE TABLE IF NOT EXISTS ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  feature VARCHAR(100) NOT NULL,
  model VARCHAR(100),
  tokens_used INTEGER DEFAULT 0,
  latency_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  cost_usd DECIMAL(10, 6),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提升查询性能
CREATE INDEX IF NOT EXISTS idx_data_logs_user_id ON data_processing_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_data_logs_created_at ON data_processing_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_usage_user_id ON ai_usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_usage_feature ON ai_usage_logs(feature);
CREATE INDEX IF NOT EXISTS idx_ai_usage_created_at ON ai_usage_logs(created_at);

-- 创建自动更新时间戳的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_privacy_settings_updated_at
  BEFORE UPDATE ON user_privacy_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 添加注释
COMMENT ON TABLE user_privacy_settings IS '用户隐私设置表';
COMMENT ON TABLE data_processing_logs IS '数据处理审计日志表';
COMMENT ON TABLE ai_usage_logs IS 'AI 功能使用日志表';
