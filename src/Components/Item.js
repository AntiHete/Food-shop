import React, { Component } from 'react'; // Імпорт React та Component з бібліотеки 'react'

export class Item extends Component { // Класовий компонент Item
    render() { // Метод render для відображення компонента
        return (
            <div className='item'> {/* Відображення блоку товару*/}
                <img src={"./img/" + this.props.item.img} alt="" onClick={() => this.props.onShowItem(this.props.item)} /> {/* Відображення зображення товару */}
                <h2>{this.props.item.title}</h2> {/* Відображення назви товару */}
                <b>{this.props.item.price}UAH</b> {/* Відображення ціни товару */}
                <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>+</div> {/* Кнопка для додавання товару до кошика */}
            </div>
        )
    }
}

export default Item; // Експорт компонента Item
