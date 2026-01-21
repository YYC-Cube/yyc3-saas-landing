---
@file: 196-YYC3-SAAS-综合支撑-文档管理规范.md
@description: YYC3-SAAS 项目文档管理规范，包括状态标识、命名规范和管理流程
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-22
@updated: 2026-01-22
@status: published
@tags: [文档管理, 命名规范, 状态标识]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# YYC3-SAAS 文档管理规范

## 概述

本文档定义了 YYC3-SAAS 项目的文档管理规范，包括文档状态标识体系、命名规范、状态转换流程等，旨在有效区分内容完善与待编辑完善的文档，同时保持文档体系的一致性和规范性。

## 一、状态标识体系

### 1. 文件头部元数据状态字段

利用文档头部的 `@status` 字段，定义以下状态值：

| 状态值 | 描述 |
|-------|------|
| `template` | 脚本生成的初始模板，未经过人工编辑 |
| `draft` | 正在编辑中，内容待完善 |
| `review` | 编辑完成，待审核 |
| `published` | 内容完善，已审核通过 |
| `deprecated` | 已废弃，不再维护 |

**示例**：
```markdown
---
@file: 056-YYC3-SAAS-API文档-通用规范-RESTful接口设计标准.md
@description: RESTful API 设计规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-21
@updated: 2026-01-21
@status: template  # 标识为脚本生成模板
@tags: [API设计, RESTful, 通用规范]
---
```

### 2. 生成来源标识

在文件头部添加 `@generated` 字段，明确区分脚本生成与人工编辑的文档：

| 值 | 描述 |
|-----|------|
| `true` | 脚本自动生成 |
| `false` | 人工创建或编辑 |

**示例**：
```markdown
---
@file: 056-YYC3-SAAS-API文档-通用规范-RESTful接口设计标准.md
...
@generated: true  # 标识为脚本生成
@status: template
---
```

### 3. 编辑信息标识

在文件头部添加编辑相关字段，记录文档的编辑历史：

| 字段 | 描述 |
|------|------|
| `@last_editor` | 最后编辑人 |
| `@reviewer` | 审核人 |
| `@edit_count` | 编辑次数 |

**示例**：
```markdown
---
@file: 171-YYC3-SAAS-产品文档-产品白皮书.md
...
@last_editor: 张三
@reviewer: 李四
@edit_count: 3
@status: published
---
```

## 二、命名规范保持与状态体现

### 1. 统一文件名格式

保持现有的命名格式，不通过修改文件名来体现状态：

```
[编号]-YYC3-SAAS-[分类]-[文档名称].md
```

**示例**：
- `056-YYC3-SAAS-API文档-通用规范-RESTful接口设计标准.md`
- `171-YYC3-SAAS-产品文档-产品白皮书.md`
- `196-YYC3-SAAS-综合支撑-文档管理规范.md`

### 2. 编号规则

各类型文档的编号范围保持不变：

| 文档类型 | 编号范围 |
|---------|---------|
| API 文档 | 056-075 |
| 架构设计文档 | 021-035 |
| 开发阶段文档 | 096-115 |
| 测试验证文档 | 116-135 |
| 产品文档 | 171-180 |
| 综合支撑文档 | 181-200 |

### 3. 目录结构辅助区分

在每个文档子目录下可创建可选的状态子目录，用于临时存放不同状态的文档（非必须，视团队需求而定）：

```
docs/YYC3-SAAS-产品文档/
├── published/  # 内容完善的文档
├── draft/      # 待编辑完善的文档
├── template/   # 脚本生成的模板
└── README.md
```

## 三、文档映射目录文件增强

### 1. 扩展映射文件结构

在 `YYC3-SAAS-文档目录映射.md` 中添加状态列，记录每个文档的当前状态：

| 文档名称 | 说明 | 路径 | 状态 | 最后更新 |
|---------|------|------|------|----------|
| RESTful接口设计标准 | RESTful API 设计规范 | /docs/YYC3-SAAS-API文档/056-YYC3-SAAS-API文档-通用规范-RESTful接口设计标准.md | template | 2026-01-21 |
| 产品白皮书 | 产品整体介绍和价值主张 | /docs/YYC3-SAAS-产品文档/171-YYC3-SAAS-产品文档-产品白皮书.md | published | 2026-01-20 |

### 2. 状态统计与汇总

在映射文件中添加状态统计部分，便于团队快速了解文档整体状态：

```markdown
## 文档状态统计

| 状态 | 数量 | 占比 |
|------|------|------|
| published | 15 | 30% |
| draft | 20 | 40% |
| template | 10 | 20% |
| review | 5 | 10% |
```

## 四、文档状态转换流程

