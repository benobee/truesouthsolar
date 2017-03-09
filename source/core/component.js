import Session from "./session.js";

/*
 * @description: turn a tagged template literal into a 
 * DOM element. 
 * @namespace: 'Component' - Create an object called Component
 * which returns to be appended to the DOM as needed, as well as 
 * store the object in the core component list array
*/

let Component = {};

/* 
 * create template class for decontructing tagged
 * template literal
*/

class Template {
	constructor(strings, ...exp) {
		this.root = document.createElement(this.parseNodeType(strings[ 0 ]));
		this.renderHTML(strings, exp);
		this.renderInnerContent(strings, exp);
		this.parseAttributes(strings, exp);
		this.uniqueId();
	}
	uniqueId() {

		/* 
		 * generate a unique global id for component 
		 * 
		*/

		this._id = this.guid();

		List.forEach((item) => {
			if (!item._id) {
				item._id = this._id;
			} else if (item._id === this._id) {
				this._id = this.guid();
			}
		});
	}
	renderHTML(strings, exp) {

		/*
		 * parse and join the strings and data
		*/
	
		let joined = strings.map((item, i) => {
			if (exp[ i ]) {
				return item + exp[ i ];
			} 

			return item;
		}).join("");

		joined = this.formatString(joined);

		this.staticHTML = joined;

	}
	renderInnerContent(strings, exp) {

		/*
		 * test whether string or object to determine
		 * whether or not to compile all HTML in array
		*/
	
		const innerContent = exp[ exp.length - 1 ];
		const variableTYPE = (typeof innerContent);

		if (variableTYPE === "string") {
		    this.root.innerHTML = this.staticHTML;
		} else if (variableTYPE === "object") {
			if (Array.isArray(innerContent)) {
			    const joined = innerContent.map((item) => {
			    	return item.innerHTML;
			}).join("");

	 			this.staticHTML = joined;
			    this.root.innerHTML = joined;
			}
		} else {
		   	console.error("COMPONENT ERROR: Needs to be a string or object...");
		}

	}
	formatString(str) {

		/*
		 * remove all whitespace, tabs and return lines from string
		*/ 

		return str.replace(/\r?\n|\r/g, "").replace(/\t/g, "");
	}
	parseNodeType(str) {
		/* return the node type of the first element */
		str = this.formatString(str).replace(/\</g, "").replace(/\>/g, " ").split(" ");

		return str[ 0 ];
	}
	parseAttributes(strings, exp) {

		/* 
		 * set attributes for root element 
		 * if attributes are simply declared 
		 * via a string 
		*/
	
		const joined = strings.map((item, i) => {
			if (exp[ i ]) {
				return item + exp[ i ];
			} 
			return item;
		}).join("");

		const dummyDOM = document.createElement("html");

		const chopper = document.createElement("div");

		chopper.setAttribute('id', 'chopper');
		dummyDOM.appendChild(chopper);
		chopper.innerHTML = joined;

		const attributes = chopper.childNodes[ 1 ].attributes;

		const output = {};

		for (let i = attributes.length - 1; i >= 0; i--) {
        	output[ attributes[ i ].name ] = attributes[ i ].value;
        }

        this.props = output;

		const keys = Object.keys(output);
		const values = Object.values(output);

		keys.forEach((item, i) => {
			this.root.setAttribute(item, values[ i ]);
		});
	}
	guid() {
	  const s4 = () => {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  };

	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	}
}

/* 
 * return component as DOM element with inner
 * HTML injected into the first element in the string 
*/

const List = [];

Component = (strings, ...exp) => {
	/*create new template from string*/
	const taggedLiteral = new Template(strings, ...exp);

	/* push return object to component list */
	List.push(taggedLiteral);

	/* return the DOM element to be appended */
	return taggedLiteral.root;
};

Component.list = List; //append all elements to root component in core

/*
 * method for appending nodes which is contained
 * within the parent 'Component' object
*/

Component.render = (element, target) => {
	if (target) {
		target.appendChild(element);
	} else {
		console.error("COMPONENT ERROR: Needs to be a valid DOM element.");
	}
};

export default Component;

