import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Імпортуємо бібліотеку Axios для взаємодії з сервером

export default function OrderForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        deliveryMethod: '',
        paymentMethod: ''
    });

    // Функція, яка викликається при зміні будь-якого поля форми
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Функція, яка викликається при надсиланні форми
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form data submitted:', formData); // Виводимо дані форми в консоль перед надсиланням
        if (!onSubmit) {
            console.error('Error: onSubmit function is not provided.'); // Перевіряємо, чи передана функція onSubmit
            return;
        }
        try {
            // Надсилаємо дані форми на сервер
            const response = await axios.post('http://localhost:5000/submit-form', formData);
            console.log(response.data); // Виводимо відповідь сервера в консоль
            // Викликаємо onSubmit з отриманою відповіддю
            onSubmit(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };    

    // Зберігаємо дані форми в localStorage при закритті
    useEffect(() => {
        // Зберігаємо дані форми при зміні
        localStorage.setItem('orderFormData', JSON.stringify(formData));
    }, [formData]);

    // Відновлюємо дані форми з localStorage при завантаженні
    useEffect(() => {
        const savedData = localStorage.getItem('orderFormData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Ім'я:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Електронна пошта:</label> {/* Поле для вводу електронної пошти */}
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                /> 
            </div>
            <div style={{ display: formData.deliveryMethod === 'pickup' ? 'none' : 'block' }}>
                <label htmlFor="address">Адреса доставки:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="deliveryMethod">Спосіб доставки:</label>
                <select
                    id="deliveryMethod"
                    name="deliveryMethod"
                    value={formData.deliveryMethod}
                    onChange={handleChange}
                    required
                >
                    <option value="">Оберіть спосіб доставки</option>
                    <option value="courier">Кур'єрська доставка</option>
                    <option value="pickup">Самовивіз</option>
                </select>
            </div>
            <div>
                <label htmlFor="paymentMethod">Спосіб оплати:</label>
                <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                >
                    <option value="">Оберіть спосіб оплати</option>
                    <option value="online">Онлайн-оплата</option>
                    <option value="cash">Оплата при отриманні</option>
                </select>
            </div>
            <button type="submit">Підтвердити замовлення</button>
        </form>
    );
}
