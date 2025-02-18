import mongoose from 'mongoose'
import { Saveimages } from '../../services/ImageServices.js'
import { Gallery } from '../../models/GalleryModel.js';
import fs from "fs";

export const getallGallery = async (req, res, next) => {
  try {
    const { first, rows, globalfilter, colfilter } = req.query;

    const fieldArray = Object.keys(Gallery.schema.obj);
    const globalFilter = globalfilter ? { $or: fieldArray.filter((field1) => Gallery.schema.path(field1) instanceof mongoose.Schema.Types.String).map(field => ({ [field]: { $regex: globalfilter, $options: 'i' } })) } : {};
    const filter = colfilter?{...colfilter, ...globalFilter}:globalFilter;
    const resdata = await Gallery.find(filter).skip(first).limit(rows);
    const totallength = await Gallery.countDocuments(filter);
    res.send({ resdata, totallength });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getallGallerys = async (req, res, next) => {
  try {
    const { Type, Year } = req.query
    const Query = Type&&Year? {Src_Type:Type, Event_Date:{ $gte: new Date(`${Year}-01-01`), $lte: new Date(`${Year}-12-31`) }}:{};
    const resdata = await Gallery.find(Query).sort({Event_Date:-1})
    res.send({ resdata });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getfilteroptions= async (req, res, next) => {
  try {
    const { field } = req.body;
    const updatedData = await Gallery.distinct(field);
    res.send({[field]:updatedData});
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGallerybyid = async (req, res, next) => {
  try {
    const { _id } = req.query;
    console.log(req.query)
    const resdata = await Gallery.findOne({_id}).lean()
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const searchGallery = async (req, res, next) => {
  try {
    const { data } = req.body
    const response = await Gallery.find({ Title: { $regex: new RegExp(data, 'i') } }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, Images: 0 })
    res.status(200).send(response)
  } catch (err) {
    console.log(err)
  }
}

export const getuniquevaluebyfield = async (req, res, next) => {
  try {
    const { field } = req.query
    const resdata = await Gallery.distinct(field)
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const saveGallery = async (req, res, next) => {
  try {
    if (req.files && req.files.length !== 0) {
        console.log(req.files)
        req.body.Src = await Saveimages(req.files, `Gallery/${req.body.Src_Type}`)
    }
    console.log(req.body)
    const resdata = await new Gallery(req.body).save()
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const updateGallery = async (req, res, next) => {
  try {
    const { _id } = req.query

    if (req.files && req.files.length !== 0) {
      req.body.Src = await Saveimages(req.files, `Gallery/${req.body.Src_Type}`)
    }

    const resdata = await Gallery.findOneAndUpdate({ _id }, req.body, { new: true })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const deleteGallery = async (req, res, next) => {
  try {
    const { _id } = req.query;
    const deleteData = await Gallery.findOne({ _id });
    console.log(deleteData)
    deleteData['Src'].map(item=>{
        fs.unlink( item, (err)=>{
            if(err) return console.log(err);
            console.log('file deleted successfully');
        });
    })
  

    const resdata = await Gallery.deleteOne({ _id })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}
