'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#050810]"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(to right, #6366f1 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.25),transparent)]" />

      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-300/20 dark:bg-indigo-600/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-violet-300/20 dark:bg-violet-600/10 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Available for new opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tight mb-4 text-gray-900 dark:text-white"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.03em' }}
        >
          Leandro
          <span className="block bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Alves
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-500 dark:text-slate-300 font-light tracking-wide mb-4"
        >
          Data &amp; Machine Learning Engineer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed text-lg"
        >
          9+ years transforming complex data challenges into production-ready solutions.
          <br className="hidden md:block" />
          Cloud-native platforms · Lakehouse architectures · ML &amp; AI systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-gray-400 dark:text-slate-500 mb-10 text-sm"
        >
          <MapPin className="w-4 h-4" />
          Sydney, New South Wales, Australia
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#experience"
            className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 dark:border-slate-600 hover:border-indigo-400 text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 font-semibold rounded-xl transition-all duration-300 bg-white dark:bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-500/5"
          >
            View Experience
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex justify-center gap-4"
        >
          {[
            { href: 'https://www.linkedin.com/in/leandroalveso', icon: Linkedin, label: 'LinkedIn' },
            { href: 'https://github.com/leandroalveso', icon: Github, label: 'GitHub' },
            { href: 'mailto:engleandroalveso@gmail.com', icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-300"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={scrollToAbout}
            aria-label="Scroll to about"
            className="animate-bounce text-gray-300 dark:text-slate-600 hover:text-indigo-400 transition-colors"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}