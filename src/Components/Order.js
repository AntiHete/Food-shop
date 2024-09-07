import React, { Component } from 'react'; // Імпорт React та Component з бібліотеки 'react'
import { FaTrash } from "react-icons/fa"; // Імпорт іконки смітника з бібліотеки 'react-icons/fa'

export class Order extends Component { // Класовий компонент Order
    render() { // Метод render для відображення компонента
        return (
            <div className='item'> {/* Відображення блоку замовлення */}
                <img src={"./img/" + this.props.item.img} alt="" /> {/* Відображення зображення товару */}
                <h2>{this.props.item.title}</h2> {/* Відображення назви товару */}
                <b>{this.props.item.price}UAH</b> {/* Відображення ціни товару */}
                <FaTrash className='delete-icon' onClick={() => this.props.onDelete(this.props.item.id)} /> {/* Іконка смітника для видалення товару з кошика */}
            </div>
        );
    }
}

export default Order; // Експорт компонента Order
