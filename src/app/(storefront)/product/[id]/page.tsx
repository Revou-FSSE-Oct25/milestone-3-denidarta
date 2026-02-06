import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/products/getProductById";
import Button from "@/components/Button";

interface ProductDetailProps {
	params: Promise<{
		id: string;
	}>;
}

const ProductDetailPage = async ({ params }: ProductDetailProps) => {
	const { id } = await params;
	const product = await getProductById(id);

	if (!product) {
		notFound();
	}

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Breadcrumbs / Back Link */}
			<div className="mb-8">
				<Link href="/">
					<Button
						variant="secondary"
						className="text-base font-medium px-0"
					>
						← Back to Products
					</Button>
				</Link>
			</div>

			<div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
				{/* Image Gallery */}
				<div className="flex flex-col-reverse">
					<div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
						<div
							className="grid grid-cols-4 gap-6"
							aria-orientation="horizontal"
							role="tablist"
						>
							{product.images?.map((image, index) => (
								<div
									key={index}
									className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 ring-black ring-opacity-10 border overflow-hidden"
								>
									<Image
										src={image || "/placeholder.png"}
										alt={`${product.title} view ${index + 1}`}
										fill
										className="w-full h-full object-center object-cover"
									/>
								</div>
							))}
						</div>
					</div>

					<div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border bg-gray-100">
						{product.images?.[0] ? (
							<Image
								src={product.images[0]}
								alt={product.title}
								width={600}
								height={600}
								className="w-full h-full object-center object-cover"
								priority
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-gray-400">
								No image available
							</div>
						)}
					</div>
				</div>

				{/* Product info */}
				<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
					<div className="flex flex-col gap-4">
						<div>
							<span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-black text-white rounded-full">
								{product.category?.name ?? "Unknown Category"}
							</span>
							<h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
								{product.title}
							</h1>
						</div>

						<div className="mt-3">
							<h2 className="sr-only">Product information</h2>
							<p className="text-3xl text-gray-900 font-bold">
								${product.price}
							</p>
						</div>

						<div className="mt-6">
							<h3 className="sr-only">Description</h3>
							<div className="text-base text-font-secondary">
								<h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
									Details
								</h3>
								<p>{product.description}</p>
								<p className={"mt-8"}>
									Last updated:{" "}
									{new Date(
										product.updatedAt,
									).toLocaleDateString()}
								</p>
							</div>
						</div>

						<div className="mt-10 flex flex-col sm:flex-row gap-4">
							<Button className="flex-1 uppercase tracking-widest py-6">
								Add to Cart
							</Button>
							<Button
								variant="secondary"
								className="uppercase tracking-widest py-6"
							>
								Wishlist
							</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProductDetailPage;
