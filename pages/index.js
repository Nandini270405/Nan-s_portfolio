import Head from 'next/head'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import fs from 'fs'
import path from 'path'
import { useState, useMemo } from 'react'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'portfolio.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(jsonData)

  const projectsWithStats = await Promise.all(
    data.projects.map(async (project) => {
      try {
        const res = await fetch(`https://api.github.com/repos/Nandini270405/${project.repo}`)
        const repoData = await res.json()
        return {
          ...project,
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks_count || 0,
        }
      } catch (error) {
        console.error(`Error fetching stats for ${project.repo}:`, error)
        return { ...project, stars: 0, forks: 0 }
      }
    })
  )

  return {
    props: {
      ...data,
      projects: projectsWithStats,
      experience: data.experience || []
    },
    revalidate: 3600,
  }
}

export default function Home({ personalInfo, skills, projects, achievements, experience = [], education }) {
  const [filter, setFilter] = useState('All')

  const categories = useMemo(() => {
    const cats = new Set(['All'])
    projects.forEach(p => {
      if (p.stack.toLowerCase().includes('python')) cats.add('Python')
      if (p.stack.toLowerCase().includes('flask') || p.stack.toLowerCase().includes('django')) cats.add('Web')
      if (p.stack.toLowerCase().includes('fuzzy') || p.stack.toLowerCase().includes('scikit')) cats.add('AI/ML')
    })
    return Array.from(cats)
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter(p => {
      if (filter === 'Python') return p.stack.toLowerCase().includes('python')
      if (filter === 'Web') return p.stack.toLowerCase().includes('flask') || p.stack.toLowerCase().includes('django')
      if (filter === 'AI/ML') return p.stack.toLowerCase().includes('fuzzy') || p.stack.toLowerCase().includes('scikit')
      return true
    })
  }, [projects, filter])

  return (
    <>
      <Head>
        <title>{personalInfo.name} | Portfolio</title>
        <meta name="description" content={personalInfo.bio} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="portfolio-shell">
        <div className="orb orb-a" />
        <div className="orb orb-b" />

        <section className="container">
          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="topbar"
          >
            <span className="brand">{personalInfo.name.split(' ')[0]} Portfolio</span>
            <div className="links">
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </div>
          </motion.nav>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="hero glass"
          >
            <div className="hero-copy">
              <p className="eyebrow">{personalInfo.role}</p>
              <h1>{personalInfo.name}</h1>
              <p className="lead">{personalInfo.bio}</p>
              <div className="cta-row">
                <a className="btn btn-solid" href="#contact">
                  Get In Touch
                </a>
                <a className="btn btn-ghost" href={personalInfo.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a className="btn btn-ghost" href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="hero-image-wrap">
              <div className="hero-image">
                <Image src="/profile.jpg" alt={`${personalInfo.name} profile photo`} fill priority />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="stats-grid"
          >
            <Stat label="Degree" value={personalInfo.degree} />
            <Stat label="University" value={personalInfo.university} />
            <Stat label="Focus" value={personalInfo.focus} />
          </motion.section>

          <section className="content-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="glass panel"
              id="projects"
            >
              <div className="panel-header">
                <h2>Featured Projects</h2>
                <div className="filter-tabs">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`filter-btn ${filter === cat ? 'active' : ''}`}
                      onClick={() => setFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="project-list">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <motion.article
                      key={project.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="project-card"
                      whileHover={{ y: -6 }}
                    >
                      <div className="project-header">
                        <span className="project-index">0{index + 1}</span>
                        <div className="project-stats">
                          {project.stars > 0 && <span>⭐ {project.stars}</span>}
                          {project.forks > 0 && <span>🍴 {project.forks}</span>}
                        </div>
                      </div>
                      <h3>{project.title}</h3>
                      <p className="project-stack">{project.stack}</p>
                      <p>{project.desc}</p>
                      {project.features && (
                        <details className="project-details">
                          <summary>Key features</summary>
                          <ul>
                            {project.features.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        </details>
                      )}
                      <a href={project.github} target="_blank" rel="noreferrer">
                        View repository
                      </a>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="right-column">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="glass panel"
                id="skills"
              >
                <h2>Skills</h2>
                <div className="skill-cloud">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="glass panel"
              >
                <h2>Achievements</h2>
                <ul className="list">
                  {achievements.map((item, idx) => (
                    <li key={idx}>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noreferrer">
                          {item.text}
                        </a>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="glass panel experience"
            id="experience"
          >
            <h2>Experience</h2>
            {experience?.map((exp, idx) => (
              <div className="edu-row" key={idx}>
                <div>
                  <h3>{exp.company}</h3>
                  <p className="project-stack">{exp.role}</p>
                  <p>{exp.desc}</p>
                </div>
                <span>{exp.period}</span>
              </div>
            ))}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="glass panel education"
          >
            <h2>Education</h2>
            {education.map((edu, idx) => (
              <div className="edu-row" key={idx}>
                <div>
                  <h3>{edu.school}</h3>
                  <p>{edu.degree}</p>
                </div>
                <span>{edu.period}</span>
              </div>
            ))}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="glass panel contact-section"
            id="contact"
          >
            <h2>Get in Touch</h2>
            <ContactForm />
          </motion.section>
        </section>
      </main>
    </>
  )
}

function Stat({ label, value }) {
  return (
    <article className="glass stat-card">
      <p>{label}</p>
      <h3>{value}</h3>
    </article>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="form-input"
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="form-input"
      />
      <textarea
        placeholder="Message"
        required
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="form-input"
        rows={4}
      />
      <button type="submit" className="btn btn-solid" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && <p className="status-msg success">Message sent! I'll get back to you soon.</p>}
      {status === 'error' && <p className="status-msg error">Something went wrong. Please try again.</p>}
    </form>
  )
}

