import tracks from "./popularTracks.js";

function featuredMusics(tracks) {

    const list = document.querySelector('.tracks-list'); // Selecionado classe que engloba todas as musicas

    for (let i = 0; i < 5; i++) {
        
        // Criação das musicas disponibilizadas em featured tracks.

        // Criar Imagem
        const imagem = document.createElement('img'); // Criando o elemento
        imagem.classList.add("track-album-cover"); // Adicionando classe
        imagem.src = tracks[i].albumCover; // Passando o atributo src
        imagem.alt = tracks[i].imgText; // Passando o atributo alt

        // Criar Botao Play
        const play = document.createElement('div');
        play.classList.add('play-btn');
        play.innerHTML = '<span class="material-symbols-rounded play-arrow">play_arrow</span>'

        // Criar Titulo
        const titulo = document.createElement('h3');
        titulo.classList.add("track-title");
        titulo.textContent = tracks[i].trackTitle;

        // Criar Autor
        const autor = document.createElement('p');
        autor.classList.add("track-autor");
        autor.textContent = `by ${tracks[i].trackAuthor}`;

        // Criar Botão More
        const btn = document.createElement('button');
        btn.classList.add("more-btn");
        btn.innerHTML = 'More<span class="material-symbols-rounded arrow">chevron_right</span>';

        // Criar Caixa
        const caixa = document.createElement('div');
        caixa.classList.add('track-box');

        // Adicionar os atributos criados a caixa
        caixa.appendChild(play);
        caixa.appendChild(imagem);
        caixa.appendChild(titulo);
        caixa.appendChild(autor);
        caixa.appendChild(btn);

        //Adicionar a caixa criada a lista
        list.appendChild(caixa);

        // Realizando a funcionalidade de tocar o audio
        const playBtn = caixa.querySelector('.play-btn');
        const playIcon = playBtn.querySelector('.play-arrow');
        const audio = new Audio(tracks[i].trackAudio);

        playBtn.addEventListener('click', (function (audio, playIcon) {
            let isPlaying = false;
            let resumeTime = 0;

            return function () {
                if (!isPlaying) {
                    audio.load();
                    audio.currentTime = resumeTime;
                    audio.play();
                    isPlaying = true;
                    playIcon.innerText = 'pause';

                    audio.addEventListener('ended', () => {
                        playIcon.innerText = 'play_arrow';
                        isPlaying = false;
                        audio.currentTime = 0;
                    });
                } else {
                    audio.pause();
                    isPlaying = false;
                    playIcon.innerText = 'play_arrow';
                    resumeTime = audio.currentTime;
                }
            };
        })(audio, playIcon));
    }
    
} 

featuredMusics(tracks);