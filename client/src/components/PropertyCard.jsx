import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PropertyCard = ({ property}) => {
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
      <div className="flex justify-between mt-4">
        <button
          // onClick={() => onDelete(property._id)}
          className="text-red-700 uppercase"
        >
          <FaTrash className="mr-1" /> Delete
        </button>
        <Link to={`/update-listing/${property._id}`}>
          <button className="text-green-700 uppercase">
            <FaEdit className="mr-1" /> Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
