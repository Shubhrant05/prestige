import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PropertyCard = ({ property, onDelete }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg">
      <div className="flex items-center">
        <Link to={`/listing/${property._id}`} className="mr-4">
          <img
            src={property.imageUrls[0]}
            alt="Property cover"
            className="h-16 w-16 object-contain"
          />
        </Link>
        <div className="flex-1">
          <Link
            to={`/listing/${property._id}`}
            className="text-slate-700 font-semibold hover:underline truncate"
          >
            <p>{property.name}</p>
          </Link>
          <p className="text-gray-700 truncate">{property.address}</p>
          {property.discountPrice && (
            <p className="mt-2 text-green-600 font-bold">
              Discounted Price: ${property.discountPrice}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-1 justify-between mt-4">
        <button
          onClick={() => onDelete(property._id)}
          className="text-white w-1/2 uppercase items-center bg-red-700 px-4 py-1 rounded focus:outline-none focus:shadow-outline hover:bg-red-800"
        >
          Delete
        </button>
        <Link to={`/update-listing/${property._id}`} className="text-white w-1/2 uppercase items-center bg-blue-700 px-4 py-1 rounded focus:outline-none focus:shadow-outline hover:bg-blue-800 text-center">
          <button
          >

            EDIT

          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
