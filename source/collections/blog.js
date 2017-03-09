import $ from 'jquery';
import { Collection, Component } from '../core/index.js';

/* define new collection */
const blog = new Collection('blog');

/* if the blog list is active render the component */
if (blog.list.active) {
	//const target = document.getElementById('page');

	//Component.render(pet_stories, target);
}

export default blog;