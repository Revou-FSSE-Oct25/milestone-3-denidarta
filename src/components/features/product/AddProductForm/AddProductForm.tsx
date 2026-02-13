"use client";
import React from "react";
import {SubmitHandler, useForm, useWatch} from "react-hook-form";
import {Button, Callout, Select, TextField} from "@radix-ui/themes";
import {AddProductPayload, ProductCategory} from "@/types/product.types";
import {productService} from "@/services/product.service";

type AddProductFormValues = Omit<AddProductPayload, "images"> & { images: string };

interface AddProductFormProps {
	onSubmit: (data: AddProductPayload) => void | Promise<void>;
	onCancel: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({onSubmit, onCancel}) => {
	const {register, handleSubmit, formState: {errors}, setValue, control} = useForm<AddProductFormValues>({
		defaultValues: {
			title: "",
			price: 0,
			description: "",
			categoryId: undefined,
			images: "",
		}
	});
	const selectedCategoryId = useWatch({control, name: "categoryId"});
	const selectedCategoryValue = selectedCategoryId === undefined || selectedCategoryId === null
		? undefined
		: String(selectedCategoryId);
	const [categories, setCategories] = React.useState<ProductCategory[]>([]);
	const [categoriesStatus, setCategoriesStatus] = React.useState<"idle" | "loading" | "loaded" | "error">("idle");
	const [categoriesError, setCategoriesError] = React.useState<string | null>(null);

	const fetchCategories = React.useCallback(async () => {
		setCategoriesStatus("loading");
		setCategoriesError(null);
		try {
			const data = await productService.getProductCategories();
			setCategories(data);
			setCategoriesStatus("loaded");
		} catch (error) {
			setCategoriesStatus("error");
			setCategoriesError(error instanceof Error ? error.message : "Failed to load categories");
		}
	}, []);

	const handleFormSubmit: SubmitHandler<AddProductFormValues> = async (data) => {
		const parsedImages = data.images.split(",").map(s => s.trim()).filter(s => s.length > 0);
		const payload: AddProductPayload = {...data, images: parsedImages};

		await onSubmit(payload);
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
			<div>
				<label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
				<TextField.Root
					id="title"
					placeholder="Product Title"
					{...register("title", {
						required: "Title is required",
						minLength: {value: 1, message: "Title is required"}
					})}
				/>
				{errors.title && <Callout.Root color="red"
											   className="mt-2"><Callout.Text>{errors.title.message}</Callout.Text></Callout.Root>}
			</div>

			<div>
				<label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
				<TextField.Root
					id="price"
					type="number"
					step="0.01"
					{...register("price", {
						required: "Price is required",
						valueAsNumber: true,
						min: {value: 0.01, message: "Price must be greater than 0"}
					})}
					placeholder="0.00"
				/>
				{errors.price && <Callout.Root color="red"
											   className="mt-2"><Callout.Text>{errors.price.message}</Callout.Text></Callout.Root>}
			</div>

			<div>
				<label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
				<TextField.Root
					id="description"
					{...register("description", {
						required: "Description is required",
						minLength: {value: 1, message: "Description is required"}
					})}
					placeholder="Product Description"
				/>
				{errors.description &&
					<Callout.Root color="red" className="mt-2"><Callout.Text>{errors.description.message}</Callout.Text></Callout.Root>}
			</div>

			<div>
				<label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
				<input
					placeholder={"Select a category"}
					type="hidden"
					{...register("categoryId", {
						required: "Category is required",
						valueAsNumber: true
					})}
				/>
				<Select.Root

					value={selectedCategoryValue}
					onValueChange={(value) => {
						// Manually set value for react-hook-form as Radix Select doesn't directly support register
						setValue("categoryId", Number(value), {shouldValidate: true, shouldDirty: true});
					}}
					onOpenChange={(open) => {
						if (!open) return;
						if (categoriesStatus === "loading") return;
						if (categories.length === 0) {
							void fetchCategories();
						}
					}}
				>
					<Select.Trigger placeholder="Select a category" className={"w-20"}/>
					<Select.Content>
						{categoriesStatus === "loading" && (
							<Select.Item value="loading" disabled>
								Loading categories...
							</Select.Item>
						)}
						{categoriesStatus === "error" && (
							<Select.Item value="error" disabled>
								{categoriesError ?? "Failed to load categories"}
							</Select.Item>
						)}
						{categoriesStatus !== "loading" && categories.map((category) => (
							<Select.Item key={category.id} value={String(category.id)}>
								{category.name}
							</Select.Item>
						))}
					</Select.Content>
				</Select.Root>
				{/* Manual error display for categoryId as direct register on Select.Root is complex */}
				{errors.categoryId &&
					<Callout.Root color="red" className="mt-2"><Callout.Text>{errors.categoryId.message}</Callout.Text></Callout.Root>}
			</div>

			<div>
				<label htmlFor="images" className="block text-sm font-medium text-gray-700">Image URLs
					(comma-separated)</label>
				<TextField.Root
					id="images"
					{...register("images", {
						required: "At least one image URL is required",
						validate: {
							isUrl: (value) => {
								const urls = value.split(",").map(s => s.trim()).filter(s => s.length > 0);
								const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].\S*$/i;
								if (urls.length === 0) return "At least one image URL is required";
								if (urls.some(url => !urlRegex.test(url))) return "One or more invalid image URLs";
								return true;
							}
						}
					})}
					placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
				/>
				{errors.images && <Callout.Root color="red"
												className="mt-2"><Callout.Text>{errors.images.message}</Callout.Text></Callout.Root>}
			</div>

			<div className="flex justify-end space-x-2">
				<Button variant="soft" color="gray" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit">
					Add Product
				</Button>
			</div>
		</form>
	);
};

export default AddProductForm;
