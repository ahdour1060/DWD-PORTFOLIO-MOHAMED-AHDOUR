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

            //attach click events to thumbnails
            for (let thumb of thumbs) {
                let link = thumb.querySelector('a');
                let img = thumb.querySelector('img');
                link.addEventListener('click', (e) => {
                    //prevent default link action
                    e.preventDefault();
                    //show image
                    photo.src = link.href;
                    largeTitle.innerHTML = img.alt;
                    
                    //change active state
                    document.querySelector('.main__thumbs .active').classList.remove('active');
                    thumb.classList.add('active');
                });
            }

        });
})();