'use client'

import { motion } from 'framer-motion'
import { Cloud, Database, Code, Settings, Brain, BarChart3 } from 'lucide-react'


const skillCategories = [
  {
    title: "Cloud Platforms",
    icon: Cloud,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Amazon Web Services (AWS)", level: 95 },
      { name: "Microsoft Azure", level: 90 },
      { name: "Google Cloud Platform (GCP)", level: 85 },
      { name: "Terraform / OpenTofu", level: 90 },
      { name: "Docker & Kubernetes", level: 85 }
    ]
  },
  {
    title: "Data Engineering",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Data Lakes & Warehouses", level: 95 },
      { name: "Apache Airflow", level: 90 },
      { name: "Apache Kafka", level: 85 },
      { name: "dbt (Data Build Tool)", level: 90 },
      { name: "Apache Spark & Databricks", level: 88 }
    ]
  },
  {
    title: "Programming Languages",
    icon: Code,
    color: "from-green-500 to-teal-500",
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 92 },
      { name: "TypeScript/JavaScript", level: 88 },
      { name: "C#", level: 80 },
      { name: "Rust", level: 70 }
    ]
  },
  {
    title: "DevOps & Infrastructure",
    icon: Settings,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Infrastructure as Code (IaC)", level: 92 },
      { name: "CI/CD Pipelines", level: 90 },
      { name: "GitLab/GitHub Actions", level: 88 },
      { name: "Linux/Bash", level: 85 },
      { name: "Monitoring & Observability", level: 82 }
    ]
  },
  {
    title: "Machine Learning",
    icon: Brain,
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "TensorFlow", level: 85 },
      { name: "Scikit-learn", level: 90 },
      { name: "Pandas/Polars", level: 95 },
      { name: "Feature Engineering", level: 88 },
      { name: "MLOps", level: 80 }
    ]
  }
]

const databases = [
  { name: "PostgreSQL", category: "SQL" },
  { name: "MS SQL Server", category: "SQL" },
  { name: "MySQL", category: "SQL" },
  { name: "MongoDB", category: "NoSQL" },
  { name: "Redis", category: "NoSQL" },
  { name: "Cassandra", category: "NoSQL" },
  { name: "DynamoDB", category: "NoSQL" },
  { name: "Elasticsearch", category: "Search" },
  { name: "Snowflake", category: "Cloud DW" },
  { name: "BigQuery", category: "Cloud DW" }
]


export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Technical <span className="text-blue-600">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive expertise across the entire data and software engineering stack, 
              from infrastructure to machine learning deployment.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Databases & Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Databases & Data Stores
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {databases.map((db, index) => (
                <motion.div
                  key={db.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                >
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {db.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {db.category}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Certifications & Specializations
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Get Data Into Celonis",
                  provider: "Celonis",
                  type: "Process Mining"
                },
                {
                  title: "Build Views (Dashboards)",
                  provider: "Celonis", 
                  type: "Data Visualization"
                },
                {
                  title: "Build Analyses (Process Mining Dashboards)",
                  provider: "Celonis",
                  type: "Analytics"
                }
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800 hover:shadow-lg transition-shadow duration-300"
                >
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                    {cert.provider}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.type}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
