import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { AddFavoriteStation, RemoveFavoriteStation } from '../../handlers/UserHandlers';

function SearchCard({ result, favorites }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (favorites) {
      const isFavorite = favorites.some(favoriteItem => favoriteItem.favorite.station_id === result.id);
      setIsFavorited(isFavorite);
    }
  }, [favorites, result.id]);

  const toggleFavorite = () => {
    if (isFavorited) {
      RemoveFavoriteStation(result.id)
        .then(() => {
          setIsFavorited(false);
          console.log('Successfully removed from favorites.');
        })
        .catch((error) => {
          console.error('Error removing favorite station:', error);
        });
    } else {
      AddFavoriteStation(result.id)
        .then(() => {
          setIsFavorited(true);
          console.log('Successfully added to favorites.');
        })
        .catch((error) => {
          console.error('Error adding favorite station:', error);
        });
    }
  };

  const imageContainerStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  };

  const imageStyle = {
    maxWidth: '80%',
    maxHeight: '90%',
    objectFit: 'contain',
  };

  return (
    <li className="flex flex-col p-4 bg-gray-800 rounded-lg relative hover:bg-gray-700 transition-colors duration-200">
      <div className="absolute top-0 right-0 p-2">
        {isFavorited ? (
          <FaHeart className="text-red-500 cursor-pointer" onClick={toggleFavorite} />
        ) : (
          <FaRegHeart className="text-red-500 cursor-pointer" onClick={toggleFavorite} />
        )}
      </div>
      <div className="flex items-center">
        <div style={imageContainerStyle}>
          <img src={result.Brand.img} alt={`${result.name} brand`} style={imageStyle} />
        </div>
        <div className="ml-4">
          <h4 className="text-xl font-semibold">{result.name}</h4>
          <p>{result.address}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>Premium Gasoline Price: {result.premium_gasoline_price}</p>
        <p>Gasoline Price: {result.gasoline_price}</p>
        <p>Diesel Price: {result.diesel_price}</p>
        <p>Kerosene Price: {result.kerosene_price}</p>
      </div>
    </li>
  );
}

export default SearchCard;
