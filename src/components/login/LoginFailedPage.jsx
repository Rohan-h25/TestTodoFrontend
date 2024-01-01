import { Link } from "react-router-dom";
import "./loginfailedpage.css";

export function LoginFailedPage() {
  return (
    <div className="loginfailed">
      <div className="loginfailedtext">
        We need access to your Google account. &nbsp;
        <Link to={"/login"} className="loginfailedtext">
          Login with Google
        </Link>
      </div>
    </div>
  );
}
