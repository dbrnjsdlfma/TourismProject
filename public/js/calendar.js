      // calendar element 취득
      const calendarEl = document.getElementById('calendar')
      // full-calendar 생성하기
      var calendar = new FullCalendar.Calendar(calendarEl, {
        width:'100%',
        height: '600px', // calendar 높이 설정
        expandRows: true, // 화면에 맞게 높이 재설정
        slotMinTime: '08:00', // Day 캘린더에서 시작 시간
        slotMaxTime: '20:00', // Day 캘린더에서 종료 시간
        // 해더에 표시할 툴바
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
        initialDate: '2021-07-15', // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
        navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
        editable: true, // 수정 가능?
        selectable: true, // 달력 일자 드래그 설정가능
        nowIndicator: true, // 현재 시간 마크
        dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
        locale: 'ko', // 한국어 설정
        // 이벤트 
        events: [
          {
            title: 'All Day Event',
            start: '2023-08-01',
          },
          {
            title: 'Long Event',
            start: '2023-08-07',
            end: '2023-08-10'
          },
          {
            title: '대전 누들대전 페스티벌',
            start: '2023-08-11',
            end: '2023-08-13'
          },
          {
            title: '대전 0시 축제',
            start: '2023-08-11',
            end: '2023-08-17'
          },
          {
            title: '로하스 캠핑 축제',
            start: '2023-08-18T07:00:00',
            end: '2023-08-23T22:00:00'
          },
          {
            title: '성심당 빵 세일',
            start: '2023-08-20T12:00:00',
            end: '2023-08-21T22:00:00'
          }
        ],
      });
      // 캘린더 랜더링
    calendar.render()