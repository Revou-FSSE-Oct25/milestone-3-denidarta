"use client";

import {useEffect, useMemo, useState} from "react";
import {Callout, Dialog, Heading} from "@radix-ui/themes";
import Button from "@/components/ui/Button";
import AddProductForm from "@/components/features/product/AddProductForm";
import {fetchAllUsers} from "@/services/user.service";
import {fetchService} from "@/services/product.service";
import {AddProductPayload, Product} from "@/types/product.types";
import {User} from "@/types/user.types";
import {
	PaginationControls,
	ProductsTable,
	UsersTable,
} from "@/components/features/admin/dashboard";
import {clampPage, PAGE_SIZE_DEFAULT, paginateItems} from "@/utils/pagination";

export default function Dashboard() {
	const [users, setUsers] = useState<User[]>([]);
	const [isUsersLoading, setIsUsersLoading] = useState(true);
	const [usersError, setUsersError] = useState<string | null>(null);
	const [usersPage, setUsersPage] = useState(1);

	const [products, setProducts] = useState<Product[]>([]);
	const [isProductsLoading, setIsProductsLoading] = useState(true);
	const [productsError, setProductsError] = useState<string | null>(null);
	const [productsPage, setProductsPage] = useState(1);

	const [showAddProductModal, setShowAddProductModal] = useState(false);
	const [submissionError, setSubmissionError] = useState<string | null>(null);
	const [showSuccessCallout, setShowSuccessCallout] = useState(false);

	const usersPagination = useMemo(
		() => paginateItems(users, usersPage, PAGE_SIZE_DEFAULT),
		[users, usersPage],
	);
	const productsPagination = useMemo(
		() => paginateItems(products, productsPage, PAGE_SIZE_DEFAULT),
		[products, productsPage],
	);

	useEffect(() => {
		setUsersPage((prev) => clampPage(prev, usersPagination.totalPages));
	}, [usersPagination.totalPages]);

	useEffect(() => {
		setProductsPage((prev) => clampPage(prev, productsPagination.totalPages));
	}, [productsPagination.totalPages]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsUsersLoading(true);
				setUsersError(null);
				const data = await fetchAllUsers();
				setUsers(data);
			} catch (error) {
				setUsersError(error instanceof Error ? error.message : "Failed to load users");
			} finally {
				setIsUsersLoading(false);
			}
		};

		void fetchUsers();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setIsProductsLoading(true);
				setProductsError(null);
				const data = await fetchService.getAllProducts();
				setProducts(data);
			} catch (error) {
				setProductsError(error instanceof Error ? error.message : "Failed to load products");
			} finally {
				setIsProductsLoading(false);
			}
		};

		void fetchProducts();
	}, []);

	const handleAddProduct = async (payload: AddProductPayload) => {
		try {
			setSubmissionError(null);
			const newProduct = await fetchService.addProduct(payload);

			setProducts((prev) => {
				const next = [...prev, newProduct];
				const lastPage = Math.max(1, Math.ceil(next.length / PAGE_SIZE_DEFAULT));
				setProductsPage(lastPage);
				return next;
			});

			setShowAddProductModal(false);
			setShowSuccessCallout(true);
			setTimeout(() => setShowSuccessCallout(false), 3000);
		} catch (error) {
			setSubmissionError(error instanceof Error ? error.message : "Failed to add product");
		}
	};

	return (
		<main className="min-h-screen bg-[#f4f4f4] px-4 py-6 md:px-8">
			<div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6">
				<header className="border-b border-[#c6c6c6] pb-5">
					<Heading as="h1" size="8" className="text-[#161616]">
						Admin Dashboard
					</Heading>
					<p className="mt-2 text-sm text-[#525252]">
						Manage users and product inventory from a unified control panel.
					</p>
				</header>

				<section className="border border-[#c6c6c6] bg-white">
					<div className="border-b border-[#e0e0e0] bg-[#f4f4f4] px-5 py-3">
						<Heading size="5" className="text-[#161616]">
							Users
						</Heading>
					</div>
					<div className="space-y-4 p-5">
						{isUsersLoading && <div className="text-sm text-[#525252]">Loading users...</div>}
						{usersError && (
							<Callout.Root color="red" role="alert" className="!rounded-none">
								<Callout.Text>{usersError}</Callout.Text>
							</Callout.Root>
						)}
						{!isUsersLoading && !usersError && (
							<>
								<div className="overflow-x-auto">
									<UsersTable rows={usersPagination.pageItems} />
								</div>
								<PaginationControls
									currentPage={usersPagination.currentPage}
									totalPages={usersPagination.totalPages}
									onPageChange={setUsersPage}
									label="users table"
								/>
							</>
						)}
					</div>
				</section>

				<section className="border border-[#c6c6c6] bg-white">
					<div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e0e0e0] bg-[#f4f4f4] px-5 py-3">
						<Heading size="5" className="text-[#161616]">
							Products
						</Heading>
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

					<div className="space-y-4 p-5">
						{showSuccessCallout && (
							<Callout.Root color="green" role="alert" className="!rounded-none">
								<Callout.Text>Product added successfully!</Callout.Text>
							</Callout.Root>
						)}

						{isProductsLoading && <div className="text-sm text-[#525252]">Loading products...</div>}
						{productsError && (
							<Callout.Root color="red" role="alert" className="!rounded-none">
								<Callout.Text>{productsError}</Callout.Text>
							</Callout.Root>
						)}
						{!isProductsLoading && !productsError && (
							<>
								<div className="overflow-x-auto">
									<ProductsTable rows={productsPagination.pageItems} />
								</div>
								<PaginationControls
									currentPage={productsPagination.currentPage}
									totalPages={productsPagination.totalPages}
									onPageChange={setProductsPage}
									label="products table"
								/>
							</>
						)}
					</div>
				</section>
			</div>
		</main>
	);
}
