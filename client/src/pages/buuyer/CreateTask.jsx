import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTask = ({ currentUser }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    category: 'other',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check if user is authenticated
    if (!currentUser || !currentUser.id) {
      setMessage('⚠️ Please log in to post a task.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, postedBy: currentUser.id }),
      });
        console.log("posting");
      const data = await response.json();

        if (response.ok && data.success) {
            console.log("success");
        navigate('/client/home');
      } else {
        setMessage(data.message || '❌ Failed to create task. Please try again.');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      setMessage('🚨 Server error. Please try again later.');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={form.budget}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          required
        />
        <br />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="writing">Writing</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="marketing">Marketing</option>
          <option value="other">Other</option>
        </select>
        <br />
        <button type="submit">Post Task</button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', color: 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateTask;
