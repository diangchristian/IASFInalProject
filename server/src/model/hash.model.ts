import mongoose from "mongoose";


const hashSchema = new mongoose.Schema({

    inputPreview: {
        type: String,
        required: [true, 'Input preview is required.'],
    },
    hashedOutput: {
        type: String,
        required: [true, 'Hashed output is required.']
    },

})


export default mongoose.model('Hash', hashSchema)