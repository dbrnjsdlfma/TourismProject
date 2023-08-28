window.onload = function() {
    async function announcementApi() {
        const announcementTitle = JSON.parse(localStorage.getItem('announcement-info'))
        // console.log(announcementNo)
        const announcementInfoUrl = await fetch(`http://127.0.0.1:5300/announcement/${announcementTitle}`)
        const announcementInfoData = await announcementInfoUrl.json()
        console.log(announcementInfoData)
    }
    announcementApi()
}