export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    // Here you would typically send an email using a service like Resend, SendGrid, etc.
    // For now, we'll just log it and return a success response.
    console.log('New Contact Form Submission:', { name, email, message })

    // Simulate a bit of delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return res.status(200).json({ success: true, message: 'Message sent successfully!' })
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' })
}
