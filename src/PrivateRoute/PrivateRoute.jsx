import { ColorRing } from "react-loader-spinner";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center ">
                <ColorRing
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                />
            </div>
        )
    }

    if (user) {
        return children;
    }
    return (
        <div>

        </div>
    );
};

export default PrivateRoute;
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}