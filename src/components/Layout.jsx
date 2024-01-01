import { Outlet } from "react-router-dom";
import Header from "./header/Header";

function Layout(props) {
    return (
        <div>
            <Header user={props.user}/>
            <Outlet />
        </div>
    );
}

export default Layout;