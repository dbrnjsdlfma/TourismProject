async function search() {
    const tourismUrl = await fetch('http://127.0.0.1:5300')
    const tourismData = await tourismUrl.json()
    const searchKeyword = document.querySelector('.keyword')
    for(let i=0; i<tourismData.length; i++) {
      if(tourismData[i].tourspotNm.includes(searchKeyword.value) && searchKeyword.value !== '') {
        localStorage.setItem('card-info', JSON.stringify(`${tourismData[i].tourspotNm}`))
        window.location.href = 'http://127.0.0.1:5500/public/html/info.html'
      } else if(searchKeyword.value === '') {
        console.log(searchKeyword.value)
        alert('다시 검색을 해주세요')
        stopPropagation()
      }
    }
  }
  
  const searchBtn = document.getElementById('search-btn')
  searchBtn.addEventListener('click', search)
  document.addEventListener('keydown', (event) => {
    if(event.keyCode === 13) {
      search()
    }
  })