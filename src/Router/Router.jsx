import { BrowserRouter, Routes, Route } from "react-router-dom";
import SMDashboard from "../Pages/SMDashboard";
import Register from "../Screens/Admin_screens,/Register";
import links from "./DashboardLinks";
import LoginPage from "../Screens/Login";
import ProtectedRoute from "../Screens/ProtectedRoute";
import StudentsList from "../Screens/Admin_screens,/StudentsList";

export default function MyRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<h1>ABC</h1>} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/Admin"
					element={
						<ProtectedRoute component={<SMDashboard links={links} />}
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