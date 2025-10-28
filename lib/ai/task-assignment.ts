/**
 * 智能任务分配算法
 * 使用 AI 模型分析团队成员能力和任务需求，推荐最佳分配方案
 */

export interface TeamMember {
  id: string
  name: string
  skills: string[]
  currentWorkload: number // 0-100
  availability: number // 0-100
}

export interface Task {
  id: string
  title: string
  description?: string
  requiredSkills: string[]
  priority: "low" | "medium" | "high"
  estimatedHours: number
}

export interface AssignmentResult {
  assignedTo: string
  reasoning: string
  confidence: number
  alternativeAssignees?: Array<{
    name: string
    reason: string
  }>
}

/**
 * 计算技能匹配度
 * @param memberSkills 成员技能列表
 * @param requiredSkills 任务所需技能列表
 * @returns 匹配度分数 (0-1)
 */
export function calculateSkillMatch(memberSkills: string[], requiredSkills: string[]): number {
  if (requiredSkills.length === 0) return 0.5 // 无特定技能要求时返回中等匹配度

  const matchedSkills = requiredSkills.filter((skill) =>
    memberSkills.some((memberSkill) => memberSkill.toLowerCase().includes(skill.toLowerCase())),
  )

  return matchedSkills.length / requiredSkills.length
}

/**
 * 计算工作负载分数
 * @param currentWorkload 当前工作负载 (0-100)
 * @returns 负载分数 (0-1)，越低越好
 */
export function calculateWorkloadScore(currentWorkload: number): number {
  return 1 - currentWorkload / 100
}

/**
 * 计算可用性分数
 * @param availability 可用性 (0-100)
 * @returns 可用性分数 (0-1)
 */
export function calculateAvailabilityScore(availability: number): number {
  return availability / 100
}

/**
 * 计算综合匹配分数
 * @param member 团队成员
 * @param task 任务
 * @returns 综合分数 (0-1)
 */
export function calculateOverallScore(member: TeamMember, task: Task): number {
  const skillMatch = calculateSkillMatch(member.skills, task.requiredSkills)
  const workloadScore = calculateWorkloadScore(member.currentWorkload)
  const availabilityScore = calculateAvailabilityScore(member.availability)

  // 根据任务优先级调整权重
  let skillWeight = 0.5
  let workloadWeight = 0.3
  let availabilityWeight = 0.2

  if (task.priority === "high") {
    // 高优先级任务更看重技能匹配
    skillWeight = 0.6
    workloadWeight = 0.2
    availabilityWeight = 0.2
  } else if (task.priority === "low") {
    // 低优先级任务更看重工作负载平衡
    skillWeight = 0.3
    workloadWeight = 0.5
    availabilityWeight = 0.2
  }

  return skillMatch * skillWeight + workloadScore * workloadWeight + availabilityScore * availabilityWeight
}

/**
 * 本地算法：为任务推荐最佳团队成员
 * 这是一个备用方案，当 AI API 不可用时使用
 * @param task 任务信息
 * @param teamMembers 团队成员列表
 * @returns 推荐结果
 */
export function recommendAssignment(task: Task, teamMembers: TeamMember[]): AssignmentResult {
  // 计算每个成员的匹配分数
  const scores = teamMembers.map((member) => ({
    member,
    score: calculateOverallScore(member, task),
    skillMatch: calculateSkillMatch(member.skills, task.requiredSkills),
  }))

  // 按分数排序
  scores.sort((a, b) => b.score - a.score)

  const best = scores[0]
  const alternatives = scores.slice(1, 3)

  // 生成推荐理由
  let reasoning = `${best.member.name} 是最佳人选，因为：`
  const reasons: string[] = []

  if (best.skillMatch > 0.7) {
    reasons.push(`技能高度匹配（${Math.round(best.skillMatch * 100)}%）`)
  } else if (best.skillMatch > 0.3) {
    reasons.push(`具备相关技能`)
  }

  if (best.member.currentWorkload < 50) {
    reasons.push(`当前工作负载较低（${best.member.currentWorkload}%）`)
  }

  if (best.member.availability > 60) {
    reasons.push(`可用时间充足（${best.member.availability}%）`)
  }

  reasoning += reasons.join("，") + "。"

  return {
    assignedTo: best.member.name,
    reasoning,
    confidence: best.score,
    alternativeAssignees: alternatives.map((alt) => ({
      name: alt.member.name,
      reason: `匹配度 ${Math.round(alt.score * 100)}%`,
    })),
  }
}
