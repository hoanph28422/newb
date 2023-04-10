import { IProduct } from "../types/product";
import { ICategory } from "../types/category";

interface SearchProductsProps {
    query: string;
    products: IProduct[];
    categories: ICategory[];
}
function searchProducts({
    query,
    products,
    categories,
}: SearchProductsProps): IProduct[] {
    const results: IProduct[] = [];

    // Tìm kiếm sản phẩm theo tên
    results.push(
        ...products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        )
    );

    // Tìm kiếm sản phẩm theo danh mục
    const categoryId = categories.find((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
    )?.id;

    if (categoryId) {
        results.push(
            ...products.filter((product) => product.categoryId === categoryId)
        );
    }

    return results;
}