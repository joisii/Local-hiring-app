function JobCard({ job, onAccept }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px"
      }}
    >
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p>Budget: ₹{job.budget}</p>
      <p>Status: {job.status}</p>

      {onAccept && job.status === "pending" && (
        <button onClick={() => onAccept(job._id)}>
          Accept Job
        </button>
      )}
    </div>
  );
}

export default JobCard;