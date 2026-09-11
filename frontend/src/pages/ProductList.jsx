import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./ProductList.css";
function ProductList() {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await api.get("/products");

            setProducts(response.data.products);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await api.delete(
                `/products/${id}`
            );

            alert(response.data.message);

            getProducts();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete product"
            );
        }
    };

    return (
    <div className="products-container">

        <div className="products-wrapper">

            <div className="products-header">

                <h1>Products</h1>

                <Link
                    to="/add-product"
                    className="add-product-button"
                >
                    + Add Product
                </Link>

            </div>

            {products.length === 0 ? (

                <div className="no-products">
                    <p>No products found</p>
                </div>

            ) : (

                <div className="products-grid">

                    {products.map((product) => (

                        <div
                            className="product-card"
                            key={product._id}
                        >

                            <h2>{product.name}</h2>

                            <p className="product-description">
                                {product.description}
                            </p>

                            <p className="product-price">
                                ₹{product.price}
                            </p>

                            <span className="product-category">
                                {product.category}
                            </span>

                            <div className="product-actions">

                                <Link
                                    to={`/edit-product/${product._id}`}
                                    className="edit-product-button"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="delete-product-button"
                                    onClick={() =>
                                        handleDelete(product._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    </div>
);
}

export default ProductList;