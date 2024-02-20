import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    _id: Mongoose.Types.ObjectId;
    userId: string;
    password: string;
    loginStatus: boolean;
    email: string;
}
export {IUserModel};