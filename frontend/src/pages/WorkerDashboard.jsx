import DashboardLayout from "../layouts/DashboardLayout";

function WorkerDashboard() {
  return (
    <DashboardLayout title="Worker Dashboard">
      <h3>Available Jobs</h3>

      <div>
        <p>View jobs</p>
        <p>Accept jobs</p>
        <p>Track status</p>
        <p>Manage availability</p>
      </div>
    </DashboardLayout>
  );
}

export default WorkerDashboard;