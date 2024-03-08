import Mongoose = require("mongoose");

interface ITVShowModelMin extends Mongoose.Document {
  tmdb_id: { type: Number, required: true };
  name: string;
  poster: string;
}
export {ITVShowModelMin};
    