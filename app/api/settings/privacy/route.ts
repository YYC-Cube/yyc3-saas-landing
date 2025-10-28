import { type NextRequest, NextResponse } from "next/server"
import { DEFAULT_PRIVACY_SETTINGS, type PrivacySettings } from "@/lib/ai/data-privacy"

// 获取用户隐私设置
export async function GET(req: NextRequest) {
  try {
    // 这里应该从数据库获取用户设置
    // const userId = await getUserId(req)
    // const settings = await getPrivacySettings(userId)

    // 暂时返回默认设置
    return NextResponse.json({
      success: true,
      data: DEFAULT_PRIVACY_SETTINGS,
    })
  } catch (error) {
    console.error("获取隐私设置失败:", error)
    return NextResponse.json({ success: false, error: "获取设置失败" }, { status: 500 })
  }
}

// 更新用户隐私设置
export async function POST(req: NextRequest) {
  try {
    const settings: PrivacySettings = await req.json()

    // 验证设置
    if (typeof settings.allowAIProcessing !== "boolean") {
      return NextResponse.json({ success: false, error: "无效的设置参数" }, { status: 400 })
    }

    // 这里应该保存到数据库
    // const userId = await getUserId(req)
    // await updatePrivacySettings(userId, settings)

    console.log("[隐私设置更新]", settings)

    return NextResponse.json({
      success: true,
      message: "设置已保存",
    })
  } catch (error) {
    console.error("保存隐私设置失败:", error)
    return NextResponse.json({ success: false, error: "保存设置失败" }, { status: 500 })
  }
}
