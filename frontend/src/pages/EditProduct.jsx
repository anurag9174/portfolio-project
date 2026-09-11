import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./EditProduct.css";

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    const getProduct = async () => {
        try {

            const response = await api.get(
                `/products/${id}`
            );

            const product = response.data.product;

            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setCurrentImage(product.image);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to fetch product"
            );
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);

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

            const response = await api.put(
                `/products/${id}`,
                formData
            );

            alert(response.data.message);

            navigate("/products");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update product"
            );
        }
    };

    return (
        <div className="edit-product-container">

            <div className="edit-product-card">

                <h1>Edit Product</h1>

                <p className="edit-product-subtitle">
                    Update your product information
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="edit-form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="edit-form-group">
                        <label>Description</label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="edit-form-group">
                        <label>Price</label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="edit-form-group">
                        <label>Category</label>

                        <input
                            type="text"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            required
                        />
                    </div>

                    {/* Current Image */}

                    {currentImage && (
                        <div className="edit-form-group">
                            <label>Current Image</label>

                            <img
                                src={`http://localhost:5001${currentImage}`}
                                alt={name}
                                className="edit-product-image"
                            />
                        </div>
                    )}

                    {/* New Image */}

                    <div className="edit-form-group">
                        <label>Change Image</label>

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
                        className="edit-submit-button"
                    >
                        Update Product
                    </button>

                </form>

                <Link
                    to="/products"
                    className="edit-back-link"
                >
                    ← Back to Products
                </Link>

            </div>

        </div>
    );
}

export default EditProduct;