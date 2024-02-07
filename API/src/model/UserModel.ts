import * as Mongoose from "mongoose";
import { IUserModel } from "../interfaces/IUserModel";
import * as bcrypt from 'bcryptjs';

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
                userId: {
                    type: String,
                    require: true,
                    unique: true,
                },
                username: {
                    type: String,
                    require: true,
                    unique: true,
                },
                password: {
                    type: String,
                    minLength: 6,
                },
                loginStatus: Boolean,
                email: String,
            }
        );

        // Create pre save password hash??
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IUserModel>("User", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }

    public async getPassword(response: any, userId: string) {
        var query = this.model.findOne({userId: userId});
        try {
            const user = await query.exec();
            if (user) {
                response.status(200).json({password: user.password});
            } else {
                response.status(304).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async changePassword(response: any, userId: string, newPassword: string) {
        var query = this.model.findOne({userId: userId});
        try {
            let user = await query.exec();
            if (user) {
                user.password = newPassword;
                await user.save();
                response.status(204).send();
            } else {
                response.status(304).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async deleteUser(response: any, userId: string) {
        var query = this.model.findOne({userId: userId});
        try {
            let user = await query.exec();
            if (user) {
                user.deleteOne({userId: userId});
                response.status(204).send();
            } else {
                response.status(304).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }
}
export {UsertModel};