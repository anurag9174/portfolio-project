import { useSelector } from "react-redux";

function Dashboard() {

    const auth = useSelector((state) => state.auth);

    console.log("Redux Auth State:", auth);

    return (
        <div>
            <h1>Dashboard</h1>

            <p>User: {auth.user?.name}</p>
            <p>Email: {auth.user?.email}</p>
            <p>Authenticated: {auth.isAuthenticated ? "Yes" : "No"}</p>
        </div>
    );
}

export default Dashboard;