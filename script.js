function updateStatus(online) {
    document.getElementById('status').textContent = online ? 'Онлайн' : 'Офлайн-режим';
  }
  
  window.addEventListener('online', () => updateStatus(true));
  window.addEventListener('offline', () => updateStatus(false));
  updateStatus(navigator.onLine);
  
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  let selectedNoteIndex = null;
  
  function renderNotes() {
    const list = document.getElementById('notesList');
    list.innerHTML = '';  // очищаем список перед добавлением новых заметок
    notes.forEach((note, index) => {
      const li = document.createElement('li');
      li.textContent = note || '(пусто)';
      li.onclick = () => selectNote(index);
      if (index === selectedNoteIndex) {
        li.style.backgroundColor = '#d0ebff';
      }
      list.appendChild(li);
    });
  }
  
  function addNote() {
    const input = document.getElementById('noteInput');
    const note = input.value.trim();
    if (note !== '') {
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));  // обновляем localStorage
      input.value = '';  // очищаем поле ввода
      selectedNoteIndex = null;
      renderNotes();  // обновляем список на экране
    }
  }
  
  function selectNote(index) {
    selectedNoteIndex = index;
    renderNotes();  // обновляем список с выделенной заметкой
  }
  
  function deleteSelectedNote() {
    if (selectedNoteIndex !== null) {
      notes.splice(selectedNoteIndex, 1);  // удаляем выбранную заметку
      localStorage.setItem('notes', JSON.stringify(notes));  // обновляем localStorage
      selectedNoteIndex = null;
      renderNotes();  // обновляем список
    } else {
      alert('Выберите заметку для удаления.');
    }
  }
  
  renderNotes();  // вызываем при загрузке страницы, чтобы отобразить существующие заметки
  