import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Categories from './Categories.js';

describe('Categories component', () => {
    const mockChooseCategory = jest.fn();

    test('renders Categories component', () => {
        render(<Categories chooseCategory={mockChooseCategory} />);
        
        const categories = [
            'Всі', 'Фрукти', 'Овочі', 'М`ясо та м`ясопродукти',
            'Риба та морепродукти', 'Молочні продукти', 'Зернові продукти',
            'Напої', 'Десерти та солодощі'
        ];

        categories.forEach(category => {
            expect(screen.getByText(category)).toBeInTheDocument();
        });
    });

    test('calls chooseCategory when a category is clicked', () => {
        render(<Categories chooseCategory={mockChooseCategory} />);

        const categoryElement = screen.getByText('Фрукти');
        fireEvent.click(categoryElement);

        expect(mockChooseCategory).toHaveBeenCalledWith('fruit');
    });
});
