import { Link } from "react-router-dom";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const [showPass, setShowPass] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // handle form
    const onSubmit = (data) => {
        console.log(data);
        // login user
        // toast.error("Invalid email or wrong password", {
        //     style: {
        //         background: "#000000",
        //         padding: "12px",
        //         color: "#FFFAEE",
        //     },
        // });
    };

    return (
        <div className="container mt-3 d-flex justify-content-center align-items-center ">
            <Helmet>
                <title>ChainTeck | Sign In</title>
            </Helmet>
            <div className="bg-form rounded w-fit p-5 ">
                <h3 className="text-center mb-3 ">
                    Sign In to Your Account
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column row-gap-3 ">
                    {/* Email Field */}
                    <div className="d-flex flex-column">
                        <label htmlFor="email" className="text-white">Your email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="Enter your email"
                            className="p-2 outline-none rounded border-0 "
                            id="email"
                        />
                        {errors.email && (
                            <span className="text-danger">Your email is required*</span>
                        )}
                    </div>
                    {/* Password Field */}
                    <div className="d-flex flex-column position-relative ">
                        <label htmlFor="password" className="text-white">Your password</label>
                        <input
                            {...register("password", { required: true, minLength: 6 })}
                            type={showPass ? "password" : "text"}
                            placeholder="Enter your password"
                            className="p-2 outline-none rounded border-0 "
                            id="password"
                        />
                        {errors.password && (
                            <span className="text-danger">
                                Password must have at least 6 character*
                            </span>
                        )}
                        {/* Show Password */}
                        <span
                            onClick={() => setShowPass(!showPass)}
                            className="eye_icon fs-4"
                        >
                            {showPass ? <IoEye /> : <IoEyeOff />}
                        </span>
                        <a className="text-white d-block text-end" href="#">
                            <small>Forgot Password?</small>
                        </a>
                    </div>
                    {/* Sign In button */}
                    <button
                        type="submit"
                        className="d-inline-block py-2 px-4 rounded fw-bold nav_item "
                    >
                        Sign In
                    </button>
                </form>
                {/* Redirect to Register page */}
                <p className="text-center mt-3 text-white ">
                    New here?{" "}
                    <Link to={"/signup"} className="text-purple">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;