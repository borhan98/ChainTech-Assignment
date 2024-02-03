import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const ManageProfile = () => {
    const [nameEdit, setNameEdit] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [ageEdit, setAgeEdit] = useState(false);
    const [updatedAge, setUpdatedAge] = useState("");
    const [numberEdit, setNumberEdit] = useState(false);
    const [updatedNumber, setUpdatedNumber] = useState("");
    const axiosInstance = useAxios();
    const { user } = useAuth();
    const { data: userInfo = {}, refetch } = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users?email=${user?.email}`);
            return res.data;
        }
    })

    // handle edit name
    const handleEditName = () => {
        axiosInstance.patch(`/users/${user?.email}`, { name: updatedName })
            .then(res => {
                if (res.data.modifiedCount) {
                    successAlertMessage("Your name")
                    refetch();
                } else {
                    errorAlertMessage("You didn't modified your name");
                }
            })

        setNameEdit(false);
    }

    // handle edit age
    const handleEditAge = () => {
        axiosInstance.patch(`/users/${user?.email}`, { age: updatedAge })
            .then(res => {
                if (res.data.modifiedCount) {
                    successAlertMessage("Your age")
                    refetch();
                } else {
                    errorAlertMessage("You didn't modified your age");
                }
            })
        setAgeEdit(false);
    }

    // handle edit number
    const handleEditNumber = () => {
        axiosInstance.patch(`/users/${user?.email}`, { number: updatedNumber })
            .then(res => {
                if (res.data.modifiedCount) {
                    successAlertMessage("Your number")
                    refetch();
                } else {
                    errorAlertMessage("You didn't modified your number");
                }
            })
        setNumberEdit(false);
    }

    // success alert messages
    const successAlertMessage = alertText => {
        toast.success(`${alertText} updated`, {
            style: {
                background: "#000000",
                padding: "12px",
                color: "#FFFAEE",
            },
        });
    }
    // error alert messages
    const errorAlertMessage = alertText => {
        toast.error(`${alertText}`, {
            style: {
                background: "#000000",
                padding: "12px",
                color: "#FFFAEE",
            },
        });
    }

    return (
        <div className="container py-3 ">
            {/* Profile picture */}
            <div className="row mb-4">
                <div className="col-12 d-flex justify-content-center align-items-center ">
                    <figure className="overflow-hidden w-fit profile_img">
                        <img className="w-100 h-100 " src={'https://i.ibb.co/PrxnTsS/profile.png'} alt="Profile Picture" />
                    </figure>
                </div>
            </div>
            <div className="row">
                {/* User name field */}
                <div className={`col-md-4`}>
                    <div className={`d-flex justify-content-between  ${nameEdit ? "" : "border-bottom "}`}>
                        <input
                            type="text" onChange={(e) => setUpdatedName(e.target.value)}
                            defaultValue={nameEdit ? userInfo.name : userInfo.name}
                            className={`p-2 w-100 me-2 outline-none rounded border-0 ${nameEdit ? "bg-white" : "bg-transparent"}`}
                            id="name"
                            disabled={nameEdit ? false : true}
                        />
                        <div>
                            {
                                nameEdit ?
                                    <>
                                        <button onClick={() => setNameEdit(!nameEdit)} className="btn border w-100 mb-1 ">
                                            Cancel
                                        </button>
                                        <button onClick={handleEditName} className="btn border w-100">
                                            Save
                                        </button>
                                    </>
                                    :
                                    <button onClick={() => setNameEdit(!nameEdit)} className="btn border">
                                        <CiEdit />
                                    </button>
                            }
                        </div>
                    </div>
                </div>
                {/* User age field */}
                <div className="col-md-4">
                    <div className={`d-flex justify-content-between  ${ageEdit ? "" : "border-bottom "}`}>
                        <input
                            type="text" onChange={(e) => setUpdatedAge(e.target.value)}
                            defaultValue={ageEdit ? userInfo.age : userInfo.age}
                            className={`p-2 w-100 me-2 outline-none rounded border-0 ${ageEdit ? "bg-white" : "bg-transparent"}`}
                            id="age"
                            disabled={ageEdit ? false : true}
                        />
                        <div>
                            {
                                ageEdit ?
                                    <>
                                        <button onClick={() => setAgeEdit(!ageEdit)} className="btn border w-100 mb-1 ">Cancel</button>
                                        <button onClick={handleEditAge} className="btn border w-100">Save</button>
                                    </>
                                    :
                                    <button onClick={() => setAgeEdit(!ageEdit)} className="btn border">
                                        <CiEdit />
                                    </button>
                            }
                        </div>
                    </div>
                </div>
                {/* User number field */}
                <div className="col-md-4">
                    <div className={`d-flex justify-content-between  ${numberEdit ? "" : "border-bottom "}`}>
                        <input
                            type="text" onChange={(e) => setUpdatedNumber(e.target.value)}
                            defaultValue={numberEdit ? userInfo.number : userInfo.number}
                            className={`p-2 w-100 me-2 outline-none rounded border-0 ${numberEdit ? "bg-white" : "bg-transparent"}`}
                            id="number"
                            disabled={numberEdit ? false : true}
                        />
                        <div>
                            {
                                numberEdit ?
                                    <>
                                        <button onClick={() => setNumberEdit(!numberEdit)} className="btn border w-100 mb-1 ">Cancel</button>
                                        <button onClick={handleEditNumber} className="btn border w-100">Save</button>
                                    </>
                                    :
                                    <button onClick={() => setNumberEdit(!numberEdit)} className="btn border">
                                        <CiEdit />
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProfile;