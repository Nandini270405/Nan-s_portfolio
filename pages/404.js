import Link from 'next/link'
import Head from 'next/head'
import { motion } from 'framer-motion'

export default function Custom404() {
  return (
    <div className="portfolio-shell">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="orb orb-c" />
      
      <div className="container">
        <div className="error-page">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1 }}
          >
            404
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Lost in the Code?</h2>
            <p>The page you're looking for has been moved or doesn't exist.</p>
            <Link href="/" className="btn btn-solid">
              Return Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
