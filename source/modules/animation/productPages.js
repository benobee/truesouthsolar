import $ from 'jquery';
import { Scrollmap, Trigger } from '../../core/scrollmap/index.js';
import { TweenMax } from "gsap";

const productPages = {
	init() {
		this.cacheDOM();
		this.indexPage();
		this.equinoxPage();
		this.events();
	},
	cacheDOM() {
		//#advantage, #helix, #sonnen
		this.collection = $('#collection-58c1ade037c581ac65ceead6, #collection-58c1d2beb8a79bc99bfe5f19, #collection-58c204a0440243d83e88e96f');
	},
	indexPage() {

		/* 
		 * search for an image block 2.0. If no image block
		 * is found, target the page content for animations
		*/
		
		const page = $(this.collection).find('.Index-page');

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

			} else if (card.length === 0) {
				TweenMax.set($(item).find('.Index-page-content'), { opacity: 0, visibility: "hidden", y: 40 });
				Scrollmap.add(item, {
					onTriggerIn() {
						TweenMax.to($(this.element).find('.Index-page-content'), 0.4, { opacity: 1, visibility: "visible", y: 0, delay: 0.2 });
					},
					surfaceVisible: 0.7
				});				
			}
		});
	},
	equinoxPage() {
		//page collection
		const $collection = $('#collection-58c1c989ff7c50dd0e56cdef');

		//first item in the index
		const $header = $collection.find(".Index-page:first-child");

		Scrollmap.add($header, {
			onTriggerIn() {
				TweenMax.to($(this.element).find('.Index-page-content'), 0.4, { opacity: 1, visibility: "visible", y: 0 });
			},
			surfaceVisible: 0.25
		});

		//trigger gallery image animation
		const $galleries = $collection.find('.sqs-block-gallery');

		$.each($galleries, (i, item) => {
			Scrollmap.add(item, {
				onTriggerIn() {
					$(this.element).addClass('gallery-visible');
				},
				onTriggerOut() {
					$(this.element).removeClass('gallery-visible');
				},
				surfaceVisible: 0.25
			});			
		});
	},
	animateGallery(direction) {

		/*
		 * search for the appended class from the scroll map trigger
		 * if found, start cycling through the slide list by adding 
		 * and removing active classes.
		 */
		
		const $gallery = $('.sqs-block-gallery.gallery-visible');

		if ($gallery.length !== 0) {
			$.each($gallery, (i, item) => {
			    if (direction === "Down") {
			        const $activeSlide = $(item).find('.sqs-active-slide');

			        const $next = $activeSlide.next('.slide');

			        if ($next.length !== 0) {
			        	$activeSlide.removeClass('sqs-active-slide');
			        	$next.addClass('sqs-active-slide');		        	
			        }

			    } else {
			        const $activeSlide = $(item).find('.sqs-active-slide');

			        const $previous = $activeSlide.prev('.slide');

			        if ($previous.length !== 0) {
			        	$activeSlide.removeClass('sqs-active-slide');
			        	$previous.addClass('sqs-active-slide');
			        }
			    }
			});
		}
	},
	events() {

		/*
		 * determine whether the scroll is going up
		 * or down and animate the gallery accordingly
		 */
		
		window.addEventListener("scroll", () => {

		   const st = window.pageYOffset || document.documentElement.scrollTop;

		   Scrollmap.on("scrollDown", () => {
		   		this.animateGallery("Down");
		   });

		   Scrollmap.on("scrollUp", () => {
		   		this.animateGallery("Up");
		   });

		}, false);
	}
};

export default productPages;
