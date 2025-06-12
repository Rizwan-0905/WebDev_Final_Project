import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    userName: '',
    password: '',
    role: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Signup successful!');
        navigate('/login'); // Redirect on success
      } else {
        setMessage(data.message || 'Signup failed.');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <br />
        <input type="text" name="userName" placeholder="Username" value={form.userName} onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <br />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="" disabled>Select role</option>
          <option value="client">Client</option>
          <option value="seller">Seller</option>
        </select>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
