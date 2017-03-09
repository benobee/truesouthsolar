/**
 *
 * @description constructs and initializes all core modules
 *
*/

import * as core from './source/core/index.js';
import { Router } from './source/core/index.js';
import * as modules from './source/modules/index.js';
import SQS from './source/sqs/index.js';
import * as Collections from './source/collections/index.js';

const css = require('./main.less');

class App_Build {
	constructor() {
		this.collections = Collections;
		this.core = core;
		this.modules = modules;
		this.SQS = SQS;
		this.componentsToSessionStorage();
		
		this.init();

		console.log(this);
	}
	componentsToSessionStorage() {
		core.Component.list.forEach((item, i) => {
			core.Session.set('component_' + i, item);
		});
	}
	init() {
		/* router */
		Router.init();

		/* animation listeners */
		modules.animation.init();
		modules.carousel.init();
		modules.modal.init();
	}
}

const App = new App_Build();

window._App = App;


