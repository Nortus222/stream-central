import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    id: string;
    password: string;
    loginStatus: boolean;
    email: string;
}
export {IUserModel};