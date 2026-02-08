const API = "/api/notes";

// Elements
const notesDiv = document.getElementById("notes");
const form = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

const searchInput = document.getElementById("search");
const darkToggle = document.getElementById("darkToggle");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const saveEdit = document.getElementById("saveEdit");
const deleteBtn = document.getElementById("deleteNote");
const closeModal = document.getElementById("closeModal");

// State
let notes = [];
let currentEditId = null;
let autosaveTimer = null;
let pinned = JSON.parse(localStorage.getItem("pinnedNotes")) || [];

// Dark mode toggle
darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
  darkToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
};

// Load notes
async function loadNotes() {
  const res = await fetch(API);
  notes = await res.json();

  notes.sort((a, b) => {
    const aPinned = pinned.includes(a._id);
    const bPinned = pinned.includes(b._id);
    return bPinned - aPinned;
  });

  renderNotes(notes);
}

// Render notes
function renderNotes(list) {
  notesDiv.innerHTML = "";

  list.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    if (pinned.includes(note._id)) div.classList.add("pinned");

    div.innerHTML = `
      <span class="pin">${pinned.includes(note._id) ? "📌" : "📍"}</span>
      <h3>${note.title}</h3>
    `;

    div.querySelector(".pin").onclick = e => {
      e.stopPropagation();
      togglePin(note._id);
    };

    div.onclick = () => openModal(note);
    notesDiv.appendChild(div);
  });
}

// Search
searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(q)
  );
  renderNotes(filtered);
};

// Create note
form.onsubmit = async e => {
  e.preventDefault();

  if (!titleInput.value || !contentInput.value) return;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titleInput.value,
      content: contentInput.value
    })
  });

  form.reset();
  loadNotes();
};

// Open modal
function openModal(note) {
  currentEditId = note._id;
  modalTitle.value = note.title;
  modalContent.value = note.content;

  modal.classList.add("show");
  document.body.classList.add("modal-open");
}

// Autosave
modalTitle.oninput = modalContent.oninput = () => {
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(saveCurrentNote, 800);
};

async function saveCurrentNote() {
  if (!currentEditId) return;

  await fetch(`${API}/${currentEditId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: modalTitle.value,
      content: modalContent.value
    })
  });

  loadNotes();
}

// Manual save
saveEdit.onclick = saveCurrentNote;

// Delete
deleteBtn.onclick = async () => {
  if (!currentEditId) return;

  await fetch(`${API}/${currentEditId}`, {
    method: "DELETE"
  });

  closeEditor();
  loadNotes();
};

// Pin toggle
function togglePin(id) {
  if (pinned.includes(id)) {
    pinned = pinned.filter(p => p !== id);
  } else {
    pinned.push(id);
  }

  localStorage.setItem("pinnedNotes", JSON.stringify(pinned));
  loadNotes();
}

// Close modal helpers
function closeEditor() {
  modal.classList.remove("show");
  document.body.classList.remove("modal-open");
  currentEditId = null;
}

closeModal.onclick = closeEditor;

// Click outside modal
modal.addEventListener("click", e => {
  if (e.target === modal) closeEditor();
});

// ESC key
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    closeEditor();
  }
});

// Init
loadNotes();
