import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: string;
    password: string;
    loginStatus: boolean;
    email: string;
}
export {IUserModel};