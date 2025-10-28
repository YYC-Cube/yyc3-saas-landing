"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "什么是 YYC³？它是如何工作的?",
    answer:
      "YYC³ 是一个综合性的 SaaS 平台，旨在简化您的业务运营流程。它将项目管理、团队协作、数据分析和自动化工具整合在一个统一的仪表板中。只需注册账号、邀请团队成员，即可通过我们直观的界面开始组织您的工作流程。",
  },
  {
    question: "我可以在付费之前试用 YYC³ 吗?",
    answer:
      "我们为所有方案提供 14 天免费试用，无需信用卡。在试用期间，您将拥有所有功能的完整访问权限，并且可以随时升级或取消。",
  },
  {
    question: "我的数据在 YYC³ 中有多安全?",
    answer:
      "安全是我们的首要任务。我们使用银行级加密技术，符合 SOC 2 Type II 标准，并提供双因素认证、SSO 集成和定期安全审计等功能。您的数据存储在安全、冗余的数据中心，保证 99.9% 的正常运行时间。",
  },
  {
    question: "YYC³ 可以与我现有的工具集成吗?",
    answer:
      "可以！YYC³ 与 100 多种流行工具集成，包括钉钉、企业微信、飞书、Salesforce、Zapier 等。我们的 API 还允许进行自定义集成，以适应您的特定工作流程需求。",
  },
  {
    question: "你们提供什么样的技术支持?",
    answer:
      "我们为所有方案提供全面的支持，包括邮件支持、专业版的优先支持，以及企业客户的 7×24 专属支持。我们还提供详尽的文档、视频教程和在线培训课程。",
  },
  {
    question: "我可以随时更改方案吗?",
    answer:
      "可以，您可以随时升级或降级方案。升级时，您将立即支付按比例计算的差额。降级时，更改将在下一个计费周期生效，您将继续使用当前方案的功能直到那时。",
  },
  {
    question: "你们提供退款吗?",
    answer:
      "我们为所有付费方案提供 30 天退款保证。如果您在订阅的前 30 天内对 YYC³ 不满意，请联系我们的支持团队申请全额退款。",
  },
  {
    question: "项目或用户数量有限制吗?",
    answer:
      "限制取决于您的方案。入门版支持最多 5 名用户和 10 个项目，专业版支持最多 25 名用户和无限项目，而企业版提供无限用户和项目。详细信息请查看我们的价格页面。",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            常见问题解答
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            关于 YYC³ 您需要了解的一切。找不到您要的答案？请联系我们的支持团队
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-border/20 rounded-lg bg-card/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </section>
  )
}
