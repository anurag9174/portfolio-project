import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AddProduct.css";

function AddProduct() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);

            if (image) {
                formData.append("image", image);
            }

            const response = await api.post(
                "/products",
                formData
            );

            alert(response.data.message);

            navigate("/products");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to create product"
            );
        }
    };

    return (
        <div className="add-product-container">

            <div className="add-product-card">

                <h1>Add Product</h1>

                <p className="add-product-subtitle">
                    Add a new product to your collection
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="product-form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div className="product-form-group">
                        <label>Description</label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Enter product description"
                            required
                        />
                    </div>

                    <div className="product-form-group">
                        <label>Price</label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                            placeholder="Enter product price"
                            required
                        />
                    </div>

                    <div className="product-form-group">
                        <label>Category</label>

                        <input
                            type="text"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            placeholder="Enter product category"
                            required
                        />
                    </div>

                    <div className="product-form-group">
                        <label>Product Image</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(e.target.files[0])
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="product-submit-button"
                    >
                        Add Product
                    </button>

                </form>

                <Link
                    to="/products"
                    className="product-back-link"
                >
                    ← Back to Products
                </Link>

            </div>

        </div>
    );
}

export default AddProduct;