async function search() {
    const tourismUrl = await fetch('http://127.0.0.1:5300')
    const tourismData = await tourismUrl.json()
    const searchKeyword = document.querySelector('.keyword')
    // for(let i=0; i<tourismData.length; i++) {
    //   if(tourismData[i].tourspotNm.includes(searchKeyword.value) && searchKeyword.value !== '') {
    //     localStorage.setItem('card-info', JSON.stringify(`${tourismData[i].tourspotNm}`))
    //     return window.location.href = 'http://127.0.0.1:5500/public/html/info.html'
    //   } else if(searchKeyword.value === '' || !tourismData[i].tourspotNm.includes(searchKeyword.value)) {
    //     return alert('다시 검색을 해주세요')
    //   }
    // }
    tourismData.forEach((item) => {
      console.log(item)
      if(item.tourspotNm === searchKeyword.value) {
        localStorage.setItem('card-info', JSON.stringify(`${item.tourspotNm}`))
        return window.location.href = 'http://127.0.0.1:5500/public/html/info.html'
      } 
    })
  }
  
  const searchBtn = document.getElementById('search-btn')
  searchBtn.addEventListener('click', search)
  document.addEventListener('keydown', (event) => {
    if(event.keyCode === 13) {
      search()
    }
  })