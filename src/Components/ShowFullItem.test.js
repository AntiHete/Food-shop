import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShowFullItem from './ShowFullItem';

describe('ShowFullItem component', () => {
    const item = {
        img: 'apple.jpg',
        title: 'Apple',
        desc: 'Fresh apple',
        weight: '1kg',
        price: '100'
    };
    const mockOnShowItem = jest.fn();
    const mockOnAdd = jest.fn();

    test('renders ShowFullItem component', () => {
        render(<ShowFullItem item={item} onShowItem={mockOnShowItem} onAdd={mockOnAdd} />);

        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Fresh apple')).toBeInTheDocument();
        expect(screen.getByText('1kg')).toBeInTheDocument();
        expect(screen.getByText('100UAH')).toBeInTheDocument();
        expect(screen.getByAltText('').src).toContain('apple.jpg');
    });

    test('calls onShowItem when image is clicked', () => {
        render(<ShowFullItem item={item} onShowItem={mockOnShowItem} onAdd={mockOnAdd} />);

        fireEvent.click(screen.getByAltText(''));
        expect(mockOnShowItem).toHaveBeenCalledWith(item);
    });

    test('calls onAdd when add to cart button is clicked', () => {
        render(<ShowFullItem item={item} onShowItem={mockOnShowItem} onAdd={mockOnAdd} />);

        fireEvent.click(screen.getByText('+'));
        expect(mockOnAdd).toHaveBeenCalledWith(item);
    });
});
