import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                "/users/forgot-password",
                {
                    email: email
                }
            );

            alert(response.data.message);

            const resetToken = response.data.resetToken;

            console.log("Reset Token:", resetToken);

            navigate(`/reset-password/${resetToken}`);

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Forgot password request failed"
            );
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h1>Forgot Password</h1>

                <p className="auth-subtitle">
                    Enter your email to reset your password
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div>
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <button type="submit">
                        Send Reset Link
                    </button>

                </form>

                <p className="auth-link">
                    Remember your password?{" "}
                    <Link to="/login">
                        Back to Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default ForgotPassword;