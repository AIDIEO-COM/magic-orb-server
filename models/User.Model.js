const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
        maxlength: [50, "email cannot be more than 50 characters"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
        maxlength: [50, "password cannot be more than 50 characters"],
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profilePicture: {
        type: String,
        default: ""
    },
    phoneNo: {
        type: String,
        default: ""
    },
    balance: {
        type: Number,
        default: 0,

    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""

    },
    acceptNewsLetter: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
});


UserSchema.pre('save', async function (next) {
    // hashing user password
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(process.env.bcrypt_salt)
    );
    next();
});

UserSchema.statics.isUserExist = async function (email) {
    return await User.findOne(
        { email },
        { id: 1, email: 1, password: 1, role: 1 }
    );
};

UserSchema.statics.isPasswordMatched = async function (givenPassword, savedPassword) {
    return await bcrypt.compare(givenPassword, savedPassword);
};

const User = mongoose.model("User", UserSchema);





module.exports = User;