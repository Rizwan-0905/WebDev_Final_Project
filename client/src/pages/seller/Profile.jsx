import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ currentUser }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchCompletedTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/tasks/assignee/${currentUser._id}`);
        const tasks = res.data.tasks || [];
        const filtered = tasks.filter((task) => task.status === "assigned");
        setCompletedTasks(filtered);
      } catch (err) {
        console.error("Error loading tasks:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, [currentUser]);

  if (loading) return <p>Loading your profile...</p>;

  return (
    <div>
      <h2>Freelancer Profile</h2>
      <p><strong>Name:</strong> {currentUser?.name}</p>
      <p><strong>Username:</strong> {currentUser?.userName}</p>
      <p><strong>Email:</strong> {currentUser?.email}</p>

      <h3>Completed Tasks</h3>
      {completedTasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        <ul>
          {completedTasks.map((task) => (
            <li key={task._id}>
              <p><strong>Title:</strong> {task.title}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Budget:</strong> ${task.budget}</p>
              <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
