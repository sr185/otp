const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'scr840514@gmail.com',
        pass: 'itdabjbywqdelbcm'
    }
});

app.post('/send-email', (req, res) => {
    const { text, to, subject, from } = req.body;
    if (!text || !to || !subject || !from) {
        return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
    }
    const mailOptions = {
        text,
        to,
        subject,
        from
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email error:', error);
            return res.status(500).json({ error: 'Failed to send email', details: error.toString() });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully', info });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
