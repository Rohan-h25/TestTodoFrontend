import "./loginpage.css";

export default function LoginPage() {
  function handleLogin() {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, "_self");
    // window.open("http://localhost:4000/auth/google", "_self");
  }

  return (
    <div>
      <div className="loginpage">
        <button onClick={handleLogin} className="loginpagebutton">
          Login with Google
        </button>
      </div>
    </div>
  );
}
