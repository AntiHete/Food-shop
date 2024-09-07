// __tests__/Item.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Item from './Item';

describe('Item component', () => {
    const mockItem = {
        img: 'test.jpg',
        title: 'Test Item',
        price: '100',
    };
    const mockOnShowItem = jest.fn();
    const mockOnAdd = jest.fn();

    test('renders Item component', () => {
        render(<Item item={mockItem} onShowItem={mockOnShowItem} onAdd={mockOnAdd} />);
        
        const titleElement = screen.getByText(/Test Item/i);
        expect(titleElement).toBeInTheDocument();

        const priceElement = screen.getByText(/100UAH/i);
        expect(priceElement).toBeInTheDocument();
    });

    test('calls onShowItem when image is clicked', () => {
        render(<Item item={mockItem} onShowItem={mockOnShowItem} onAdd={mockOnAdd} />);

        const image = screen.getByAltText('');
        fireEvent.click(image);
        expect(mockOnShowItem).toHaveBeenCalledWith(mockItem);
    });

    test('calls onAdd when add-to-cart button is clicked', () => {
        render(<Item item={mockItem} onShowItem={mockOnShowItem} onAdd={mockOnAdd} />);

        const addToCartButton = screen.getByText('+');
        fireEvent.click(addToCartButton);
        expect(mockOnAdd).toHaveBeenCalledWith(mockItem);
    });
});
