import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import JobCard from "../components/JobCard";
import toast from "react-hot-toast";

function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: ""
  });

  const fetchJobs = async () => {
    try {
      const res = await API.get("jobs/client/my-jobs");
      setJobs(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", formData);

      toast.success("Job posted");

      setFormData({
        title: "",
        description: "",
        budget: ""
      });

      fetchJobs();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Posting failed"
      );
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <DashboardLayout title="Client Dashboard">
      <h2>Post Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
        />

        <button type="submit">Post Job</button>
      </form>

      <hr />

      <h2>My Jobs</h2>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))
      )}
    </DashboardLayout>
  );
}

export default ClientDashboard;