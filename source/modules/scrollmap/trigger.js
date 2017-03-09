import $ from 'jquery';

const trigger = {
	add(element) {
		//DOM element for triggering 
		this.element = element;

		//store lifecycle events
		this.events = {};
	},
	onStart(func) {
		this.events.onStart = func;
	},
	onComplete(func) {
		this.events.onComplete = func;
	},
	destroy() {
		this.events = null;
		this.element = null;
	}
};

export default trigger;