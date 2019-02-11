(function(){

	var photos = [];
	var commentsArray = [
		'Всё отлично!',
		'В целом всё неплохо. Но не всё.',
		'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
		'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
		'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
		'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
	];
	PHOTOS_AMOUNT = 25;

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

	window.data = {
		photos: photos,
		randomNumber: randomNumber,
		photosAmount: PHOTOS_AMOUNT
	};

})();