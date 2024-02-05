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
                userId: String,
                password: String,
                loginStatus: Boolean,
                email: String,
            }
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IUserModel>("Task", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }
}
export {UsertModel};