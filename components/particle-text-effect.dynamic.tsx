"use client"

import dynamic from "next/dynamic"

const ParticleTextEffect = dynamic(
  () => import("./particle-text-effect").then((mod) => mod.ParticleTextEffect),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-6xl font-bold text-white animate-pulse">YYC³</div>
      </div>
    ),
  }
)

export { ParticleTextEffect }
