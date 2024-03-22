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
  
        // 마커 이미지와 크기를 설정합니다.
        const icon = {
          url: markerImg, // 이미지 URL
        };
  
        const marker = new window.naver.maps.Marker({
          position: markerPosition,
          map: map,
          icon: icon, // 마커에 icon 옵션 적용
        });
  
        window.naver.maps.Event.addListener(marker, 'click', function(e) {
          alert('마커를 클릭했습니다!');
        });
      });
  
    } catch (error) {
      console.error(error);
    }
  };
  
  export default initializeMap;