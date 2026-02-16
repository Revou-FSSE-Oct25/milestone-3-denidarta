import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Product} from '@/types/Product.types';

import ProductCard from './ProductCard';

const pushMock = jest.fn ();

jest.mock ('next/navigation', () => ({
	useRouter: () => ({
		push: pushMock,
	}),
}));

jest.mock ('next/image', () => ({
	__esModule: true,
	default: ({
		          src,
		          alt,
		          onError,
	          }: {
		src: string;
		alt: string;
		onError?: React.ReactEventHandler<HTMLImageElement>;
	}) => <img src={src} alt={alt} onError={onError}/>,
}));

const buildProduct = (overrides: Partial<Product> = {}): Product => ({
	id: 123,
	title: 'Test Product',
	slug: 'test-product',
	price: 49,
	description: 'A short description',
	category: {
		id: 9,
		name: 'Shoes',
		slug: 'shoes',
		image: 'https://example.com/category.png',
		creationAt: '2024-01-01T00:00:00.000Z',
		updatedAt: '2024-01-02T00:00:00.000Z',
	},
	images: ['https://example.com/product.png'],
	creationAt: '2024-01-01T00:00:00.000Z',
	updatedAt: '2024-01-02T00:00:00.000Z',
	...overrides,
});

describe ('ProductCard', () => {
	beforeEach (() => {
		pushMock.mockClear ();
	});
	
	it ('renders product information (title, price, category, description)', () => {
		const product = buildProduct ();
		render (<ProductCard product={product}/>);
		
		expect (screen.getByText (product.title)).toBeInTheDocument ();
		expect (screen.getByText (`$${product.price}`)).toBeInTheDocument ();
		expect (screen.getByText (product.category.name)).toBeInTheDocument ();
		expect (screen.getByText (product.description as string)).toBeInTheDocument ();
	});
	
	it ('navigates to product details when clicked', async () => {
		const user = userEvent.setup ();
		const product = buildProduct ({id: 777});
		render (<ProductCard product={product}/>);
		
		await user.click (screen.getByText (product.title));
		expect (pushMock).toHaveBeenCalledTimes (1);
		expect (pushMock).toHaveBeenCalledWith (`/product/${product.id}`);
	});
	
	
	it ('renders a fallback when no images are provided', () => {
		const product = buildProduct ({images: undefined});
		render (<ProductCard product={product}/>);
		
		expect (screen.getByText ('No Image')).toBeInTheDocument ();
		expect (screen.queryByRole ('img')).not.toBeInTheDocument ();
	});
	
	it ('renders a fallback when the image fails to load', () => {
		const product = buildProduct ({images: ['https://example.com/broken.png']});
		render (<ProductCard product={product}/>);
		
		const image = screen.getByRole ('img', {name: product.title});
		fireEvent.error (image);
		
		expect (screen.getByText ('No Image')).toBeInTheDocument ();
		expect (screen.queryByRole ('img')).not.toBeInTheDocument ();
	});
	
	it ('does not render \'undefined\' when description is missing', () => {
		const product = buildProduct ({description: undefined});
		const {container} = render (<ProductCard product={product}/>);
		
		expect (container).not.toHaveTextContent ('undefined');
	});
});

