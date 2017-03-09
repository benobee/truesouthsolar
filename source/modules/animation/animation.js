/**
 *
 * @description checks visible initialized elements on screen and animates
 * exports to index.js which is exported to main.js
 *
*/

import $ from 'jquery';
import scrollMap from '../scrollmap/scrollMap.js';

/**
 *
 * @namespace animation
 * @description run and initialize animation 
 * handlers, search dom for trigger elements
 *
*/ 

const animation = {
    init() {
        this.map();

        this.scrollMap = scrollMap;
    },
    map() {
        scrollMap.init();

        const block = $('#page .sqs-block, #page .sqs-col-4, #page .sqs-col-6').toArray();

        $.each(block, (i, item) => {
           scrollMap.add(item, 'is-initialized');
        });
    }
};

export default animation;