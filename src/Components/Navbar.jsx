import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";


const Navbar = () => {
    const { user, logoutUser } = useAuth();

    // handle logout user 
    const handleLogOut = () => {
        logoutUser()
            .then(() => {
                toast.success("Logged Out", {
                    style: {
                        background: "#000000",
                        padding: "12px",
                        color: "#FFFAEE",
                    },
                });
            })
            .catch(err => {
                console.log("Logout error", err);
            })
    }

    return (
        <nav className="pb-3 pt-4 nav_border">
            <div className="container">
                <ul className="d-flex column-gap-3 justify-content-center align-items-center list-unstyled ">
                    {
                        !user ? <li>
                            <Link to={"/"} className="text-decoration-none d-inline-block py-2 px-4 rounded fw-bold shadow nav_item ">Sign In</Link>
                        </li> : <li>
                            <button onClick={handleLogOut} className="text-decoration-none d-inline-block py-2 px-4 rounded fw-bold shadow nav_item ">Sign Out</button>
                        </li>
                    }
                    <li>
                        <Link to={"/signup"} className="text-decoration-none d-inline-block py-2 px-4 rounded fw-bold shadow nav_item ">Sign Up</Link>
                    </li>
                    {
                        user && <li>
                            <Link to={"/manageProfile"} className="text-decoration-none d-inline-block py-2 px-4 rounded fw-bold shadow nav_item ">Manage</Link>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;