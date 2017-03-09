import $ from 'jquery';
import Util from '../util/util.js';

class App_Router {
	constructor() {
		this.params = Util.getQueryParameters();
		this.routes = [];
		this.currentRoute = window.location.pathname;
	}
	init() {
		this.checkRoute();
	}
	route(pathName, controller) {
  		const route = {
  			pathName,
  			controller
  		};

	  	this.routes.push(route);
	}
	checkRoute() {
		$.each(this.routes, (i, item) => {
			if (this.currentRoute === item.pathName) {
				item.controller();
			}
		});
	}
}

const Router = new App_Router();

export default Router;