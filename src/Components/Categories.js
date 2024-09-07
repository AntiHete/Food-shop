import React, { Component } from 'react'; // Імпорт React та Component з бібліотеки 'react'

export class Categories extends Component { // Класовий компонент Categories
    constructor(props) { // Конструктор класу
        super(props);
        this.state = { // Початковий стан компонента
            categories: [ // Масив категорій
                {
                    key: 'all',
                    name: 'Всі'
                },
                {
                    key: 'fruit',
                    name: 'Фрукти'
                },
                {
                    key: 'vegetable',
                    name: 'Овочі'
                },
                {
                    key: 'meat',
                    name: 'М`ясо та м`ясопродукти'
                },
                {
                    key: 'fish',
                    name: 'Риба та морепродукти'
                },
                {
                    key: 'milk',
                    name: 'Молочні продукти'
                },
                {
                    key: 'crops',
                    name: 'Зернові продукти'
                },
                {
                    key: 'drinks',
                    name: 'Напої'
                },
                {
                    key: 'sweets',
                    name: 'Десерти та солодощі'
                }
            ]
        }
    }
    render() { // Метод render для відображення компонента
        return (
            <div className='categories'> {/* Відображення блоку категорій */}
                {this.state.categories.map(el => ( // Мапування кожної категорії
                    <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</div> // Відображення назви категорії та обробник кліку
                ))}
            </div>
        );
    }
}

export default Categories; // Експорт компонента Categories