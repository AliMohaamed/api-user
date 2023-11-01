const mongoose = require('mongoose');
// const validator = require('validator');

const userSchema = mongoose.Schema({

    // _id: mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide your email!'],
        trim: true,
        lowercase: true,
        // validate: [validator.isEmail, 'Please provide a valid email!'],
        
      },
    password:{
        type: String,
        required: true
    },
    
} , {timestamps: true});

module.exports = mongoose.model('User', userSchema);