### 1. 脚本生成阶段

1. **生成文档**：脚本生成文档时，自动添加以下字段：
   - `@status: template`
   - `@generated: true`
   - `@created: [生成日期]`
   - `@updated: [生成日期]`

2. **分类存放**：将生成的文档放入对应分类目录

### 2. 编辑完善阶段

1. **开始编辑**：编辑者从模板开始编辑，更新字段：
   - `@status: draft`
   - `@updated: [编辑日期]`
   - `@last_editor: [编辑人]`
   - `@edit_count: 1`（首次编辑）

2. **持续编辑**：每次编辑后更新：
   - `@updated: [最新编辑日期]`
   - `@edit_count: [当前次数+1]`

3. **编辑完成**：编辑完成后，更新：
   - `@status: review`
   - `@updated: [完成日期]`

### 3. 审核发布阶段

1. **审核中**：审核人审核文档内容

2. **审核通过**：审核通过后，更新：
   - `@status: published`
   - `@updated: [审核日期]`
   - `@reviewer: [审核人]`
   - 在映射文件中同步更新文档状态

3. **审核不通过**：审核不通过时，更新：
   - `@status: draft`
   - 添加修改建议
   - 通知编辑人重新修改

### 4. 废弃阶段

当文档不再适用时，更新：
- `@status: deprecated`
- `@updated: [废弃日期]`
- 添加废弃原因

## 五、自动化工具支持

### 1. 文档状态检查脚本

创建脚本定期扫描文档目录，检查：
- 未更新状态的模板文档
- 长期处于 `draft` 状态的文档
- 状态与内容不匹配的文档
- 映射文件与实际状态不同步的情况

### 2. 映射文件自动生成脚本

定期根据文档实际状态自动更新 `YYC3-SAAS-文档目录映射.md`，确保映射文件与实际状态同步。

### 3. 文档状态报告

生成定期报告，统计：
- 各状态文档数量及占比
- 最近更新的文档
- 需要关注的文档（如长期未更新的）

## 六、示例：从模板到发布的状态转换

### 1. 脚本生成模板

```markdown
---
@file: 171-YYC3-SAAS-产品文档-产品白皮书.md
@description: 产品整体介绍和价值主张
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-21
@updated: 2026-01-21
@status: template
@generated: true
@tags: [产品文档, 白皮书]
---
```

### 2. 编辑中（Draft）

```markdown
---
@file: 171-YYC3-SAAS-产品文档-产品白皮书.md
@description: 产品整体介绍和价值主张
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-21
@updated: 2026-01-22
@last_editor: 张三
@edit_count: 1
@status: draft
@generated: true
@tags: [产品文档, 白皮书]
---
```

### 3. 审核中（Review）

```markdown
---
@file: 171-YYC3-SAAS-产品文档-产品白皮书.md
@description: 产品整体介绍和价值主张
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-21
@updated: 2026-01-23
@last_editor: 张三
@edit_count: 2
@status: review
@generated: true
@tags: [产品文档, 白皮书]
---
```

### 4. 发布（Published）

```markdown
---
@file: 171-YYC3-SAAS-产品文档-产品白皮书.md
@description: 产品整体介绍和价值主张
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-21
@updated: 2026-01-24
@last_editor: 张三
@edit_count: 2
@reviewer: 李四
@status: published
@generated: true
@tags: [产品文档, 白皮书]
---
```

## 七、实施建议

1. **团队培训**：对团队成员进行文档管理规范培训，确保所有人了解并遵守规范

2. **工具支持**：开发或使用适当的工具辅助文档状态管理

3. **定期检查**：定期检查文档状态，确保文档体系的健康度

4. **持续改进**：根据实际使用情况，不断优化文档管理流程和规范

5. **反馈机制**：建立文档管理规范的反馈机制，收集团队成员的建议和意见

## 八、附录

### 1. 文档头部模板

```markdown
---
@file: [文档文件名]
@description: [文档描述]
@author: [作者]
@version: [版本号]
@created: [创建日期]
@updated: [更新日期]
@last_editor: [最后编辑人]（可选）
@edit_count: [编辑次数]（可选）
@reviewer: [审核人]（可选）
@status: [状态值]
@generated: [true/false]
@tags: [标签1, 标签2, ...]
---
```

### 2. 状态转换图

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  template   │────>│    draft    │────>│   review    │────>│  published  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
         ^                 │                       │                       │
         │                 │                       │                       │
         └─────────────────┘                       │                       │
                                                   │                       │
                                                   └───────────────────────┘
                                                                           │
                                                                           │
                                                                           ▼
                                                                   ┌─────────────┐
                                                                   │ deprecated  │
                                                                   └─────────────┘
```

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
