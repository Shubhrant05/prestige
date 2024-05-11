import Listing from "../models/listing-model.js";

export const createListing = async (req, res) => {
    try {
        const newListing = await Listing.create(req.body);
        res.status(201).json(newListing);
    } catch (error) {
        res.status(500).json("[SERVER ERROR] : Error while creating listing " + error);
    }
};

export const deleteListing = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return res.status(404).json('Listing not found!');
    }

    if (req.user.id !== listing.userRef) {
        return res.status(403).json('You can delete only your listings!');
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        res.status(500).json("[SERVER ERROR] : Error while deleting listing " + error);
    }
};

export const updateListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return res.status(404).json('Listing not found!');
    }

    if (req.user.id !== listing.userRef) {
        return res.status(403).json('You can update only your listings!');
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true });
        res.status(200).json(updatedListing);
    } catch (error) {
        res.status(500).json("[SERVER ERROR] : Error while updating listing " + error);
    }
};
 
export const getListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  };