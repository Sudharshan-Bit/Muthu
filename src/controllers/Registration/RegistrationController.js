
import mongoose from 'mongoose'
import { Registration } from '../../models/RegistrationModel.js'
import { uniqueorderid } from '../../services/uniqueidService.js'
import Stripe from 'stripe';
import sendConfirmationMail from '../../services/email/enquiry.js';
import { Subscription } from '../../models/SubscriptionModel.js';
import { sendSubscriptionMail } from '../../services/email/Subscription.js';



export const getallRegistrations = async (req, res, next) => {
  try {
    const { first, rows, globalfilter, colfilter } = req.query;
    const fieldArray = Object.keys(Registration.schema.obj);
    const globalFilter = globalfilter ? { $or: fieldArray.filter((field1) => Registration.schema.path(field1) instanceof mongoose.Schema.Types.String).map(field => ({ [field]: { $regex: globalfilter, $options: 'i' } })) } : {};
    // Include email filter
    const filter = colfilter?{...colfilter, ...globalFilter}:globalFilter;
    const resdata = await Registration.find(filter).skip(first).limit(rows);
    const totallength = await Registration.countDocuments(filter);
    res.send({ resdata, totallength });
  } catch (err) {
    console.error(err);
  }
};

export const getfilteroptions= async (req, res, next) => {
  try {
    const { field } = req.body;
    const updatedData = await Registration.distinct(field);
    res.send({[field]:updatedData});
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderitemsbyid = async (req, res, next) => {
  try {
    const { Order_id } = req.query
    //const resdata = await Registrationmaster.find({ Order_id })
    //res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const addSubscription = async (req, res, next) => {
  try {
    //const {data} = req.body;
    var checkMail = await Subscription.findOne({Email : req.body.Email}).lean();
    if(!checkMail){
      const resdata = await new Subscription(req.body).save();
      await sendSubscriptionMail(resdata)
    }
    res.send({msg : "Success"})
  } catch (err) {
    console.error(err)
  }
}

export const saveRegistration = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPEKEY); 
    const customer = await stripe.checkout.sessions.create ( {
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency:"usd",
            product_data:{ name: req.body.Title },
            unit_amount:`${Math.round(req.body.Entry_Fees*100)}`,
          },
          quantity: 1,
        },
      ],
      success_url:`${process.env.BASE_URL}/payment-success/{CHECKOUT_SESSION_ID}`,
      cancel_url:`${process.env.BASE_URL}/payment-fail`
    });
    
    //console.log(customer);

    res.send({ url: customer.url });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

export const getRegisterStatusbyid = async (req, res, next) => {
  try {
    const { id,data } = req.query;
    const stripe = new Stripe(process.env.STRIPEKEY); 
    var paymentstatus = await stripe.checkout.sessions.retrieve(id,{expand: ['payment_intent.payment_method']});
    const Order_id = await uniqueorderid(data);
    console.log(paymentstatus['payment_intent'])
    var path = paymentstatus['payment_intent']
    var formatdata = {...data,Registration_id:Order_id, Payment_id: path['id'], Payment_Type: path['payment_method_types'][0], Payment_Status: path['status'],Total_Amount: data['Entry_Fees'],
      Registration_Status: path['status'] == 'succeeded' ? 'Completed':'Incomplete'}
    const resdata = await Registration(formatdata).save();
    await sendConfirmationMail(resdata)
    res.send({msg : "Success"})
  } catch (err) {
    console.error(err)
  }
}

export const FreeRegisterion = async (req, res, next) => {
  try {
    const {data} = req.body;
    const Order_id = await uniqueorderid(data);
    console.log(data,Order_id);
    var formatdata = {...data,Registration_id:Order_id, Total_Amount: data['Entry_Fees'], Registration_Status:  'Completed' }
    const resdata = await Registration(formatdata).save();
    await sendConfirmationMail(resdata)
    res.send({msg : "Success"})
  } catch (err) {
    console.error(err)
  }
}


export const updateRegistration = async (req, res, next) => {
  try {
    const { _id } = req.query
    const resdata = await Registration.findOneAndUpdate({ _id }, req.body, { new: true })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const deleteRegistration = async (req, res, next) => {
  try {
    const { _id } = req.query
    const resdata = await Registration.deleteOne({ _id })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}
