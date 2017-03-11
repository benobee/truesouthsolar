import $ from 'jquery';

class Trigger {
	constructor(element, callback) {
		this.element = element;
		this.controller = callback;
	}
	destroy() {
		this.events = null;
		this.element = null;
	}
}

export default Trigger;