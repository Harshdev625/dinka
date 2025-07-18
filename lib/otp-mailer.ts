import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP settings
  auth: {
    user: process.env.EMAIL_SERVER_USER, 
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})
interface SendOtpOptions {
  to: string
  otp: string
}

export async function sendOtpMail({ to, otp}: SendOtpOptions) {
  const name="User"
  const mailOptions = {
    from: `"Dinka Auth" <${process.env.EMAIL_SERVER_USER}>`,
    to,
    subject: "Your Dinka OTP Code",
    html: `
      <div style="font-family: sans-serif; padding: 16px;">
        <h2>Hello ${name},</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This code is valid for 5 minutes. Do not share it with anyone.</p>
        <br />
        <p>Team Dinka</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`✅ OTP email sent to ${to}`)
    return { success: true }
  } catch (error) {
    console.error(`❌ Failed to send OTP to ${to}`, error)
    return { success: false, error }
  }
}
