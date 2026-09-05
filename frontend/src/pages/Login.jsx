import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            console.log("Login Response:", response.data);

            dispatch(login({
                user: response.data.user,
                token: response.data.token
            }));

            navigate("/dashboard");

        } catch (error) {
            console.error(
                "Login Error:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h1>Welcome Back</h1>

                <p className="auth-subtitle">
                    Login to continue to your account
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleLogin}
                >

                    <div>
                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p className="auth-link">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Create Account
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;