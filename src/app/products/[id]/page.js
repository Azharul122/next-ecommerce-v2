
import axios from "axios";
import ProductDetails from "../../Components/ProductDetails";
const getSingleProductData = async (id) => {
    try {
        const { data } = await axios.get(`https://next-ecommerce-v2-iota.vercel.app/api/products/single-product?id=${id}`);
        console.log(data)
        return data?.data;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error; // Rethrow the error to propagate it to the caller
    }
};

const ProductDetail = async ({ params }) => {
    const data = await getSingleProductData(params?.id);

    return <ProductDetails product={data}></ProductDetails>;
};

export default ProductDetail;