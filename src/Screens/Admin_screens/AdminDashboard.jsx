import { useLocation } from "react-router-dom";
import SMDashboard from "../../Pages/SMDashboard";
import links from "../../Router/DashboardLinks";

function AdminDashboard() {
  const loc = useLocation();
  console.log(loc.state)
  console.log(loc)
  return (
    <>
      <SMDashboard links={links} />
    </>
  )
}
export default AdminDashboard
