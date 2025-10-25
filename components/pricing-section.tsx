"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Check, ArrowRight } from "lucide-react"

const pricingPlans = [
  {
    name: "入门版",
    price: "¥199",
    period: "/月",
    description: "适合小型团队快速启动",
    features: ["最多 5 名团队成员", "10GB 存储空间", "基础数据分析", "邮件支持", "标准集成"],
    popular: false,
  },
  {
    name: "专业版",
    price: "¥599",
    period: "/月",
    description: "成长型企业的最佳选择",
    features: [
      "最多 25 名团队成员",
      "100GB 存储空间",
      "高级数据分析",
      "优先技术支持",
      "全部集成功能",
      "自定义工作流",
      "API 访问权限",
    ],
    popular: true,
  },
  {
    name: "企业版",
    price: "定制",
    period: "",
    description: "大型组织专属方案",
    features: [
      "无限团队成员",
      "无限存储空间",
      "企业级数据分析",
      "7×24 专属支持",
      "定制化集成",
      "高级安全功能",
      "SLA 服务保障",
      "私有化部署",
    ],
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            简单透明的价格方案
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            选择最适合您业务需求的方案，无隐藏费用，无意外收费
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-card border rounded-lg p-8 ${
                plan.popular ? "border-white/30 bg-white/5" : "border-border/20 bg-background/50"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">最受欢迎</span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-transparent border border-white/20 text-white hover:bg-white/10"
                } group`}
                size="lg"
              >
                {plan.name === "企业版" ? "联系销售" : "立即开始"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">所有方案均包含 14 天免费试用 • 无需信用卡</p>
          <p className="text-sm text-gray-500">
            需要定制方案？{" "}
            <a href="#" className="text-white hover:underline">
              联系我们的销售团队
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
