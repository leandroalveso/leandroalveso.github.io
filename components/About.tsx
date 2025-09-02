'use client'

import { motion } from 'framer-motion'
import { Award, MapPin, GraduationCap, Calendar } from 'lucide-react'
import Image from 'next/image'


export default function About() {
  const stats = [
    { label: 'Years of Experience', value: '8+', icon: Calendar },
    { label: 'Projects Completed', value: '25+', icon: Award },
    { label: 'Technologies Mastered', value: '20+', icon: GraduationCap },
    { label: 'Countries Worked', value: '3', icon: MapPin },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
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
              About <span className="text-blue-600">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <Image
                    src="/profile.jpeg"
                    alt="Leandro Alves"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Experienced Data/Machine Learning/Software Engineer
              </h3>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  With over 8 years of experience, I specialize in architecting, building, 
                  and optimizing cloud-based data platforms and software systems. I thrive 
                  on transforming complex data and cloud challenges into scalable, 
                  production-ready solutions that deliver real business impact.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Graduated in Engineering from UFSC, one of Brazil's top universities. 
                  I've developed a strong foundation through academic, business, and 
                  consulting projects across various industries including industrial, 
                  e-commerce, financial markets, and technology.
                </p>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Currently based in Sydney, Australia, I work as a consultant designing 
                  and provisioning cloud data solutions on AWS/Azure/GCP using Terraform, 
                  implementing data systems, pipelines, and serverless architectures.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Cloud Expertise:</strong> AWS, Azure, GCP with Infrastructure as Code
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Data Engineering:</strong> Data Lakes, Warehouses, ETL/ELT Pipelines
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>ML Engineering:</strong> TensorFlow, Scikit-learn, Feature Engineering
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Full-Stack Development:</strong> Python, TypeScript, React, Next.js
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
