function searchGoogle() {
  const element = document.getElementById('searchInput');
  const query = element.value.trim();
  if (query) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    element.value= ""

  }
}

document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchGoogle();
  }
});

let tiles = JSON.parse(localStorage.getItem("tiles")) || [
]
function addQuickAccess() {
    const modal = document.getElementById('addTileModal');
    modal.classList.add('active');
}

function closeTileModal() {
    const modal = document.getElementById('addTileModal');
    modal.classList.remove('active');
    document.getElementById('tileName').value = '';
    document.getElementById('tileUrl').value = '';
}

function saveTile() {
    const name = document.getElementById('tileName').value.trim();
    let url = document.getElementById('tileUrl').value.trim();
      if (!name || !url) {
        alert('لطفا نام و آدرس وبسایت را وارد کنید.');
        return;
    }
  
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    let domain;
    try {
        domain = new URL(url).hostname;
    } catch (error) {
        alert('آدرس وبسایت نامعتبر است.');
    return;
  }
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

    if (name && url) {
        const newTile = {
            id: Date.now(),
            name: name,
            url: url,
            icon: faviconUrl,
            iconType: 'image'
        };

        tiles.push(newTile);
        localStorage.setItem("tiles", JSON.stringify(tiles));
        renderQuickAccess();
        closeTileModal();
    } else {
        alert('لطفا نام و آدرس وبسایت را وارد کنید.');
    }
}

function renderQuickAccess() {
    const container = document.querySelector('.tiles');
    if (!container) return;
    container.innerHTML = '';
    
    tiles.forEach(tile => {
      const tileElement = document.createElement('div');
      tileElement.className = 'tile';

      let iconHTML;
      if (tile.iconType === 'image' || tile.icon.startsWith('http')) {
        iconHTML = `<img src="${tile.icon}" alt="${tile.name}" class="tile-icon-img">`;
      } else {
        iconHTML = `<span class="tile-icon">${tile.icon}</span>`;
      }

      tileElement.innerHTML = `
        <a href="${tile.url}" target="_blank" title="${tile.name}">
          ${iconHTML}
        </a>
        <button class="remove-tile-button" onclick="removeTile(${tile.id})">
          <i class="fas fa-times"></i>
        </button>
      `;
      container.append(tileElement);
    });
    const addTileElement = document.createElement('div');
    addTileElement.className = 'tile add-tile';
    addTileElement.innerHTML = `
        <button class="quick-access-button" id="addTileButton">
            <i class="fas fa-plus"></i>
        </button>
    `;
    const addBtn = addTileElement.querySelector('#addTileButton') || addTileElement.querySelector('.quick-access-button');
    if (addBtn) addBtn.addEventListener('click', addQuickAccess);
    container.append(addTileElement);
}
renderQuickAccess();

window.addEventListener('click', function(e) {
    const modal = document.getElementById('addTileModal');
    if (e.target === modal) {
        closeTileModal();
    }
});

function removeTile(id){
    tiles = tiles.filter(tile => tile.id !== id);
    localStorage.setItem("tiles", JSON.stringify(tiles));
    renderQuickAccess();
}

function goToToday(){
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar();
}