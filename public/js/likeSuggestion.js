document.write("<script src='https://unpkg.com/axios/dist/axios.min.js'><"+"/script>")
axios.defaults.withCredentials = true
window.onload = function(){
    let tourismApiData
    let offset = 0
    function listCardTool(i) {
        return `
        <div class="likeList-card">
            <div class="likeList-cardImage">
                <a onclick="localStorage.setItem('card-info', JSON.stringify('${tourismApiData.likeTourspotList[i].tourspotNm}'));location.href ='http://127.0.0.1:5500/public/html/info.html'">
                    <img src="${tourismApiData.likeTourspotList[i].imgUrl}" alt="">
                </a>
            </div>
            <div class="likeList-cardBody">
                <div class="likeList-cardBody-like">
                    <h2>${tourismApiData.likeTourspotList[i].tourspotNm}</h2>
                    <div class="likeList-cardBody-likeBox">
                        <span class="material-symbols-outlined" id="like">thumb_up</span>
                        <span>${tourismApiData.likeTourspotList[i].likeNo}</span>
                    </div>
                </div>
                <div class="likeList-cardBody-container">
                    <span>${tourismApiData.likeTourspotList[i].tourspotSumm}</span>
                    <span><strong>주소 </strong> : ${tourismApiData.likeTourspotList[i].tourspotAddr}</span>
                    <span><strong>전화번호 </strong> : ${tourismApiData.likeTourspotList[i].refadNo}</span>
                    <span><strong>이용시간 </strong> : ${tourismApiData.likeTourspotList[i].mngTime}</span>
                    <span><strong>홈페이지 </strong> : <a href="${tourismApiData.likeTourspotList[i].urlAddr}">${tourismApiData.likeTourspotList[i].urlAddr}</a></span>
                </div>
            </div>
        </div>
        `
    } 
    async function tourismApi() {
        const tourismApiUrl = await fetch('http://localhost:5300/like')
        tourismApiData = await tourismApiUrl.json()
        // console.log(tourismApiData.likeTourspotList)
        console.log(tourismApiData.uuid)
        localStorage.setItem('test',JSON.stringify(tourismApiData.uuid))
        sessionStorage.setItem('test',JSON.stringify(tourismApiData.uuid))
        const likeListBox = document.querySelectorAll('.likeList-box')
        for(let i=0; i<4; i++) {
            likeListBox[i].innerHTML += listCardTool(i)
        }
        const testItem = localStorage.getItem('test')
        console.log(testItem)
        const sessionItem = sessionStorage.getItem('test')
        console.log(sessionItem)
        const likeBtn = document.querySelectorAll('.likeList-cardBody-likeBox>span:nth-child(1)')
        likeBtn.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.target.classList.toggle('on')
                const title = e.target.nextElementSibling
                const titleNoPlus = parseInt(title.innerText) + 1
                const titleNoMinus = parseInt(title.innerText) - 1
                const Url = 'http://127.0.0.1:5300/like'
                const tourspotNm = title.parentElement.previousElementSibling.innerText
                const cookie = document.cookie.split('=')[1]
                const onOff = e.target.className.slice(-2)
                console.log(cookie)
                try {
                    if(onOff === 'on') {
                        title.innerText = `${titleNoPlus}`
                    } else {
                        title.innerText = `${titleNoMinus}`
                    }
                    const titleNo = parseInt(title.innerText)
                    axios({
                        method: 'post' ,
                        url: Url ,
                        data: {
                            tourspotNm : tourspotNm,
                            likeNo : titleNo ,
                            cookie : cookie
                        } ,
                        withCredentials: true,
                    })
                    } catch(err) {
                        console.log(err)
                    }
                })
            })
        // window.addEventListener('unload', async (e) => {
        //     const cookie = document.cookie.split('=')[1]
        //     console.log(cookie)
        //     if(cookie !== '') {
        //         console.log('test')
        //     } else {
        //        e.preventDefault()
        //     }
        // })
    }  
    tourismApi()
}