import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await api.put(
                `/users/reset-password/${token}`,
                {
                    newPassword: newPassword
                }
            );

            alert(response.data.message);

            navigate("/login");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Password reset failed"
            );
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h1>Reset Password</h1>

                <p className="auth-subtitle">
                    Enter your new password
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div>
                        <label>New Password</label>

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div>
                        <label>Confirm Password</label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    <button type="submit">
                        Reset Password
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

export default ResetPassword;