import $ from 'jquery';
import Trigger from './trigger';

/**
 *
 * @namespace scrollMap
 * @description store element points and check if
 * elements are visible
 *
*/ 

const Scrollmap = {
  init() {
    this.points = [];

    this.events();
  },
  add(el) {

  	/* 
  	 * @desc add classname indicating element is intialized
    */

    this.points.push(el);
  },
  elementInViewport(el) {

    /*
     * @desc check if element is in viewport
    */
   
    const rect = el.getBoundingClientRect();
   
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[ 0 ];
    }

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom * 0.85 <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );

  },
  checkVisible() {
    this.points.forEach((item) => {

        const targetElement = item.element;

        /* look for is-visible class on element
        and assign booleon */

        const isVisible = $(targetElement).hasClass('is-visible');

        /* if element doesn't have is-visible class
        check to see if in viewport from coords.top */

        if (!isVisible) {
          //const isInViewport = this.isInViewport(item.coords.top);
          const viewport = this.elementInViewport(targetElement);

          /* if booleon return true add visible class */
          if (viewport) {
            $(targetElement).addClass('is-visible');
            item.controller();
          }
        }
    });    
  },
  events() {
  	//initial check on page load to see if elements are visible
    $(window).bind('scroll load', () => {
      this.points.forEach((i, item) => {
        this.checkVisible();
      });
    });
  }
};

export default Scrollmap;