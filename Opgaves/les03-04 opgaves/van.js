window.addEventListener('load', function() {

    //let van;
    //let filters;
    /*let restet = function() {
        VRDisplayEvent.classList.remove('gray');
        for (let filter of filters)  {
        filter.classList.remove('active')
        }
    }*/

    // => betekent 'function'

    let img = document.getElementById('imageVan');

    let btnNormal = document.getElementById('btnNormal');
    let btnGrayscale = document.getElementById('btnGrayscale');
    let btnSepia = document.getElementById('btnSepia');
    let btnHue = document.getElementById('btnHue');
    let btnBlur = document.getElementById('btnBlur');

    let range = document.getElementById('rangeOpacity');

    range.addEventListener('change', function() {
        let val = this.value;
        img.style.opacity = val /100;
    });

    range.addEventListener('change', function() {
        document.getElementById('num').innerHTML = this.value + '%';
    });


    btnNormal.addEventListener('click', function() { 
		img.classList.add('normal');
		img.classList.remove('grayscale', 'sepia', 'hue', 'blur');
    });

    btnGrayscale.addEventListener('click', function() { 
        img.classList.add('grayscale');
        img.classList.remove('normal', 'sepia', 'hue', 'blur');
    });

    btnSepia.addEventListener('click', function() { 
        img.classList.add('sepia');
        img.classList.remove('grayscale', 'normal', 'hue', 'blur');
    });

    btnHue.addEventListener('click', function() { 
        img.classList.add('hue');
        img.classList.remove('grayscale', 'normal', 'sepia', 'blur');
    });

    btnBlur.addEventListener('click', function() { 
        img.classList.add('blur');
        img.classList.remove('grayscale', 'normal', 'sepia', 'hue');
    });
});