let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function prevMonth() {  
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

// Helper function to check if a date has notes
function hasNotesOnDate(year, month, day) {
    if (typeof notes === 'undefined') return false;
    
    return notes.some(note => {
        if (!note.date) return false;
        
        const noteDate = new Date(note.date);
        return noteDate.getFullYear() === year &&
               noteDate.getMonth() === month &&
               noteDate.getDate() === day;
    });
}

function renderCalendar() {
    const grid = document.getElementById("calendarGrid");
    const title = document.getElementById('calendarTitle');
    
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
        
        if (hasNotesOnDate(year, month, day)) {
            dayCell.classList.add('has-notes');
        }
        
        dayCell.addEventListener("click", () => {
            showEvents(year, month, day);
        });
        
        grid.append(dayCell);
    }

}
function showEvents(year, month, day) {
    const notesForDate = notes.filter(note => {
        if (!note.date) return false;
        const noteDate = new Date(note.date);
        return noteDate.getFullYear() === year &&
               noteDate.getMonth() === month &&
               noteDate.getDate() === day;
    });
    const section = document.getElementById('dateTaskSection');
    section.classList.add("active");
    console.log("classList", section.classList);
    const eventListDiv = document.getElementById('eventList');
    eventListDiv.innerHTML = '';
    if (notesForDate.length === 0){
        eventListDiv.innerHTML = '<p class="no-notes">هیچ یادداشتی وجود ندارد.</p>';
    } else {
        notesForDate.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note-item';
            noteDiv.innerHTML = `<strong>${note.title}</strong> ${note.content}`;
            eventListDiv.append(noteDiv);
        });
    }

}

document.addEventListener('DOMContentLoaded', function() {
    renderCalendar();
});