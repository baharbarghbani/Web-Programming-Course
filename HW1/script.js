let notes = JSON.parse(localStorage.getItem("notes")) || [];
displayNotes();


function displayNotes(){
  const list = document.getElementById("notesList");
  list.innerHTML = "";
  const template = document.getElementById("noteTemplate");

  notes.forEach(note => {
    // Make a full copy of the template HTML, including all elements inside it.
    const newNote = template.content.cloneNode(true);

    const noteElement = newNote.querySelector(".note");
    noteElement.id = note.id;

    newNote.querySelector(".note-title").textContent = note.title;
    newNote.querySelector(".note-content").textContent = note.content;

    newNote.querySelector(".edit-note").addEventListener("click", () => editNote(note.id));
    newNote.querySelector(".delete-note").addEventListener("click", () => deleteNote(note.id));

    list.append(newNote);
  });
}

function saveNotes(){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function removeInputField(){
  const titleElement = document.getElementById("noteTitle");
  const contentElement = document.getElementById("noteContent");
  titleElement.value = "";
  contentElement.value = "";
}

function addNote(){
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    if (!title || !content){
        alert("لطفا عنوان و توضیحات یادداشت را وارد کنید.");
        return;
    }

    const note = {
        id: Date.now(),
        title: title,
        content: content
    }

    notes.push(note);
    saveNotes();
    displayNotes();
    removeInputField();
}

function editNote(id){
  const note = document.getElementById(id);
  if (!note) return;
  note.remove();
}

function deleteNote(id){
  const note = document.getElementById(id);
  if (!note) return;
  note.remove();
  for (let i = 0; i < notes.length; i++){
    if (notes[i].id === id){
      notes.splice(i, 1);
      break;
    }
  }
  saveNotes();
}

// function searchGoogle() {
//   const query = document.getElementById('searchInput').value.trim();
//   if (query) {
//     window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
//   }
// }

// document.getElementById('searchInput').addEventListener('keypress', function(e) {
//   if (e.key === 'Enter') {
//     searchGoogle();
//   }
// });