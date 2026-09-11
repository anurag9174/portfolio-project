import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../store/authSlice";

function Dashboard() {

    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="dashboard-container">

            <div className="dashboard-wrapper">

                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Welcome to your account dashboard</p>
                </div>

                <div className="dashboard-card">

                    <h2>Profile Information</h2>

                    <div className="dashboard-info">
                        <strong>Name:</strong>
                        <span>{auth.user?.name}</span>
                    </div>

                    <div className="dashboard-info">
                        <strong>Email:</strong>
                        <span>{auth.user?.email}</span>
                    </div>

                    <div className="dashboard-info">
                        <strong>Role:</strong>
                        <span>{auth.user?.role}</span>
                    </div>

                    <div className="dashboard-info">
                        <strong>Status:</strong>
                        <span>
                            {auth.isAuthenticated
                                ? "Authenticated"
                                : "Not Authenticated"}
                        </span>
                    </div>

                    <div className="dashboard-actions">

                        <Link
                            to="/profile"
                            className="profile-button"
                        >
                            View Profile
                        </Link>

                        <Link
                            to="/products"
                            className="profile-button"
                        >
                            Products
                        </Link>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;