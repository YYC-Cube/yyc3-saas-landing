import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingUp, Users, Calendar, DollarSign, MessageSquare } from "lucide-react"

export default function RetailSolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* 英雄区 */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-balance">
              实体销售服务行业
              <span className="block mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                AI 智能解决方案
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              为零售、餐饮、美容、健身、教育培训等实体商家提供全方位 AI 智能服务
              <br />
              降本增效，提升竞争力，开启智能化经营新时代
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="rounded-xl">
                立即体验
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl bg-transparent">
                查看演示
              </Button>
            </div>
          </div>
        </section>

        {/* 核心功能模块 */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">核心 AI 功能模块</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Package className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>智能库存管理</CardTitle>
                <CardDescription>AI 预测需求，自动补货建议，减少积压和缺货</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 需求预测准确率 90%+</li>
                  <li>• 库存周转率提升 40%</li>
                  <li>• 缺货率下降 60%</li>
                  <li>• 滞销品智能预警</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <TrendingUp className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>客流分析与排班</CardTitle>
                <CardDescription>实时客流监测，智能人员排班，提升运营效率</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 客流预测精准度 85%+</li>
                  <li>• 人力成本降低 25%</li>
                  <li>• 服务响应速度提升 50%</li>
                  <li>• 热力图分析优化陈列</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Users className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>会员运营与营销</CardTitle>
                <CardDescription>智能会员分层，精准营销推荐，提升复购率</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 会员活跃度提升 60%</li>
                  <li>• 营销转化率提升 3 倍</li>
                  <li>• 流失率下降 40%</li>
                  <li>• 个性化推荐准确率 80%+</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Calendar className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>智能预约调度</CardTitle>
                <CardDescription>优化预约流程，减少爽约，提升资源利用率</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 爽约率下降 50%</li>
                  <li>• 资源利用率提升 30%</li>
                  <li>• 预约冲突自动解决</li>
                  <li>• 续费率提升 35%</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <DollarSign className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>财务分析与控制</CardTitle>
                <CardDescription>成本结构分析，利润优化建议，现金流管理</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 成本降低 20%</li>
                  <li>• 利润率提升 25%</li>
                  <li>• 现金流预测准确率 90%+</li>
                  <li>• 动态定价优化</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <MessageSquare className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>客户反馈分析</CardTitle>
                <CardDescription>多渠道反馈整合，情感分析，自动改进建议</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 客户满意度提升 40%</li>
                  <li>• 问题响应速度提升 5 倍</li>
                  <li>• 自动生成改进方案</li>
                  <li>• 危机预警准确率 85%+</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 行业解决方案 */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">行业定制解决方案</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">零售行业</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">核心痛点</h4>
                  <p className="text-sm text-muted-foreground">库存积压、缺货频繁、客流预测不准、会员运营粗放</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI 解决方案</h4>
                  <p className="text-sm text-muted-foreground">智能库存管理 + 客流分析 + 会员精准营销 + 动态定价</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">预期效果</h4>
                  <p className="text-sm text-muted-foreground">库存周转率提升 40%，营收增长 30%，人力成本降低 25%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">餐饮行业</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">核心痛点</h4>
                  <p className="text-sm text-muted-foreground">食材浪费严重、菜品优化难、排队体验差、外卖运营弱</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI 解决方案</h4>
                  <p className="text-sm text-muted-foreground">智能菜单优化 + 食材需求预测 + 动态定价 + 客流管理</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">预期效果</h4>
                  <p className="text-sm text-muted-foreground">食材浪费减少 35%，利润率提升 25%，翻台率提升 40%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">美容健身</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">核心痛点</h4>
                  <p className="text-sm text-muted-foreground">预约冲突频繁、爽约率高、教练利用率低、续费率低</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI 解决方案</h4>
                  <p className="text-sm text-muted-foreground">智能预约调度 + 爽约预测 + 资源优化 + 续费预测</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">预期效果</h4>
                  <p className="text-sm text-muted-foreground">爽约率下降 50%，资源利用率提升 30%，续费率提升 35%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">教育培训</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">核心痛点</h4>
                  <p className="text-sm text-muted-foreground">招生获客难、课程排期复杂、学员管理粗放、续费率低</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI 解决方案</h4>
                  <p className="text-sm text-muted-foreground">
                    智能排课系统 + 学员画像分析 + 个性化学习方案 + 续费预测
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">预期效果</h4>
                  <p className="text-sm text-muted-foreground">获客成本降低 40%，续费率提升 45%，学员满意度提升 50%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA 区域 */}
        <section className="container mx-auto px-4 py-16">
          <Card className="border-border/50 bg-gradient-to-br from-background to-muted/20">
            <CardContent className="py-16 text-center">
              <h2 className="text-4xl font-bold mb-6">开启智能化经营新时代</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                立即预约演示，了解 YYC³ 如何帮助您的实体店铺降本增效
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="rounded-xl">
                  预约演示
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl bg-transparent">
                  联系销售
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
