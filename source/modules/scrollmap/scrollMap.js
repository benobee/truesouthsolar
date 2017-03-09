import $ from 'jquery';
import trigger from './trigger.js';

/**
 *
 * @namespace scrollMap
 * @description store element points and check if
 * elements are visible
 *
*/ 

const scrollMap = {
  init() {
    this.points = [];
    this.events();
  },
  add(el, className) {

  	/* 
  	 * @desc add classname indicating element is intialized
    */

    $(el).addClass(className);

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
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );

  },
  checkVisible() {
    $.each(this.points, (i, item) => {

        /* look for is-visible class on element
        and assign booleon */

        const isVisible = $(item).hasClass('is-visible');

        /* if element doesn't have is-visible class
        check to see if in viewport from coords.top */

        if (!isVisible) {
          //const isInViewport = this.isInViewport(item.coords.top);
          const viewport = this.elementInViewport(item);

          /* if booleon return true add visible class */
          if (viewport) {
            $(item).addClass('is-visible');
          }
        }
    });    
  },
  events() {
  	//initial check on page load to see if elements are visible
    $(window).bind('scroll load', () => {
      $.each(this.points, (i, item) => {
        this.checkVisible();
      });
    });   
  }
};

export default scrollMap;