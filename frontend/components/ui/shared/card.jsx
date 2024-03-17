function CheapestCard({ station }) {
    return (
      <div className="cheapestCardContainer post-card shadow-xl transition-colors duration-200">
        <div className="flex flex-col items-center gap-1">
            <img
              src='/station.png'
              alt={station.name}
              className="rounded-full w-10 h-10 border-2 border-gray-700 mb-2"
            />
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