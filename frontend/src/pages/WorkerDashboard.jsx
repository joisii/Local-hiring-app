import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import JobCard from "../components/JobCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import toast from "react-hot-toast";

function WorkerDashboard() {

  const navigate = useNavigate();
const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch jobs
  const fetchJobs = async () => {

    try {

      const res = await API.get("/jobs");

      setJobs(res.data.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message
        || "Failed to fetch jobs"
      );

    } finally {

      setLoading(false);

    }
  };

  // accept job
  const handleAcceptJob = async (jobId) => {

    try {

      await API.put(`/jobs/${jobId}/accept`);

      toast.success("Job accepted");

      fetchJobs();

    } catch (error) {

      toast.error(
        error.response?.data?.message
        || "Accept failed"
      );
    }
  };

  const handleStatusUpdate = async (jobId, status) => {
  try {

    await API.put(`/jobs/${jobId}/status`, {
      status
    });

    toast.success(`Job marked as ${status}`);

    fetchJobs();

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Update failed"
    );
  }
};

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <DashboardLayout title="Worker Dashboard">

      {/* Profile Button */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => navigate("/worker-profile")}
          style={{
            padding: "10px 15px",
            cursor: "pointer"
          }}
        >
          Manage Profile
        </button>
      </div>

      <h2>Available Jobs</h2>

      {loading ? (

        <p>Loading jobs...</p>

      ) : jobs.length === 0 ? (

        <p>No jobs available</p>

      ) : (

        jobs.map((job) => (
          <JobCard
  key={job._id}
  job={job}
  onAccept={handleAcceptJob}
  onStatusUpdate={handleStatusUpdate}
  currentUser={user}
/>
        ))

      )}

    </DashboardLayout>
  );
}

export default WorkerDashboard;