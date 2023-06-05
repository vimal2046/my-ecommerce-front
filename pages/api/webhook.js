import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer} from 'micro';
import { Order } from "@/models/Order";

const endpointSecret ="whsec_185c29b740fa3f8415913b3f8e747f9354367d5314cae097ffec7b289c594058";

export default async function handler(req,res) {
    await mongooseConnect();

    const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
       await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })  
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send('ok');
}                      

export const config = {
    api: {bodyParser:false,}
};


//pros-eased-wowed-fiery
//acct_1NChHLSBheY3Az2E