import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // 빈 하트와 채워진 하트 아이콘
import { AddFavoriteStation, RemoveFavoriteStation } from '@/handlers/userHandlers'; // 관심 주유소 추가/삭제를 처리하는 함수

function CheapestCard({ station, favorites }) {
  const [isFavorited, setIsFavorited] = useState(false);

  // 컴포넌트가 마운트될 때 관심 주유소 여부를 결정합니다.
  useEffect(() => {
    if (favorites) {
      const isFavorite = favorites.some(favoriteItem => favoriteItem.favorite.station_id === station.id);
      setIsFavorited(isFavorite);
    }
  }, [favorites, station.id]);

  const toggleFavorite = () => {
    if (isFavorited) {
      // 이미 관심 주유소로 등록된 경우, 관심 주유소를 삭제합니다.
      RemoveFavoriteStation(station.id)
        .then(() => {
          setIsFavorited(false); // 상태 업데이트를 성공적으로 수행한 후에만 UI 상태를 변경합니다.
          console.log('Successfully removed from favorites.');
        })
        .catch((error) => {
          console.error('Error removing favorite station:', error);
        });
    } else {
      // 관심 주유소로 등록되지 않은 경우, 관심 주유소를 추가합니다.
      AddFavoriteStation(station.id)
        .then(() => {
          setIsFavorited(true); // 상태 업데이트를 성공적으로 수행한 후에만 UI 상태를 변경합니다.
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