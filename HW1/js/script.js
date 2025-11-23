let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editingNote = null;
let selectedNoteDate = null;
displayNotes();

// const noteTitle = document.getElementById("noteTitle");
// const noteContent = document.getElementById("noteContent");
// const calendarButton = document.getElementById("calendarButton");

// function showCalendarButton() {
//   console.log("in show");
//   calendarButton.classList.add("active");
// }

// noteTitle.addEventListener("focus", showCalendarButton);
// noteContent.addEventListener("focus", showCalendarButton);

// noteTitle.addEventListener("input", showCalendarButton);
// noteContent.addEventListener("input", showCalendarButton);

// noteTitle.addEventListener("blur", checkIfShouldHideButton);
// noteContent.addEventListener("blur", checkIfShouldHideButton);

function displayNotes(){
  const list = document.getElementById("notesList");
  list.innerHTML = "";
  const template = document.getElementById("noteTemplate");

  notes.forEach(note => {
    // Make a full copy of the template HTML, including all elements inside it.
    const newNote = template.content.cloneNode(true);

    const noteElement = newNote.querySelector(".note");

    noteElement.querySelector(".note-title").textContent = note.title;
    noteElement.querySelector(".note-content").textContent = note.content;

    noteElement.querySelector(".edit-note").addEventListener("click", () => editNote(note));
    noteElement.querySelector(".delete-note").addEventListener("click", () => deleteNote(note));

    list.append(noteElement);
  });
}

function saveNotes(){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function removeInputField() {
  noteTitle.value = "";
  noteContent.value = "";
  window.selectedNoteDate = null;
  resetDateButton();
}

function resetDateButton() {
  const dateButton = document.querySelector('.add-note-date');
  if (dateButton) {
    dateButton.innerHTML = '<i class="fa fa-calendar"></i>';
    dateButton.style.background = '';
  }
}

function addNote(){
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    if (!title || !content){
        alert("لطفا عنوان و توضیحات یادداشت را وارد کنید.");
        return;
    }

    if (editingNote !== null){
      const noteIndex = notes.findIndex(n => n.id === editingNote);
      if (noteIndex !== -1) {
        notes[noteIndex].title = title;
        notes[noteIndex].content = content;
        notes[noteIndex].date = window.selectedNoteDate || null;
      }
      editingNote = null; 
    }
    else{
      const note = {
          id: Date.now(),
          title: title,
          content: content,
          date: window.selectedNoteDate || null,
          createdAt: new Date().toISOString()

      }
      notes.push(note);
    }
    saveNotes();
    displayNotes();
    removeInputField();
    if (typeof renderCalendar === 'function') {
        renderCalendar();
    }
}

function editNote(note){
  const titleElement = document.getElementById("noteTitle");
  const contentElement = document.getElementById("noteContent");

  titleElement.value = note.title;
  contentElement.value = note.content;

  editingNote = note.id;

  titleElement.focus();
  titleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

}

function deleteNote(note){
  removeFromArray(note);
  saveNotes();
  displayNotes();
  if (typeof renderCalendar === 'function') {
      renderCalendar();
  }
}

function removeFromArray(note){
  for (let i = 0; i < notes.length; i++){
    if (notes[i].id === note.id){
      notes.splice(i, 1);
      break;
    }
  }
}



