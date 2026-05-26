'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Linkedin, Github, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-[#030508] border-t border-gray-200 dark:border-slate-800/60">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3
                className="text-2xl font-black text-gray-900 dark:text-white mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Leandro<span className="text-indigo-400">.</span>
              </h3>
              <p className="text-gray-500 dark:text-slate-500 text-sm leading-relaxed mb-6">
                Transforming data into valuable assets and actionable insights.
                Building scalable, cloud-native solutions that deliver real business impact.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                {[
                  { href: 'https://www.linkedin.com/in/leandroalveso', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'https://github.com/leandroalveso', icon: Github, label: 'GitHub' },
                  { href: 'mailto:engleandroalveso@gmail.com', icon: Mail, label: 'Email' },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-2">
                {navLinks.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className="text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
              <div className="space-y-3">
                <a
                  href="mailto:engleandroalveso@gmail.com"
                  className="flex items-center gap-3 text-gray-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors group"
                >
                  <Mail className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  engleandroalveso@gmail.com
                </a>
                <div className="flex items-center gap-3 text-gray-500 dark:text-slate-500 text-sm">
                  <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  Sydney, NSW, Australia
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-gray-200 dark:border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 dark:text-slate-600 text-sm">
              &copy; {currentYear} Leandro Alves · Mímir Company. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-gray-400 dark:text-slate-600 text-sm">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
              </motion.div>
              <span>Technology is just a tool to empower people.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}