var commentsArray = [
'Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var photoOverlay = document.querySelector('.gallery-overlay');
var fotos = [];

var randomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};

var generateFotos = function (fotosAmount) {
	for (var i = 0; i < fotosAmount; i++) {
		fotos[i] = {};
		fotos[i].url = 'photos/' + (i + 1) + '.jpg';
		fotos[i].likes = randomNumber (15, 201);
		fotos[i].comments = [commentsArray[randomNumber (0, commentsArray.length)]];
		if (randomNumber (0, 2) > 0) {
			fotos[i].comments[1] = commentsArray[randomNumber (0, commentsArray.length)];
		}
	};
	return fotos;
};
generateFotos (25);

var createTemplate = function (fotosAmount) {
		var templateCopy = document.querySelector('#picture-template').content.cloneNode(true);
		templateCopy.querySelector('.picture-image').src = fotos[fotosAmount].url;
		templateCopy.querySelector('.picture-likes').textContent = fotos[fotosAmount].likes;
		templateCopy.querySelector('.picture-comments').textContent = fotos[fotosAmount].comments;
		return templateCopy;
};

var fillingTemplate = function (fotosAmount) {
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < fotosAmount; i++) {
		fragment.appendChild(createTemplate(i));
	};
	document.querySelector('.pictures').appendChild(fragment);
};
fillingTemplate (25);

photoOverlay.classList.remove('hidden');
photoOverlay.querySelector('.gallery-overlay-image').src = fotos[0].url;
photoOverlay.querySelector('.likes-count').textContent = fotos[0].likes;
photoOverlay.querySelector('.comments-count').textContent = fotos[0].comments.length;

console.log(fotos);