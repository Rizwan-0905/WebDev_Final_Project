import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ currentUser }) => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ category: "", status: "" });
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/tasks/get");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleBid = async (taskId, message, bid) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      const updatedProposals = [
        ...task.proposals,
        {
          freelancer: currentUser._id,
          message,
          bid,
        },
      ];

      await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
        ...task,
        proposals: updatedProposals,
      });

      fetchTasks();
    } catch (err) {
      console.error("Error submitting bid", err);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.status === "open" &&
      (filters.category === "" || task.category === filters.category) &&
      (filters.status === "" || task.status === filters.status)
  );

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div>
      <h1>Open Tasks</h1>

      <div>
        <select
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="writing">Writing</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="marketing">Marketing</option>
          <option value="other">Other</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="assigned">Assigned</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredTasks.map((task) => (
        <div key={task._id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Budget: Rs. {task.budget}</p>
          <p>Deadline: {new Date(task.deadline).toDateString()}</p>
          <p>Category: {task.category}</p>

          <div>
            <label>Your Message</label>
            <input type="text" id={`message-${task._id}`} />
            <label>Your Bid</label>
            <input type="number" id={`bid-${task._id}`} />
            <button
              onClick={() =>
                handleBid(
                  task._id,
                  document.getElementById(`message-${task._id}`).value,
                  parseInt(document.getElementById(`bid-${task._id}`).value)
                )
              }
            >
              Submit Bid
            </button>
          </div>

          <div>
            <h4>Existing Proposals:</h4>
            <ul>
              {task.proposals.map((p, i) => (
                <li key={i}>
                  {p.freelancer?.userName || "Freelancer"}: Rs. {p.bid} - "{p.message}"
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
