const dotenv = require('dotenv');
//const mongoose = require('mongoose');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = 5000;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

app.use(cors());
app.use(express.json());

app.post('/submit-form', (req, res) => {
    const formData = req.body; 

    function handleEmailResult(err, info) {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent:', info.envelope);
        }
    }
    
    let messagedeliveryMethod1 = ``,
        messagedeliveryMethod3 = ``,
        messagedeliveryMethod4 = ``
    if (formData.deliveryMethod === 'courier') {
        messagedeliveryMethod1 = `Ваше замовлення буде віправлено на ${formData.address}`,
        messagedeliveryMethod3 = `Ваше замовлення зібране, та відправлене на адресу ${formData.address}, очікуйте кур'єра на протязі години!`,
        messagedeliveryMethod4 = `Ваше замовлення доставлене, дякуємо за користування сервісом Food Store!`,
        subjectdeliveryMethod1 = `Замовлення відправлене`
    } else if (formData.deliveryMethod === 'pickup') {
        messagedeliveryMethod1 = `Вам треба буде забрати ваше замовлення з найближчого магазину Food Store`,
        messagedeliveryMethod3 = `Ваше замовлення зібране, та очікує вас y найближчому магазині Food Store`,
        messagedeliveryMethod4 = `Ви отримали замовлення y магазині Food Store, дякуємо за користування сервісом!`,
        subjectdeliveryMethod1 = `Замовлення очікує вас!`
    } else {
        messagedeliveryMethod1 = 'Щось сдохло по доставці',
        messagedeliveryMethod3 = 'Щось сдохло по доставці',
        messagedeliveryMethod4 = 'Щось сдохло по доставці'
    }
    
    let messagepaymentMethod1 = ``,
        messagepaymentMethod2 = ``,
        messagepaymentMethod3 = ``
    if (formData.paymentMethod === 'online') {
        messagepaymentMethod1 = `Оплатіть будь-ласка Ваше замовлення`,
        messagepaymentMethod2 = `Дякуємо за оплату Вашого замовлення, ваше замовляння збирається нашими робітниками!`,
        messagepaymentMethod3 = `Ваше замовлення оплачене, але нам буде дуже приємно, якщо ви не забудете про чайові!`
    } else if (formData.paymentMethod === 'cash') {
        messagepaymentMethod1 = `Вам буде треба розрахуватись готівкою при отриманні замовлення`,
        messagepaymentMethod2 = `Ваше замовляння збирається нашими робітниками! Оплата при отриманні замовлення.`,
        messagepaymentMethod3 = `Вам буде треба розрахуватись за замовлення, не забувайте про чайові!`
    } else {
        messagepaymentMethod1 = `Щось сдохло по оплаті`,
        messagepaymentMethod2 = `Щось сдохло по оплаті`,
        messagepaymentMethod3 = `Щось сдохло по оплаті`
    }
    
    /* Прийнято, оплачено/в обробці, відправлено/готово для отримання, доставлено*/

    const mailOptions1 = {
        from: process.env.EMAIL,
        to: formData.email,
        subject: 'Нове замовлення',
        text: `
        Вітаємо, ${formData.name}! 
        Ваше замовлення з Food Store прийнято!
        ${messagedeliveryMethod1} 
        ${messagepaymentMethod1}
        
        З любов'ю, ваш Food Store`
    };
    const mailOptions2 = {
        from: process.env.EMAIL,
        to: formData.email,
        subject: 'Ваше замовлення в обробці',
        text: `
        Вітаємо, ${formData.name}! 
        Ваше замовлення з Food Store обробляється!
        ${messagepaymentMethod2}
        
        З любов'ю, ваш Food Store`
    };
    const mailOptions3 = {
        from: process.env.EMAIL,
        to: formData.email,
        subject: subjectdeliveryMethod1,
        text: `
        Вітаємо, ${formData.name}! 
        ${messagedeliveryMethod3} 
        ${messagepaymentMethod3}
        
        З любов'ю, ваш Food Store`
    };
    const mailOptions4 = {
        from: process.env.EMAIL,
        to: formData.email,
        subject: 'Дякуємо за покупку!',
        text: `
        Вітаємо, ${formData.name}! 
        ${messagedeliveryMethod4} 
        
        З любов'ю, ваш Food Store`
    };

    // Функция для отправки письма с задержкой
    function sendEmailWithDelay(mailOptions, delay) {
        setTimeout(() => {
            transporter.sendMail(mailOptions, handleEmailResult);
        }, delay);
    }

    // Отправка 4 сообщений с задержкой в пол минуты
    const emails = [mailOptions1, mailOptions2, mailOptions3, mailOptions4];
    const delays = [0, 30000, 60000, 90000,];

    for (let i = 0; i < emails.length; i++) {
        sendEmailWithDelay(emails[i], delays[i]);
    }

});
app.listen(PORT, () => console.log('Server started on port', PORT));

/* const DB_URL = 'mongodb+srv://user:user@foodstore.heqfssd.mongodb.net/?retryWrites=true&w=majority&appName=FoodStore';

mongoose.connect(DB_URL, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err)); */

    /*   
*/