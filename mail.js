import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function createTransporter() {
  if (process.env.MAILGUN_USER && process.env.MAILGUN_PASS) {
    console.log('📡 Configuration Mailgun détectée.');
    return nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
      },
      logger: true,
      debug: true,
    });
  } else if (process.env.MAILTRAP_USER && process.env.MAILTRAP_PASS) {
    console.log(' Fallback vers Mailtrap.');
    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port:  587,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
      logger: true,
      debug: true,
    });
  } else {
    throw new Error('Aucune configuration SMTP valide trouvée (ni Mailgun, ni Mailtrap).');
  }
}

async function testMail() {
  const transporter = await createTransporter();

  const fromEmail = process.env.SENDER_EMAIL || 'fallback@example.com';

  const mailOptions = {
    from: `"Test Envoi" <${fromEmail}>`,
    to: 'jcamj.950@gmail.com', // ← Remplace par ton email
    subject: 'Test SMTP (Mailgun avec fallback Mailtrap)',
    text: 'Ceci est un test d’email avec gestion de fallback Mailgun > Mailtrap.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(' Email envoyé avec succès !');
    console.log(info);
  } catch (error) {
    console.error(' Échec de l’envoi de l’email :', error.message);
  }
}

testMail();
