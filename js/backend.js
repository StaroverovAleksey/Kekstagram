'use strict';

(function() {

	var load = function(onLoad, onError) {
		var url = 'https://js.dump.academy/kekstagram/data';
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.addEventListener('load', function() {
			var error;
			if(xhr.status === 200) {
				onLoad(xhr.response);
			} else {
				error = xhr.status + xhr.statusText;
				onError(error);
			};
		});
		xhr.addEventListener('error', function() {
			onError(xhr.status + xhr.statusText);
		});
		xhr.addEventListener('timeout', function() {
			onError('Сервер не отвечает');
		});
		xhr.open('GET', url);
		xhr.send();
	};

	var save = function(data, onLoad, onError) {
		var url = 'https://js.dump.academy/kekstagram';
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.addEventListener('load', function() {
			var error;
			if(xhr.status === 200) {
				onLoad();
			} else {
				error = xhr.status + xhr.statusText;
				onError(error);
			};
		});
		xhr.addEventListener('error', function() {
			onError(xhr.status + xhr.statusText);
		});
		xhr.addEventListener('timeout', function() {
			onError('Сервер не отвечает');
		});
		xhr.open('POST', url);
		xhr.send(data);
	};

	window.backend = {
		load: load,
		save: save
	};

})();