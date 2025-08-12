import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: Number,
    location: String,
    experience: String,
    enrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
},{timestamps:true})

const User = mongoose.model('User', userSchema);
export default User;