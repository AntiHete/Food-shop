import React, { Component } from 'react'; // Імпорт React та Component з бібліотеки 'react'
import Item from './Item'; // Імпорт компонента Item

export class Items extends Component { // Класовий компонент Items
    render() { // Метод render для відображення компонента
        return (
            <main> {/* Відображення основного контенту*/}
                {this.props.items.map(el => ( // Мапування кожного елемента списку товарів
                    <Item onShowItem={this.props.onShowItem} key={el.id} item={el} onAdd={this.props.onAdd} /> // Відображення компонента Item
                ))}
            </main>
        )
    }
}

export default Items; // Експорт компонента Items
