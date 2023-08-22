document.write("<script type='text/javascript' src='//dapi.kakao.com/v2/maps/sdk.js?appkey=312513de9e4650fe36a7193c610d0d8b&libraries=services,clusterer,drawing'><"+"/script>")


window.onload = function() {
    let tourismData
    function detailTool(tourismUrlTitleData) {
        return `
        <h2>${tourismUrlTitleData.tourspotNm}</h2>
        <div class="detail">
            <strong><span>${tourismUrlTitleData.tourspotSumm}</span></strong>
            <div class="detail-image"><img src="${tourismUrlTitleData.imgUrl}"></div>
            <div></div>
            <div class="map" id="staticMap" style="width:70%;height:500px;"></div>
            <div class="detail-info">
                <ul>
                    <li><strong>주소 : </strong><span>${tourismUrlTitleData.tourspotAddr} || ${tourismUrlTitleData.tourspotDtlAddr}</span></li>
                    <li><strong>전화번호 : </strong><span>${tourismUrlTitleData.refadNo}</span></li>
                    <li><strong>이용시간 : </strong><span>${tourismUrlTitleData.mngTime}</span></li>
                    <li><strong>이용료 : </strong><span>${tourismUrlTitleData.pkgFclt}</span></li>
                    <li><strong>홈페이지 : </strong><a href="${tourismUrlTitleData.urlAddr}"><span>${tourismUrlTitleData.urlAddr}</span></a></li>
                </ul>
            </div>
        </div>
        `
    }

    async function tourismApi() {

        // console.log(JSON.parse(localStorage.getItem('card-info')))
        const tourismTitle = JSON.parse(localStorage.getItem('card-info'))
        const tourismUrl = await fetch('http://127.0.0.1:5300')
        tourismData = await tourismUrl.json()
        const tourismUrlTitle = await fetch(`http://127.0.0.1:5300/${tourismTitle}`)
        const tourismUrlTitleData = await tourismUrlTitle.json()
        console.log(tourismUrlTitleData)
        
        const tourspotSumm = tourismUrlTitleData.tourspotSumm // 설명
        const tourspotNm = tourismUrlTitleData.tourspotNm // 타이틀
        const tourismImage = tourismUrlTitleData.imgUrl // 이미지
        const tourspotAddr = tourismUrlTitleData.tourspotAddr // 주소
        const tourspotDtlAddr = tourismUrlTitleData.tourspotDtlAddr // 신주소
        const refadNo = tourismUrlTitleData.refadNo //전화번호
        const urlAddr = tourismUrlTitleData.urlAddr // 홈페이지
        const mngTime = tourismUrlTitleData.mngTime // 이용시간
        const pkgFclt = tourismUrlTitleData.pkgFclt // 이용료
        
        const detailContainer = document.querySelector('.detail-container')
        detailContainer.innerHTML += detailTool(tourismUrlTitleData)
        const tourismLat = tourismUrlTitleData.mapLat
        const tourismLot = tourismUrlTitleData.mapLot
    
        var markerPosition  = new kakao.maps.LatLng(tourismLat, tourismLot); 

            // 이미지 지도에 표시할 마커입니다
            // 이미지 지도에 표시할 마커는 Object 형태입니다
            var marker = {
                position: markerPosition ,
                text: `${tourismTitle}`
            };

            var staticMapContainer  = document.getElementById(`staticMap`), // 이미지 지도를 표시할 div  
            staticMapOption = { 
                center: new kakao.maps.LatLng(tourismLat, tourismLot), // 이미지 지도의 중심좌표
                level: 3, // 이미지 지도의 확대 레벨
                marker: marker // 이미지 지도에 표시할 마커 
            };
            
            // 이미지 지도를 생성합니다
            var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

    }
    tourismApi()

    function search() {
        const searchKeyword = document.querySelector('.keyword')
        for(let i=0; i<tourismData.length; i++) {
          if(tourismData[i].tourspotNm.includes(searchKeyword.value)) {
            localStorage.setItem('card-info', JSON.stringify(`${tourismData[i].tourspotNm}`))
            window.location.href = 'http://127.0.0.1:5500/public/html/info.html'
          }
        }
      }
      const searchBtn = document.getElementById('search-btn')
      searchBtn.addEventListener('click', search)
}