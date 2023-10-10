import tracks from "./tracks.js";

function featuredMusics(tracks) {
    const categories = {};

    // Group tracks by category
    tracks.forEach(track => {
        if (!categories[track.category]) {
            categories[track.category] = [];
        }
        categories[track.category].push(track);
    });

    const list = document.querySelector('.tracks-list');

    // Iterate over categories and display tracks
    for (const category in categories) {
        const categorySection = document.createElement('section');
        categorySection.classList.add('featured', 'music');

        const categoryTitle = document.createElement('h2');
        categoryTitle.classList.add('featured-title', 'music-title');
        // categoryTitle.classList.add(`${category}`);
        categoryTitle.setAttribute('id', `${category}`);
        categoryTitle.textContent = `${category} Tracks`;

        const categoryText = document.createElement('div');
        categoryText.classList.add('feat-text-box', 'music-text-box');

        const categoryTopic = document.createElement('h2');
        categoryTopic.classList.add('featured-topic');
        categoryTopic.textContent = category;
        const line = document.createElement('div');
        line.classList.add('line');

        categoryText.appendChild(categoryTopic);
        categoryText.appendChild(line);

        const categoryTrackList = document.createElement('div');
        categoryTrackList.classList.add('tracks-list');

        categories[category].forEach(track => {
            const caixa = document.createElement('div');
            caixa.classList.add('track-box');

            const musicBox = document.createElement('div');
            musicBox.classList.add("music-box");

            const imagem = document.createElement('img');
            imagem.classList.add("track-album-cover");
            imagem.src = track.albumCover;
            imagem.alt = track.imgText;

            // Div para play e stop
            const behaviorBox = document.createElement('div');
            behaviorBox.classList.add('behav-box');

            // Play
            const play = document.createElement('div');
            play.classList.add('play-btn');
            play.innerHTML = '<span class="material-symbols-rounded play-arrow">play_arrow</span>';

            // Stop
            const stop = document.createElement('div');
            stop.classList.add('stop-btn');
            stop.innerHTML = '<span class="material-symbols-rounded stop-btn">stop</span>'

            const wave = document.createElement('img');
            wave.classList.add('waveform');
            wave.src = "../Assets/Images/wave-black.png";

            const plus_btns = document.createElement('div');
            plus_btns.classList.add('plus-btns');

            const ytLink = document.createElement('a');
            ytLink.classList.add('plus-link');
            ytLink.href = track.youtubeLink;
            const ytBtn = document.createElement('span');
            ytBtn.classList.add('material-symbols-rounded');
            ytBtn.classList.add('yt');
            ytBtn.innerText = 'youtube_activity';
            ytLink.appendChild(ytBtn);

            const abtLink = document.createElement('a');
            abtLink.classList.add('plus-link');
            const abtBtn = document.createElement('span');
            abtBtn.classList.add('material-symbols-rounded');
            abtBtn.classList.add('abt');
            abtBtn.innerText = 'read_more';
            abtLink.appendChild(abtBtn);

            const dwnLink = document.createElement('a');
            dwnLink.classList.add('plus-link');
            const dwnBtn = document.createElement('span');
            dwnBtn.classList.add('material-symbols-rounded');
            dwnBtn.classList.add('dwn');
            dwnBtn.innerText = 'downloading';
            dwnLink.appendChild(dwnBtn);

            const titulo = document.createElement('h3');
            titulo.classList.add("track-title");
            titulo.textContent = track.trackTitle;

            const autor = document.createElement('p');
            autor.classList.add("track-autor");
            autor.textContent = `by ${track.trackAuthor}`;

            caixa.appendChild(musicBox);
            musicBox.appendChild(imagem);
            // musicBox.appendChild(play);
            // musicBox.appendChild(stop);
            behaviorBox.appendChild(play);
            behaviorBox.appendChild(stop);
            musicBox.appendChild(behaviorBox);
            musicBox.appendChild(wave);
            musicBox.appendChild(plus_btns);
            plus_btns.appendChild(ytLink);
            plus_btns.appendChild(abtLink);
            plus_btns.appendChild(dwnLink);
            musicBox.appendChild(plus_btns);
            caixa.appendChild(titulo);
            caixa.appendChild(autor);

            categoryTrackList.appendChild(caixa);
            
            // Realizando a funcionalidade de tocar o audio
        const playBtn = caixa.querySelector('.play-btn');
        const playIcon = playBtn.querySelector('.play-arrow');
        const audio = new Audio(track.trackAudio);

        let isPlaying = false;
        let resumeTime = 0;

        playBtn.addEventListener('click', () => {
            if (!isPlaying) {
                audio.load();
                audio.currentTime = resumeTime;
                audio.play();
                isPlaying = true;
                playIcon.innerText = 'pause';

                audio.addEventListener('ended', () => {
                    playIcon.innerText = 'play_arrow';
                    isPlaying = false;
                    resumeTime = 0;
                });
            } else {
                audio.pause();
                isPlaying = false;
                playIcon.innerText = 'play_arrow';
                resumeTime = audio.currentTime;
            }
        });

        const stopBtn = caixa.querySelector('.stop-btn');
        stopBtn.addEventListener('click', () => {
            audio.pause();
            audio.currentTime = 0;  // Reset the audio playback to the beginning
            isPlaying = false;
            playIcon.innerText = 'play_arrow';
            resumeTime = 0;  // Reset the resume time
        });

    }); 

        categorySection.appendChild(categoryTitle);
        categorySection.appendChild(categoryText);
        categorySection.appendChild(categoryTrackList);

        list.appendChild(categorySection);
    } // Closing curly brace for the for loop

} // Closing curly brace for the function

featuredMusics(tracks);