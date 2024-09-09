import React, { Component } from 'react'; // Імпорт React та Component з бібліотеки 'react'
import { FaTrash } from "react-icons/fa"; // Імпорт іконки смітника з бібліотеки 'react-icons/fa'

export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.item.quantity || 1, // Встановлюємо початкову кількість з пропсів
        };
    }

    incrementQuantity = () => {
        this.props.updateQuantity(this.props.item.id, this.props.item.quantity + 1); // Увеличиваем количество
    };

    decrementQuantity = () => {
        if (this.props.item.quantity > 1) { // Убедимся, что количество больше 1
            this.props.updateQuantity(this.props.item.id, this.props.item.quantity - 1); // Уменьшаем количество
        }
    };

    render() {
        return (
            <div className='item'>
                <img src={"./img/" + this.props.item.img} alt="" />
                <h2>{this.props.item.title}</h2>
                <b>{this.props.item.price} UAH</b>
                
                <div className="quantity-control">
                    <button className="quantity-btn" onClick={this.decrementQuantity}>-</button>
                    <span className="quantity">{this.props.item.quantity}</span>
                    <button className="quantity-btn" onClick={this.incrementQuantity}>+</button>
                </div>
                
                <FaTrash className='delete-icon' onClick={() => this.props.onDelete(this.props.item.id)} />
            </div>
        );
    }
}

export default Order; // Експорт компонента Order
