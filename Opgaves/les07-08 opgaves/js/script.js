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