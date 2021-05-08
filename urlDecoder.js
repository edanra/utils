const queryString = require('query-string');

const capitalizeTheFirstLetterOfEachWord = words => {
	var separateWord = words.toLowerCase().split(' ');
	for (var i = 0; i < separateWord.length; i++) {
		separateWord[i] =
			separateWord[i].charAt(0).toUpperCase() +
			separateWord[i].substring(1);
	}
	return separateWord.join(' ');
};

const query_string_values = search => {
	var qs = queryString.parse(search);
	return qs;
};

const filterDesc = descStr => {
	if (!(descStr === undefined)) {
		var arr = descStr.split('-');
		var res = [];
		if (arr[1] === 'bedroom' || arr[1] === 'bedrooms') {
			if (arr[2] === 'guest') {
				arr[2] = arr.slice(2, 4).join(' ');
			}
			arr[2] = capitalizeTheFirstLetterOfEachWord(arr[2]);
			res[0] = arr[0];
			res[1] = [
				'Apartment',
				'Guest House',
				'Hostel',
				'Hotel',
				'House',
			].includes(arr[2])
				? arr[2]
				: '';
		} else {
			if (arr[0] === 'guest') {
				arr[0] = arr.slice(0, 2).join(' ');
			}
			arr[0] = capitalizeTheFirstLetterOfEachWord(arr[0]);
			res[0] = '';
			res[1] = [
				'Apartment',
				'Guest House',
				'Hostel',
				'Hotel',
				'House',
			].includes(arr[0])
				? arr[0]
				: '';
		}
		return res;
	} else {
		return ['', ''];
	}
};

const extractClass = qs => {
	console.log(qs['class']);
	var _class = qs['class'] === undefined ? false : qs['class'];
	console.log(_class);
	if (!(_class === false)) {
		var temp = _class.split('-');
		_class = [temp.includes('stay'), temp.includes('regular')];
		return _class;
	}
	return [false, false];
};

export const qsValues = qs => {
	var values = query_string_values(qs);
	values['max-price'] = Number(
		!(values['max-price'] === undefined) ? values['max-price'] : 50000,
	);
	values['min-price'] = Number(
		!(values['min-price'] === undefined) ? values['min-price'] : 50,
	);
	values.q = !(values.q === undefined) ? values.q : '';
	values.class = extractClass(values);
	return values;
};

export const extractRegion = str => {
	var rx = /\/(\w+-*\w+)\/*/g;
	var arr = rx.exec(str);
	arr[1] = arr[1].replace('-', ' ');
	return capitalizeTheFirstLetterOfEachWord(arr[1]);
};

export const extractNoBedrooms = pathDesc => {
	return filterDesc(pathDesc)[0];
};

export const extractPropertyType = pathDesc => {
	return filterDesc(pathDesc)[1];
};
