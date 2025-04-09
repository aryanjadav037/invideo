import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        dob: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData({
            username: user?.data?.Username || '',
            fullName: user?.data?.Full_Name || '',
            email: user?.data?.email || '',
            dob: new Date(user?.data?.dob).toISOString().split('T')[0] || '',
        });
    }, [user]);

    const handleSave = async () => {
        try {
            setIsSaving(true);

            const response = await axios.put(
                'http://localhost:5005/api/user/me',
                {
                    Username: formData.username,
                    Full_Name: formData.fullName,
                    dob: formData.dob,
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Update context or localStorage if needed
            await updateUser({
                Username: formData.username,
                Full_Name: formData.fullName,
                DOB: formData.dob
            });

            setIsEditing(false);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleEditMode = () => {
        if (isEditing) {
            setFormData({
                username: user?.data?.Username || '',
                fullName: user?.data?.Full_Name || '',
                email: user?.data?.email || '',
                dob: user?.data?.dob || ''
            });
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        ← Back
                    </button>

                    {isEditing ? (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                onClick={toggleEditMode}
                                className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={toggleEditMode}
                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center text-2xl font-bold">
                        {formData.username.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">{formData.fullName || 'User'}</h2>
                        <p className="text-gray-400 text-sm">{formData.username}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block mb-1 text-sm">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className={`w-full p-2 rounded-md ${isEditing ? 'bg-gray-800' : 'bg-gray-800 opacity-75'}`}
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block mb-1 text-sm">Username</label>
                        <input
                            type="text"
                            name="username"
                            className={`w-full p-2 rounded-md ${isEditing ? 'bg-gray-800' : 'bg-gray-800 opacity-75'}`}
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Email (non-editable) */}
                    <div>
                        <label className="block mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full bg-gray-800 opacity-75 p-2 rounded-md"
                            value={formData.email}
                            disabled
                        />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be edited</p>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block mb-1 text-sm">Date of Birth</label>
                        {isEditing ? (
                            <input
                                type="date"
                                name="dob"
                                className="w-full bg-gray-800 p-2 rounded-md"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        ) : (
                            <div className="bg-gray-800 opacity-75 p-2 rounded-md">
                                {formData.dob || 'Not set'}
                            </div>
                        )}
                    </div>

                    {/* Connect Discord */}
                    <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl">🎮</span>
                            <span>Discord</span>
                        </div>
                        <button className="text-blue-500 hover:underline">Connect</button>
                    </div>

                    {/* Influencer */}
                    <div>
                        <button className="w-full border border-white py-2 rounded-md hover:bg-white hover:text-black transition">
                            Become an Influencer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
