(function () {
    "use strict";
    // header variabelen
    let header1 = document.getElementById("header1"); // wordt gebruikt om de header 1 verwijderen/toevoegen
    let header2 = document.getElementById("header2"); // wordt gebruikt om de header 2 verwijderen/toevoegen
    let timerText = document.querySelector("#timer span"); // wordt gebruikt om timer span aan te geven
    let timerFull = document.querySelector("#timer"); // om de compleet text aan te geven

    // buttons variabelen
    let btnStart = document.querySelector(".btnStart"); // variabel voor de button "READY"
    let btnStartIndex = document.querySelector(".btnStartIndex"); //
    let btnTryAgain = document.querySelector(".btnTryAgain"); // variable voor de button "TRY AGAIN"
    let btnNext2 = document.querySelector(".btnNext2"); // variable van button "NEXT2" wordt gebruikt om naar level 2 te gaan
    let btnNext3 = document.querySelector(".btnNext3"); // variable van button "NEXT2" wordt gebruikt om naar level 3 te gaan
    let btnMute = document.getElementById("mute"); // voor btn mute
    let btnMuteImg = document.querySelector("#mute img"); // img van de btn
    let music = document.getElementById("music"); // music bij het start
    let musicWin = document.getElementById("win"); // music bij juiste antwoord
    let musicLose = document.getElementById("lose"); // music bij foute antwoord
    let musicAlarm = document.getElementById("alarm"); // music vanaf laatste 10sec 
 
    
    // login-name variable 
    let inpIn = document.getElementById("inpIn"); // ingegeven loginnaam in index pagina


    // card container variabelen + find-me
    let flipCard = document.querySelectorAll(".flip-card");     // variable van het class "flip-card" wordt gebruikt om hover-effect te verwijderen + functie shuffle
    let cards = document.querySelectorAll(".flip-card-inner");  // wordt gebruikt om een click event te maken wanneer erop gedrukt wordt
    let flipCardBackImg = document.querySelectorAll(".flip-card-back img"); // wordt gebruikt om de img van flip-card-back aan te geven voor een random  van de src + dataset
    let findMe = document.querySelector(".find-me img");        // is de img die u moet vinden, wordt gebruikt om randomly een img met zijn dataset in te vullen (heeft geen dataset in html maar wordt wel gecreerd)
    
    // bool variabelen + leeg variabel
    let cardFlip = false;   // geeft aan of het kaart geflipt is of niet, standaard waarde op false omdat ze allemaal ongeflipt zijn
    let fCard;              // krijgt onderaan nog de waarde van "this" ==> de geselecteerde kaart

    // won or lose-container variabelen
    let wonContainer = document.getElementById("won-container");    // wordt gebruikt om de won-container te verwijderen/toevoegen
    let loseContainer = document.getElementById("lose-container");  // wordt gebruikt om de lose-container te verwijderen/toevoegen
    let level = document.querySelector(".level");                   // wordt gerbruikt om te kijken op welke niveau ik zet en om van niveau te veranderen

    // timer
    let timer;          // timer variable
    let counter = 20;   // aantal sec


    
    // *************************  MIJN FUNCTIES ********************* //
          

    // shuffle functie om een random img en dataset aan find-me aan te geven vanuit de flipCardBackImg (flip-card-back)
    function shuffleFindMeImg(){
        let random = Math.floor(Math.random() * flipCard.length);   // neemt een random cijfer van flipcard 
        findMe.src = flipCardBackImg[random].src;                   //geeft een random img van flipcard aan find me
        findMe.dataset.name = flipCardBackImg[random].getAttribute('data-name'); // geeft de dataset-name mee || .dataset-name werkte niet dus getAttribute gebruikt https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute 
    }

    // shuffle functie om de cards random positie aan te geven
    function shuffleCards(){
        flipCard.forEach(element => {                                       // elke .flip-card-classe aanroepen      
            let random = Math.floor(Math.random() * flipCard.length);       // variable random maken => neemt een random cijfer van flipcard 
            element.style.order = random;                                   // elementen krijgen een random positie
        });
    }

    // functie om het spel opnieuw te laden
    function TryAgain(){
        btnTryAgain.addEventListener("click", function (e) { 
            //location.reload();                    // eerst had ik enkel "location.reload()" gebruikt, maar wanneer men op een andere niveau staan dan moeten we terug naar niveau 1, pagina reloaden is niet genoeg
            window.location = "memory1.html";       // wanneer er op de button "TRY AGAIN" wordt geklikt dan speel het spel zich opnieuw (naar niveau 1)
        });                                         
    }

    function lose(){
        //niet correct
        loseContainer.classList.add("show");       // loseContainer toevoegen (show in css => transform: translateY(0%);)
        header2.classList.remove("show");          // header2 verwijderen (show in css => transform: translateY(0%);)
        music.pause();
        musicLose.play();
        // spel speelt zich opnieuw
        TryAgain();                                // funtie aanroepen en wordt uigevoerd wanneer er op de button "TRY AGAIN" gedrukt wordt
        clearInterval(timer);

    }

    // *************************** INDEX ***************************//
    if(level.classList[1] == "level0"){                     // als de level waarin we zitten is level0...
        btnStartIndex.addEventListener("click", function (e) { 
            e.preventDefault();                             
            localStorage.setItem('naamUser', inpIn.value);  //bewaart naamUser op in localstorage => https://www.w3schools.com/jsref/met_storage_setitem.asp  maakt zelf een variabel
            //naamUser = inpIn.value;                       // local ca garde ta variable meme quand tu ferme googlechrome alors que session non
            window.location = "memory1.html";               // en dat er op de btnStartIndex gedrukt wordt, gaat men naar niveau2 (memory1.html)
        });
    }   

    

    // ****************************  MEMORYS ***************************//

    btnMute.addEventListener("click", function (e) { 
        if(music.muted === false){                          // if music is niet gemute
            music.muted = true;                             // mute het music
            btnMuteImg.src = "/images/icon/mute-non.png";   // verander de img
        } else {
            music.muted = false;                            // start het music 
            btnMuteImg.src = "/images/icon/mute.png";       // veradner de img
        }
    }); 

    // functie aanroepen bij het openen van het web
    shuffleCards();
    if(level.classList[1] == "level1" || level.classList[1] == "level2" || level.classList[1] == "level3" ){
        
        document.querySelector('.loginname').innerHTML = localStorage.getItem('naamUser'); // geeft naamUser uit localStorage terug door getItem te gebruiken => https://www.w3schools.com/jsref/met_storage_getitem.asp
        
        timerFull.style.display = "block";  // toon hele timer text wanneer btnstart gedrukt is
        timer = setInterval(() => {         // functie dat alle x keer doet iets (in dit geval elke sec, -1 sec) counter = 0 => stop 
            counter--; 
            timerText.innerHTML = counter; // span = timer (counter -1..)

            if(counter === 0){              // als counter = 0
                clearInterval(timer);       // stopt de counter ander gaat het verder naar -1, -2... // stoptimer
                lose();                     // de functie lose uitvoeren wanneer tijd voorbij is
            } else if (counter === 10){     // op het moment dat counter = is aan 10 music alarm gaat aan
                musicAlarm.play();
            }
        }, 1000); // 1000 = 1sec
        
        btnStart.addEventListener("click", function(e) {
            e.preventDefault();
            header2.classList.add("show"); // header2 toevoegen (show in css => transform: translateY(0%); komt weer op zijn plaats, 0% buiten het scherm)
            header1.classList.add("hide"); // header1 verwijderen (hide in css => display:none)

            

            

            // funtie aanroepen en wordt uigevoerd wanneer er op de button "READY" gedrukt wordt
            shuffleFindMeImg();
            
            
            //hover effect weghalen || eerst had ik elk flip-card een unique id gegeven om telkens de flip-card uit te halen, vondt niet zo mooi nagedacht => anders gedaan...
            flipCard.forEach(card => card.classList.remove("flip-card"));
            
            // functie die uitgevoerd wordt wanneer men op een kaart drukken nadat er op "READY" gedrukt wordt 
            cards.forEach(card => card.addEventListener("click", function (e) {
                
                // terwijl cardFlip is aan false (dus niet geflipt) dan dit uitvoeren
                while(cardFlip == false){
                    card.classList.add("flipi");    // flipi toevoegen (komt uit css) om de kaart te flippen
                    cardFlip = true;                // aangezien de kaart geflipt is => carFlip = true;
                    fCard = this;                   // krijgt de waarde van de geselecteerde kaart
                }   
                
                // hier gaan men checken of de geselecteerde kaart = is aan de find-me kaart
                if (fCard.querySelector(".flip-card-back img").dataset.name  == findMe.dataset.name){ // als de geselcteerde kaart == aan find-me kaart... 
                    
                    //is correct
                    document.querySelector('.loginname').innerHTML = localStorage.getItem('naamUser'); // geeft de waarde van naamUser terug
                    wonContainer.classList.add("show");     // woncontainer toevoegen
                    header2.classList.remove("show");       // header2 verwijderen (show in css => transform: translateY(0%);)
                    music.pause();                          // music wordt gestopt
                    musicWin.play();                        // win music aanzetten
                    clearInterval(timer);                   // timer stoppen

                    
                    //om van level te veranderen
                    if(level.classList[1] == "level1"){         // als de level waarin we zitten is level1...
                        btnNext2.addEventListener("click", function (e) { 
                            window.location = "memory2.html";   // en dat er op de btnNext2 gedrukt wordt, gaat men naar niveau2 (memory2.html)
                        });
                    }
                    else if(level.classList[1] == "level2"){    // anders als de level waarin we zitten is level2...
                        btnNext3.addEventListener("click", function (e) {
                            window.location = "memory3.html";   //en dat er op de btnNext2 gedrukt wordt, gaat men naar niveau2 (memory3.html)
                        });
                    }
                }
                else{
                    //niet correct
                    lose();
                    
                } 
                
            }));
            
        });
    }    
})();
    
    
    
    


// TO DO:  
// clique sur bouton next, passer au niveau suivant => OK
// faire un array shuffle avec les foto find me? => OK
// veut pas aller au niveau 3 => OK
// probleme niveau 2 => on voit pas back img verifier html + code flipi/ flip-card??? => OK
// loginname n'es pas donner au niveau 3 => OK
// ajouter un timer => OK
// mettre du son => OK


//sources:
// voor flipcard => https://www.w3schools.com/howto/howto_css_flip_card.asp
// reload de pagina => https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript#:~:text=The%20reload()%20method%20is,reload(true).
// om waarde van naamUser bij te houden en geven => https://www.w3schools.com/jsref/met_storage_setitem.asp
// om timer te maken => https://www.w3schools.com/js/js_timing.asp

