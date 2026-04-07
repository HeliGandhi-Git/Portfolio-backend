
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Hash password before saving
AdminSchema.pre('save', async function () {
    console.log('Admin pre-save hook triggered');
    if (!this.isModified('password')) {
        console.log('Password not modified');
        return;
    }
    try {
        console.log('Hashing password...');
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log('Password hashed successfully');
    } catch (err) {
        console.error('Error in pre-save hashing:', err);
        throw err;
    }
});

// Match user entered password to hashed password in database
AdminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);
