import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary frontend login
    if (email && password) {
      setLoggedIn(true);
    }
  };

  if (loggedIn) {
    return (
      <div className="container">
        <div className="welcome-box">
          <h1>Welcome, Anurag! 👋</h1>
          <p>You have successfully logged in.</p>

          <button onClick={() => setLoggedIn(false)}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="login-box">
        <h1>Login</h1>
        <p>Welcome back! Please login.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;