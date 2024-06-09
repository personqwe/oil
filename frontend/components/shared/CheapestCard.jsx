import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { AddFavoriteStation, RemoveFavoriteStation } from '@/handlers/UserHandlers';

function CheapestCard({ station, favorites }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // 즐겨찾기 여부를 초기화합니다.
    const isFavorite = favorites.some(favoriteItem => favoriteItem.favorite.station_id === station.id);
    setIsFavorited(isFavorite);
  }, [favorites, station.id]);

  const toggleFavorite = () => {
    if (isFavorited) {
      RemoveFavoriteStation(station.id)
        .then(() => {
          setIsFavorited(false);
          console.log('Successfully removed from favorites.');
        })
        .catch((error) => {
          console.error('Error removing favorite station:', error);
        });
    } else {
      AddFavoriteStation(station.id)
        .then(() => {
          setIsFavorited(true);
          console.log('Successfully added to favorites.');
        })
        .catch((error) => {
          console.error('Error adding favorite station:', error);
        });
    }
  };

  // 이미지 컨테이너의 스타일을 설정합니다.
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

  // 이미지의 스타일을 설정합니다.
  const imageStyle = {
    maxWidth: '80%',
    maxHeight: '90%',
    objectFit: 'contain',
  };

  return (
    <div className="cheapestCardContainer post-card shadow-xl transition-colors duration-200 relative">
      {/* 하트 아이콘 추가 */}
      <div className="absolute top-0 right-0 p-2">
        {isFavorited ? (
          <FaHeart className="text-red-500 cursor-pointer" onClick={toggleFavorite} />
        ) : (
          <FaRegHeart className="text-red-500 cursor-pointer" onClick={toggleFavorite} />
        )}
      </div>
      <div className="flex flex-col items-center gap-1">
        <div style={imageContainerStyle}>
          <img src={station.Brand.img} alt={station.name} style={imageStyle} />
        </div>
        <h3 className="text-lg text-white font-semibold text-center mb-2">{station.name}</h3>
        <div className="flex flex-col items-center gap-1">
          {station.gasoline_price !== "0" && (
            <p className="cheapestCardPrice">Gasoline: {station.gasoline_price} KRW</p> 
          )}
          {station.premium_gasoline_price !== "0" && (
            <p className="cheapestCardPrice">Premium: {station.premium_gasoline_price} KRW</p>
          )}
          {station.diesel_price !== "0" && (
            <p className="cheapestCardPrice">Diesel: {station.diesel_price} KRW</p>
          )}
          {station.kerosene_price !== "0" && (
            <p className="cheapestCardPrice">Kerosene: {station.kerosene_price} KRW</p>
          )}
        </div>
      </div>
    </div>
  );
}
  
export default CheapestCard;