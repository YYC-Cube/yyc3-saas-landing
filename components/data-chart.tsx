"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { motion } from "framer-motion"

interface DataChartProps {
  data: any[]
  type: "line" | "bar" | "pie"
  title?: string
}

const COLORS = ["#ffffff", "#a3a3a3", "#737373", "#525252", "#404040"]

export function DataChart({ data, type, title }: DataChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="p-4 bg-card/30 border-border/50">
        <p className="text-sm text-muted-foreground text-center">暂无数据</p>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
      <Card className="p-4 bg-card/30 border-border/50 backdrop-blur-sm">
        {title && <h4 className="text-sm font-semibold mb-3 text-foreground/90">{title}</h4>}

        <ResponsiveContainer width="100%" height={280}>
          {type === "line" && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" opacity={0.3} />
              <XAxis dataKey="month" stroke="#a3a3a3" fontSize={12} tickLine={false} />
              <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #404040",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} iconType="line" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={2}
                dot={{ fill: "#ffffff", r: 4 }}
                activeDot={{ r: 6 }}
                name="数值"
              />
              {data[0]?.growth !== undefined && (
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#a3a3a3"
                  strokeWidth={2}
                  dot={{ fill: "#a3a3a3", r: 3 }}
                  name="增长率 (%)"
                />
              )}
            </LineChart>
          )}

          {type === "bar" && (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" opacity={0.3} />
              <XAxis dataKey="month" stroke="#a3a3a3" fontSize={12} tickLine={false} />
              <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #404040",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="registered" fill="#ffffff" radius={[4, 4, 0, 0]} name="注册用户" />
              <Bar dataKey="active" fill="#a3a3a3" radius={[4, 4, 0, 0]} name="活跃用户" />
            </BarChart>
          )}

          {type === "pie" && (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #404040",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </Card>
    </motion.div>
  )
}
