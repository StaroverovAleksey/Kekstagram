(function() {

	var createTemplate = function (photosAmount) {
			var templateCopy = document.querySelector('#picture-template').content.cloneNode(true);
			templateCopy.querySelector('.picture-image').src = window.data.photos[photosAmount].url;
			templateCopy.querySelector('.picture-likes').textContent = window.data.photos[photosAmount].likes;
			for (var i = 0; i < window.data.photos[photosAmount].comments.length; i++) {
				var comment = document.createElement('p');
				comment.textContent = window.data.photos[photosAmount].comments[i];
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
	fillingTemplate (window.data.photosAmount);

})();
