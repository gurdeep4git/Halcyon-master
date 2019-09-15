import "../sass/main.scss";
import "../sass/slider.scss";

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

class Slider{
    constructor(){
        this.bindEvents();
    }

    private bindEvents(){
        $(document).ready(function(){
            $('.owl-carousel').owlCarousel();
        });
    }
}   
new Slider();