import * as Mongoose from "mongoose";
import { IUserModel } from "../interfaces/IUserModel";
import { v4 as uuidv4 } from "uuid"

class UserModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                id: String,
                password: String,
                email: String,
            },
            { collection: "users" }
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IUserModel>("users", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }

    public async createUser(response: any, userData: any) {
        const userId = uuidv4();
        userData.id = userId;
        var query = this.model.create(userData);
        try {
            const user = await query;
            response.json(user);
        } catch (e) {
            console.error(e);
        }
    }

    public async updateUser(response: any, userId: string, password: string, loginStatus: boolean, email: string) {
        var query = this.model.findOneAndUpdate(
            { userId: userId },
            { password: password, loginStatus: loginStatus, email: email },
            { new: true },
        );

        try {
            const updatedUser = await query.exec();
            response.json(updatedUser);
        } catch (e) {
            console.error(e);
        }
    }

    public async deleteUser(response: any, userId: string) {
        var query = this.model.findOneAndDelete({ userId: userId });

        try {
            const deletedUser = await query.exec();
            response.json(deletedUser);
        } catch (e) {
            console.error(e);
        }
    }

}
export {UserModel};