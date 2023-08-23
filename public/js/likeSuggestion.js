document.write("<script src='https://unpkg.com/axios/dist/axios.min.js'><"+"/script>")
window.onload = function(){
    let tourismApiData
    let offset = 0
    function listCardTool(i) {
        return `
        <div class="likeList-card">
            <div class="likeList-cardImage">
                <a onclick="localStorage.setItem('card-info', JSON.stringify('${tourismApiData[i].tourspotNm}'));location.href ='http://127.0.0.1:5500/public/html/info.html'">
                    <img src="${tourismApiData[i].imgUrl}" alt="">
                </a>
            </div>
            <div class="likeList-cardBody">
                <div class="likeList-cardBody-like">
                    <h2>${tourismApiData[i].tourspotNm}</h2>
                    <div class="likeList-cardBody-likeBox">
                        <span class="material-symbols-outlined" id="like">thumb_up</span>
                        <span>${tourismApiData[i].likeNo}</span>
                    </div>
                </div>
                <div class="likeList-cardBody-container">
                    <span>${tourismApiData[i].tourspotSumm}</span>
                    <span><strong>주소 </strong> : ${tourismApiData[i].tourspotAddr}</span>
                    <span><strong>전화번호 </strong> : ${tourismApiData[i].refadNo}</span>
                    <span><strong>이용시간 </strong> : ${tourismApiData[i].mngTime}</span>
                    <span><strong>홈페이지 </strong> : <a href="${tourismApiData[i].urlAddr}">${tourismApiData[i].urlAddr}</a></span>
                </div>
            </div>
        </div>
        `
    }
    async function tourismApi() {
        const tourismApiUrl = await fetch('http://localhost:5300/like')
        tourismApiData = await tourismApiUrl.json()
        const likeListBox = document.querySelectorAll('.likeList-box')
        for(let i=0; i<4; i++) {
            likeListBox[i].innerHTML += listCardTool(i)
        }
        const likeBtn = document.querySelectorAll('.likeList-cardBody-likeBox>span:nth-child(1)')
        likeBtn.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.target.classList.toggle('on')
                const title = e.target.nextElementSibling
                const titleNoPlus = parseInt(title.innerText) + 1
                const titleNoMinus = parseInt(title.innerText) - 1
                const Url = 'http://127.0.0.1:5300/like'
                try {
                    if(offset === 0) {
                        title.innerText = `${titleNoPlus}`
                        offset = 1
                    } else {
                        title.innerText = `${titleNoMinus}`
                        offset = 0
                    }
                    const key = title.parentElement.previousElementSibling.innerText
                    const titleNo = parseInt(title.innerText)
                    axios({
                        method: 'post' ,
                        url: Url ,
                        data: {
                            tourspotNm : key,
                            likeNo : titleNo
                        } ,
                    })
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
                } catch(err) {
                    console.log(err)
                }

            })
        })
    }  
    tourismApi()

}