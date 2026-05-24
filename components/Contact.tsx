'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle, Phone } from 'lucide-react'
import { useForm, ValidationError } from '@formspree/react'
import { useState } from 'react'

export default function Contact() {
  const [state, handleSubmit] = useForm("xandddko")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetForm = () => setFormData({ name: '', email: '', subject: '', message: '' })

  if (state.succeeded) {
    return (
      <section id="contact" className="py-24 bg-gray-50 dark:bg-[#060a14]">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-2xl p-12"
            >
              <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-5" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                Message Sent!
              </h2>
              <p className="text-gray-500 dark:text-slate-400 mb-8">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={resetForm}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors duration-200"
              >
                Send Another Message
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-[#060a14]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Contact
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Let's <span className="text-indigo-600 dark:text-indigo-400">Connect</span>
            </h2>
            <p className="text-gray-500 dark:text-slate-400 max-w-xl text-lg">
              Ready to transform your data challenges into scalable solutions?
              Let's talk about how we can work together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left — contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed">
                I'm always open to discussing new opportunities, innovative projects,
                and ways to leverage data and cloud technology for real business impact.
                Whether you need consulting, are exploring a collaboration, or just want
                to connect — I'd love to hear from you.
              </p>

              {/* Contact details */}
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'engleandroalveso@gmail.com',
                    href: 'mailto:engleandroalveso@gmail.com',
                  },
                  {
                    icon: Phone,
                    label: 'Phone',
                    value: '+61 0433 514 560',
                    href: 'tel:+61433514560',
                  },
                  {
                    icon: MapPin,
                    label: 'Location',
                    value: 'Sydney, NSW, Australia',
                    href: null,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-11 h-11 bg-indigo-500/15 border border-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-gray-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-700 dark:text-slate-200 text-sm font-medium">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social */}
              <div>
                <p className="text-gray-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-4">Social</p>
                <div className="flex gap-3">
                  {[
                    { href: 'https://www.linkedin.com/in/leandroalveso', icon: Linkedin, label: 'LinkedIn' },
                    { href: 'https://github.com/leandroalveso', icon: Github, label: 'GitHub' },
                  ].map(({ href, icon: Icon, label }) => (
                    <motion.a
                      key={label}
                      whileHover={{ scale: 1.08, y: -2 }}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell me about your project or how I can help..."
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>

                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-indigo-600/20"
                >
                  {state.submitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}