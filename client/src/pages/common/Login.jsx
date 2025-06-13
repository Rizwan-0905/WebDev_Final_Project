import './Login.css';
import React, { useState } from 'react';

const Login = () => {
  const [form, setForm] = useState({
    userName: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/user/login", { userName, password }); // Update with your API endpoint
      const { token, user } = res.data;

      // Store token + user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);

      // Redirect based on role
      if (user.role === "seller") {
        navigate("/seller/home");
      } else {
        navigate("/client/home");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
