;(function(){
    "use strict";

    document.getElementById('btnSearch').addEventListener('click', (e) => {
        e.preventDefault();
        
        fetch('https://www.songsterr.com/a/ra/songs/byartists.json?artists=bono')
        .then(function(resp) {
            console.log('response status: ', resp.status);
            return resp.json();
        })
        .then(function handleSuccess(data) {
            console.log('data received: ', data);
            alert(data.title);
            
        })
        .catch(function(err) {
            console.log('request failed: ', err)
        });
    });
    
})();