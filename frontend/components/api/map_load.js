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
    
      markers.forEach(markerData => {
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
          '<div class="iw_inner" style="padding: 10px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">',
          '<div style="font-size: 14px; font-weight: bold; margin-bottom: 5px; color: #333;">주유소 정보</div>',
        ];
        
        var fuelPrices = [
          markerData.premium_gasoline_price !== "0" ? `<span style="color: black;">고급 휘발유: </span><span style="color: #DAA520;">${markerData.premium_gasoline_price} KRW</span>` : '',
          markerData.gasoline_price !== "0" ? `<span style="color: black;">휘발유: </span><span style="color: #FF4500;">${markerData.gasoline_price} KRW</span>` : '',
          markerData.diesel_price !== "0" ? `<span style="color: black;">경유: </span><span style="color: #1E90FF;">${markerData.diesel_price} KRW</span>` : '',
          markerData.kerosene_price !== "0" ? `<span style="color: black;">등유: </span><span style="color: #32CD32;">${markerData.kerosene_price} KRW</span>` : '',
        ].filter(price => price !== '').join(' | ');
        
        if(fuelPrices) {
          mouseOverInfoContent.push(`<div style="margin-bottom: 5px;">${fuelPrices}</div>`);
        }
  
        var mouseOverInfoContentString = mouseOverInfoContent.join('');
  
        const mouseOverInfoWindow = new window.naver.maps.InfoWindow({
          content: mouseOverInfoContentString
        });
    
        // 클릭 정보창 생성
        var clickInfoContent = `
        <div style="padding: 10px; max-width: 500px; line-height: 1.5; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          <div style="margin-bottom: 5px; color: #333;">
            <strong style="color: #007bff;">${markerData.name}</strong>
          </div>
          <div style="color: #555;">
            <span style="color: black;">지역:</span> ${markerData.region}
          </div>
          <div style="color: #555;">
            <span style="color: black;">브랜드:</span> ${markerData.brand}
          </div>
          <div style="color: #555; white-space: nowrap;">
            <span style="color: black;">주소:</span> ${markerData.address}
          </div>
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
        });
      });
    
    } catch (error) {
      console.error(error);
    }
  };
  
  
  export default initializeMap;