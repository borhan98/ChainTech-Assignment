import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";


const Root = () => {
    return (
        <div className="root_bg">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Root;