"use strict";

$(document).ready(function() {

	/* ---- INIT SIZE ---- */
	UI.renderSize();

	Model.LS.tpTest(function(tpTest){
		UI.tooltips.render(tpTest);
	});
	

	$(window).on('resize', function() {
		UI.renderSize();
		Model.LS.tpTest(function(tpTest){
			UI.tooltips.render(tpTest);
		});
	});


	/* ---- TOGGLE BURGER MENU ---- */
	$('#burger').on('click', function(e) {
		e.preventDefault();
		if(!UI.nav.burgerTrigger) {
			UI.nav.openBurgerMenu();
		}
		else {
			UI.nav.closeBurgerMenu();
		}
	});

	/* ---- FLASH MESSAGES ---- */
	UI.flashMsg.removeMsgTimeout(3000);

	$('#flashMsg').find('li').on('click', function(e){
	    e.preventDefault();
		UI.flashMsg.removeMsg($(this));
	});


	/* ---- PROFILE AVATAR HOVER ---- */
	$('#profile').hover(
		function() {
			UI.profile.$menu.fadeIn();
		}, function() {
			UI.profile.$menu.fadeOut();
		}
	);

	/* ---- ACCORDEON MENU --- -*/
	UI.nav.checkActiveCategory();
	$('.categoryElement > a').on('click', function(e) {
		UI.nav.accordeonToggle($(this), 'animated');
	});

	/* ---- EDIT PROFILE ---- */
	$("#editButton").on('click', function(e) {
		e.preventDefault();
		UI.profile.toggleEdition();
	});

	/* ---- SUBMIT FORM ---- */
	$('.submitBtn').on('click', function(e) {
		e.preventDefault();
		$(this).siblings("input[type='submit']").trigger('click');
	});

	/* ---- TOOLTIPS CHECK ---- */
	

	/* ---- TOOLTIPS EVENT ---- */

	// --- Click on a circle
	$('.tooltipsCircle').on('click', function(e){
	    UI.tooltips.show($(this));
	});
	// --- Click on a next or cross button
	$('.tipViewed').on('click', function(e){
	    e.preventDefault();
		var $this = $(this);
		Model.LS.tpTest(function(tpTest){
			tpTest[$this.parent().data('current')] = true;
			Model.LS.set('tpTest', tpTest);
		});
		if($this.hasClass('nextTooltip')) {
			UI.tooltips.next($this);
		} else {
			UI.tooltips.close($this);
		}
	});


	/* ---- POPIN ADD DATA ----*/

	// ----- Add Category
	$('#addCategory').on('click', function(e) {
		e.preventDefault();
		UI.popin.showCategoryPopin();
	});

	// ----- Add Snippet
	$('.addSnippetLink').on('click', function(e) {
		e.preventDefault();
		var $dataId = $(this).data('id');

		UI.popin.showSnippetPopin('add');
		$('#categoryID').attr('value',$dataId);
	});

	$('#addSnippetAlias').on('click', function(e){
	    e.preventDefault();
		$('.categoryElement.active .addSnippetLink').trigger('click');
	});



	// ----- Close PopIn
	$('#closePopin, #popinBg').on('click', function(e) {
		e.preventDefault();
		UI.popin.closePopin();
	});


	$(document).on('keyup', function(e) {
		if (e.keyCode == 27) {
			if($('#popin').is(':visible')) {
				UI.popin.closePopin();
			}
		}
	});

	/* ---- DELETE LINK ---- */
	$('.deleteLink').on('click', function(e){
	    e.preventDefault();
	    var href = $(this).attr('href');
		var delOk=confirm('Do you really want to delete this ' + $(this).data('del') + ' ?');
		if (delOk) {
			window.location.href = href;
		}
	});
	/* ---- CHECK URL FOR TRACKING ---- */
	$('#addSnippetForm textarea').on('keyup', function(e) {
		e.preventDefault();
		var $str = $(this).val();

		if(validateUrl($str)) {
			UI.popin.enableUrlCheckbox();
		}
		else {
			UI.popin.disableCheckboxs();
		}
	});
	/* ---- IF URLCHECKBOX IS CHECKED ---- */
	$('#addSnippetForm input').on('change', function() {
		UI.popin.togglePushbulletCheckBox();

	});

	function validateUrl(str) {
		var pattern = new RegExp("^((http|https):\/\/){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)+$"); // fragment locator
		if(!pattern.test(str)) {
			return false;
		}
		else {
			return true;
		}
	}

});