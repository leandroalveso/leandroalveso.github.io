'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'


const experiences = [
  {
    title: "Data Engineer",
    company: "DNX Solutions",
    location: "Sydney, New South Wales, Australia",
    period: "February 2025 - Present",
    description: "Development of data and artificial intelligence solutions on Amazon Web Service (AWS) for companies in various industries.",
    achievements: [
      "Developed complete analytic solution using Databricks on AWS for retail company",
      "Complete data modernization and migration from Azure to AWS for technology company",
      "Developed analytic forecast tool to predict orders for next weeks",
      "Implemented Databricks multi-workspace solution using Terraform-Terragrunt"
    ],
    technologies: ["AWS", "Databricks", "Terraform", "Terragrunt", "Data Analytics", "Machine Learning"]
  },
  {
    title: "Principal Consultant",
    company: "Mímir Software Factory",
    location: "Remote",
    period: "February 2024 - Present",
    description: "As a data/software consultant providing cloud services, operations services, data services, and software services.",
    achievements: [
      "Architect and implement AWS/Azure cloud-based solutions with Terraform",
      "Focus on Infrastructure as Code (IaC) and Financial Operations (FinOps)",
      "Transform data into actionable insights with advanced analytics",
      "Elevate software development practices with best principles"
    ],
    technologies: ["AWS", "Azure", "Terraform", "Python", "TypeScript", "React", "Next.js", "DevSecOps"]
  },
  {
    title: "Data Consultant",
    company: "Falconi",
    location: "São Paulo, São Paulo, Brazil",
    period: "February 2024 - April 2025",
    description: "Development of data-driven solutions based on Celonis Platform, MS Azure and GCP cloud computing providers.",
    achievements: [
      "Improved pipeline architecture and costs by streaming change data with Apache Kafka",
      "Developed notification system with MS PowerAutomate handling thousands of notifications daily",
      "Developed 3 data pipelines and 4 dashboards with Celonis Platform",
      "Modernized traditional data pipeline to modern data-stack approach"
    ],
    technologies: ["Azure", "GCP", "Terraform", "Kafka", "Snowflake", "BigQuery", "Celonis", "dbt", "Airflow"]
  },
  {
    title: "Software Engineer",
    company: "Milestone Administradora de Recursos Ltda",
    location: "Brazil",
    period: "January 2023 - January 2024",
    description: "Technical leader at Milestones family office (financial market) focusing on data engineering, software engineering, and DevOps.",
    achievements: [
      "Designed serverless infrastructure 40% cheaper and more scalable than previous one",
      "Developed serverless data lake and warehouse to support business processes",
      "Developed 2 serverless microservices for S&P Capital IQ and Lote 45 integrations",
      "Implemented Infrastructure-As-Code pipelines with Terraform on Azure DevOps"
    ],
    technologies: ["Azure", "Terraform", "Python", "FastAPI", "React", "Next.js", "SQL Server", "Cosmos DB"]
  },
  {
    title: "Data Engineer",
    company: "CREOATE",
    location: "Portugal",
    period: "April 2022 - February 2023",
    description: "Technical consultant on Boost IT as a Data Engineer on Creoate (e-commerce) focusing on data engineering and serverless architecture.",
    achievements: [
      "Migrated 70% of legacy WordPress platform to event-driven serverless architecture",
      "Developed data lakehouse using AWS data toolkit for e-commerce analytics",
      "Implemented CI/CD pipelines with GitLab CI/CD",
      "Built microservices on serverless backend platform"
    ],
    technologies: ["AWS", "Terraform", "Python", "FastAPI", "PostgreSQL", "DynamoDB", "Elasticsearch", "GitLab CI/CD"]
  },
  {
    title: "Data Engineer",
    company: "Intefy Commercial Intelligence",
    location: "Florianópolis, Santa Catarina, Brazil",
    period: "May 2021 - May 2022",
    description: "Cloud/Data Engineer at Intexfy Commercial Intelligence (data provider) managing large-scale data operations.",
    achievements: [
      "Implemented and managed Scrum methodology as Scrum Master",
      "Developed Customer-Relationship Manager (CRM) and email finder-validator application",
      "Built web scraping pipeline based on AWS Lambda/Python and Apache Airflow",
      "Managed ETL/ELT processes with PostgreSQL, Apache Airflow, and MongoDB"
    ],
    technologies: ["AWS", "PostgreSQL", "MongoDB", "Elasticsearch", "Apache Airflow", "Python", "Django", "Flask"]
  }
]


export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Professional <span className="text-blue-600">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold mb-2">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {exp.company}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Results:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
