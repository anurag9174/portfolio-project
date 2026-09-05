import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import api from "../services/api";
import { login } from "../store/authSlice";
import "./Profile.css";

function Profile() {

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [isEditing, setIsEditing] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showChangePassword, setShowChangePassword] = useState(false);


    // ================= UPDATE PROFILE =================

    const handleUpdate = async () => {
        try {

            const response = await api.put(`/users/${user.id}`, {
                name: name,
                email: email
            });

            dispatch(
                login({
                    user: response.data.user,
                    token: localStorage.getItem("token")
                })
            );

            setIsEditing(false);

            alert("Profile updated successfully");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        }
    };


    // ================= CHANGE PASSWORD =================

    const handleChangePassword = async () => {

        try {

            if (
                !currentPassword ||
                !newPassword ||
                !confirmPassword
            ) {
                alert("Please fill all password fields");
                return;
            }

            if (newPassword !== confirmPassword) {
                alert("New password and confirm password do not match");
                return;
            }

            const response = await api.put(
                "/users/change-password",
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword
                }
            );

            alert(response.data.message);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setShowChangePassword(false);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to change password"
            );
        }
    };


    // ================= OPEN PASSWORD PANEL =================

    const openChangePassword = () => {

        setShowChangePassword(true);

        setTimeout(() => {

            document
                .getElementById("change-password")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }, 100);
    };


    // ================= CANCEL PASSWORD =================

    const cancelChangePassword = () => {

        setShowChangePassword(false);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };


    return (

        <div className="profile-container">

            <div className="profile-wrapper">


                {/* ================= PROFILE HEADER ================= */}

                <div className="profile-header">

                    <div className="profile-avatar">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <h1>My Profile</h1>

                    <p>
                        Manage your personal information
                    </p>

                </div>


                {/* ================= PROFILE INFORMATION ================= */}

                <div className="profile-card">

                    <h2>Profile Information</h2>


                    <div className="profile-info">

                        <strong>Name</strong>

                        <span>
                            {user?.name}
                        </span>

                    </div>


                    <div className="profile-info">

                        <strong>Email</strong>

                        <span>
                            {user?.email}
                        </span>

                    </div>


                    <div className="profile-info">

                        <strong>Role</strong>

                        <span className="role-badge">
                            {user?.role || "user"}
                        </span>

                    </div>


                    {/* ================= ACTION BUTTONS ================= */}

                    <div className="profile-actions">

                        <button
                            className="edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>


                        <button
                            className="update-password-button"
                            onClick={openChangePassword}
                        >
                            Update Password
                        </button>

                    </div>

                </div>


                {/* ================= EDIT PROFILE ================= */}

                {isEditing && (

                    <div className="profile-card">

                        <h2>
                            Edit Profile
                        </h2>


                        <div className="form-group">

                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Enter your name"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                            />

                        </div>


                        <button
                            onClick={handleUpdate}
                            className="update-button"
                        >
                            Update Profile
                        </button>


                        <button
                            onClick={() => setIsEditing(false)}
                            className="cancel-button"
                        >
                            Cancel
                        </button>

                    </div>

                )}


                {/* ================= CHANGE PASSWORD ================= */}

                {showChangePassword && (

                    <div
                        className="profile-card"
                        id="change-password"
                    >

                        <h2>
                            Change Password
                        </h2>


                        <div className="form-group">

                            <label>
                                Current Password
                            </label>

                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                placeholder="Enter current password"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                New Password
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                placeholder="Enter new password"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm new password"
                            />

                        </div>


                        <button
                            onClick={handleChangePassword}
                            className="update-button"
                        >
                            Change Password
                        </button>


                        <button
                            onClick={cancelChangePassword}
                            className="cancel-button"
                        >
                            Cancel
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Profile;