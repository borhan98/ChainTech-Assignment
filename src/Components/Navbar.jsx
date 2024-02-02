import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="pb-3 pt-4 nav_border">
            <div className="container">
                <ul className="d-flex column-gap-3 justify-content-center align-items-center list-unstyled ">
                    <li>
                        <Link to={"/"} className="text-decoration-none d-inline-block py-2 px-4 rounded fw-bold shadow nav_item ">Sign In</Link>
                    </li>
                    <li>
                        <Link to={"/signup"} className="text-decoration-none d-inline-block py-2 px-4 rounded fw-bold shadow nav_item ">Sign Up</Link>
                    </li>
                    <li>
                        <Link className="text-decoration-none d-inline-block py-2 px-4 rounded fw-bold shadow nav_item ">Manage</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;