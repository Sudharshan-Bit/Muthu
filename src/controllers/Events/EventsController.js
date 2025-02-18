import mongoose from 'mongoose'
import { Events } from '../../models/EventsModel.js'
import { Saveimages } from '../../services/ImageServices.js'
import { sendEventNotification } from '../../services/email/Subscription.js';
import { Subscription } from '../../models/SubscriptionModel.js';

export const getallEvent = async (req, res, next) => {
  try {
    const { first, rows, globalfilter, colfilter } = req.query;

    const fieldArray = Object.keys(Events.schema.obj);
    const globalFilter = globalfilter ? { $or: fieldArray.filter((field1) => Events.schema.path(field1) instanceof mongoose.Schema.Types.String).map(field => ({ [field]: { $regex: globalfilter, $options: 'i' } })) } : {};
    const filter = colfilter?{...colfilter, ...globalFilter}:globalFilter;
    const resdata = await Events.find(filter).skip(first).limit(rows);
    const totallength = await Events.countDocuments(filter);
    res.send({ resdata, totallength });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getfilteroptions= async (req, res, next) => {
  try {
    const { field } = req.body;
    const updatedData = await Events.distinct(field);
    res.send({[field]:updatedData});
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const geteventbyid = async (req, res, next) => {
  try {
    const { _id } = req.query;
    console.log(req.query)
    const resdata = await Events.findOne({_id}).lean()
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const searchEvent = async (req, res, next) => {
  try {
    const { data } = req.body
    const response = await Events.find({ Title: { $regex: new RegExp(data, 'i') } }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, Images: 0 })
    res.status(200).send(response)
  } catch (err) {
    console.log(err)
  }
}

export const getuniquevaluebyfield = async (req, res, next) => {
  try {
    const { field } = req.query
    const resdata = await Events.distinct(field)
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const saveEvent = async (req, res, next) => {
  try {
    console.log("event",req.body)
    if (req.files && req.files.length !== 0) {
      req.body.Images = await Saveimages(req.files, 'Events')
    }
    if(req.body.Games){
      req.body.Games = JSON.parse(req.body.Games);
    }
    
    const resdata = await new Events(req.body).save();
    const Email = await Subscription.distinct('Email',{Subscription_Status:"Subscriped"})
    if(Email.length != 0 && resdata.Poster_Type !="Donation"){
      await sendEventNotification(resdata,Email)
    }
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const updateEvent = async (req, res, next) => {
  try {
    const { _id } = req.query
    if (req.files && req.files.length !== 0) {
      req.body.Images = await Saveimages(req.files, 'Events')
    }
    if(req.body.Games){
      req.body.Games = JSON.parse(req.body.Games);
    }
    const resdata = await Events.findOneAndUpdate({ _id }, req.body, { new: true })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const deleteEvent = async (req, res, next) => {
  try {
    const { _id } = req.query
    const resdata = await Events.deleteOne({ _id })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}
