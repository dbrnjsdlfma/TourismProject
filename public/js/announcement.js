document.write("<script src='https://unpkg.com/axios/dist/axios.min.js'><"+"/script>")
window.onload = function() {
    // let announcementData
    function announcementTool(announcementData, i) {
        return`
        <tr>
            <td>${announcementData[i].announcementNo}</td>
            <td>${announcementData[i].announcementTitle}</td>
            <td><a onclick="localStorage.setItem('announcement-info', JSON.stringify('${announcementData[i].announcementTitle}'));location.href ='http://127.0.0.1:5500/public/html/announcementInfo.html'">
                ${announcementData[i].announcementContents}
                </a>
            </td>
            <td>${announcementData[i].announcementPeple}</td>
            <td>${announcementData[i].announcementCreateDate.slice(0,10)}</td>
            <td>${announcementData[i].announcementCheck}</td>
        </tr>
        `
    }
    async function announcementApi() {
        const announcementUrl = await fetch('http://127.0.0.1:5300/announcement')
        const announcementData = await announcementUrl.json()
        const announcementBody = document.querySelector('.announcementBody')
        for(let i=0; i<announcementData.length; i++) {
            announcementBody.innerHTML += announcementTool(announcementData, i)
        }
        // const announcementTitleBox = document.querySelectorAll('.check')
        // console.log(announcementTitleBox)
        // let offset = 0
        // announcementTitleBox.forEach((el) => {
        //     el.addEventListener('click', async (e) => {
        //         const announcementTitle = e.target.previousElementSibling.innerText
        //         const announcementInfoUrl = await fetch(`http://127.0.0.1:5300/announcement/${announcementTitle}`)
        //         console.log(announcementTitle)
        //         const number = e.target.parentElement.lastElementChild.innerText
        //         const numPlus = parseInt(number)+1
        //         console.log(e.target.parentElement.lastElementChild)
        //         console.log(numPlus)
        //         axios({
        //             method: 'post' ,
        //             url: announcementInfoUrl ,
        //             data: {
        //                 No : numPlus ,
        //             } ,
        //             withCredentials: true,
        //         })
        //     })
        // })
    }
    announcementApi()
}