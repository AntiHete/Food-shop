import React, { useState } from 'react'; // Імпорт React та useState з бібліотеки 'react'
import { FaShoppingCart } from "react-icons/fa"; // Імпортуємо іконку корзини
import Order from './Order'; // Імпортуємо компонент Order
import { CSSTransition } from 'react-transition-group'; // Імпортуємо компонент для анімації
import OrderForm from './OrderForm'; // Імпортуємо компонент форми замовлення

export default function Header(props) {
    const [cartOpen, setCartOpen] = useState(false); // Стан для відкриття/закриття корзини
    const [searchTerm, setSearchTerm] = useState(''); // Стан для збереження пошукового запиту
    const [checkoutOpen, setCheckoutOpen] = useState(false); // Стан для відкриття/закриття форми замовлення

    // Функція для обробки зміни в полі пошуку
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Зберігаємо значення поля пошуку в стані
        props.searchItems(event.target.value); // Викликаємо зовнішню функцію для пошуку елементів
    };

    // Функція для відображення замовлень
    const showOrders = () => {
        let summa = 0;
        props.orders.forEach(el => summa += Number.parseFloat(el.price) * (el.quantity || 1));
        return (
            <div>
                {props.orders.map(el => (
                    <Order
                        onDelete={props.onDelete}
                        key={el.id}
                        item={el}
                        updateQuantity={props.updateQuantity} // Убедитесь, что передаете функцию правильно
                    />
                ))}
                <p className='summa'>Сумма: {new Intl.NumberFormat().format(summa)} UAH</p>
                <button className='checkout-button' onClick={() => setCheckoutOpen(prev => !prev)}>Оформить заказ</button>
            </div>
        );
    };

    // Функція для відображення повідомлення про відсутність товарів у корзині
    const showNothing = () => {
        return (
            <div className='empty'>
                <h2>Товарів немає</h2>
            </div>
        );
    };

    return (
        <header>
            <div>
                <span className='logo'>Food Store</span>
                {/* Використовуємо анімацію для поля пошуку */}
                <CSSTransition
                    in={true}
                    timeout={300}
                    classNames="slide-up"
                >
                    <input
                        type="text"
                        placeholder="Пошук..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </CSSTransition>
                {/* Відображаємо пункт меню для оформлення замовлення */}
                <ul className='nav'>
                    <li onClick={() => setCheckoutOpen(prev => !prev)}>Оформлення замовлення</li>
                </ul>
                {/* Відображаємо іконку корзини, яка відкриває/закриває корзину */}
                <FaShoppingCart onClick={() => setCartOpen(!cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`} />

                {/* Відображаємо корзину, якщо вона відкрита */}
                {cartOpen && (
                    <div className='shop-cart'>
                        {props.orders.length > 0 ?
                            showOrders(props) : showNothing()}
                    </div>
                )}

                {/* Відображаємо форму замовлення, якщо вона відкрита */}
                <CSSTransition
                    in={checkoutOpen}
                    timeout={300}
                    classNames="slide-up"
                    unmountOnExit
                >
                    <div className="checkout-form">
                        <h3>Форма оформлення замовлення</h3>
                        {/* Використовуємо компонент OrderForm для відображення форми */}
                        <OrderForm onSubmit={(formData) => {
                            console.log(formData);
                            setCheckoutOpen(false); // Закриваємо форму після її відправки
                        }} />
                    </div>
                </CSSTransition>
            </div>
            <div className='presentation'></div>
        </header>
    );
}
