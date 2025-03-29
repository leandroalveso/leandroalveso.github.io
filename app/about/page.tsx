"use client";

import Image from "next/image";
import Link from "next/link";
import { House, User, Briefcase, Calendar, MapPin, Code, Database, Cloud, Server, ChevronRight } from "lucide-react";

export default function Home() {
  // Professional journey/work experience data
  const experiences = [
    {
      title: "Cloud & Data Consultant",
      company: "Self-Employed",
      period: "2024-Present",
      location: "2024-Remote",
      description: [
        "Design and provision cloud data solutions on AWS/Azure/GCP using Terraform",
        "Implement data systems, pipelines, and serverless architectures for various industries",
        "Provide technical leadership and best practices guidance for cloud infrastructure and data engineering"
      ]
    },
    {
      title: "Tech Lead",
      company: "Milestones Family Office",
      period: "2023-2024",
      location: "Brazil",
      description: [
        "Delivered an enterprise data platform on Azure, including a data lake and serverless microservices",
        "Built data pipelines and web UI for optimizing financial operations",
        "Implemented automated workflows reducing manual processes by 70%"
      ]
    },
    {
      title: "Full-Cycle (Software, Data & Cloud) Engineer",
      company: "Creoate",
      period: "2022-2023",
      location: "Remote",
      description: [
        "Built serverless microservices, data systems, and data pipelines on AWS",
        "Migrated web platform architecture, significantly improving data flows for mission-critical business operations",
        "Implemented monitoring and alerting systems to ensure data reliability"
      ]
    },
    {
      title: "Lead Data/Cloud Engineer",
      company: "Intexfy",
      period: "2021-2022",
      location: "Brazil",
      description: [
        "Led development of scalable data pipelines, APIs, web scrapers, and AWS-based data systems",
        "Managed terabytes of data for hundreds of customers",
        "Architected and implemented data warehouse solutions and analytics capabilities"
      ]
    },
    {
      title: "Research & Development Mechanical Engineer",
      company: "WEG S.A.",
      period: "2018-2020",
      location: "Brazil",
      description: [
        "Developed automation solutions to streamline numerical simulations",
        "Created reporting processes for one of Brazil's largest industrial companies",
        "Improved engineering workflows through custom software development"
      ]
    }
  ];

  // Education data
  const education = [
    {
      degree: "Engineering Degree",
      institution: "UFSC (Federal University of Santa Catarina)",
      year: "Graduated",
      details: "One of Brazil's top universities"
    }
  ];

  // Skills organization by category
  const skills = [
    {
      category: "Cloud Platforms",
      icon: <Cloud size={24} className="text-blue-600" />,
      items: ["AWS", "Azure", "Google Cloud Platform (GCP)"]
    },
    {
      category: "Data Technologies",
      icon: <Database size={24} className="text-blue-600" />,
      items: [
        "Data Lake/Warehouse/Lakehouse", 
        "SQL & NoSQL Databases", 
        "PostgreSQL, MS SQL Server, Redis, Cassandra, MongoDB, Elasticsearch",
        "Airbyte, Airflow, Kafka, MinIO",
        "Hadoop, Hive, Spark, Flink",
        "dbt, PowerBI"
      ]
    },
    {
      category: "DevOps & Infrastructure",
      icon: <Server size={24} className="text-blue-600" />,
      items: [
        "GitLab/GitHub", 
        "Bash/Powershell", 
        "Docker, Kubernetes", 
        "CI/CD Pipelines",
        "Infrastructure as Code (Terraform/OpenTofu)"
      ]
    },
    {
      category: "Programming Languages & Frameworks",
      icon: <Code size={24} className="text-blue-600" />,
      items: [
        "Python (Django/FastAPI, Pandas/Polars, Tensorflow)", 
        "SQL", 
        "TypeScript (Node.js, Fastify, Next.js/React, TailwindCSS)", 
        "C# (.NET)",
        "Rust"
      ]
    },
    {
      category: "Specialized Tools",
      icon: <Briefcase size={24} className="text-blue-600" />,
      items: ["MetaTrader 5", "Ansys ACT", "Celonis Platform"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Header with navigation would be here - reused from homepage */}
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-10">
              
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="absolute -inset-2 bg-white/20 rounded-full blur-md"></div>
                  <Image
                    src="/profile.jpeg"
                    alt="Leandro Alves"
                    width={280}
                    height={280}
                    className="rounded-full border-4 border-white/90 relative"
                  />
                </div>
              </div>

              <div className="md:w-2/3 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4">About Me</h1>
                <p className="text-xl opacity-90 mb-6">
                  Experienced Data/Software Engineer specializing in data-driven & cloud-based solutions
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a 
                    href="/" 
                    target="_blank"
                    className="bg-white text-blue-700 hover:bg-blue-50 py-2 px-6 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <House size={18} />
                    <span>Home</span>
                  </a>
                  {/* <Link 
                    href="/contact"
                    className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <User size={18} />
                    <span>Contact Me</span>
                  </Link> */}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Professional Summary</h2>
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                With over 8 years of experience, I specialize in architecting, building, and optimizing cloud-based 
                data platforms and software systems. I thrive on transforming complex data and cloud challenges into 
                scalable, production-ready solutions that deliver real business impact.
              </p>
              <p>
                Graduated in Engineering from UFSC, one of Brazil's top universities, I've developed a strong foundation 
                through academic, business, and consulting projects across various industries.
              </p>
              <p>
                I have hands-on experience with the full lifecycle of data-intensive applications - from cloud 
                infrastructure setup to data ingestion, processing, storage, visualization, and monitoring. I emphasize 
                automating operations, following security best practices, and adhering to software design principles.
              </p>
              <p>
                My focus is on building scalable, high-performance data systems leveraging modern data tools and cloud 
                services. I thrive in fast-paced environments, rapidly learning and adapting to new technologies to 
                deliver robust, production-ready solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Professional Journey Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Professional Journey</h2>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
                  {/* Timeline connector */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-0 sm:left-24 top-16 bottom-0 w-px bg-blue-200 group-last:hidden"></div>
                  )}
                  
                  {/* Timeline dot */}
                  <div className="absolute left-0 sm:left-24 top-6 rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center">
                    <Briefcase size={16} />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                    <div className="sm:w-20 text-sm font-medium text-blue-600">{exp.period}</div>
                    <div className="bg-white shadow-sm rounded-lg p-6 flex-1">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                        <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded">
                          {exp.company}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <MapPin size={14} className="mr-1" />
                        <span>{exp.location}</span>
                      </div>
                      <ul className="space-y-2 text-gray-700">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <ChevronRight size={16} className="mt-1 mr-2 text-blue-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
            
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 mt-1">{edu.institution}</p>
                    <p className="text-gray-600 text-sm mt-1">{edu.details}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <Calendar size={14} className="mr-1" />
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Technical Expertise</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {skills.map((skillGroup, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    {skillGroup.icon}
                    <h3 className="text-xl font-semibold ml-3">{skillGroup.category}</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    {skillGroup.items.map((skill, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Let's connect and explore how we can leverage data and cloud technologies to unlock new possibilities for your organization.
            </p>
            {/* <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-white text-blue-700 hover:bg-blue-50 py-3 px-8 rounded-lg font-medium transition-colors"
              >
                Get in Touch
              </Link>
              <Link 
                href="/projects"
                className="bg-blue-500 bg-opacity-30 hover:bg-opacity-40 text-white py-3 px-8 rounded-lg font-medium border border-white/20 transition-colors"
              >
                View My Projects
              </Link>
            </div> */}
          </div>
        </section>

      </main>

      {/* Footer would be here - reused from homepage */}
    </div>
  );
}