"use client";

import {Table} from "@radix-ui/themes";
import {Product} from "@/types/product.types";

export interface ProductsTableProps {
	rows: Product[];
	emptyMessage?: string;
}

export default function ProductsTable({
	rows,
	emptyMessage = "No products found.",
}: ProductsTableProps) {
	return (
		<Table.Root
			variant="surface"
			className="min-w-[860px] border border-[#c6c6c6] bg-white text-[#161616]"
		>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell className="border-b border-[#c6c6c6] bg-[#f4f4f4] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#525252]">
						Product Name
					</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell className="border-b border-[#c6c6c6] bg-[#f4f4f4] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#525252]">
						Category
					</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell className="border-b border-[#c6c6c6] bg-[#f4f4f4] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#525252]">
						Price
					</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell className="border-b border-[#c6c6c6] bg-[#f4f4f4] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#525252]">
						Description
					</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{rows.length === 0 && (
					<Table.Row>
						<Table.Cell colSpan={4} className="px-4 py-10 text-sm text-[#525252]">
							{emptyMessage}
						</Table.Cell>
					</Table.Row>
				)}
				{rows.map((product, index) => (
					<Table.Row
						key={product.id}
						className={`border-b border-[#e0e0e0] ${
							index % 2 === 0 ? "bg-white" : "bg-[#fcfcfc]"
						} transition-colors hover:bg-[#edf5ff]`}
					>
						<Table.RowHeaderCell className="px-4 py-3 text-sm font-medium text-[#161616]">
							{product.title}
						</Table.RowHeaderCell>
						<Table.Cell className="px-4 py-3 text-sm text-[#161616]">
							{product.category.name}
						</Table.Cell>
						<Table.Cell className="px-4 py-3 text-sm text-[#161616]">
							${product.price}
						</Table.Cell>
						<Table.Cell className="px-4 py-3 text-sm text-[#525252]">
							{product.description || "-"}
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
}
