;(function(){
    "use strict";

    document.getElementById('btnSearch').addEventListener('click', (e) => {
        e.preventDefault();
        
        let inpArtist = document.getElementById("inpArtist").value;
        fetch('http://www.songsterr.com/a/ra/songs/byartists.json?artists="' + inpArtist + '"')
        .then(function(resp) {
            console.log('response status: ', resp.status);
            return resp.json();
        })

        .then(function (data) {
            console.log('data received: ', data);

            let songs = document.getElementById("songs");
		    for(let i = 0; i < data.length; i++) {
		    	let tr = document.createElement('tr');
		    	tr.innerHTML = '<td>' + data[i].title + '</td>' + '<td>' + data[i].tabTypes + '</td>';
                songs.appendChild(tr);
            } 
            let hidden = document.querySelector('.hidden');
            hidden.style.opacity = 1;
        })

        .catch(function(err) {
            console.log('request failed: ', err)
        })

        
    });
})(); 

/* code docent
;(function(){
    "use strict";

    window.addEventListener('load', function () {
        let opties = {};
        let antwoord = '';
        let i;
        let len;
        let inpArtist = document.getElementById('inpArtist'.value);
        let elTooltip = document.getElementById('tooltip');
        let tBody = document.querySelector('#songs tbody');

        opties.method = 'GET';
        opties.cache = 'no-cache';
        opties.headers = {'Accept': 'application/json'};

        function verwerkArtiestenJSON(response) {
            antwoord = '';
            if(response.length === 0) {
                document.querySelector('#songs thead').classList.add('hidden');
                antwoord = '<tr><td colspan="2">Geen resultaten</td></tr>';
                tBody.innerHTML = antwoord;
                return;
            }

            for(i = 0, len = response.length; i < len; i += 1) {
                antwoord += `<tr><td data-artist="${response[i].artist.name}" data-song="${response[i].id}">${response[i].title}</td>`;
                if(response[i].tabTypes){
                    antwoord += `<td><a href="http://www.songsterr.com/a/wa/song?id=${response[i].id}" target="tabs">`;
                    response[i].tabTypes.forEach(function(tabType) {
                        antwoord += ' ' + tabType;
                        
                    });
                    antwoord += '</a></td>';
                } else {
                    antwoord += '<td></td>';
                }
                antwoord += '</tr>';
            }

            document.querySelector('#songs thead').classList.remove('hidden');        

            tBody.innerHTML = antwoord;
        }

        function zoekArtiest() {
            document.querySelector('#songs thead').classList.add('hidden');        
            tBody.innerHTML = `<tr><td colspan="2"> <img src="img/ajax-loader-3.gif"></td></tr>`;

          
            fetch(`https://www.songsterr.com/a/ra/songs/byartists.json?artists="${inpArtist}"`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    verwerkArtiestenJSON(data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function toonArtiest(e) {
            let text;
            if(e.target.getAttribute('data-artist') === null) {
                text = 'Bekijk Partituur';
            } else {
                text = `Door "${e.target.getAttribute('data-artist')}"`;
            }
            elTooltip.innerHTML - text;
            elTooltip.style.top = scrollY + e.clientY - 20 + 'px';
            elTooltip.style.left = e.clientX - (elTooltip.clientWidth / 2 ) + 'px';
            elTooltip.classList.remove('hidden');
        }

        function verbergHelp() {
            elTooltip.classList.add('hidden');
        }

        document.getElementById('btnSearch').addEventListener('click', zoekArtiest);
        tBody.addEventListener('mousemove', toonArtiest);
        tBody.addEventListener('mousleave', verbergHelp);
    });

})();  */