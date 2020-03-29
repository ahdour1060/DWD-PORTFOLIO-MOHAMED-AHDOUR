(function () {
    'use strict';
        //wait till DOM is loaded
        window.addEventListener('load', function () {

            let loginModal = document.getElementById('loginmodal');
            let btnLogin = document.getElementById('btnLogin');
            let btnCancel = document.getElementById('btnCancel');

            let loginfrom = document.getElementById('login__form');
            let name = document.getElementById('inpUname');
            let errUname = document.getElementById('errUname');
            let errPassword = document.getElementById('errPass');
            let password = document.getElementById('inpPass');



            //loginmodal wordt getoond
            btnLogin.addEventListener('click', function(e) {
                e.preventDefault();
                loginModal.classList.add('show');
            });

            //loginmodal wordt vestopt
            btnCancel.addEventListener('click', (e) => { //=> betekent function
                e.preventDefault();
                loginModal.classList.remove('show');
            });


            // schakel HTML5 validatie uit
            loginfrom.setAttribute('novalidate', 'novalidate');

            
            loginfrom.addEventListener('submit', (e) => {
                e.preventDefault();
                e.stopPropagation(); //????????????? slides rogier
                
                //all ok for now
                let isOK = true;

                if (name.value == '' || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(name.value.toLowerCase()) == false) {
                    isOK = false;
                    errUname.innerHTML = 'login kan niet leeg zijn';
                }
                else
                {
                    isOK = true;
                    errUname.innerHTML = '';
                }

                if (password.value == '') {
	        		isOK = false;
	        		errPassword.innerHTML = 'paswoord kan niet leeg zijn';
                }
                else 
	        	{
	        		isOK = true;
	        		errPassword.innerHTML = '';
                }

                //conclusion
                if (isOK) {
                    loginModal.classList.remove('show');
                    console.log('alles is ok');
                } else {
                    console.log('form bevat errors');
                }
            });

            ////////////////////////// FOTOALBUM //////////////////////

            //aliases
            let thumbs = document.querySelectorAll('.main__thumbs figure');
            let large = document.querySelector('#large__figure');
            let largeTitle = document.querySelector('.large__title');
            let photo = large.querySelector('img');

            let linkf = document.getElementById('lnkFirst');
            let linkl = document.getElementById('lnkLast');
            let linkp = document.getElementById('lnkPlay');
            let linkn = document.getElementById('lnkNext');
            
            
            linkl.addEventListener('click', (e) => {
                e.preventDefault();
                //show last image
                photo.src = document.querySelector('link').href=('img/photo25.jpg');
                largeTitle.innerHTML = document.querySelector('img').alt=('Oase, Algerije');
            });
            linkf.addEventListener('click', (e) => {
                e.preventDefault();
                //show first image
                photo.src = document.querySelector('link').href=('img/photo1.jpg');
                largeTitle.innerHTML = document.querySelector('img').alt=('stad nabij Petra, Jordanië (2018)');
            });

            
         
            //attach click events to thumbnails
            for(let thumb of thumbs) {
                let link = thumb.querySelector('a');
                let img = thumb.querySelector('img');

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    //show image
                    photo.src = link.href;
                    largeTitle.innerHTML = img.alt;
                    
                    //change active state
                    document.querySelector('.main__thumbs .active').classList.remove('active');
                    thumb.classList.add('active');

                });
            } 

            ///////////////////////////////// PAGE FILTER /////////////////////////

            //aliases
            let selAlbum = document.getElementById('selAlbum');
            let checkboxes = document.querySelectorAll('.filter__years label input[type=checkbox]');
            let inpSearch = document.getElementById('inpSearch');

            let btnReset = document.getElementById('btnReset');
            let btnSearch = document.getElementById('btnSearch');
            
            

            btnSearch.addEventListener('click', (e) => {
                e.preventDefault();
                thumbs.forEach( (e) => {
                    e.classList.add('hide');
                });

                if(selAlbum.value == -1) {
                    thumbs.forEach( (e) => {
                        e.classList.remove('hide');
                    });
                } else {
                    thumbs.forEach( (e) => {
                        if(e.classList.contains('hide') && e.dataset.albumid == selAlbum.value)
                            e.classList.remove('hide');
                    })
                }


                let VisibleThumbs = document.querySelectorAll('figure:not(.hide)');
                if(inpSearch.value != ''){
                    thumbs.forEach(e => {
                        if(!e.classList.contains('hide'))
                            e.classList.add('hide');
                    });
                    let trefwoord = inpSearch.value.toLowerCase();
                    VisibleThumbs.forEach(e => {
                        let alt = e.querySelector('img').alt.toLowerCase();
                        if(alt.includes(trefwoord)) e.classList.remove('hide');
                    });
                }
                
            })

            btnReset.addEventListener('click', (e) => {
                e.preventDefault();
                thumbs.forEach( (e) => {
                    e.classList.remove('hide');
                });

                selAlbum.value = -1;
                inpSearch.value = '';
            })


        });
})();