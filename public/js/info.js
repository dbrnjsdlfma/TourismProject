document.write("<script type='text/javascript' src='//dapi.kakao.com/v2/maps/sdk.js?appkey=312513de9e4650fe36a7193c610d0d8b&libraries=services'><"+"/script>")


window.onload = function() {

    async function tourismApi() {

        console.log(JSON.parse(localStorage.getItem('card-info')))
        const tourismTitle = JSON.parse(localStorage.getItem('card-info'))
        const tourismUrlTitle = await fetch(`http://127.0.0.1:5300/${tourismTitle}`)
        const tourismUrlTitleData = await tourismUrlTitle.json()
        console.log(tourismUrlTitleData)

        const tourspotNm = tourismUrlTitleData.tourspotNm
        const detailTitle = document.querySelector('h2')
        detailTitle.innerText = tourspotNm

        const tourismImage = tourismUrlTitleData.imgUrl
        const detailImageContainer = document.querySelector('.detail-image')
        const detailImage = document.createElement('img')
        detailImage.src = tourismImage
        detailImageContainer.appendChild(detailImage)

        const tourspotSumm = tourismUrlTitleData.tourspotSumm
        const tourspotAddr = tourismUrlTitleData.tourspotAddr
        const refadNo = tourismUrlTitleData.refadNo
        const urlAddr = tourismUrlTitleData.urlAddr
        // const detailInfo = document.querySelector('detail.info')
        const detailInfo = document.querySelectorAll('span')
        detailInfo[1].innerText = tourspotSumm
        detailInfo[2].innerText = '주소 : ' + tourspotAddr
        detailInfo[3].innerText = '전화번호 : ' + refadNo
        detailInfo[4].innerText = '홈페이지 : ' + urlAddr


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
}