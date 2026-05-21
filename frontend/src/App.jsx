import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import WorkerDashboard from "./pages/WorkerDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";


import { Toaster } from "react-hot-toast";

function App() {

  return (
    <BrowserRouter>

      <Toaster />

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

         <Route
          path="/worker-dashboard"
          element={
            <ProtectedRoute allowedRole="worker">
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

         <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute allowedRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;