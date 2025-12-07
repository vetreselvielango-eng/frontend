import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Page Not Found</p>

      <Link to="/" className="notfound-link">
        Go Back Home
      </Link>
    </div>
  );
}
