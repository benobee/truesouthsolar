/**
 *
 * @description checks visible initialized elements on screen and animates
 * exports to index.js which is exported to main.js
 *
*/

import $ from 'jquery';
import { Scrollmap, Trigger } from '../../core/scrollmap/index.js';
import { TweenMax, Power2, TimelineLite } from "gsap";

/**
 *
 * @namespace animation
 * @description run and initialize animation 
 * handlers, search dom for trigger elements
 *
*/ 

const animation = {
    init() {
        this.summaryItemList();
        this.map();
    },
    summaryItemList() {
        const elementsToAnimate = $('#partnerships .summary-item-list, #products-intro .summary-item-list, #services-intro .summary-item-list').toArray();

        elementsToAnimate.forEach((item) => {

            const trigger = new Trigger(item, () => {
                const summaryItems = $(item).find(".summary-item").toArray();

                TweenMax.staggerTo(summaryItems, 0.8, { opacity: 1 }, 0.1);
            });

            Scrollmap.add(trigger); //add the item and class to be triggered           
        });
    },
    map() {
        const elementsToAnimate = $('.Index-page, #why-true-south-solar .summary-item').toArray();

        elementsToAnimate.forEach((item) => {
            const trigger = new Trigger(item, () => {
                $(item).addClass("on-scroll");
            });

            Scrollmap.add(trigger); //add the item and class to be triggered
        });
    }
};

export default animation;

