// 知识库文档类型定义
export interface KnowledgeDocument {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  lastUpdated: string
}

// 模拟知识库数据（实际应用中应从数据库获取）
export const knowledgeBase: KnowledgeDocument[] = [
  {
    id: "kb-001",
    title: "如何升级订阅方案",
    content: `
      升级订阅方案步骤：
      1. 登录您的 YYC³ 账户
      2. 进入"账户设置" > "订阅管理"
      3. 选择您想要升级的方案（专业版或企业版）
      4. 确认价格和功能差异
      5. 选择支付方式完成升级
      
      升级后立即生效，您将获得新方案的所有功能。
      如果您是从免费版升级，系统会按比例计算剩余时间的费用。
      
      支持的支付方式：信用卡、支付宝、微信支付、企业转账
    `,
    category: "账户管理",
    tags: ["订阅", "升级", "付费"],
    lastUpdated: "2024-12-20",
  },
  {
    id: "kb-002",
    title: "智能数据分析功能使用指南",
    content: `
      智能数据分析助手可以帮您：
      - 通过自然语言查询业务数据
      - 自动生成数据可视化图表
      - 获得 AI 驱动的数据洞察
      
      使用方法：
      1. 进入"智能分析"页面
      2. 在对话框中输入您的问题，例如："显示本月销售额趋势"
      3. AI 会自动理解您的意图，查询数据并生成图表
      4. 您可以继续追问，进行深入分析
      
      支持的查询类型：
      - 趋势分析：销售趋势、用户增长等
      - 对比分析：同比、环比数据对比
      - 分布分析：地区分布、产品分布等
      - 异常检测：识别数据异常和潜在问题
    `,
    category: "产品功能",
    tags: ["数据分析", "AI", "可视化"],
    lastUpdated: "2024-12-22",
  },
  {
    id: "kb-003",
    title: "账户安全与密码重置",
    content: `
      密码重置步骤：
      1. 在登录页面点击"忘记密码"
      2. 输入您的注册邮箱
      3. 查收重置密码邮件（请检查垃圾邮件文件夹）
      4. 点击邮件中的重置链接
      5. 设置新密码（至少8位，包含字母和数字）
      
      账户安全建议：
      - 启用双因素认证（2FA）
      - 定期更换密码
      - 不要在公共设备上保存密码
      - 警惕钓鱼邮件
      
      如果您无法访问注册邮箱，请联系客服团队协助处理。
    `,
    category: "账户安全",
    tags: ["密码", "安全", "重置"],
    lastUpdated: "2024-12-18",
  },
  {
    id: "kb-004",
    title: "支付方式与发票管理",
    content: `
      支持的支付方式：
      1. 信用卡/借记卡（Visa、Mastercard、银联）
      2. 支付宝
      3. 微信支付
      4. 企业转账（仅限企业版用户）
      
      发票申请：
      - 登录后进入"账户设置" > "发票管理"
      - 填写发票抬头信息
      - 选择需要开票的订单
      - 系统会在3个工作日内发送电子发票到您的邮箱
      
      退款政策：
      - 7天无理由退款（未使用核心功能）
      - 退款将原路返回到支付账户
      - 处理时间：3-7个工作日
    `,
    category: "计费问题",
    tags: ["支付", "发票", "退款"],
    lastUpdated: "2024-12-15",
  },
  {
    id: "kb-005",
    title: "AI 协作助手使用指南",
    content: `
      AI 协作助手功能：
      
      1. 会议纪要自动生成
      - 上传会议录音或输入会议内容
      - AI 自动提取关键讨论点
      - 生成结构化纪要，包含决策事项和待办任务
      
      2. 智能任务分配
      - 创建任务并描述需求
      - AI 分析团队成员技能和工作负载
      - 推荐最合适的任务分配方案
      
      3. 团队协作优化
      - 识别协作瓶颈
      - 提供流程优化建议
      - 自动化重复性工作
      
      适用场景：项目管理、团队协作、会议管理
    `,
    category: "产品功能",
    tags: ["AI", "协作", "任务管理"],
    lastUpdated: "2024-12-23",
  },
  {
    id: "kb-006",
    title: "数据隐私与安全保护",
    content: `
      YYC³ 的数据安全承诺：
      
      1. 数据加密
      - 传输加密：所有数据使用 TLS 1.3 加密传输
      - 存储加密：敏感数据采用 AES-256 加密存储
      
      2. 隐私保护
      - 遵守 GDPR 和中国数据保护法规
      - 用户数据不会用于 AI 模型训练
      - 支持数据导出和删除请求
      
      3. 访问控制
      - 基于角色的权限管理
      - 操作日志审计
      - 异常登录检测和通知
      
      4. 合规认证
      - ISO 27001 信息安全管理认证
      - SOC 2 Type II 认证
      - 定期安全审计
    `,
    category: "安全与隐私",
    tags: ["安全", "隐私", "合规"],
    lastUpdated: "2024-12-10",
  },
]

// 简单的文本相似度计算（实际应用中应使用向量嵌入）
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\s+/)
  const words2 = text2.toLowerCase().split(/\s+/)

  const commonWords = words1.filter((word) => words2.includes(word))
  const similarity = commonWords.length / Math.max(words1.length, words2.length)

  return similarity
}

// 搜索知识库
export function searchKnowledgeBase(query: string, limit = 5): KnowledgeDocument[] {
  // 计算每个文档与查询的相似度
  const scoredDocs = knowledgeBase.map((doc) => {
    const titleScore = calculateSimilarity(query, doc.title) * 2 // 标题权重更高
    const contentScore = calculateSimilarity(query, doc.content)
    const tagScore = doc.tags.some((tag) => query.toLowerCase().includes(tag.toLowerCase())) ? 0.5 : 0

    return {
      doc,
      score: titleScore + contentScore + tagScore,
    }
  })

  // 按相似度排序并返回前 N 个结果
  return scoredDocs
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0.1) // 过滤掉相似度太低的结果
    .slice(0, limit)
    .map((item) => item.doc)
}

// 按类别获取文档
export function getDocumentsByCategory(category: string): KnowledgeDocument[] {
  return knowledgeBase.filter((doc) => doc.category === category)
}

// 获取所有类别
export function getAllCategories(): string[] {
  return Array.from(new Set(knowledgeBase.map((doc) => doc.category)))
}

// 获取单个文档
export function getDocumentById(id: string): KnowledgeDocument | undefined {
  return knowledgeBase.find((doc) => doc.id === id)
}
