"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Menu, X, Home, User, Newspaper, MessageSquare, TrendingUp} from "lucide-react";

import FinancialDashboard from '../components/FinancialDashboard';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [cards, setCards] = useState([
    { id: 1, symbol: '🚀', matched: false },
    { id: 2, symbol: '💻', matched: false },
    { id: 3, symbol: '🌟', matched: false },
    { id: 4, symbol: '🎯', matched: false },
    { id: 5, symbol: '🚀', matched: false },
    { id: 6, symbol: '💻', matched: false },
    { id: 7, symbol: '🌟', matched: false },
    { id: 8, symbol: '🎯', matched: false },
  ].sort(() => Math.random() - 0.5));

  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const handleCardClick = (index: number) => {
    if (cards[index].matched || selectedCards.includes(index)) return;

    const newCards = [...cards];
    const newSelectedCards = [...selectedCards, index];

    newCards[index].matched = true;

    if (newSelectedCards.length === 2) {
      const [firstIndex, secondIndex] = newSelectedCards;

      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        setMatchedPairs(matchedPairs + 1);
      } else {
        setTimeout(() => {
            newCards[firstIndex].matched = false;
            newCards[secondIndex].matched = false;
            setCards(newCards);
          }, 1000
        );
      }

      setSelectedCards([]);

    } else {
      setSelectedCards(newSelectedCards);
    }

    setCards(newCards);
  };

  const resetGame = () => {
    setCards(cards.map(card => ({ ...card, matched: false })).sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setMatchedPairs(0);
  };

  // Tech skills data
  const skills = [
    { 
      category: "Data Engineering", 
      items: [
        "Data Architecture",
        "Data Modeling",
        "Data Pipelines (ETL/ELT)",
        "Data Warehousing",
        "Data Lake",
        "Data Lakehouse",
        "Modern Data-Stack",
        "SQL",
        "Airbyte",
        "Apache Airflow", 
        "Apache Kafka",
        "Apache Spark", 
        "Databricks", 
        "dbt (Data Build Tool)",
        "MinIO",
      ] 
    },
    { 
      category: "Cloud", 
      items: [
        "Amazon Web Service (AWS)", 
        "Google Cloud Platform (GCP)",
        "Microsoft Azure", 
        "OpenTofu/Terraform & Terragrunt",
      ] 
    },
    { 
      category: "Programming", 
      items: [
        "Bash",
        "C#",
        "HCL",
        "Python",
        "Django & Fastapi",
        "Scikit-Learn & Tensorflow",
        "TypeScript", 
        "Node.js", 
        "React.js & Next.js",
        "Tailwind CSS",
        "SQL",
      ] 
    },
    { 
      category: "Tools & Platforms", 
      items: [
        "Bash",
        "Powershell",
        "Git", 
        "GitHub Actions",
        "Gitlab",
        "Continous Integration (CI)", 
        "Continous Deployment (CD)",
        "Docker",
        "Kubernetes",
        "Elastic Stack",
        "Prometheus",
        "Grafana",
      ] 
    },
  ];

  // Featured projects
  const featuredProjects = [
    // {
    //   title: "Cloud Data Platform",
    //   description: "Designed and implemented a scalable data platform using AWS services, reducing data processing time by 70%.",
    //   tags: ["AWS", "Python", "Terraform", "Data Engineering"],
    // }
  ];

  // Recent blog posts
  const recentPosts: any[] = [
    // {
    //   title: "Best Practices for Modern Data Engineering",
    //   except: "Exploring the evolution of data engineering practices and tools in the cloud era.",
    //   date: "March 15, 2025",
    //   readTime: "8 min read",
    //   slug: "best-practices-modern-data-engineering"
    // }
    {
        id: 1,
        title: "UV: The Modern Python Package and Dependency Manager",
        slug: "uv-modern-python-package-dependency-manager",
        except: "Explore UV, the lightning-fast Python package manager written in Rust that's revolutionizing dependency management with speeds up to 100x faster than traditional tools.",
        date: "April 9, 2025",
        readTime: "8 min read",
        category: "Python",
        tags: ["Python", "Package Management", "Dependencies", "Tools"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Image
                className="h-10 w-10 rounded-full"
                src="/profile.jpeg"
                alt="Leandro Alves"
                width={40}
                height={40}
              />
              <span className="font-bold text-xl">Leandro Alves</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-800 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/about" className="text-gray-800 hover:text-blue-600 transition-colors">About</Link>
              {/* <Link href="/projects" className="text-gray-800 hover:text-blue-600 transition-colors">Projects</Link> */}
              <Link href="/blog" className="text-gray-800 hover:text-blue-600 transition-colors">Blog</Link>
              {/* <Link href="/contact" className="text-gray-800 hover:text-blue-600 transition-colors">Contact</Link> */}
            </nav>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-800 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 py-3 px-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link href="/about" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                <User size={18} />
                <span>About</span>
              </Link>
              {/* <Link href="/projects" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                <FileText size={18} />
                <span>Projects</span>
              </Link> */}
              <Link href="/blog" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                <Newspaper size={18} />
                <span>Blog</span>
              </Link>
              {/* <Link href="/contact" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                <MessageSquare size={18} />
                <span>Contact</span>
              </Link> */}

              {/* <Link href="/finance" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors">
                  <TrendingUp size={18} />
                  <span>Watchlist</span>
              </Link> */}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-grow">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="md:w-1/2">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Software, Data & Cloud Engineering
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Building scalable systems and solving complex data challenges. I specialize in designing distributed 
                  architectures, data platforms, and cloud infrastructure automation.
                </p>
                {/* <div className="flex gap-4">
                  <a 
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Get in Touch
                  </a>
                  <a 
                    href="/resume.pdf" 
                    target="_blank"
                    className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-6 rounded-lg border border-gray-300 transition-colors"
                  >
                    View Resume
                  </a>
                </div> */}
              </div>
              <div className="md:w-2/5">
                <div className="relative">
                  {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-30"></div> */}
                  <div className="relative">
                    <Image
                      className="rounded-full border-4 border-white shadow-xl"
                      src="/profile.jpeg"
                      alt="Leandro Alves"
                      width={320}
                      height={320}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skillGroup, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">{skillGroup.category}</h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        {/* <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <Link href="/projects" className="text-blue-600 hover:text-blue-800 font-medium">
                View All Projects →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Recent Blog Posts */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Recent Blog Posts</h2>
              <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
                View All Posts →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <Link href={`/blog/${post.slug}`} key={index} className="group">
                  <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col">
                    <p className="text-sm text-gray-500 mb-2">{post.date} · {post.readTime}</p>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{post.except}</p>
                    <span className="text-blue-600 font-medium group-hover:underline">Read more</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Memory Game Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Take a Break: Memory Game!</h2>
              <p className="text-gray-600 mb-6">
                Test your memory with this quick game! Click to reveal cards and find matching pairs.
              </p>
              <div className="flex justify-center">
                <div className="grid grid-cols-4 gap-4 max-w-md">
                  {cards.map((card, index) => (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(index)}
                      className={`
                        w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center 
                        text-3xl rounded-lg transition-all duration-300 shadow-sm
                        ${card.matched ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}
                        hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300
                      `}
                    >
                      {card.matched || selectedCards.includes(index) ? card.symbol : '?'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center max-w-md mx-auto">
                <p className="font-medium">Matched: {matchedPairs}/4 pairs</p>
                <button 
                  onClick={resetGame}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Reset Game
                </button>
              </div>
              {matchedPairs === 4 && (
                <div className="mt-4 text-center text-green-600 font-medium">
                  Congratulations! You've matched all pairs. 🎉
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
              <p className="text-xl text-gray-600 mb-8">
                Have a project in mind or want to discuss opportunities? I'd love to hear from you!
              </p>
              <div className="flex justify-center gap-6">
                <a 
                  href="https://www.linkedin.com/in/leandro-alves-de-oliveira/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center hover:text-blue-600 transition-colors"
                >
                  <Linkedin size={32} />
                  <span className="mt-2">LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/leandroalveso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center hover:text-gray-800 transition-colors"
                >
                  <Github size={32} />
                  <span className="mt-2">GitHub</span>
                </a>
                <a 
                  href="mailto:engleandroalveso@gmail.com"
                  className="flex flex-col items-center hover:text-red-600 transition-colors"
                >
                  <Mail size={32} />
                  <span className="mt-2">Email</span>
                </a>
              </div>
              {/* <div className="mt-12">
                <Link 
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors inline-block"
                >
                  Contact Form
                </Link>
              </div> */}
            </div>
          </div>

        </section>

      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Leandro Alves</h3>
              <p className="text-gray-300">
                Software Developer | Data Engineer | Cloud/Platform Engineer
              </p>
              <div className="flex mt-4 space-x-4">
                <a 
                  href="https://www.linkedin.com/in/leandro-alves-de-oliveira/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://github.com/leandroalveso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="mailto:engleandroalveso@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                {/* <li><Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link></li> */}
                <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                {/* <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li> */}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-300 mb-2">
                Feel free to reach out via email:
              </p>
              <a 
                href="mailto:engleandroalveso@gmail.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                engleandroalveso@gmail.com
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Leandro Alves. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}