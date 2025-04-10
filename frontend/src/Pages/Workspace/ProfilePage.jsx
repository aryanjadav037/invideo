import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, X, Edit3, User, Calendar, Mail } from 'lucide-react';
const api = import.meta.env.VITE_SERVER_API;

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        dob: ''
    });
    const [errors, setErrors] = useState({
        dob: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Validate date of birth (must be at least 5 years old)
    const validateDOB = (dateString) => {
        if (!dateString) return true; // Allow empty dates
        
        const dob = new Date(dateString);
        const today = new Date();
        const minAgeDate = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
        
        return dob <= minAgeDate;
    };

    // Format date for input field (YYYY-MM-DD)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            return date.toISOString().split('T')[0];
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    // Initialize form data with user data
    useEffect(() => {
        setFormData({
            username: user?.data?.Username || '',
            fullName: user?.data?.Full_Name || '',
            email: user?.data?.email || '',
            dob: formatDate(user?.data?.dob),
        });
    }, [user]);

    // Save profile data
    const handleSave = async () => {
        // Validate before saving
        if (formData.dob && !validateDOB(formData.dob)) {
            setErrors(prev => ({
                ...prev,
                dob: 'User must be at least 5 years old'
            }));
            return;
        }
        
        try {
            setIsSaving(true);

            const response = await axios.put(
                `${api}/api/user/me`,
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

            // Update context with new user data
            await updateUser({
                Username: formData.username,
                Full_Name: formData.fullName,
                dob: formData.dob
            });

            setIsEditing(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
            setErrors({ dob: '' }); // Clear errors on success
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Validate DOB on change
        if (name === 'dob' && value) {
            const isValid = validateDOB(value);
            setErrors(prev => ({
                ...prev,
                dob: isValid ? '' : 'User must be at least 5 years old'
            }));
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        if (isEditing) {
            // Reset form to original values when canceling
            setFormData({
                username: user?.data?.Username || '',
                fullName: user?.data?.Full_Name || '',
                email: user?.data?.email || '',
                dob: formatDate(user?.data?.dob),
            });
            setErrors({ dob: '' }); // Clear errors
        }
        setIsEditing(!isEditing);
    };

    // Format date for display (e.g., "January 1, 1990")
    const displayDate = (dateString) => {
        if (!dateString) return 'Not specified';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Not specified';
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } catch (error) {
            return 'Not specified';
        }
    };

    // Calculate max allowed date (5 years ago from today)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 5);
    const maxDateString = maxDate.toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center px-3 sm:px-4 py-6 sm:py-8 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 z-0"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10 z-0" 
                style={{
                    backgroundImage: "linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)",
                    backgroundSize: "30px 30px"
                }}>
            </div>
            
            {/* Main content container */}
            <div className="relative z-10 bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-800">
                {/* Success notification */}
                {saveSuccess && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm animate-fadeIn">
                        Profile updated successfully!
                    </div>
                )}
                
                {/* Header with back button and edit/save controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-xs sm:text-sm text-cyan-300 hover:text-white bg-gray-800/50 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg hover:bg-gray-800 transition-all group relative overflow-hidden"
                    >
                        <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 relative" /> <span className="relative">Back</span>
                    </button>

                    {isEditing ? (
                        <div className="flex space-x-2 w-full sm:w-auto justify-end">
                            <button
                                onClick={handleSave}
                                disabled={isSaving || errors.dob}
                                className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center text-xs sm:text-sm font-medium relative overflow-hidden group ${
                                    isSaving || errors.dob ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                                {isSaving ? (
                                    <span className="relative">Saving...</span>
                                ) : (
                                    <>
                                        <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 relative" />
                                        <span className="relative">Save</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={toggleEditMode}
                                className="bg-gray-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-700 transition-all flex items-center text-xs sm:text-sm"
                            >
                                <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" /> Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={toggleEditMode}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm transition-all hover:shadow-lg hover:shadow-blue-500/50 relative overflow-hidden group flex items-center self-end sm:self-auto"
                        >
                            <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                            <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 relative" /> <span className="relative">Edit Profile</span>
                        </button>
                    )}
                </div>

                {/* Profile picture and name */}
                <div className="flex flex-col items-center space-y-4 mb-6 sm:mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg shadow-blue-500/20 ring-4 ring-gray-800">
                        {formData.username.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                                {formData.fullName || 'User'}
                            </span>
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base">@{formData.username || 'username'}</p>
                    </div>
                </div>

                {/* Profile form fields */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                        {/* Username field */}
                        <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700 transition-all hover:border-blue-500/30">
                            <label className="block text-xs sm:text-sm text-cyan-300 mb-1">Username</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <div className="flex items-center">
                                    <User className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    <span className="text-white text-sm sm:text-base">{formData.username}</span>
                                </div>
                            )}
                        </div>

                        {/* Full Name field */}
                        <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700 transition-all hover:border-blue-500/30">
                            <label className="block text-xs sm:text-sm text-cyan-300 mb-1">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <div className="flex items-center">
                                    <User className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    <span className="text-white text-sm sm:text-base">{formData.fullName}</span>
                                </div>
                            )}
                        </div>

                        {/* Email field (readonly) */}
                        <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700">
                            <label className="block text-xs sm:text-sm text-cyan-300 mb-1">Email</label>
                            <div className="flex items-center">
                                <Mail className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                <span className="text-white text-sm sm:text-base break-all">{formData.email}</span>
                            </div>
                        </div>

                        {/* Date of Birth field with validation */}
                        <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700 transition-all hover:border-blue-500/30">
                            <label className="block text-xs sm:text-sm text-cyan-300 mb-1">Date of Birth</label>
                            {isEditing ? (
                                <>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        max={maxDateString}
                                        className={`w-full bg-gray-700 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
                                            errors.dob ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                                        }`}
                                    />
                                    {errors.dob && (
                                        <p className="text-red-400 text-xs mt-1">{errors.dob}</p>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center">
                                    <Calendar className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    <span className="text-white text-sm sm:text-base">{displayDate(formData.dob)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;