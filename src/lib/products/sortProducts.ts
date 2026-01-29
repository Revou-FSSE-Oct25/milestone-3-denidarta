import {ProductDetail} from "@/types";

export type SortKey = "price" | "name" | "date";
export type SortOrder = "asc" | "desc";


export function sortProducts(
    products: ProductDetail[],
    sortBy: SortKey,
    order: SortOrder = "asc"
) {
    return [...products].sort((a, b) => {
        let result = 0;

        switch (sortBy) {
            case "price":
                result = a.price - b.price;
                break;

            case "name":
                result = a.title.localeCompare(b.title);
                break;

            case "date":
                result =
                    new Date(a.creationAt).getTime() -
                    new Date(b.creationAt).getTime();
                break;
        }

        return order === "asc" ? result : -result;
    });
}

export default sortProducts;