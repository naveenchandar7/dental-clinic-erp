import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <main className="unauthorized-page">
      <h1>403 - Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/">Return to login</Link>
    </main>
  );
}

export default Unauthorized;
