import { PrivacySettings } from "@/components/privacy-settings"

export const metadata = {
  title: "隐私设置 - YYC³",
  description: "管理您的数据隐私和 AI 功能使用偏好",
}

export default function PrivacySettingsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">隐私与数据控制</h1>
        <p className="text-muted-foreground">管理您的数据隐私设置，控制 AI 功能如何使用您的数据</p>
      </div>

      <PrivacySettings />
    </div>
  )
}
