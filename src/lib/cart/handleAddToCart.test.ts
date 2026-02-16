import {handleAddToCart} from '@/lib/cart/handleAddToCart';
import {Product} from '@/types/Product.types';

describe ('handleAddToCart', () => {
	beforeEach (() => {
		jest.useFakeTimers ();
	});
	
	afterEach (() => {
		jest.runOnlyPendingTimers ();
		jest.useRealTimers ();
		jest.clearAllMocks ();
	});
	
	const buildProduct = (overrides: Partial<Product> = {}): Product => ({
		id: 1,
		title: 'Product',
		slug: 'product',
		price: 10,
		description: 'desc',
		category: {
			id: 1,
			name: 'Category',
			slug: 'category',
			image: 'https://example.com/category.png',
			creationAt: '2024-01-01T00:00:00.000Z',
			updatedAt: '2024-01-01T00:00:00.000Z',
		},
		images: ['https://example.com/product.png'],
		creationAt: '2024-01-01T00:00:00.000Z',
		updatedAt: '2024-01-01T00:00:00.000Z',
		...overrides,
	});
	
	it ('adds an item to cart and toggles isAdded for 2 seconds (with image)', () => {
		const product = buildProduct ({id: 42, images: ['https://example.com/img.png']});
		const add = jest.fn ();
		const setIsAdded = jest.fn ();
		
		handleAddToCart ({product, add, setIsAdded});
		
		expect (add).toHaveBeenCalledTimes (1);
		expect (add).toHaveBeenCalledWith ({
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.images?.[0],
		});
		
		expect (setIsAdded).toHaveBeenCalledTimes (1);
		expect (setIsAdded).toHaveBeenCalledWith (true);
		
		jest.advanceTimersByTime (1999);
		expect (setIsAdded).toHaveBeenCalledTimes (1);
		
		jest.advanceTimersByTime (1);
		expect (setIsAdded).toHaveBeenCalledTimes (2);
		expect (setIsAdded).toHaveBeenLastCalledWith (false);
	});
	
	it ('uses placeholder image when product has no images', () => {
		const product = buildProduct ({images: undefined});
		const add = jest.fn ();
		const setIsAdded = jest.fn ();
		
		handleAddToCart ({product, add, setIsAdded});
		
		expect (add).toHaveBeenCalledWith ({
			id: product.id,
			title: product.title,
			price: product.price,
			image: '/placeholder-image.png',
		});
	});
});

