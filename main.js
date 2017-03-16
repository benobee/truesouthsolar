/**
 *
 * @description constructs and initializes all core modules
 *
*/

import * as core from './source/core';
import { Router, Scrollmap } from './source/core';
import * as modules from './source/modules';
import SQS from './source/sqs';
import $ from 'jquery';

const css = require('./main.less');

class App_Build {
	constructor() {
		this.core = core;
		this.modules = modules;
		this.SQS = SQS;
		this.componentsToSessionStorage();
		
		// initialize modules and core methods
		this.init();

		console.log(this);
	}
	componentsToSessionStorage() {
		core.Component.list.forEach((item, i) => {
			core.Session.set('component_' + i, item);
		});
	}
	init() {
		/* scrollmap*/
		Scrollmap.init();

		/* router */
		Router.init();

		/* animations */
		modules.animation.homepage.init();
		modules.animation.productIndex.init();
		modules.animation.productPages.init();
		modules.animation.globalPages.init();

		/* carousel init (testimonials) */
		modules.carousel.init();

		/* modal init (products) */
		modules.modal.init();

		$(window).on("load", () => {
			setTimeout(() => {
				$('#loader').addClass('hide');
			}, 500);
		});	
	}
}

const App = new App_Build();

window._App = App;