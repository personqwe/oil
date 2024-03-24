import {FavoriteStation} from '../../handlers/userHandlers'

const loadMap = (clientId) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;

    script.onload = () => resolve();
    script.onerror = (error) => reject(error);

    document.head.appendChild(script);
  });
};

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const initializeMap = async (clientId, markers) => {
  try {
    await loadMap(clientId);
    
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
  
    const mapOptions = {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 10,
    };
  
    const map = new window.naver.maps.Map('naver-map', mapOptions);
  
    markers.forEach((markerData, index) => {
      const markerPosition = new window.naver.maps.LatLng(markerData.x_coordinate, markerData.y_coordinate);
      const markerImg = markerData.Brand.marker_img; // 사용자 정의 마커 이미지 URL
  
      const icon = {
        url: markerImg, // 이미지 URL
      };
  
      const marker = new window.naver.maps.Marker({
        position: markerPosition,
        map: map,
        icon: icon,
      });

      // mouseover 정보창 생성
      var mouseOverInfoContent = [
        '<div class="iw_inner">',
        '<div class="station_info">주유소 정보</div>',
    ];
      
    var fuelPrices = [
      markerData.premium_gasoline_price !== "0" ? `<span class="fuel_price">고급 휘발유: </span><span class="premium_gasoline">${markerData.premium_gasoline_price} KRW</span>` : '',
      markerData.gasoline_price !== "0" ? `<span class="fuel_price">휘발유: </span><span class="gasoline">${markerData.gasoline_price} KRW</span>` : '',
      markerData.diesel_price !== "0" ? `<span class="fuel_price">경유: </span><span class="diesel">${markerData.diesel_price} KRW</span>` : '',
      markerData.kerosene_price !== "0" ? `<span class="fuel_price">등유: </span><span class="kerosene">${markerData.kerosene_price} KRW</span>` : '',
    ].filter(price => price !== '').join(' | ');
      
      if(fuelPrices) {
        mouseOverInfoContent.push(`<div style="margin-bottom: 5px;">${fuelPrices}</div>`);
      }

      var mouseOverInfoContentString = mouseOverInfoContent.join('');

      const mouseOverInfoWindow = new window.naver.maps.InfoWindow({
        content: mouseOverInfoContentString
      });

      const buttonId = `favoriteButton-${index}`;
      
      var clickInfoContent = `
      <div class="click_info_container">
        <div class="info_title">
          <strong class="info_name">${markerData.name}</strong>
        </div>
        <div class="info_detail">
          <span>지역:</span> ${markerData.region}
        </div>
        <div class="info_detail">
          <span>브랜드:</span> ${markerData.brand}
        </div>
        <div class="info_detail" style="white-space: nowrap;">
          <span>주소:</span> ${markerData.address}
        </div>
        <button id="${buttonId}" class="favorite_button">
          관심 주유소 등록
        </button>
      </div>`;
  
      const clickInfoWindow = new window.naver.maps.InfoWindow({
        content: clickInfoContent
      });

      // mouseover 이벤트 리스너
      window.naver.maps.Event.addListener(marker, 'mouseover', function(e) {
        mouseOverInfoWindow.open(map, marker);
      });

      // mouseout 이벤트 리스너
      window.naver.maps.Event.addListener(marker, 'mouseout', function(e) {
        mouseOverInfoWindow.close();
      });

      // click 이벤트 리스너
      window.naver.maps.Event.addListener(marker, 'click', function(e) {
        clickInfoWindow.open(map, marker);
        
        // 정보창이 DOM에 추가된 후 이벤트 리스너를 등록
        setTimeout(() => {
          const favoriteButton = document.getElementById(buttonId);
          if (favoriteButton) {
            favoriteButton.addEventListener('click', () => {
              FavoriteStation(markerData.id);
            });
          }
        }, 0);
      });
    });
  
  } catch (error) {
    console.error(error);
  }
};


export default initializeMap;