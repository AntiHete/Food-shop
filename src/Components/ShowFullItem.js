import React, { Component } from 'react'

// Компонент ShowFullItem відображає повну інформацію про певний товар.
export class ShowFullItem extends Component {
    render() {
        return (
            <div className='full-item'>
                <div>
                    {/* Зображення товару, яке відображається як елемент img. */}
                    <img src={"./img/" + this.props.item.img} alt="" onClick={() => this.props.onShowItem(this.props.item)} />
                    {/* Заголовок товару */}
                    <h2>{this.props.item.title}</h2>
                    {/* Опис товару */}
                    <p>{this.props.item.desc}</p>
                    {/* Вага товару */}
                    <p>{this.props.item.weight}</p>
                    {/* Ціна товару */}
                    <b>{this.props.item.price}UAH</b>
                    {/* Елемент "Додати до кошика", який викликає метод onAdd при кліці */}
                    <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>+</div>
                </div>
            </div>
        )
    }
}

export default ShowFullItem
