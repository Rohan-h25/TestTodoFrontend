import LoginPage from "../login/LoginPage";
import "./home.css";

function Home({user}) {
    return (<div className="home"> 
        {!user? (<LoginPage />) : (<div></div>)}
    </div>);
}

export default Home;