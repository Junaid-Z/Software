import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "../Screens/Admin_screens/Register";
import LoginPage from "../Screens/Login";
import ProtectedRoute from "../Screens/ProtectedRoute";
import StudentsList from "../Screens/Admin_screens/StudentsList";
import AdminDashboard from "../Screens/Admin_screens/AdminDashboard";

export default function MyRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Link to={'/login'}>Login</Link>} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/Admin"
					element={
						<ProtectedRoute component={<AdminDashboard />}
							allowedRoles={['admin', 'student']}
						/>} >
					<Route path="/Admin/" element={<h1>STATS</h1>} />
					<Route path="/Admin/RegisterStudent" element={<Register />} />
					<Route path="/Admin/Students" element={<StudentsList />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
