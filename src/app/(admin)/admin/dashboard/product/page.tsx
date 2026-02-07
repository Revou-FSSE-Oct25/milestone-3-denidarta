"use client";

import {Table} from "@radix-ui/themes";
import useSWR from "swr";
import {Product} from "@/types/product.types";
import Button from "@/components/Button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductList() {
	const {data, error, isLoading} = useSWR<Product[]>(
		"https://api.escuelajs.co/api/v1/products",
		fetcher,
	);
	if (error) return <div>{error}</div>;
	if (isLoading) return <div>Searching the warehouse...</div>;

	return (
		<main>
			<Button>Add Product</Button>
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Product Name</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{data?.map((product) => (
						<Table.Row key={product.id}
						           className={"cursor-pointer transition-colors even:bg-gray-100 odd:bg-gray-200"}>
							<Table.RowHeaderCell>{product.title}</Table.RowHeaderCell>
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
