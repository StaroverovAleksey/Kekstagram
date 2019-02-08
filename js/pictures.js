var KEY_ENTER = 13;
var KEY_ESC =27;
var commentsArray = [
'Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var photoOverlay = document.querySelector('.gallery-overlay');
var photos = [];
PHOTOS_AMOUNT = 25;
var parent;
var closeOverlayButton = document.querySelector('.gallery-overlay-close');
var closeUploadButton = document.querySelector('.upload-form-cancel');
var uploadResizeDec = document.querySelector('.upload-resize-controls-button-dec');
var uploadResizeInc = document.querySelector('.upload-resize-controls-button-inc');
var uploadResizeValue = document.querySelector('.upload-resize-controls-value');
var effectField = document.querySelector('.upload-effect-controls');
var imagePreview = document.querySelector('.effect-image-preview');
var hashtagInput = document.querySelector('.upload-form-hashtags');
var uploadForm = document.querySelector('.upload-form');

var randomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};

var generateFotos = function (photosAmount) {
	for (var i = 0; i < photosAmount; i++) {
		photos[i] = {};
		photos[i].url = 'photos/' + (i + 1) + '.jpg';
		photos[i].likes = randomNumber (15, 201);
		photos[i].comments = [];
		for (var j = 0; j <= randomNumber(0, 2); j++) {
			photos[i].comments[j] = commentsArray[randomNumber (0, commentsArray.length)];
		};
	};
	return photos;
};
generateFotos (PHOTOS_AMOUNT);

var createTemplate = function (photosAmount) {
		var templateCopy = document.querySelector('#picture-template').content.cloneNode(true);
		templateCopy.querySelector('.picture-image').src = photos[photosAmount].url;
		templateCopy.querySelector('.picture-likes').textContent = photos[photosAmount].likes;
		for (var i = 0; i < photos[photosAmount].comments.length; i++) {
			var comment = document.createElement('p');
			comment.textContent = photos[photosAmount].comments[i];
			templateCopy.querySelector('.picture-comments').appendChild(comment);
		};
		return templateCopy;
};

var fillingTemplate = function (photosAmount) {
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < photosAmount; i++) {
		fragment.appendChild(createTemplate(i));
	};
	document.querySelector('.pictures').appendChild(fragment);
};
fillingTemplate (PHOTOS_AMOUNT);

var overlayPressEsc = function(evt) {
	if(evt.keyCode === KEY_ESC) {
		closeOverlay();
	};
}

var showOverlay = function(evt) {
	parent = evt.target;
	while (parent.localName !== 'a') {
		parent = parent.parentNode;
		console.log(parent);
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

var uploadPressEsc = function(evt) {
	if(evt.keyCode === KEY_ESC && evt.target !== document.querySelector('.upload-form-description')) {
		closeUpload();
	}
};

var showUpload = function() {
	document.querySelector('.upload-overlay').classList.remove('hidden');
	document.addEventListener('keydown', uploadPressEsc);
};

closeUpload = function() {
	document.querySelector('.upload-overlay').classList.add('hidden');
	document.removeEventListener('keydown', uploadPressEsc);
	document.querySelector('#upload-file').click();
}

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

var banInput = function(evt) {
	evt.preventDefault();
	hashtagInput.classList.add('outline-red');
};

var validityHashtags = function(evt) {
	if(hashtagInput.value === '') {
		uploadForm.submit();
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
	uploadForm.reset();
};

uploadForm.addEventListener('submit', validityHashtags);