let popupMonth = new Date().getMonth();
let popupYear = new Date().getFullYear();

function nextPopupMonth() {
  popupMonth++;
  if (popupMonth > 11) {
    popupMonth = 0;
    popupYear++;
  }
  renderPopupCalendar();
}

function prevPopupMonth() {
  popupMonth--;
  if (popupMonth < 0) {
    popupMonth = 11;
    popupYear--;
  }
  renderPopupCalendar();
}

function addDate() {
  popupMonth = new Date().getMonth();
  popupYear = new Date().getFullYear();
  renderPopupCalendar();
  document.getElementById('calendarModal').classList.add('active');
}

function closeCalendar() {
  document.getElementById('calendarModal').classList.remove('active');
}

function renderPopupCalendar() {
  const grid = document.getElementById("popupCalendarGrid");
  const title = document.getElementById("popupCalendarTitle");
  
  if (!grid || !title) return;
      grid.innerHTML = "";
    
    const month = currentMonth;
    const year = currentYear;

    title.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    dayNames.forEach(name => {
        const dayName = document.createElement("div");
        dayName.textContent = name;
        dayName.className = "day-name";
        grid.append(dayName);
    });

    for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement("div");
        cell.className = 'calendar-day empty';
        grid.append(cell);
    }
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
                if (year === today.getFullYear() && 
            month === today.getMonth() && 
            day === today.getDate()) {
            dayCell.classList.add('today');
        }
        dayCell.addEventListener("click", () => {
          selectDate(year, month, day);
        });
        
        grid.append(dayCell);
    }


}



function selectDate(year, month, day) {
  window.selectedNoteDate = new Date(year, month, day);
  
  closeCalendar();
}

window.addEventListener('click', function(e) {
  const modal = document.getElementById('calendarModal');
  if (e.target === modal) {
    closeCalendar();
  }
});

document.querySelector('.add-note-button').addEventListener('click', addNote);
document.querySelector('.add-note-date').addEventListener('click', addDate);
document.getElementById('saveTileButton').addEventListener('click', saveTile);
// document.querySelector('.closeTileModal').addEventListener('click', closeTileModal);
document.getElementById('prevPopupMonth').addEventListener('click', prevPopupMonth);
document.getElementById('nextPopupMonth').addEventListener('click', nextPopupMonth);
document.getElementById('goTodayButton').addEventListener('click', goToToday);
document.getElementById('prevMonth').addEventListener('click', prevMonth);
document.getElementById('nextMonth').addEventListener('click', nextMonth);
document.querySelector('.search-button').addEventListener('click', searchGoogle);