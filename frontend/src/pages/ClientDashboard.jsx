import DashboardLayout from "../layouts/DashboardLayout";

function ClientDashboard() {
  return (
    <DashboardLayout title="Client Dashboard">
      <h3>Client Actions</h3>

      <div>
        <p>Post Jobs</p>
        <p>View Workers</p>
        <p>Track Bookings</p>
        <p>Reviews</p>
      </div>
    </DashboardLayout>
  );
}

export default ClientDashboard;