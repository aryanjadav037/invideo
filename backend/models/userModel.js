import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    Username: { type: String, required: true, unique: true },
    Full_Name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: false },
    role: { type: String, enum: ['owner', 'user'], default: 'user' },
}, {
    timestamps: true,
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password comparison
UserSchema.methods.verifyPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
