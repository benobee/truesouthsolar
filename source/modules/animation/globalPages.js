import $ from 'jquery';
import { Scrollmap, Trigger } from '../../core/scrollmap/index.js';
import { TweenMax } from "gsap";

const productPages = {
	init() {
		this.cacheDOM();
		this.residential();
	},
	cacheDOM() {
		this.residentialCollection = $('#collection-58c70dea17bffc25cf68932b');
	},
	residential() {

		/* 
		 * search for an image block 2.0. If no image block
		 * is found, target the page content for animations
		*/
		
		const page = $(this.residentialCollection).find('.Index-page');

		$.each(page, (i, item) => {
			const card = $(item).find('.image-card.sqs-dynamic-text-container');

			if (card.length !== 0) {
				/* text besides image on design layout cards */
				TweenMax.set(card, { opacity: 0, visibility: "hidden", y: 40 });
				Scrollmap.add(card, {
					onTriggerIn() {
						TweenMax.to(this.element, 0.4, { opacity: 1, y: 0, visibility: "visible", delay: 0.2 });
					},
					surfaceVisible: 0.25
				});
			}
		});
	}
};

export default productPages;
