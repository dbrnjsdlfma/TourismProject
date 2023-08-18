// document.write("<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/fullcalendar@5.8.0/main.min.js'></script>")
document.write("<script type='text/javascript' src='//dapi.kakao.com/v2/maps/sdk.js?appkey=312513de9e4650fe36a7193c610d0d8b&libraries=services'><"+"/script>")

window.onload=function() {
  let offset = 0

    // 관광지 카드 툴
    function cardTool(tourismImage, tourismTitle, tourismSumm, tourismAddr, tourspotDtlAddr, tourism_Time, tourism_No, i) {
        return `
        <div class="card">
        <div class="content">
          <div class="back">
            <div class="back-content">
              <div class="back-content-title">
                <strong>${tourismTitle}</strong>
              </div>
              <div class="back-content-imgBox">
                <img src="${tourismImage}" alt="">
              </div>
              <div class="back-content-weader">
                <span>현재 날씨는</span>
                <img class="weaderIcon-${i}">
                <span id="weader-temperatures-${i}"></span>
              </div>
            </div>
          </div>
          <div class="front">
            <div class="front-content">
              <small class="badge" id="tourism-title">${tourismTitle}</small>
              <div class="map" id="staticMap-${i}" style="width:280px;height:200px;"></div>
                <div></div>
                <div class="title">
                  <p class="title">
                    <strong id="tourism-summ">${tourismSumm}</strong>
                  </p>
                  <p class="title">
                    <strong id="tourism-addr">${tourismAddr} | ${tourspotDtlAddr}</strong>
                  </p>
                </div>
                <p class="card-footer" id="tourism-time-no">${tourism_Time} | ${tourism_No}</p>
              </div>
            </div>
          </div>
        </div>
        `
    }

    // 관광지 API 데이터 
    async function tourismApi() {
        const tourismUrl = await fetch('/data.json')
        const tourismData = await tourismUrl.json()
        console.log(tourismData)
        for(let i=offset; i<offset+4; i++) {
            // const tourismTitles = document.getElementById('tourism-title')
            // const tourismSumms = document.getElementById('tourism-summ')
            // const tourismAddrs = document.getElementById('tourism-addr')
            // const tourism_Time_Nos = document.getElementById('tourism-time-no')
            const cardList = document.querySelector('.cardList')

            const tourismImage = tourismData.response.body.items[i].imgUrl // 관광지 이미지
            const tourismTitle = tourismData.response.body.items[i].tourspotNm // 관광지 명
            const tourismSum = tourismData.response.body.items[i].tourspotSumm // 관광지 설명
            const tourismAddr = tourismData.response.body.items[i].tourspotAddr // 구 주소
            const tourspotDtlAddr = tourismData.response.body.items[i].tourspotDtlAddr // 신 주소
            const tourism_Time = tourismData.response.body.items[i].mngTime // 개장시간
            const tourism_No = tourismData.response.body.items[i].refadNo // 전화번호
            // const tourismTourspotZip = tourismData.response.body.items[i].tourspotZip
            // const url = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${tourismTourspotZip},KR&appid=a934b371a16cc8f8933fd8f1ce2c34d5`)
            // const urlData = await url.json()

            const tourismLat = tourismData.response.body.items[i].mapLat
            const tourismLot = tourismData.response.body.items[i].mapLot
            cardList.innerHTML += cardTool(tourismImage, tourismTitle, tourismSum, tourismAddr, tourspotDtlAddr, tourism_Time, tourism_No, i)
            var markerPosition  = new kakao.maps.LatLng(tourismLat, tourismLot); 

            // 이미지 지도에 표시할 마커입니다
            // 이미지 지도에 표시할 마커는 Object 형태입니다
            var marker = {
                position: markerPosition ,
                text: `${tourismTitle}`
            };

            var staticMapContainer  = document.getElementById(`staticMap-${i}`), // 이미지 지도를 표시할 div  
            staticMapOption = { 
                center: new kakao.maps.LatLng(tourismLat, tourismLot), // 이미지 지도의 중심좌표
                level: 3, // 이미지 지도의 확대 레벨
                marker: marker // 이미지 지도에 표시할 마커 
            };
            
            // 이미지 지도를 생성합니다
            var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

            const weaderUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${tourismLat}&lon=${tourismLot}&appid=a934b371a16cc8f8933fd8f1ce2c34d5`)
            const weaderData = await weaderUrl.json()
            const iconSection = document.querySelector(`.weaderIcon-${i}`)

            const icon = weaderData.weather[0].icon
            const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
            iconSection.setAttribute('src', iconURL);

            const weaderTemperatures = document.getElementById(`weader-temperatures-${i}`)
            const tempMax = weaderData.main.temp_max - 273.5
            const tempMin = weaderData.main.temp_min - 273.5
            weaderTemperatures.innerText = `최저기온 : ${tempMax.toFixed(1)}도  |  최고기온 : ${tempMin.toFixed(1)}도`
        }
    }
    tourismApi()
    const scrollUp = document.querySelector('.scroll-up')
    scrollUp.addEventListener('click' , (e) => {
      window.scrollTo({top : 0 , behavior: 'smooth'})
    })
}