
const games = [];

document.getElementById('game-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const gameName = document.getElementById('game-name').value;
    const gameFeatures = document.getElementById('game-features').value;
    const gameLink = document.getElementById('game-link').value;
    const updateLink = document.getElementById('update-link').value;
    const dlcLink = document.getElementById('dlc-link').value;
    const imageUpload = document.getElementById('image-upload').files[0];

    const reader = new FileReader();
    reader.onloadend = function() {
        const game = {
            name: gameName,
            features: gameFeatures,
            link: gameLink,
            update: updateLink,
            dlc: dlcLink,
            image: reader.result
        };
        games.push(game);
        displayGames();
    };

    if (imageUpload) {
        reader.readAsDataURL(imageUpload);
    }

    this.reset(); // لإعادة تعيين النموذج
});

function displayGames() {
    const gamesList = document.getElementById('games-list');
    gamesList.innerHTML = '';

    games.forEach((game, index) => {
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        gameItem.innerHTML = `
            <h3>${game.name}</h3>
            <img src="${game.image}" alt="${game.name}" width="100">
            <p>${game.features}</p>
            <p><a href="${game.link}" target="_blank">رابط اللعبة</a></p>
            <p><a href="${game.update}" target="_blank">رابط التحديث</a></p>
            <p><a href="${game.dlc}" target="_blank">رابط الإضافات</a></p>
            <button onclick="removeGame(${index})">إزالة اللعبة</button>
            <hr>
        `;
        gamesList.appendChild(gameItem);
    });
}

function removeGame(index) {
    games.splice(index, 1);
    displayGames();
}

function searchGames() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredGames = games.filter(game => game.name.toLowerCase().includes(searchQuery));
    
    const gamesList = document.getElementById('games-list');
    gamesList.innerHTML = '';

    filteredGames.forEach((game, index) => {
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        gameItem.innerHTML = `
            <h3>${game.name}</h3>
            <img src="${game.image}" alt="${game.name}" width="100">
            <p>${game.features}</p>
            <p><a href="${game.link}" target="_blank">رابط اللعبة</a></p>
            <button onclick="removeGame(${index})">إزالة اللعبة</button>
            <hr>
        `;
        gamesList.appendChild(gameItem);
    });
}
