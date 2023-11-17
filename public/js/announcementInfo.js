window.onload = function() {
    function announcementTable(announcementInfoData) {
        return `
        <table>
            <tr>
                <td>제목</td>
                <td>${announcementInfoData.announcementTitle}</td>
            </tr>
            <tr>
                <td>작성자</td>
                <td>${announcementInfoData.announcementPeple}</td>
            </tr>
            <tr>
                <td>작성일</td>
                <td>${announcementInfoData.announcementCreateDate.slice(0, 10)}</td>
                <td>조회수</td>
                <td>${announcementInfoData.announcementCheck}</td>
            </tr>
        </table>
        <div class="container-body">
            <span>${announcementInfoData.announcementContents}</span>
        </div>
        `
    }
    async function announcementApi() {
        const announcementTitle = JSON.parse(localStorage.getItem('announcement-info'))
        // console.log(announcementNo)
        const announcementInfoUrl = await fetch(`http://127.0.0.1:5300/announcement/${announcementTitle}`)
        const announcementInfoData = await announcementInfoUrl.json()
        const containerBox = document.querySelector('.container-box')
        containerBox.innerHTML = announcementTable(announcementInfoData)
        console.log(announcementInfoData)
    }
    announcementApi()
}