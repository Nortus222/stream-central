import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    _id: Mongoose.Types.ObjectId;
    password: string;
    loginStatus: boolean;
    email: string;
}
export {IUserModel};