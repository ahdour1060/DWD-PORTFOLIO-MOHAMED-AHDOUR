(function () {
    'use strict';


    let loginModal = document.getElementById('loginmodal');
    let btnLogin = document.getElementById('btnLogin');
    let btnCancel = document.getElementById('btnCancel');

    btnLogin.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.add('show');
    });

    btnCancel.addEventListener('click', (e) => { //=> betekent function
        e.preventDefault();
        loginModal.classList.remove('show');
    });



})();