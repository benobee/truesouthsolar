import $ from 'jquery';
import { Scrollmap, Trigger } from '../../core/scrollmap/index.js';
import { TweenMax } from "gsap";

const productPages = {
	init() {
		this.cacheDOM();
		this.indexPage();

		console.log(this);
	},
	cacheDOM() {
		//#advantage, #helix, #sonnen
		this.collection = $('#collection-58c1ade037c581ac65ceead6, #collection-58c1d2beb8a79bc99bfe5f19, #collection-58c204a0440243d83e88e96f');
	},
	indexPage() {
		const page = $(this.collection).find('.Index-page');

		$.each(page, (i, item) => {
			const card = $(item).find('.image-card.sqs-dynamic-text-container');

			if (card.length !== 0) {
				/* text besides image on design layout cards */
				TweenMax.set(card, { opacity: 0, y: 40 });

				Scrollmap.add(card, {
					onTriggerIn() {
						TweenMax.to(this.element, 0.4, { opacity: 1, y: 0, delay: 0.2 });
					}
				});

			} else if (card.length === 0) {
				TweenMax.set($(item).find('.Index-page-content'), { opacity: 0, y: 40 });

				Scrollmap.add(item, {
					onTriggerIn() {
						TweenMax.to($(this.element).find('.Index-page-content'), 0.4, { opacity: 1, y: 0, delay: 0.2 });
					},
					surfaceVisible: 0.7
				});				
			}
		});
	}
};

export default productPages;
