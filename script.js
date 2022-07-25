const addButton = document.querySelector("#add");

// Storing the data at local Storage

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  console.log(textAreaData);

  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  console.log(notes);

  localStorage.setItem('notes', JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea> `;

  note.insertAdjacentHTML("afterbegin", htmlData);

  // Getting the refrences
  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // Deleting a Note
  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  // Toggle between mainDiv and textArea\
  textArea.value = text;
  mainDiv.innerHTML = text;

  // Editing a Note or Toggling the edit button
  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;
    // console.log(value);

    updateLSData();
  });

  document.body.appendChild(note);
};

// Fetching data from local Storage

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addButton.addEventListener("click", () => {
  addNewNote();
});
