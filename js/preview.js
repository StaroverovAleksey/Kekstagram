(function() {

	var KEY_ENTER = 13;
	var KEY_ESC =27;
	var photoOverlay = document.querySelector('.gallery-overlay');
	var closeOverlayButton = document.querySelector('.gallery-overlay-close');

	var overlayPressEsc = function(evt) {
	if(evt.keyCode === KEY_ESC) {
		closeOverlay();
	};
	}

	var showOverlay = function(evt) {
		parent = evt.target;
		while (parent.localName !== 'a') {
			parent = parent.parentNode;
		};
		photoOverlay.classList.remove('hidden');
		photoOverlay.querySelector('.gallery-overlay-image').src = parent.children[0].src;
		photoOverlay.querySelector('.likes-count').textContent = parent.children[1].children[1].textContent;
		photoOverlay.querySelector('.comments-count').textContent = parent.children[1].children[0].children.length;
		document.addEventListener('keydown', overlayPressEsc);
	};

	var closeOverlay = function() {
		photoOverlay.classList.add('hidden');
		document.removeEventListener('keydown', overlayPressEsc);
	};

	document.querySelector('.pictures').addEventListener('click', showOverlay);

	closeOverlayButton.addEventListener('click', closeOverlay);

	closeOverlayButton.addEventListener('keydown', function(evt) {
		if(evt.keyCode === KEY_ENTER) {
			closeOverlay();
		};
	});

})();