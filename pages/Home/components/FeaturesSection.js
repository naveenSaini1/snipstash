"use client"
import React from "react"

const features = [
  {
    icon: "🗂",
    title: "Smart Snippet Grouping",
    desc: "Automatically organize your code by language, project, or tag.",
  },
  {
    icon: "🏷",
    title: "Auto-tag Important Patterns",
    desc: "SnipStash suggests tags for your snippets as you save them.",
  },
  {
    icon: "🔍",
    title: "Instant Search & Filter",
    desc: "Find any snippet in milliseconds with blazing fast search.",
  },
  {
    icon: "📋",
    title: "One-click Copy to Clipboard",
    desc: "Copy code instantly, ready to paste anywhere you need.",
  },
]

/**
 * Features section for SnipStash landing page.
 */
function FeaturesSection() {
  return (
    <section className="w-full bg-gray-950 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-center items-stretch overflow-x-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="flex-1 min-w-[220px] bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center text-center shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <div className="font-bold text-lg text-white mb-2">{f.title}</div>
              <div className="text-gray-400 text-sm">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection 