const mongoose = require("mongoose");
const {Schema} = mongoose;

const taskSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },

        status: {
            type: Boolean,
        },
        user: {
            type: String,
        },
    }
);

module.exports = task = mongoose.model("task", taskSchema);