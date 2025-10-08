  import { Routes, Route } from 'react-router-dom'
  import Login from './pages/auth/Login'
  import Register from './pages/auth/Register'
  import Verify from './pages/auth/Verify'
  import Dashboard from './pages/Dashboard'
  import { AuthCallback } from './utils/authCallback'
  import { ProtectedRoute } from './pages/auth/ProtectedRoute'
  import CreateBucket from './pages/CreateBucket'
  import BucketRecord from './components/Dashboard/BucketRecord'


  function App() {
    return (
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<Verify />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/create-bucket" element={<CreateBucket />} />
          <Route path="/bucket/:bucketId/records" element={<BucketRecord />} />
        </Route>
        
      </Routes>
    )
  }

  export default App
