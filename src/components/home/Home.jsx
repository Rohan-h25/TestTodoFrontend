import "./home.css";
import { Link } from "react-router-dom";

function Home({user}) {
    return (<div className="home"> 
        {!user? (<Link to={"/login"} className="homeText">Please! Login</Link>) : (<div></div>)}
    </div>);
}

export default Home;