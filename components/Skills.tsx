'use client'

import { motion } from 'framer-motion'
import { Cloud, Database, Code, Settings, Brain, Server } from 'lucide-react'

const skillCategories = [
  {
    title: 'Cloud Platforms',
    icon: Cloud,
    color: 'from-indigo-500 to-blue-500',
    borderColor: 'border-indigo-500/20',
    skills: [
      { name: 'Amazon Web Services (AWS)', level: 95 },
      { name: 'Microsoft Azure', level: 92 },
      { name: 'Google Cloud Platform (GCP)', level: 85 },
      { name: 'Terraform / Terragrunt / OpenTofu', level: 93 },
      { name: 'Docker & Kubernetes', level: 87 },
    ],
  },
  {
    title: 'Data Engineering & Lakehouse',
    icon: Database,
    color: 'from-violet-500 to-purple-500',
    borderColor: 'border-violet-500/20',
    skills: [
      { name: 'Apache Spark & Databricks', level: 92 },
      { name: 'Apache Airflow & Dagster', level: 90 },
      { name: 'Apache Kafka & Flink', level: 87 },
      { name: 'dbt (Data Build Tool)', level: 91 },
      { name: 'Apache Iceberg / Delta Lake', level: 88 },
    ],
  },
  {
    title: 'Programming Languages',
    icon: Code,
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/20',
    skills: [
      { name: 'Python', level: 97 },
      { name: 'SQL', level: 94 },
      { name: 'TypeScript / JavaScript', level: 89 },
      { name: 'C# (.NET)', level: 80 },
      { name: 'Rust', level: 68 },
    ],
  },
  {
    title: 'DevOps & Infrastructure',
    icon: Settings,
    color: 'from-orange-500 to-amber-500',
    borderColor: 'border-orange-500/20',
    skills: [
      { name: 'Infrastructure as Code (IaC)', level: 93 },
      { name: 'CI/CD — GitLab / GitHub Actions', level: 91 },
      { name: 'Linux & Bash Scripting', level: 88 },
      { name: 'FinOps & Cost Optimisation', level: 85 },
      { name: 'Monitoring & Observability', level: 82 },
    ],
  },
  {
    title: 'Machine Learning & AI',
    icon: Brain,
    color: 'from-fuchsia-500 to-pink-500',
    borderColor: 'border-fuchsia-500/20',
    skills: [
      { name: 'TensorFlow & Scikit-learn', level: 88 },
      { name: 'AWS SageMaker & MLflow', level: 85 },
      { name: 'Pandas / Polars / PySpark', level: 96 },
      { name: 'Feature Engineering', level: 90 },
      { name: 'MLOps & Model Serving', level: 80 },
    ],
  },
  {
    title: 'Software Engineering',
    icon: Server,
    color: 'from-sky-500 to-cyan-500',
    borderColor: 'border-sky-500/20',
    skills: [
      { name: 'FastAPI / Django / Flask', level: 92 },
      { name: 'React.js & Next.js', level: 88 },
      { name: 'Domain-Driven Design (DDD)', level: 85 },
      { name: 'Test-Driven Development (TDD)', level: 83 },
      { name: 'Microservices & Serverless', level: 90 },
    ],
  },
]

const databases = [
  { name: 'PostgreSQL', category: 'SQL' },
  { name: 'MS SQL Server', category: 'SQL' },
  { name: 'MySQL', category: 'SQL' },
  { name: 'MongoDB', category: 'NoSQL' },
  { name: 'Redis', category: 'NoSQL' },
  { name: 'Cassandra', category: 'NoSQL' },
  { name: 'DynamoDB', category: 'AWS' },
  { name: 'Cosmos DB', category: 'Azure' },
  { name: 'Elasticsearch', category: 'Search' },
  { name: 'Snowflake', category: 'Cloud DW' },
  { name: 'BigQuery', category: 'Cloud DW' },
  { name: 'AWS Athena', category: 'Serverless' },
]

const certifications = [
  { title: 'Get Data Into Celonis', provider: 'Celonis', type: 'Process Mining' },
  { title: 'Build Views (Dashboards)', provider: 'Celonis', type: 'Data Visualisation' },
  { title: 'Build Analyses (Process Mining)', provider: 'Celonis', type: 'Analytics' },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Expertise
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Technical <span className="text-indigo-600 dark:text-indigo-400">Skills</span>
            </h2>
            <p className="text-gray-500 dark:text-slate-400 max-w-2xl text-lg">
              Full-stack expertise across the entire data and software engineering lifecycle —
              from cloud infrastructure to ML deployment.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ci * 0.07 }}
                viewport={{ once: true }}
                className={`bg-white dark:bg-slate-900 border ${cat.borderColor} rounded-2xl p-6 hover:border-opacity-60 transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color} bg-opacity-20`}>
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{cat.title}</h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: si * 0.07 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-600 dark:text-slate-300">{skill.name}</span>
                        <span className="text-gray-400 dark:text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: si * 0.07 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Databases */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 mb-12"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Databases &amp; Data Stores</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {databases.map((db, i) => (
                <motion.div
                  key={db.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  viewport={{ once: true }}
                  className="bg-gray-100 dark:bg-slate-800/60 hover:bg-gray-200 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/30 rounded-xl p-3 text-center transition-all duration-200 cursor-default"
                >
                  <p className="text-gray-900 dark:text-white text-xs font-semibold mb-0.5">{db.name}</p>
                  <p className="text-indigo-600 dark:text-indigo-400 text-xs">{db.category}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Certifications</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-indigo-100/80 to-violet-100/80 dark:from-indigo-900/20 dark:to-violet-900/20 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-colors duration-300"
                >
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">{cert.title}</h4>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-1">{cert.provider}</p>
                  <p className="text-gray-400 dark:text-slate-500 text-xs">{cert.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}