"use client";

import {Callout, Dialog} from "@radix-ui/themes";
import {AddProductPayload, Product} from "@/types/product.types";
import Button from "@/components/ui/Button";
import AddProductForm from "@/components/features/product/AddProductForm";
import {useEffect, useState} from "react";
import {fetchService} from "@/services/product.service";
import {ProductsTable} from "@/components/features/admin/dashboard";


export default function ProductList() {
	const [products, setProducts] = useState<Product[]>([]);
	const [showAddProductModal, setShowAddProductModal] = useState(false);
	const [submissionError, setSubmissionError] = useState<string | null>(null);
	const [showSuccessCallout, setShowSuccessCallout] = useState(false);

	useEffect(() => {
		fetchService.getAllProducts()
			.then((data) => {
				setProducts(data);
			})
			.catch((error) => {
				console.error(error);
				setSubmissionError(error instanceof Error ? error.message : "Failed to load products");
			});
	}, []);

	const handleAddProduct = async (payload: AddProductPayload) => {
		try {
			setSubmissionError(null);
			const newProduct = await fetchService.addProduct(payload);
			setProducts((prev) => [...prev, newProduct]);
			setShowAddProductModal(false);
			setShowSuccessCallout(true);
			setTimeout(() => setShowSuccessCallout(false), 3000);
		} catch (error) {
			setSubmissionError(error instanceof Error ? error.message : "Failed to add product");
		}
	};
	return (
		<main className="min-h-screen bg-[#f4f4f4] px-4 py-6 md:px-8">
			<div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4">
				<div className="flex flex-wrap items-center justify-end">
					<Dialog.Root open={showAddProductModal} onOpenChange={setShowAddProductModal}>
						<Dialog.Trigger asChild>
							<Button
								className="w-fit !rounded-none !border !border-[#0f62fe] !bg-[#0f62fe] !text-sm !font-semibold !text-white hover:!bg-[#0353e9] active:!scale-100 focus-visible:!ring-[#0f62fe]"
								onClick={() => setShowAddProductModal(true)}
							>
								Add Product
							</Button>
						</Dialog.Trigger>
						<Dialog.Content
							className="!rounded-none border border-[#8d8d8d] bg-white p-6 shadow-[0_8px_24px_rgba(22,22,22,0.2)]"
							style={{maxWidth: 520}}
						>
							<Dialog.Title className="text-lg font-semibold text-[#161616]">
								Add New Product
							</Dialog.Title>
							<Dialog.Description size="2" mb="4" className="text-[#525252]">
								Fill in the details for the new product.
							</Dialog.Description>

							{submissionError && (
								<Callout.Root color="red" role="alert" className="mb-4 !rounded-none">
									<Callout.Text>{submissionError}</Callout.Text>
								</Callout.Root>
							)}

							<AddProductForm
								onSubmit={handleAddProduct}
								onCancel={() => setShowAddProductModal(false)}
							/>
						</Dialog.Content>
					</Dialog.Root>
				</div>

				{showSuccessCallout && (
					<Callout.Root color="green" role="alert" className="!rounded-none">
						<Callout.Text>Product added successfully!</Callout.Text>
					</Callout.Root>
				)}

				<section className="border border-[#c6c6c6] bg-white p-5">
					<div className="overflow-x-auto">
						<ProductsTable rows={products}/>
					</div>
				</section>
			</div>
		</main>
	);
}
