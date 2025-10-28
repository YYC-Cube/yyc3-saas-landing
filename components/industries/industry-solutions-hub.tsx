"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Utensils,
  TrendingUp,
  Building2,
  Users,
  Heart,
  Film,
  Factory,
  Code,
  Palette,
  GraduationCap,
  Zap,
  Leaf,
  Scale,
  Truck,
  Briefcase,
  Home,
  ShoppingCart,
  Car,
  Plane,
  HeartHandshake,
  Plug,
  Search,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react"

// 行业数据定义
const industries = [
  {
    code: "yyc3-retail",
    name: "智慧零售",
    icon: ShoppingCart,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    priority: 1,
    status: "开发中",
    description: "客户管理、库存优化、智能推荐、会员运营",
    features: ["会员分层管理", "库存智能预测", "精准营销", "客流分析"],
    useCases: ["连锁超市", "便利店", "专卖店", "购物中心"],
  },
  {
    code: "yyc3-fb",
    name: "餐饮服务",
    icon: Utensils,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    priority: 1,
    status: "开发中",
    description: "点餐系统、供应链管理、客户评价分析、营销自动化",
    features: ["智能点餐", "食材预测", "评价分析", "会员营销"],
    useCases: ["连锁餐厅", "快餐店", "咖啡厅", "外卖平台"],
  },
  {
    code: "yyc3-ent",
    name: "实体经管",
    icon: Briefcase,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    priority: 1,
    status: "已上线",
    description: "CRM、团队管理、绩效考核、智能决策",
    features: ["客户生命周期", "团队绩效", "智能表单", "AI预测"],
    useCases: ["销售公司", "服务企业", "咨询公司", "代理商"],
  },
  {
    code: "yyc3-med",
    name: "医疗健康",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    priority: 2,
    status: "规划中",
    description: "患者管理、预约系统、健康档案、智能诊断辅助",
    features: ["电子病历", "智能预约", "健康监测", "医患沟通"],
    useCases: ["诊所", "体检中心", "康复中心", "健康管理"],
  },
  {
    code: "yyc3-edu",
    name: "智能教育",
    icon: GraduationCap,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    priority: 2,
    status: "规划中",
    description: "学员管理、课程推荐、学习分析、智能排课",
    features: ["学员档案", "智能排课", "学习分析", "家校沟通"],
    useCases: ["培训机构", "在线教育", "学校", "早教中心"],
  },
  {
    code: "yyc3-hr",
    name: "人力资源",
    icon: Users,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    priority: 2,
    status: "规划中",
    description: "招聘管理、员工档案、绩效评估、培训管理",
    features: ["智能招聘", "员工管理", "绩效考核", "培训发展"],
    useCases: ["人力公司", "企业HR", "猎头公司", "外包服务"],
  },
  {
    code: "yyc3-log",
    name: "智慧物流",
    icon: Truck,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    priority: 2,
    status: "规划中",
    description: "订单跟踪、路线优化、仓储管理、配送调度",
    features: ["订单管理", "路线优化", "仓储管理", "配送调度"],
    useCases: ["物流公司", "快递企业", "仓储中心", "配送站"],
  },
  {
    code: "yyc3-real",
    name: "地产建筑",
    icon: Home,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    priority: 2,
    status: "规划中",
    description: "项目管理、客户跟进、合同管理、进度监控",
    features: ["项目管理", "客户跟进", "合同管理", "进度监控"],
    useCases: ["房地产", "建筑公司", "装修公司", "物业管理"],
  },
  {
    code: "yyc3-agr",
    name: "智慧农业",
    icon: Leaf,
    color: "text-lime-500",
    bgColor: "bg-lime-500/10",
    priority: 3,
    status: "规划中",
    description: "农场管理、作物监测、智能灌溉、产量预测",
    features: ["农场管理", "作物监测", "智能灌溉", "产量预测"],
    useCases: ["农场", "种植基地", "养殖场", "农业合作社"],
  },
  {
    code: "yyc3-fn",
    name: "股票金融",
    icon: TrendingUp,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    priority: 3,
    status: "规划中",
    description: "投资分析、风险评估、智能投顾、市场预测",
    features: ["投资分析", "风险评估", "智能投顾", "市场预测"],
    useCases: ["证券公司", "投资机构", "财富管理", "金融科技"],
  },
  {
    code: "yyc3-gov",
    name: "智慧城市",
    icon: Building2,
    color: "text-slate-500",
    bgColor: "bg-slate-500/10",
    priority: 3,
    status: "规划中",
    description: "城市管理、公共服务、应急响应、数据分析",
    features: ["城市管理", "公共服务", "应急响应", "数据分析"],
    useCases: ["政府部门", "公共服务", "城市运营", "智慧园区"],
  },
  {
    code: "yyc3-media",
    name: "媒体娱乐",
    icon: Film,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    priority: 3,
    status: "规划中",
    description: "内容管理、用户分析、推荐系统、版权管理",
    features: ["内容管理", "用户分析", "推荐系统", "版权管理"],
    useCases: ["媒体公司", "娱乐平台", "内容创作", "版权运营"],
  },
  {
    code: "yyc3-manu",
    name: "智慧制造",
    icon: Factory,
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    priority: 3,
    status: "规划中",
    description: "生产管理、质量控制、设备监控、供应链优化",
    features: ["生产管理", "质量控制", "设备监控", "供应链优化"],
    useCases: ["制造企业", "工厂", "生产线", "供应链"],
  },
  {
    code: "yyc3-cultural",
    name: "智能文创",
    icon: Palette,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    priority: 3,
    status: "规划中",
    description: "创意管理、项目协作、版权保护、市场分析",
    features: ["创意管理", "项目协作", "版权保护", "市场分析"],
    useCases: ["设计公司", "广告公司", "文创企业", "艺术机构"],
  },
  {
    code: "yyc3-energy",
    name: "能源管理",
    icon: Zap,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    priority: 3,
    status: "规划中",
    description: "能耗监测、优化调度、预测分析、节能建议",
    features: ["能耗监测", "优化调度", "预测分析", "节能建议"],
    useCases: ["能源公司", "电力企业", "节能服务", "智能电网"],
  },
  {
    code: "yyc3-env",
    name: "环境保护",
    icon: Leaf,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    priority: 3,
    status: "规划中",
    description: "环境监测、污染预警、治理方案、数据分析",
    features: ["环境监测", "污染预警", "治理方案", "数据分析"],
    useCases: ["环保企业", "监测机构", "治理公司", "环保部门"],
  },
  {
    code: "yyc3-law",
    name: "法律服务",
    icon: Scale,
    color: "text-stone-500",
    bgColor: "bg-stone-500/10",
    priority: 3,
    status: "规划中",
    description: "案件管理、文书生成、法律咨询、智能检索",
    features: ["案件管理", "文书生成", "法律咨询", "智能检索"],
    useCases: ["律师事务所", "法律咨询", "企业法务", "法律科技"],
  },
  {
    code: "yyc3-tourism",
    name: "旅游酒店",
    icon: Plane,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    priority: 3,
    status: "规划中",
    description: "预订管理、客户服务、营销推广、评价分析",
    features: ["预订管理", "客户服务", "营销推广", "评价分析"],
    useCases: ["酒店", "旅行社", "景区", "OTA平台"],
  },
  {
    code: "yyc3-traffic",
    name: "智能交通",
    icon: Car,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    priority: 3,
    status: "规划中",
    description: "交通监控、路线规划、拥堵预测、调度优化",
    features: ["交通监控", "路线规划", "拥堵预测", "调度优化"],
    useCases: ["交通部门", "出行平台", "车队管理", "智能停车"],
  },
  {
    code: "yyc3-elder",
    name: "智慧养老",
    icon: HeartHandshake,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    priority: 3,
    status: "规划中",
    description: "健康监测、护理管理、紧急响应、家属沟通",
    features: ["健康监测", "护理管理", "紧急响应", "家属沟通"],
    useCases: ["养老院", "护理中心", "居家养老", "康养社区"],
  },
  {
    code: "yyc3-core",
    name: "智能编程",
    icon: Code,
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    priority: 0,
    status: "核心能力",
    description: "核心 AI 引擎、通用能力、技术底座",
    features: ["AI引擎", "数据分析", "工作流", "自动化"],
    useCases: ["技术底座", "通用能力", "核心引擎", "API服务"],
  },
  {
    code: "yyc3-api",
    name: "技术集成",
    icon: Plug,
    color: "text-gray-600",
    bgColor: "bg-gray-600/10",
    priority: 0,
    status: "基础设施",
    description: "统一 API 接口、第三方集成、开放平台",
    features: ["API网关", "第三方集成", "开放平台", "SDK"],
    useCases: ["API服务", "系统集成", "开发者平台", "生态建设"],
  },
]

