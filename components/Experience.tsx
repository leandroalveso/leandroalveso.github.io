'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, Sparkles } from 'lucide-react'

const experiences = [
  {
    title: 'Co-Founder',
    company: 'Nuniversity',
    companyUrl: '',
    location: 'Remote',
    period: 'March 2026 – Present',
    type: 'Non-Profit · Education',
    isCurrent: true,
    description:
      'Co-founded a non-profit education platform dedicated to making transformational education accessible to all, focused on sciences, engineering, coding, and technology.',
    achievements: [
      'Leading MVP development of a universal learning platform for underserved communities',
      'Driving fundraising efforts and strategic partnerships for sustainable growth',
      'Championing practical knowledge dissemination that bridges educational gaps globally',
    ],
    technologies: ['EdTech', 'Leadership', 'Fundraising', 'Product'],
  },
  {
    title: 'Data Specialist',
    company: 'DNX Solutions',
    companyUrl: 'https://www.dnx.solutions',
    location: 'Sydney, NSW, Australia',
    period: 'February 2025 – Present',
    type: 'Full-time · AWS Consulting',
    isCurrent: true,
    description:
      'Designed and delivered end-to-end data and AI platforms on AWS for companies across multiple industries, focusing on scalable analytics, modern data architectures, and cloud automation.',
    achievements: [
      'Led development of a complete Databricks-on-AWS analytics platform for a retail company, enabling advanced data-driven decision-making',
      'Executed full data modernization and cloud migration from Azure to AWS (5 TB), eliminating legacy data silos and improving governance',
      'Built a modern data lakehouse using S3 · Airbyte · Airflow · Spark (Glue/Athena) · Iceberg · dbt · SageMaker — fully automated with Terraform/Terragrunt',
      'Delivered an analytics forecasting tool that improved customer order prediction accuracy by 80%',
      'Implemented multi-workspace Databricks architecture fully managed as code with Terraform and Terragrunt',
    ],
    technologies: ['AWS', 'Databricks', 'Apache Spark', 'dbt', 'Apache Iceberg', 'SageMaker', 'Airbyte', 'Airflow', 'Terraform', 'Terragrunt'],
  },
  {
    title: 'Principal Consultant',
    company: 'Mímir Software Factory',
    companyUrl: '',
    location: 'Remote',
    period: 'February 2024 – Present',
    type: 'Consulting · Cloud & Data',
    isCurrent: true,
    description:
      'Providing cloud, data, devops, and software consulting services across AWS and Azure for various industries.',
    achievements: [
      'Architect, implement, and manage AWS/Azure cloud solutions with Terraform (IaC-first, FinOps-oriented)',
      'Accelerate SDLC with robust CI/CD, secure delivery, and deployment operations via GitLab/GitHub Actions',
      'Transform data into actionable insights with advanced analytics pipelines and lakehouse architectures',
      'Elevate software practices through DDD, TDD, clean code, and DevSecOps principles',
    ],
    technologies: ['AWS', 'Azure', 'Terraform', 'Python', 'TypeScript', 'React', 'Next.js', 'DevSecOps', 'Kubernetes'],
  },
  {
    title: 'Data Consultant',
    company: 'Falconi',
    companyUrl: 'https://www.falconi.com',
    location: 'São Paulo, SP, Brazil',
    period: 'February 2024 – April 2025',
    type: 'Contract · Data & Analytics',
    isCurrent: false,
    description:
      'Developed data-driven solutions using the Celonis Platform, MS Azure, and GCP for enterprise clients as a data/cloud consultant.',
    achievements: [
      'Improved pipeline architecture and costs by streaming CDC for heavy full-load tables using Apache Kafka on Azure Snowpipe',
      'Developed a notification system via MS PowerAutomate handling thousands of daily notifications by email, SMS, and Teams',
      'Developed 3 data pipelines and 4 dashboards (views + analyses) on the Celonis Platform',
      'Modernized a traditional data pipeline to a modern data-stack approach: Terraform · Airbyte · Airflow · Spark · dbt · BigQuery',
    ],
    technologies: ['Azure', 'GCP', 'Celonis', 'Apache Kafka', 'Snowflake', 'BigQuery', 'dbt', 'Airflow', 'Terraform', 'Power Automate'],
  },
  {
    title: 'Software Engineer',
    company: 'Milestone Administradora de Recursos',
    companyUrl: '',
    location: 'Brazil',
    period: 'January 2023 – January 2024',
    type: 'Full-time · Financial Markets',
    isCurrent: false,
    description:
      'Technical leader at a family office in financial markets, driving data engineering, software engineering, and DevOps practices.',
    achievements: [
      'Designed a serverless infrastructure 40% cheaper and more scalable on MS Azure',
      'Developed serverless data lake and warehouse supporting all business and analytical processes',
      'Built 2 serverless microservices for S&P Capital IQ and Lote 45 third-party integrations using Python/FastAPI',
      'Implemented full IaC pipelines with Terraform on Azure DevOps with CI/CD via Azure Pipelines',
    ],
    technologies: ['Azure', 'Terraform', 'Python', 'FastAPI', 'React', 'Next.js', 'SQL Server', 'Cosmos DB', 'Azure Functions'],
  },
  {
    title: 'Data Engineer',
    company: 'CREOATE',
    companyUrl: 'https://www.creoate.com',
    location: 'Portugal (Remote)',
    period: 'April 2022 – February 2023',
    type: 'Contract · E-commerce',
    isCurrent: false,
    description:
      'Technical consultant via Boost IT as a Data Engineer for CREOATE (B2B e-commerce marketplace).',
    achievements: [
      'Migrated 70% of the legacy WordPress platform to an event-driven serverless architecture on AWS',
      'Developed a data lakehouse using the full AWS data toolkit to support e-commerce analytics',
      'Implemented CI/CD pipelines with GitLab CI/CD and managed infrastructure with Terraform/Terragrunt',
    ],
    technologies: ['AWS', 'Terraform', 'Python', 'FastAPI', 'PostgreSQL', 'DynamoDB', 'OpenSearch', 'GitLab CI/CD', 'PySpark'],
  },
  {
    title: 'Data Engineer',
    company: 'Intefy Commercial Intelligence',
    companyUrl: '',
    location: 'Florianópolis, SC, Brazil',
    period: 'May 2021 – May 2022',
    type: 'Full-time · Data Provider',
    isCurrent: false,
    description:
      'Cloud/Data Engineer managing large-scale data operations including ETL, scraping pipelines, and CRM development.',
    achievements: [
      'Implemented and led the Scrum methodology as Scrum Master across the engineering team',
      'Developed a Customer-Relationship Manager (CRM) and an email finder-validator application',
      'Built a web scraping pipeline on AWS Lambda/Python with Apache Airflow (Celery) and MongoDB',
    ],
    technologies: ['AWS', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'Airflow', 'Python', 'Django', 'Flask', 'Kubernetes'],
  },
  {
    title: 'Data Engineer & Co-Founder',
    company: 'Mímir Hub Software Factory',
    companyUrl: '',
    location: 'Brazil',
    period: 'September 2019 – May 2021',
    type: 'Co-founder · FinTech / AlgoTrading',
    isCurrent: false,
    description:
      'Co-founded and led data engineering for an algorithmic trading platform, building ML models for automated investments in financial markets.',
    achievements: [
      'Built data streaming and processing pipelines with Apache Kafka and Apache Spark',
      'Implemented LSTM-RNN and Q-Learning AI models for automated trading using TensorFlow',
      'Developed algotrading microservices with Python (Flask, Dask, metatrader5) for financial markets',
    ],
    technologies: ['AWS', 'Python', 'Apache Kafka', 'Apache Spark', 'TensorFlow', 'Scikit-learn', 'PostgreSQL', 'Flask'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-[#060a14]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Career
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Professional <span className="text-indigo-600 dark:text-indigo-400">Experience</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-violet-500/50 to-transparent" />

            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-[15px] top-6 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center
                      ${exp.isCurrent
                        ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-500/40'
                        : 'bg-gray-300 dark:bg-slate-800 border-gray-400 dark:border-slate-600'
                      }`}
                  >
                    {exp.isCurrent && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 backdrop-blur-sm">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                          {exp.isCurrent && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                              <Sparkles className="w-3 h-3" /> Current
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
                            >
                              {exp.company}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            exp.company
                          )}
                          <span className="text-slate-600 mx-1">·</span>
                          <span className="text-gray-400 dark:text-slate-500 font-normal">{exp.type}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-xs text-gray-400 dark:text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-500 dark:text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}