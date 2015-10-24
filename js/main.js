jQuery(document).ready(function(){
	var
		itemsContainer = $('.cd-items-wrapper'),
		itemsSlider = itemsContainer.children('.cd-slider'),
		singleItemContent = $('.cd-item-content'),
		sliderNav = $('.cd-slider-navigation');

	var resizing = false;
// 	console.log(itemsSlider;


	//if on desktop - set a width for the itemsSlider element
	setSliderContainer();
	$(window).on('resize', function(){
		//on resize - update itemsSlider width and translate value
		if( !resizing ) {
			(!window.requestAnimationFrame) ? setSliderContainer() : window.requestAnimationFrame(setSliderContainer);
			resizing = true;
		}
	});

	//show the items slider if user clicks the show-items button
	$('.cd-intro-block').on('click', '.cd-content-wrapper>a', function(event) {
		event.preventDefault();
		var thisItemsContainer = $(this).parent().parent().next();
		$(this).parent().parent().addClass('items-visible');
		thisItemsContainer.addClass('items-visible');
		//animate single item - entrance animation
		setTimeout(function(){
			showItemPreview(thisItemsContainer.children('.cd-slider').children('li').eq(0));
		}, 200);
	});
	//items slider is visible - hide slider and show the intro panel
	$('.cd-intro-block').on('click', function(event) {
		if( $(this).hasClass('items-visible') && !$(event.target).is('a[data-action="show-items"]') ) {
			$(this).removeClass('items-visible');
			$(this).next().removeClass('items-visible');
		}
	});
	//close items slider with button (as well as intro panel)
	$('.cd-items-wrapper>a').on('click',function(event){
		if( $(this).parent().prev().hasClass('items-visible') && $(event.target).is('a[data-action="close-items"]') ) {
			$(this).parent().prev().removeClass('items-visible');
			$(this).parent().removeClass('items-visible');
		}
	});
	//select a single item - open item-content panel
	$('.cd-items-wrapper').on('click', '.cd-slider a', function(event) {
		event.preventDefault();
		var item_id = $(this).attr('data-action');
		if( $(this).parent('li').next('li').is('.current') ) {
			prevSides(itemsSlider);
		} else if ( $(this).parent('li').prev('li').prev('li').prev('li').is('.current')) {
			nextSides(itemsSlider);
		} else {
			$('.cd-item-content#'+item_id).addClass('is-visible');
		}
	});

	//close single item content
	singleItemContent.on('click', '.close', function(event){
		event.preventDefault();
		singleItemContent.removeClass('is-visible');
	});

	//go to next/pre slide - clicking on the next/prev arrow
	sliderNav.on('click', '.next', function(){
		nextSides($('.cd-items-wrapper').children('.cd-slider'));
	});
	sliderNav.on('click','.prev',function(){
		prevSides($('.cd-items-wrapper').children('.cd-slider'));
	});
	//go to next/pre slide - keyboard navigation
	//DEPRECATED FOR PRODUCTION
	// $(document).keyup(function(event){
	// 	var mq = checkMQ();
	// 	if(event.which=='37' &&  intro.hasClass('items-visible') && !(sliderNav.find('.prev').hasClass('inactive')) && (mq == 'desktop') ) {
	// 		prevSides(itemsSlider);
	// 	} else if( event.which=='39' &&  intro.hasClass('items-visible') && !(sliderNav.find('.next').hasClass('inactive')) && (mq == 'desktop') ) {
	// 		nextSides(itemsSlider);
	// 	} else if(event.which=='27' && singleItemContent.hasClass('is-visible')) {
	// 		singleItemContent.removeClass('is-visible');
	// 	}
	// });

	itemsSlider.on('swipeleft', function(){
		var mq = checkMQ();
		if( !(sliderNav.find('.next').hasClass('inactive')) && (mq == 'desktop') ) nextSides(itemsSlider);
	});

	itemsSlider.on('swiperight', function(){
		var mq = checkMQ();
		if ( !(sliderNav.find('.prev').hasClass('inactive')) && (mq == 'desktop') ) prevSides(itemsSlider);
	});

	function showItemPreview(item) {
		if(item.length > 0 ) {
			setTimeout(function(){
				item.addClass('slides-in');
				showItemPreview(item.next());
			}, 50);
		}
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-items-wrapper'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}

	function setSliderContainer() {
		var mq = checkMQ();
		if(mq == 'desktop') {
			var	slides = itemsSlider.children('li'),
				slideWidth = slides.eq(0).width(),
				marginLeft = Number(itemsSlider.children('li').eq(1).css('margin-left').replace('px', '')),
				sliderWidth = ( slideWidth + marginLeft )*( slides.length + 1 ) + 'px',
				slideCurrentIndex = itemsSlider.children('li.current').index();
			itemsSlider.css('width', sliderWidth);
			( slideCurrentIndex != 0 ) && setTranslateValue(itemsSlider, (  slideCurrentIndex * (slideWidth + marginLeft) + 'px'));
		} else {
			itemsSlider.css('width', '');
			setTranslateValue(itemsSlider, 0);
		}
		resizing = false;
	}

	function nextSides(slider) {
		var actual = slider.children('.current'),
			index = actual.index(),
			following = actual.nextAll('li').length,
			width = actual.width(),
			marginLeft = Number(slider.children('li').eq(1).css('margin-left').replace('px', ''));

		index = (following > 4 ) ? index + 3 : index + following - 2;
		//calculate the translate value of the slider container
		translate = index * (width + marginLeft) + 'px';

		slider.addClass('next');
		setTranslateValue(slider, translate);
		slider.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			updateSlider('next', actual, slider, following);
		});

		if( $('.no-csstransitions').length > 0 ) updateSlider('next', actual, slider, following);
	}

	function prevSides(slider) {
		var actual = slider.children('.previous'),
			index = actual.index(),
			width = actual.width(),
			marginLeft = Number(slider.children('li').eq(1).css('margin-left').replace('px', ''));
		console.log(marginLeft);

		translate = index * (width + marginLeft) + 'px';

		slider.addClass('prev');
		setTranslateValue(slider, translate);
		slider.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			updateSlider('prev', actual, slider);
		});

		if( $('.no-csstransitions').length > 0 ) updateSlider('prev', actual, slider);
	}

	function updateSlider(direction, actual, slider, numerFollowing) {
		if( direction == 'next' ) {
			slider.removeClass('next').find('.previous').removeClass('previous');
			actual.removeClass('current');
			if( numerFollowing > 4 ) {
				actual.addClass('previous').next('li').next('li').next('li').addClass('current');
			} else if ( numerFollowing == 4 ) {
				actual.next('li').next('li').addClass('current');
				actual.prev('li').addClass('previous');
			} else if( numerFollowing == 3 ) {
				actual.next('li').addClass('current');
				actual.prev('li').prev('li').addClass('previous');
			}
		} else {
			slider.removeClass('prev').find('.current').removeClass('current');
			actual.removeClass('previous').addClass('current');
			if(actual.prevAll('li').length > 2 ) {
				actual.prev('li').prev('li').prev('li').addClass('previous');
			} else {
				( !slider.children('li').eq(0).hasClass('current') ) && slider.children('li').eq(0).addClass('previous');
			}
		}

		updateNavigation();
	}

	function updateNavigation() {
		//update visibility of next/prev buttons according to the visible slides
		var current = itemsContainer.find('li.current');
		(current.is(':first-child')) ? sliderNav.find('.prev').addClass('inactive') : sliderNav.find('.prev').removeClass('inactive');
		(current.nextAll('li').length < 3 ) ? sliderNav.find('.next').addClass('inactive') : sliderNav.find('.next').removeClass('inactive');
	}

	function setTranslateValue(item, translate) {
		item.css({
		    '-moz-transform': 'translateX(-' + translate + ')',
		    '-webkit-transform': 'translateX(-' + translate + ')',
			'-ms-transform': 'translateX(-' + translate + ')',
			'-o-transform': 'translateX(-' + translate + ')',
			'transform': 'translateX(-' + translate + ')',
		});
	}


});
