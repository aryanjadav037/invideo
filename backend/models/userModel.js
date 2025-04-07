import mongoose from "mongoose";
import { z } from "zod";

const userValidationSchema = z.object({
  Username: z.string().min(3, "Username must be at least 3 characters long"),
  Full_Name: z.string().min(3, "Full Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  dob: z.date().optional(),
  role: z.enum(["owner", "user"]).default("user"),
});

const UserSchema = new mongoose.Schema(
  {
    Username: { type: String, required: true, unique: true },
    Full_Name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: false },
    role: { type: String, enum: ["owner", "user"], default: "user" },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const validationResult = userValidationSchema.safeParse(this.toObject());
  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors
      .map((err) => err.message)
      .join(", ");
    return next(new Error(errorMessages));
  }
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
