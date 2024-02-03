import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";

const Register = () => {
    const [showPass, setShowPass] = useState(true);
    const { createUser } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // handle form
    const onSubmit = (data, e) => {
        e.preventDefault();
        // sign up new user
        createUser(data.email, data.password)
            .then(res => {
                if (res.user.email) {
                    const userInfo = {
                        name: data.name,
                        age: data.age,
                        number: data.number,
                        email: data.email
                    }
                    // POST API for store user info into DB
                    axiosInstance.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                // reset form
                                e.target.reset();
                                // user created success alert
                                toast.success("User registration successful", {
                                    style: {
                                        background: "#000000",
                                        padding: "12px",
                                        color: "#FFFAEE",
                                    },
                                });
                                // redirect user to manage page
                                navigate("/manageProfile")
                            }
                        })
                }
            })
            .catch(err => {
                console.log("User ragistration error", err);
            })
    };

    return (
        <div className="container mt-3 d-flex justify-content-center align-items-center ">
            <Helmet>
                <title>ChainTeck | Sign Up</title>
            </Helmet>
            <div className="bg-form rounded w-fit p-5 ">
                <h3 className="text-center mb-3 ">
                    Register Here
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column row-gap-3 ">
                    <div className="d-flex column-gap-3 ">
                        {/* Name Field */}
                        <div className="d-flex flex-column">
                            <label htmlFor="name" className="text-white">Your name</label>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="Enter your name"
                                className="p-2 outline-none rounded border-0 "
                                id="name"
                            />
                            {errors.name && (
                                <span className="text-danger">Your name is required*</span>
                            )}
                        </div>
                        {/* Age Field */}
                        <div className="d-flex flex-column">
                            <label htmlFor="age" className="text-white">Your age</label>
                            <input
                                {...register("age", { required: true })}
                                type="text"
                                placeholder="Enter your age"
                                className="p-2 outline-none rounded border-0 "
                                id="age"
                            />
                            {errors.age && (
                                <span className="text-danger">Your age is required*</span>
                            )}
                        </div>
                    </div>
                    <div className="d-flex column-gap-3">
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
                        {/* Number Field */}
                        <div className="d-flex flex-column">
                            <label htmlFor="number" className="text-white">Your number</label>
                            <input
                                {...register("number", { required: true, pattern: /^\d+$/ })}
                                type="text"
                                placeholder="Enter your number"
                                className="p-2 outline-none rounded border-0 "
                                id="number"
                            />
                            {errors.number && (
                                <span className="text-danger">Please input a valid number*</span>
                            )}
                        </div>
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
                        Sign Up
                    </button>
                </form>
                {/* Redirect to Register page */}
                <p className="text-center mt-3 text-white ">
                    Already have an account?{" "}
                    <Link to={"/"} className="text-purple">
                        Sign In Now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;