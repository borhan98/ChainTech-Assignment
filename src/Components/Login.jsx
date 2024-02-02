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
    //   const navigate = useNavigate();
    //   const location = useLocation();

    // handle form
    //   const onSubmit = (data) => {
    //     // login user
    //     loginUser(data.email, data.password)
    //       .then((result) => {
    //         if (result.user) {
    //           navigate(location.state ? location.state : "/");
    //           toast.success("Logged in successfully.", {
    //             style: {
    //               background: "#000000",
    //               padding: "12px",
    //               color: "#FFFAEE",
    //             },
    //           });
    //         }
    //       })
    //       .catch(() => {
    //         toast.error("Invalid email or wrong password", {
    //           style: {
    //             background: "#000000",
    //             padding: "12px",
    //             color: "#FFFAEE",
    //           },
    //         });
    //       });
    //   };

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center ">
            <Helmet>
                <title>ChainTeck | Sign In</title>
            </Helmet>
            <div className="border bg-form rounded w-fit p-4 ">
                <h3 className="">
                    Sign In to your account
                </h3>
                <form onSubmit={handleSubmit()}>
                    {/* Email Field */}
                    <div className="">
                        <label htmlFor="email">Your email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="Enter your email"
                            className=""
                            id="email"
                        />
                        {errors.email && (
                            <span className="">Your email is required*</span>
                        )}
                    </div>
                    {/* Password Field */}
                    <div className="relative flex flex-col space-y-2">
                        <label htmlFor="password">Your password</label>
                        <input
                            {...register("password", { required: true, minLength: 6 })}
                            type={showPass ? "password" : "text"}
                            placeholder="Enter your password"
                            className=""
                            id="password"
                        />
                        {errors.password && (
                            <span className="">
                                Password must have at least 6 character*
                            </span>
                        )}
                        {/* Show Password */}
                        <span
                            onClick={() => setShowPass(!showPass)}
                            className=""
                        >
                            {showPass ? <IoEye /> : <IoEyeOff />}
                        </span>
                        <a className="" href="#">
                            <small>Forgot Password?</small>
                        </a>
                    </div>
                    {/* Sign In button */}
                    <button
                        type="submit"
                        className=""
                    >
                        Sign In
                    </button>
                </form>
                {/* Redirect to Register page */}
                <p className="text-center mt-6">
                    New to UniFood?{" "}
                    <Link to={"/signup"} className="">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;