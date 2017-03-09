import { HTTP } from './index.js';

class Collection {
	constructor(name) {
		const DOMSelector = '.collection-type-' + name;

		this.list = {
			active: this.isActive('.view-list' + DOMSelector)
		};
		this.item = {
			active: this.isActive('.view-item' + DOMSelector)
		};
	}
	isActive(selector) {
		/* test if class name is found within body */
		const elem = document.querySelectorAll(selector);

		let foundOnPage = false;

		if (elem.length !== 0) {
			foundOnPage = true;
		}

		return foundOnPage;
	}
}

export default Collection;