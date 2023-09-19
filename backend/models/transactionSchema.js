const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new mongoose.Schema({
    customer:{ type: Schema.Types.ObjectId, ref: "users" },
    credits:{type:Number, default:0},
    deposits:[{
        amount:{type:Number},
        dateStamp:{type:Date},
        status:{type:String},
    }],
    withdrawals:[{
        amount:{type:Number},
        dateStamp:{type:Date},
        status:{type:String},
    }],
    projectTransactions:[{
        transactionID:{type:String},
        projectName:{type:String},
        type:{type:String},
        clientID:{ type: Schema.Types.ObjectId, ref: "users" },
        amount:{type:Number},
        dateStamp:{type:Date},
    }]
});
const transactions = mongoose.model("transactions", transactionSchema);
module.exports = transactions;
