(function() {

	var KEY_ENTER = 13;
	var KEY_ESC =27;
	var parent;
	var uploadControl = document.querySelector('.upload-file');
	var closeUploadButton = document.querySelector('.upload-form-cancel');
	var uploadResizeDec = document.querySelector('.upload-resize-controls-button-dec');
	var uploadResizeInc = document.querySelector('.upload-resize-controls-button-inc');
	var uploadResizeValue = document.querySelector('.upload-resize-controls-value');
	var effectField = document.querySelector('.upload-effect-controls');
	var imagePreview = document.querySelector('.effect-image-preview');
	var hashtagInput = document.querySelector('.upload-form-hashtags');
	var uploadForm = document.querySelector('.upload-form');
	var dragZone = document.querySelector('.upload-effect-level');
	var uploadPin = document.querySelector('.upload-effect-level-pin');
	var fieldDragPin = document.querySelector('.upload-effect-level-line');
	var fillValue = document.querySelector('.upload-effect-level-val');
	var moveToggle = true;
	var limit = {};

	var uploadPressEsc = function(evt) {
	if(evt.keyCode === KEY_ESC && evt.target !== document.querySelector('.upload-form-description')) {
		closeUpload();
		};
	};

	var showUpload = function() {
		useEffects();
		saturationEffect();
		imagePreview.style.transform = 'scale(' + (parseInt(uploadResizeValue.value) / 100) + ')';
		document.querySelector('.upload-overlay').classList.remove('hidden');
		document.addEventListener('keydown', uploadPressEsc);
	};

	closeUpload = function() {
		uploadForm.reset();
		document.querySelector('.upload-overlay').classList.add('hidden');
		document.removeEventListener('keydown', uploadPressEsc);
		uploadControl.click();
	};

	document.querySelector('#upload-file').addEventListener('change', showUpload);

	closeUploadButton.addEventListener('click', closeUpload);

	closeUploadButton.addEventListener('keydown', function(evt) {
		if(evt.keyCode === KEY_ENTER) {
			closeUpload();
		};
	});

	var calculationDec = function(evt) {
		if(parseInt(uploadResizeValue.value) > 25) {
			uploadResizeValue.value = (parseInt(uploadResizeValue.value) - 25) + '%';
		};
		imagePreview.style.transform = 'scale(' + (parseInt(uploadResizeValue.value) / 100) + ')';
	};

	var calculationInt = function(evt) {
		if(parseInt(uploadResizeValue.value) < 100) {
			uploadResizeValue.value = (parseInt(uploadResizeValue.value) + 25) + '%';
		};
		imagePreview.style.transform = 'scale(' + (parseInt(uploadResizeValue.value) / 100) + ')';
	};

	uploadResizeDec.addEventListener('click', calculationDec);

	uploadResizeInc.addEventListener('click', calculationInt);

	var useEffects = function() {
		var activEffect = effectField.querySelector('input:checked').defaultValue;
		imagePreview.classList.remove(imagePreview.classList[1]);
		imagePreview.classList.add('effect-' + activEffect);
	};

	effectField.addEventListener('click', useEffects);

	var getErrorFormSave = function(error) {
			alert(error);
		};

	var closeForm = function() {
		document.querySelector('.upload-overlay').classList.add('hidden');
	};

	var banInput = function(evt) {
			evt.preventDefault();
			hashtagInput.classList.add('outline-red');
		};

	var validityHashtags = function(evt) {
		evt.preventDefault();
		if(hashtagInput.value === '') {
			var data = new FormData(uploadForm);
			window.backend.save(data, closeForm, getErrorFormSave);
			uploadForm.reset();
			return;
		};
		var hashtagArray = hashtagInput.value.split(' ');
		for(var i = 0; i < hashtagArray.length; i++) {
			var hashtag = hashtagArray[i].split('');
			if (hashtag[0] !== '#' || hashtag.length > 20) {
				banInput(evt);
				return;
			};
		};
		for(var i = 0; i < hashtagArray.length; i++) {
			for(var j = i + 1; j < hashtagArray.length; j++) {
				if(hashtagArray[i].toUpperCase() === hashtagArray[j].toUpperCase()) {
					banInput(evt);
					return;
				};
			};
		};
		if(hashtagArray.length > 5) {
			banInput(evt);
			return;
		};
		var data = new FormData(uploadForm);
		window.backend.save(data, closeForm, getErrorFormSave);
		uploadForm.reset();
	};

	uploadForm.addEventListener('submit', function(evt) {
		evt.preventDefault();
		validityHashtags(evt);
	});

	var saturationEffect = function() {
				var percentPin = limit.minX / 455;
				var activEffect = effectField.querySelector('input:checked').defaultValue;
				if(activEffect === 'none') {
					imagePreview.style.filter = 'grayscale(0)';
					dragZone.classList.add('hidden');
				};			
				if(activEffect === 'chrome') {
					imagePreview.style.filter = 'grayscale(' + percentPin + ')';
					dragZone.classList.remove('hidden');
				};
				if(activEffect === 'sepia') {
					imagePreview.style.filter = 'sepia(' + percentPin + ')';
					dragZone.classList.remove('hidden');
				};
				if(activEffect === 'marvin') {
					imagePreview.style.filter = 'invert(' + (percentPin * 100) + '%)';
					dragZone.classList.remove('hidden');
				};
				if(activEffect === 'phobos') {
					imagePreview.style.filter = 'blur(' + (percentPin * 3) + 'px)';
					dragZone.classList.remove('hidden');
				};
				if(activEffect === 'heat') {
					imagePreview.style.filter = 'brightness(' + (percentPin * 3) + ')';
					dragZone.classList.remove('hidden');
				};
			};

	var dragPin = function(evt) {
		evt.preventDefault();
		var coordX = evt.clientX;

		var movePin = function(moveEvt) {
			moveToggle = false;
			limit = {
				minX: uploadPin.offsetLeft,
				maxX: fieldDragPin.offsetWidth - uploadPin.offsetLeft
			};
			shiftX = moveEvt.clientX - coordX;
			if(shiftX < 0 && limit.minX <= 0){
				shiftX = 0;
			};
			if(shiftX > 0 && limit.maxX <= 0){
				shiftX = 0;
			};

			uploadPin.style.left = (uploadPin.offsetLeft + shiftX) + 'px';
			fillValue.style.width = uploadPin.offsetLeft + 'px';

			coordX = moveEvt.clientX;
			if(parseInt(uploadPin.style.left) < 0) {
				uploadPin.style.left = 0 + 'px';
			};
			if(parseInt(uploadPin.style.left) > 455) {
				uploadPin.style.left = 455 + 'px';
			};

			saturationEffect();
			return limit;
		};

		var upPin = function() {
			document.removeEventListener('mousemove', movePin);
			document.removeEventListener('mouse0up', upPin);
			return moveToggle = true;
		};

		document.addEventListener('mousemove', movePin);
		document.addEventListener('mouseup', upPin);
	};

	var resetEffect = function(evt) {
		if(evt.target.name === 'effect') {
			uploadPin.style.left = '90px';
			fillValue.style.width = '90px';
			limit.minX = uploadPin.offsetLeft;
			saturationEffect();
		};
	};

	uploadPin.addEventListener('mousedown', dragPin);
	effectField.addEventListener('click', resetEffect);

})();