import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    id: string;
    password: string;
    email: string;
}
export {IUserModel};