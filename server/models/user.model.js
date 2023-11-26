import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "client",
      enum: ["client", "artist", "admin"],
    },
    accessToken: { type: String },
    avatar: {
      type: String,
      default:
        "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png",
    },
    street: { type: String },
    number: { type: String },
    city: { type: String },
    district: { type: String },
    province: { type: String },
    country: { type: String, default: "Vietnam" },
    phone: {
      type: String,
      minlength: [10, "Phone number must have at least 10 characters"],
      maxlength: [10, "Phone number cannot exceed 10 characters"],
    },
    bio: {
        type: String,
        maxlength: [200, "Bio cannot exceed 200 characters"],
    },
    gender: {type: String, enum: ["male", "female", "other"]},
    dob: { type: Date },
    socialLinks: [
      {
        platform: { type: String }, 
        url: { type: String }, 
      },
      
    ],
    bookmark: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
// Define a discriminator for the "artist" role
const ArtistUser = User.discriminator(
  "artist",
  new Schema({
    // Add role-specific fields here
    rating: { type: Number, default: 5, min: [0, "Rating cannot be negative"], max: [5, "Rating cannot exceed 5"] },
  })
);

// Define a discriminator for the "client" role (no specific fields needed)
const ClientUser = User.discriminator("client", new Schema({}));

// Define a discriminator for the "admin" role (no specific fields needed)
const AdminUser = User.discriminator("admin", new Schema({}));

export { User, ArtistUser, ClientUser, AdminUser };
// export default User;