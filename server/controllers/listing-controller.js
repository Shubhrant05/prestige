import Listing from "../models/listing-model.js";

export const createListing = async (req, res) => {
    try{
        const newListing = await Listing.create(req.body);
        res.status(201).json(newListing);
    } catch (error) {
        res.status(500).json("[SERVER ERROR] : Error while creating listing " + error);
    }
};