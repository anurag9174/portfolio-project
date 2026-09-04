import { useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Home() {
    useEffect(() => {
        api.get("/test")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("API Error:", error);
            });
    }, []);

    return (
        <>
            <Navbar />
            <h1>Home Page</h1>
        </>
    );
}

export default Home;