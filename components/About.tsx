'use client'

import { motion } from 'framer-motion'
import { Award, MapPin, GraduationCap, Calendar, Globe } from 'lucide-react'
import Image from 'next/image'

const stats = [
  { label: 'Years of Experience', value: '9+', icon: Calendar },
  { label: 'Projects Completed', value: '30+', icon: Award },
  { label: 'Technologies Mastered', value: '30+', icon: GraduationCap },
  { label: 'Countries Worked', value: '4', icon: MapPin },
]

const highlights = [
  { color: 'bg-indigo-500', bold: 'Cloud Architecture:', text: 'AWS, Azure, GCP — IaC-first (Terraform/Terragrunt) with FinOps mindset' },
  { color: 'bg-violet-500', bold: 'Data & Lakehouse:', text: 'Airflow · Kafka · Airbyte · Spark · Iceberg · dbt · Databricks' },
  { color: 'bg-fuchsia-500', bold: 'ML Engineering:', text: 'TensorFlow · SageMaker · MLflow · Scikit-learn · Feature Engineering' },
  { color: 'bg-emerald-500', bold: 'Full-Stack Dev:', text: 'Python · Django · FastAPI · TypeScript · React · Next.js · TailwindCSS' },
]

const education = [
  { degree: 'MBA — Business Administration', school: 'USP/ESALQ', period: '2024 – 2026' },
  { degree: 'MBA — Data Science, AI & Analytics', school: 'USP/ESALQ', period: '2022 – 2024' },
  { degree: 'B.Eng — Mechanical Engineering', school: 'Federal University of Santa Catarina (UFSC)', period: '2011 – 2015' },
]

const languages = [
  { lang: 'Portuguese', level: 'Native' },
  { lang: 'English', level: 'Full Professional' },
  { lang: 'Spanish', level: 'Elementary' },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Who I am
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              About <span className="text-indigo-600 dark:text-indigo-400">Me</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="relative w-72 h-72 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-2xl blur-2xl opacity-20 dark:opacity-30" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-xl">
                  <Image src="/profile.jpeg" alt="Leandro Alves" fill className="object-cover" priority />
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-gray-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">Languages</span>
                </div>
                <div className="space-y-2">
                  {languages.map(({ lang, level }) => (
                    <div key={lang} className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-slate-400 text-sm">{lang}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                        {level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-gray-700 dark:text-slate-300 font-semibold text-sm uppercase tracking-wider">Education</span>
                </div>
                <div className="space-y-4">
                  {education.map(({ degree, school, period }) => (
                    <div key={degree} className="border-l-2 border-indigo-300 dark:border-indigo-500/30 pl-3">
                      <p className="text-gray-900 dark:text-white text-sm font-medium">{degree}</p>
                      <p className="text-indigo-600 dark:text-indigo-400 text-xs">{school}</p>
                      <p className="text-gray-400 dark:text-slate-500 text-xs">{period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Data, Analytics, ML & Software Engineer
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-slate-400 leading-relaxed">
                <p>
                  With 9+ years of experience, I specialise in architecting and delivering
                  end-to-end cloud data platforms and AI systems that create real business impact —
                  from ingestion to insight.
                </p>
                <p>
                  Currently at <span className="text-indigo-600 dark:text-indigo-300 font-medium">DNX Solutions</span> in Sydney,
                  I delivered a forecasting tool that improved order prediction accuracy by{' '}
                  <span className="text-gray-900 dark:text-white font-semibold">80%</span>, and led a 5 TB Azure-to-AWS
                  data migration. I also co-founded{' '}
                  <span className="text-indigo-600 dark:text-indigo-300 font-medium">Nuniversity</span>, a non-profit
                  education platform focused on sciences, engineering and technology for underserved communities.
                </p>
                <p>
                  I hold two MBAs from <span className="text-gray-900 dark:text-white font-medium">USP/ESALQ</span> — Business Administration
                  and Data Science, AI & Analytics — giving me the rare ability to translate complex technical
                  solutions into business value. My work spans fintech, e-commerce, retail, and consulting
                  across Brazil, the UK, Portugal, and Australia.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {highlights.map(({ color, bold, text }) => (
                  <div key={bold} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${color}`} />
                    <span className="text-gray-600 dark:text-slate-300 text-sm">
                      <strong className="text-gray-900 dark:text-white">{bold}</strong> {text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 dark:bg-indigo-500/15 rounded-xl mb-3">
                  <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{value}</div>
                <div className="text-gray-500 dark:text-slate-500 text-xs font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}