const express = require("express");
const router = express.Router();
const transactions= require("../models/transactionSchema");
const userRegistration = require("../models/UserSchema");

const stripe = require("stripe")(
  "sk_test_51Nr5KGSJ5d6Cj4qWnlFnC3SS8bpAUsQCsNb8yAaV4npP2HvaR9Do2lXKM8lKRWQyNx5KxYLuJA2qQjxCPB1soKkl00E3sOgOG4"
);

router.post("/crerate-checkout-session", async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3000";
  const { name, amount, qty } = req.body;

  try {
      const session = await stripe.checkout.sessions.create({
        // payment_method_types:["upi"],
        line_items: [
          {
            price_data:{
                currency:"inr",
                product_data:{

                    name: name,
                },
                unit_amount: amount *100
            },
            quantity: qty,
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/CreditTransaction`,
        cancel_url: `${YOUR_DOMAIN}/Userpage`,
      });
      res.json({ success: true, id:session.id, amount });

  } catch (error) {
    console.error("Error updating student:", error);
    // Handle error
  }
});



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
  
  router.post("/createTransactions", async (req, res) => {
    try {
      const {id} = req.body;

        const newtransaction = new transactions({
            customer:id,
            credits:0,
            
          });
          const newTransac = await newtransaction.save();
          const userData = await userRegistration.findById(id)
        if(userData){
          userData.transactionID = newTransac._id;
          const newuser = await userData.save();
          const transID = newuser.transactionID
          res.json({ success: true, transID});
        }else{
          res.json({ success: false });
        }
      }catch (err) {
      console.log(err)
        res.json({ success:false});
    }
  });
  

  router.post("/getTransactions", async (req, res) => {
    try {
      const {id} = req.body;
      const transaction = await transactions.findById(id)
        
      if(transaction){
        res.json({ success: true, transaction});
      }else{
          res.json({ success: false});
      }

    } catch (err) {
      console.log(err)
        res.json({ success:false});
    }
  });
  
  module.exports = router;
  