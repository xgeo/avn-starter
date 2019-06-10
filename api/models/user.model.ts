import { Schema, Document } from 'mongoose';
import { DatabaseConfig } from '../library/database/config';
const mongoose = require('mongoose');
const connection = mongoose.createConnection(DatabaseConfig.MONGODB_CONNECTION, DatabaseConfig.OPTIONS);
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
    fullName: string;
    email: string;
    password?: string;
    comparePassword: Function;
}

const UserSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
    const user = this as IUser;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            return next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

export default connection.model('User', UserSchema);