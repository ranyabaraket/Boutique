const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CoutSchema = new Schema({
    
    designation:{
        type: String,
       
    },

    total:{
        type: Number,
        required:true
        
    },
    description:{
        type:String
    },
    date:{
        type: Date,
        default:Date.now
    }
})
module.exports = Cout = mongoose.model('Cout', CoutSchema)