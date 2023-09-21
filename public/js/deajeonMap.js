document.write("<script type='text/javascript' src='//dapi.kakao.com/v2/maps/sdk.js?appkey=d2e33febd686767a3b336db01af5df1a&libraries=services'><"+"/script>")

window.onload = function() {
    let tourismData
    function listTool(i) {
        return `
        <div class="mapinfo-container-box">
            <a onclick="localStorage.setItem('card-info', JSON.stringify('${tourismData[i].tourspotNm}'));location.href ='http://127.0.0.1:5500/public/html/info.html'">
                <img src="${tourismData[i].imgUrl}" alt="">
            </a>
            <div class="mapinfo-container-boxBody">
                <div class="mapinfo-container-boxTitle">
                    <h3>${tourismData[i].tourspotNm}</h2>
                    <span>관광지</span>
                </div>
                <div class="mapinfo-container-boxDescript">
                    <span>${tourismData[i].tourspotSumm}</span>
                    <div class="likeBox">
                        <span class="material-symbols-outlined">thumb_up</span>
                        <span>${tourismData[i].likeNo}</span>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    async function tourismApi() {
        const tourismUrl = await fetch('http://127.0.0.1:5300')
        tourismData = await tourismUrl.json()
        console.log(tourismData)
        const mapinfoContainer = document.querySelector('.mapinfo-container')
        for(let i=0; i<tourismData.length; i++) {
            mapinfoContainer.innerHTML += listTool(i)
        }
        const array = []
        for(let k=0; k<tourismData.length; k++) {
            const test = {content :'<div>' +
            ' <a href="#" target="_blank"> ' +
            ` <span class="title">${tourismData[k].tourspotNm}</span> ` +
            ' </a> ' +
            '</div>',
             latlng: new kakao.maps.LatLng(tourismData[k].mapLat, tourismData[k].mapLot)}
            array.push(test)
        }

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
        mapOption = { 
            center: new kakao.maps.LatLng(36.3504567, 127.3848187), // 지도의 중심좌표
            level: 6 // 지도의 확대 레벨
        };
            
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        
        // 마커를 표시할 위치와 title 객체 배열입니다 
        var positions = array
        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

        for (var j = 0; j < positions.length; j++) {
                    
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35); 
                
            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);       
                // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[j].latlng, // 마커를 표시할 위치
                image : markerImage // 마커 이미지 
            });

            var infowindow = new kakao.maps.InfoWindow({
                content: positions[j].content // 인포윈도우에 표시할 내용
            });
            // var customOverlay = new kakao.maps.CustomOverlay({
            //     map: map,
            //     position: positions[j].latlng,
            //     content: positions[j].content,
            // });

            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }
        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }
    }
    tourismApi()
    const tapBtn = document.querySelectorAll('.mapinfo-taplist ul li')
    console.log(tapBtn)
    tapBtn.forEach((el) => {
        el.addEventListener('click', (e) => {
            el.classList.toggle('active')
        })
    })
    const scrollUp = document.querySelector('.scroll-up')
    scrollUp.addEventListener('click' , (e) => {
      window.scrollTo({top : 0 , behavior: 'smooth'})
    })

}