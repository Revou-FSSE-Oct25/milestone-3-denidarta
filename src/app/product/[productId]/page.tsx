import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/types";

interface ProductDetailProps {
	params: Promise<{
		productId: string;
	}>;
}

const ProductDetailPage = async ({ params }: ProductDetailProps) => {
	const { productId } = await params;

	let fetchedProduct: ProductDetail | null = null;
	let error: string | null = null;

	try {
		const response = await fetch(
			`https://api.escuelajs.co/api/v1/products/${productId}`,
		);

		if (!response.ok) {
			if (response.status === 404) {
				notFound();
			}
			throw new Error(`Failed to fetch product: ${response.statusText}`);
		}

		fetchedProduct = await response.json();
	} catch (err: unknown) {
		console.error("Error fetching product:", err);
		error =
			err instanceof Error ? err.message : "An unknown error occurred";
	}

	if (!fetchedProduct) {
		notFound(); // If product is null due to network error or other issues
	}

	const product = fetchedProduct;

	return (
		<div className="container mx-auto p-4">
			{error && <p className="text-red-500">Error: {error}</p>}

			{product && (
				<div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
					<h1 className="text-3xl font-bold mb-4">{product.title}</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="flex flex-col items-center">
							{product.images && product.images.length > 0 && (
								<div className="relative w-full h-80 rounded-lg overflow-hidden mb-4">
									{" "}
									{/* Container for main image */}
									<Image
										src={product.images[0]}
										alt={product.title}
										fill // Fills the parent container
										style={{ objectFit: "cover" }} // Cover the container
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
										priority
									/>
								</div>
							)}
							<div className="flex space-x-2 overflow-x-auto">
								{product.images &&
									product.images
										.slice(1)
										.map((image, index) => (
											<Image
												key={index}
												src={image}
												alt={`${product.title} thumbnail ${index + 1}`}
												width={96} // Equivalent to w-24 (96px)
												height={96} // Equivalent to h-24 (96px)
												className="object-cover rounded-md cursor-pointer"
											/>
										))}
							</div>
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-800 mb-4">
								${product.price.toFixed(2)}
							</p>
							<p className="text-gray-700 mb-4">
								{product.description}
							</p>
							{product.category && (
								<p className="text-gray-600">
									Category:{" "}
									<span className="font-medium">
										{product.category.name}
									</span>
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetailPage;