export default function IndustrySolutionsHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPriority, setSelectedPriority] = useState<number | null>(null)

  const filteredIndustries = industries.filter((industry) => {
    const matchesSearch =
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = selectedPriority === null || industry.priority === selectedPriority
    return matchesSearch && matchesPriority
  })

  const priorityGroups = {
    0: filteredIndustries.filter((i) => i.priority === 0),
    1: filteredIndustries.filter((i) => i.priority === 1),
    2: filteredIndustries.filter((i) => i.priority === 2),
    3: filteredIndustries.filter((i) => i.priority === 3),
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 头部 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">24个行业垂直化解决方案</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">YYC³ 行业解决方案</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          一个平台，多个行业。深度定制的 AI 智能解决方案，助力各行业数字化转型
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索行业解决方案..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs
          value={selectedPriority?.toString() || "all"}
          onValueChange={(v) => setSelectedPriority(v === "all" ? null : Number.parseInt(v))}
        >
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="1">第一梯队</TabsTrigger>
            <TabsTrigger value="2">第二梯队</TabsTrigger>
            <TabsTrigger value="3">第三梯队</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 核心能力 */}
      {priorityGroups[0].length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">核心能力与基础设施</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {priorityGroups[0].map((industry) => (
              <IndustryCard key={industry.code} industry={industry} />
            ))}
          </div>
        </div>
      )}

      {/* 第一梯队 */}
      {priorityGroups[1].length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">第一梯队</h2>
            <Badge variant="default">高优先级 · 6-12个月</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priorityGroups[1].map((industry) => (
              <IndustryCard key={industry.code} industry={industry} />
            ))}
          </div>
        </div>
      )}

      {/* 第二梯队 */}
      {priorityGroups[2].length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">第二梯队</h2>
            <Badge variant="secondary">中优先级 · 12-24个月</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priorityGroups[2].map((industry) => (
              <IndustryCard key={industry.code} industry={industry} />
            ))}
          </div>
        </div>
      )}

      {/* 第三梯队 */}
      {priorityGroups[3].length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">第三梯队</h2>
            <Badge variant="outline">长期规划 · 24个月+</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {priorityGroups[3].map((industry) => (
              <IndustryCard key={industry.code} industry={industry} />
            ))}
          </div>
        </div>
      )}

      {/* 底部 CTA */}
      <Card className="mt-12 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">准备好开始了吗？</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            选择适合您行业的解决方案，或联系我们定制专属方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              免费试用
              
            </Button>
            <Button size="lg" variant="outline">
              联系销售
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function IndustryCard({ industry }: { industry: (typeof industries)[0] }) {
  const Icon = industry.icon

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${industry.bgColor}`}>
            <Icon className={`h-6 w-6 ${industry.color}`} />
          </div>
          <Badge
            variant={industry.status === "已上线" ? "default" : industry.status === "开发中" ? "secondary" : "outline"}
          >
            {industry.status}
          </Badge>
        </div>
        <CardTitle className="text-xl">{industry.name}</CardTitle>
        <CardDescription className="text-sm">{industry.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">核心功能</h4>
            <div className="flex flex-wrap gap-2">
              {industry.features.map((feature) => (
                <Badge key={feature} variant="outline" className="text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">适用场景</h4>
            <p className="text-xs text-muted-foreground">{industry.useCases.join(" · ")}</p>
          </div>
          <Button
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
            variant="outline"
          >
            了解详情
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
