function CheapestCard({ station }) {
  // 이미지 컨테이너의 스타일을 설정합니다.
  const imageContainerStyle = {
    width: '50px', // 컨테이너의 너비를 설정
    height: '50px', // 컨테이너의 높이를 설정
    borderRadius: '50%', // 원형 모양으로 만듭니다.
    overflow: 'hidden', // 컨테이너 밖으로 이미지가 넘치는 것을 방지합니다.
    display: 'flex', // 이미지를 가운데 정렬하기 위해 flex를 사용합니다.
    justifyContent: 'center', // 수평 중앙 정렬
    alignItems: 'center', // 수직 중앙 정렬
    backgroundColor: 'white', // 배경색을 흰색으로 설정
  };

  // 이미지의 스타일을 설정합니다.
  const imageStyle = {
    maxWidth: '80%', // 이미지의 최대 너비 제한
    maxHeight: '90%', // 이미지의 최대 높이 제한
    objectFit: 'contain', // 컨테이너 안에 이미지를 비율을 유지하며 맞춥니다.
  };

  return (
    <div className="cheapestCardContainer post-card shadow-xl transition-colors duration-200">
      <div className="flex flex-col items-center gap-1">
        <div style={imageContainerStyle}>
          <img
            src={station.Brand.img}
            alt={station.name}
            style={imageStyle}
          />
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