(function() {

	var renderPhoto = function(data) {
		var fragment = document.createDocumentFragment();
		for(var i = 0; i < 25; i++) {
			var templateCopy = document.querySelector('#picture-template').content.cloneNode(true);
			templateCopy.querySelector('.picture-image').src = data[i].url;
			templateCopy.querySelector('.picture-likes').textContent = data[i].likes;
			templateCopy.querySelector('.picture-comments').textContent = data[i].comments[0].message;

			for (var j = 1; j < data[i].comments.length - 1; j++) {
				var comment = document.createElement('span');
				comment.textContent = data[i].comments[j].massage;
				templateCopy.querySelector('.picture-stats').appendChild(comment);
			};

			fragment.appendChild(templateCopy);
			console.dir(fragment);
		};
		document.querySelector('.pictures').appendChild(fragment);
	};

	var getError = function(error) {
		alert(error);
	};

	window.backend.load(renderPhoto, getError);

})();
