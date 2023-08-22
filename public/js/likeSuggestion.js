

window.onload = function(){
    let tourismApiData

    function searchSort(a, b) {
        if(a > b) return 1
        if(a < b) return -1
        return 0
     }

    async function tourismApi() {
        const tourismApiUrl = await fetch('http://localhost:5300')
        tourismApiData = await tourismApiUrl.json()
        console.log(tourismApiData)
        const array = []
        for(let i=0; i<tourismApiData.length; i++) {
            const likeData = tourismApiData[i].likeNo
            array.push(likeData)
        }
        console.log(array)
        const sortLikeData = array.sort(searchSort)
        console.log(sortLikeData)
    }  
    tourismApi()
}