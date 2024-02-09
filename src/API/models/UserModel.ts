import * as Mongoose from "mongoose";
import { IUserModel } from "../interfaces/IUserModel";

class UsertModel {
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
                _id: Mongoose.Types.ObjectId,
                password: String,
                loginStatus: Boolean,
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

    public async createUser(response: any, password: string, loginStatus: boolean, email: string) {
        var query = this.model.create({ password: password, loginStatus: loginStatus, email: email });
        try {
            const user = await query;
            response.status(200).json(user);
        } catch (e) {
            console.error(e);
            response.status(500).send();
        }
    }

    public async retrieveUser(response: any, id: string) {
        var query = this.model.find({ _id: id });

        try {
            const user = await query.exec();
            response.status(200).json(user);
        }
        catch (e) {
            console.error(e);
            response.status(500).send();
        }
    }

    public async updateUser(response: any, id: string, password: string, loginStatus: boolean, email: string) {
        var query = this.model.findOneAndUpdate(
            { _id: id },
            { password: password, loginStatus: loginStatus, email: email },
            { new: true },
        );

        try {
            const updatedUser = await query.exec();
            response.status(200).json(updatedUser);
        } catch (e) {
            console.error(e);
            response.status(500).send();
        }
    }

    public async deleteUser(response: any, id: string) {
        var query = this.model.findOneAndDelete({ id: id });

        try {
            const deletedUser = await query.exec();
            response.status(200).json(deletedUser);
        } catch (e) {
            console.error(e);
            response.status(500).send();
        }
    }

    public async retrieveAllUsers(response: any) {
        var query = this.model.find({});

        try {
            const items = await query.exec();
            response.status(200).json(items);
        }
        catch (e) {
            console.error(e);
            response.status(500).send();
        }
    }

    public async getPassword(response: any, userId: string) {
        var query = this.model.findOne({_id: userId});
        try {
            const user = await query.exec();
            if (user) {
                response.status(200).json({password: user.password});
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async changePassword(response: any, userId: string, newPassword: string) {
        var query = this.model.findOne({_id: userId});
        try {
            let user = await query.exec();
            if (user) {
                user.password = newPassword;
                await user.save();
                response.status(204).send();
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }
}
export {UsertModel};