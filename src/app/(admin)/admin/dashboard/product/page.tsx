"use client";

import {Callout, Dialog, Table} from "@radix-ui/themes";
import {AddProductPayload, Product} from "@/types/product.types";
import Button from "@/components/ui/Button";
import AddProductForm from "@/components/features/product/AddProductForm";
import {useEffect, useState} from "react";
import {productService} from "@/services/product.service";


export default function ProductList() {
	const [products, setProducts] = useState<Product[]>([]);
	const [showAddProductModal, setShowAddProductModal] = useState(false);
	const [submissionError, setSubmissionError] = useState<string | null>(null);
	const [showSuccessCallout, setShowSuccessCallout] = useState(false);

	useEffect(() => {
		productService.getAllProducts()
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
			const newProduct = await productService.addProduct(payload);
			setProducts((prev) => [...prev, newProduct]);
			setShowAddProductModal(false);
			setShowSuccessCallout(true);
			setTimeout(() => setShowSuccessCallout(false), 3000);
		} catch (error) {
			setSubmissionError(error instanceof Error ? error.message : "Failed to add product");
		}
	};
	return (
		<main className={" flex flex-col px-5"}>
			<Dialog.Root open={showAddProductModal} onOpenChange={setShowAddProductModal}>
				<Dialog.Trigger>
					<Button className={"w-fit"} onClick={() => setShowAddProductModal(true)}>
						Add Product
					</Button>
				</Dialog.Trigger>
				<Dialog.Content style={{maxWidth: 450}}>
					<Dialog.Title>Add New Product</Dialog.Title>
					<Dialog.Description size="2" mb="4">
						Fill in the details for the new product.
					</Dialog.Description>

					{submissionError && (
						<Callout.Root color="red" role="alert" className="mb-4">
							<Callout.Text>{submissionError}</Callout.Text>
						</Callout.Root>
					)}

					<AddProductForm
						onSubmit={handleAddProduct}
						onCancel={() => setShowAddProductModal(false)}
					/>
				</Dialog.Content>
			</Dialog.Root>

			{showSuccessCallout && (
				<Callout.Root color="green" role="alert" className="mb-4 mt-4">
					<Callout.Text>
						Product added successfully!
					</Callout.Text>
				</Callout.Root>
			)}

			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>
							Product Name
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>
							Category
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>
							Description
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{products.map((product) => (
						<Table.Row
							key={product.id}
							className={
								"cursor-pointer transition-colors even:bg-gray-100 odd:bg-gray-200"
							}
						>
							<Table.RowHeaderCell>
								{product.title}
							</Table.RowHeaderCell>
							<Table.Cell>{product.category.name}</Table.Cell>
							<Table.Cell>${product.price}</Table.Cell>
							<Table.Cell>{product.description}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</main>
	);
}
