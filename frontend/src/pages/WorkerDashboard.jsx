import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import JobCard from "../components/JobCard";
import toast from "react-hot-toast";

function WorkerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch jobs
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch jobs"
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
        error.response?.data?.message || "Accept failed"
      );
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <DashboardLayout title="Worker Dashboard">
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
          />
        ))
      )}
    </DashboardLayout>
  );
}

export default WorkerDashboard;