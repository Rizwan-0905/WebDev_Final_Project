import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableTask = ({ currentUser }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [biddingTaskId, setBiddingTaskId] = useState(null);
  const [bidForm, setBidForm] = useState({ bid: '', message: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/get');
      const openTasks = response.data.tasks.filter((t) => t.status === 'open' && !t.assignedTo);
      setTasks(openTasks);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch tasks:', err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setBidForm({ ...bidForm, [e.target.name]: e.target.value });
  };

  const submitBid = async (taskId) => {
    try {
      await axios.put(`https://locahlhost:8000/api/tasks/${taskId}`, {
        $push: {
          proposals: {
            freelancer: currentUser._id,
            message: bidForm.message,
            bid: parseFloat(bidForm.bid),
          },
        },
      });

      alert('Bid submitted!');
      setBidForm({ bid: '', message: '' });
      setBiddingTaskId(null);
      fetchTasks();
    } catch (err) {
      console.error('Bid failed:', err.message);
      alert('Failed to submit bid.');
    }
  };

  if (loading) return <div className="p-4">Loading tasks...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No open tasks at the moment.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-5 rounded-xl shadow border">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Category:</strong> {task.category}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Budget:</strong> Rs. {task.budget}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Deadline:</strong>{' '}
                {new Date(task.deadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Posted By:</strong> {task.postedBy?.name || 'Unknown'}
              </p>

              {biddingTaskId === task._id ? (
                <div className="mt-4 space-y-2">
                  <input
                    type="number"
                    name="bid"
                    placeholder="Your bid (Rs)"
                    value={bidForm.bid}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    name="message"
                    placeholder="Message to client"
                    value={bidForm.message}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setBiddingTaskId(null)}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => submitBid(task._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Submit Bid
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setBiddingTaskId(task._id)}
                  className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700"
                >
                  Place a Bid
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTask;
