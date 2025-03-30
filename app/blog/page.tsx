"use client";

import { useState } from "react";
import Link from "next/link";
import { House, Search, Calendar, Clock, Tag } from "lucide-react";

export default function BlogPage() {
  // Blog posts data - in a real implementation, this would come from a CMS or API
  const allPosts: any[] = [
    // {
    //   id: 1,
    //   title: "Building Scalable Data Pipelines with Apache Airflow",
    //   slug: "building-scalable-data-pipelines-airflow",
    //   except: "Learn how to design and implement robust, scalable data pipelines using Apache Airflow and best practices for orchestrating complex workflows.",
    //   date: "March 15, 2025",
    //   readTime: "12 min read",
    //   category: "Data Engineering",
    //   tags: ["Airflow", "Data Pipelines", "ETL", "Python", "Orchestration"]
    // }
  ];

  // State for filtering and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Get unique categories and tags for filters
  const categories = [...new Set(allPosts.map(post => post.category))];
  const tags = [...new Set(allPosts.flatMap(post => post.tags))];

  // Filter posts based on search term, category, and tag
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.except.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || post.category === selectedCategory;
    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Header with navigation would be here - reused from homepage */}
      
      <main className="flex-grow">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Blog & Articles</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Thoughts, insights, and technical guides on data engineering, cloud architecture, 
              and software development best practices.
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center md:justify-start">
              <a 
                href="/" 
                target="_blank"
                className="bg-white text-blue-700 hover:bg-blue-50 py-2 px-6 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <House size={18} />
                <span>Home</span>
              </a>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                {/* Category Filter */}
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                {/* Tag Filter */}
                <div>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">All Tags</option>
                    {tags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.except}</p>
                      {/* <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs font-medium bg-gray-100 text-gray-800 py-1 px-2 rounded cursor-pointer hover:bg-gray-200"
                            onClick={() => setSelectedTag(tag)}
                          >
                            <Tag size={12} className="inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div> */}
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setSelectedTag("");
                  }}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        {/* <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to My Newsletter</h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Get the latest articles, tutorials, and insights on data engineering, cloud architecture, and more delivered to your inbox.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm mt-4 opacity-80">
              No spam, unsubscribe at any time. Your email address will be kept private.
            </p>
          </div>
        </section> */}
        
      </main>

      {/* Footer would be here - reused from homepage */}
    </div>
  );
}