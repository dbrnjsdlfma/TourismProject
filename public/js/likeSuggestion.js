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
                        <span class="material-symbols-outlined" id="like-${i}">thumb_up</span>
                        <span>${tourismApiData.likeTourspotList[i].likeNo}</span>
                    </div>
                </div>
                <div class="likeList-cardBody-container">
                    <span>${tourismApiData.likeTourspotList[i].tourspotSumm}</span>
                    <div class="likeList-cardBody-box">
                        <span><strong>주소 </strong> : ${tourismApiData.likeTourspotList[i].tourspotAddr}</span>
                        <span><strong>이용시간 </strong> : ${tourismApiData.likeTourspotList[i].mngTime}</span>
                    </div>
                    <span><strong>전화번호 </strong> : ${tourismApiData.likeTourspotList[i].refadNo}</span>
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
        const likeListBox = document.querySelectorAll('.likeList-box')
        const localGetItem = localStorage.getItem('localtest')
        // console.log(localGetItem)
        const sessionGetItem = sessionStorage.getItem('sessiontest')
        // console.log(sessionGetItem)
        for(let i=0; i<4; i++) {
            likeListBox[i].innerHTML += listCardTool(i)
            for(let j=0; j<tourismApiData.likeTourspotList[i].likePeple.length; j++) {
                if(tourismApiData.likeTourspotList[i].likePeple[j] === localGetItem) {
                    const likeBtn = document.getElementById(`like-${i}`)
                    likeBtn.classList.add('on')
                    console.log(likeBtn)
                }
            }
        }
        // console.log(tourismApiData.likeTourspotList[0].likePeple[0])
        // localStorage.clear()
        // sessionStorage.clear()
        if(localGetItem === null || sessionGetItem === null) {
            localStorage.setItem('localtest',JSON.stringify(tourismApiData.uuid))
            sessionStorage.setItem('sessiontest',JSON.stringify(tourismApiData.uuid))
            // const localtest = localStorage.getItem('localtest')
            // console.log(localtest)
            // const sessiontest = sessionStorage.getItem('sessiontest') 
            // console.log(sessiontest)
        } else {
            // const localtest = localStorage.getItem('localtest')
            // console.log(localtest)
            // const sessiontest = sessionStorage.getItem('sessiontest') 
            // console.log(sessiontest)
        }
        const localtest = localStorage.getItem('localtest')
        const cookie = document.cookie.split('=')[1]
        const likeBtnAll = document.querySelectorAll('.likeList-cardBody-likeBox>span:nth-child(1)')
        likeBtnAll.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.target.classList.toggle('on')
                const title = e.target.nextElementSibling
                const titleNoPlus = parseInt(title.innerText) + 1
                const titleNoMinus = parseInt(title.innerText) - 1
                const Url = 'http://127.0.0.1:5300/like'
                const tourspotNm = title.parentElement.previousElementSibling.innerText
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
                            uuid : localtest ,
                        } ,
                        withCredentials: true,
                    })
                } catch(err) {
                    console.log(err)
                }
            })
        })
    }  
    tourismApi()
    const scrollUp = document.querySelector('.scroll-up')
    scrollUp.addEventListener('click' , (e) => {
      window.scrollTo({top : 0 , behavior: 'smooth'})
    })
}