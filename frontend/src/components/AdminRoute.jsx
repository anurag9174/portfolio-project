import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const auth = useSelector((state) => state.auth);

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (auth.user?.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default AdminRoute;
