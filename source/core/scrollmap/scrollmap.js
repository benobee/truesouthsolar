import $ from 'jquery';
import Trigger from './trigger';
import Events from '../events';

/**
 *
 * @namespace scrollMap
 * @description store element points and check if
 * elements are visible
 *
*/ 

const Scrollmap = {
  init() {

    this.lastScrollTop = 0;
    this.points = [];
    this.events();

  },
  add(el, callback) {

  	/* 
  	 * @desc add classname indicating element is intialized
    */
   
    const type = (typeof el);

    if (type === "string") {
        el = document.querySelectorAll(el);
    } else if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el.toArray();
    } else if ( type === "object" ) {
        el = [el];
    }

    el.forEach((item) => {
        const currentClass = item.getAttribute('class');

        item.setAttribute("class", currentClass + " on-scroll");

        const point = new Trigger(item, callback);

        this.points.push(point);
    });
  },
  elementInViewport(el, percetageOfElement) {

    /*
     * @desc check if element is in viewport
    */
   
    /*
     * look for direction of scroll and base element visible
     * percentage off of either top bottom when scrolling
     * down, or the top when scrolling up. This may not be
     * the perfect method but is cross browser compatible.
    */
   
    const rect = el.getBoundingClientRect();
    
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[ 0 ];
    }

    const stats = {
        top: rect.top - window.innerHeight,
        bottom: rect.bottom + rect.height,
        height: rect.height,
        window: window.innerHeight
    };

    const amount = stats.height * percetageOfElement;

    if ( (stats.bottom - amount > stats.height) && (stats.top + amount < 0)) {
      return true;
    }

    return false;

  },
  checkVisible(point) {
    const targetElement = point.element;
    const viewport = this.elementInViewport(targetElement, point.surfaceVisible);

    if (viewport) {
      $(targetElement).addClass('is-visible');
      point.onTriggerIn();
      if (point.onTriggerIn) {
        point.onTriggerIn();
      }

    } else {
      $(targetElement).removeClass('is-visible');

      if (point.onTriggerOut) {
        point.onTriggerOut();
      }
    }
  },
  on(string, callback) {

      /*
       * methods for creating various listeners
      */

      const direction = this.scrollOrient;

      if (direction === "Up" && string === "scrollUp") {
          callback();
      }

      if (direction === "Down" && string === "scrollDown") {
          callback();             
      }
  },
  scrollDirection() {

      /*
       * return the scroll direction via a string value
      */
      
      let direction = "";

      const st = window.pageYOffset || document.documentElement.scrollTop;

       if (st > this.lastScrollTop) {
            direction = "Down";
       } else {
            direction = "Up";
       } 

       this.lastScrollTop = st;

       return direction;
  },
  extend(obj) {
    Object.assign(this, obj);
  },
  events() {
  	//initial check on page load to see if elements are visible
    $(window).on("load", () => {
      this.points.forEach((point) => {
        this.checkVisible(point);
      });
    });

    //check for visible elements on scroll
    $(window).on('scroll', () => {
      this.scrollOrient = this.scrollDirection();

      Events.publish("scrollDirection", this.scrollOrient);

      this.points.forEach((point) => {
        this.checkVisible(point);
      });
    });

  }
};

export default Scrollmap;