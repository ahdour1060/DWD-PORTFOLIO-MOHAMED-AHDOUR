(function () {
    'use strict';


        let loginModal = document.getElementById('loginmodal');
        let btnLogin = document.getElementById('btnLogin');
        let btnCancel = document.getElementById('btnCancel');
        
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
        document
            .getElementById('login__form')
            .setAttribute('novalidate', 'novalidate');

        //formvalidatie
        document
            .getElementById('login__form')
            .setAttribute('novalidate', 'novalidate');

            document
            .getElementById('login__form')
            .addEventListener('submit', function (e) {
            e.preventDefault();

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

            if (isOK) {
                this.submit();
            }
            
        });
})();