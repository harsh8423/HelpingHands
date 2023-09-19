const express = require("express");
const router = express.Router();
const transactions= require("../models/transactionSchema");


router.post("/projectTransactions", async (req, res) => {
    try {
      const {id,type,amount,clientID, projectName} = req.body;

      const transaction = await transactions.findOne({
        customer:id})
        const transactionDetail = {
            type:type,
            amount:amount,
            clientID:clientID,
            projectName:projectName,
            dateStamp: Date.now()
        }
      if(transaction){
        transaction?.projectTransactions? transaction.projectTransactions.push(transactionDetail):transaction.projectTransactions=transactionDetail
        await transaction.save()
        res.json({ success: true});
      }else{
        const newtransaction = new transactions({
            customer:id,
            credits:0,
            projectTransactions:[transactionDetail],
            
          });
          await newtransaction.save();
          res.json({ success: true});
      }

    } catch (err) {
      console.log(err)
        res.json({ success:false});
    }
  });
  
  module.exports = router;
  