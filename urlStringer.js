const setRegionPath = reg => {
	return '/' + reg.replace(' ', '-').toLowerCase() + '/';
};

const setDescPath = (nob, type) => {
	if (!(nob === undefined || nob === '')) {
		if (!(type === undefined || type === '')) {
			return nob + '-bedroom-' + type.replace(' ', '-').toLowerCase();
		} else {
			return nob + '-bedroom';
		}
	} else {
		if (!(type === undefined || type === '')) {
			return type.replace(' ', '-').toLowerCase();
		} else {
			return '';
		}
	}
};

const joinQS = arr => {
	return arr.join('&');
};

const setMaxPriceQS = maxprice => {
	return 'max-price=' + maxprice;
};

const setMinPriceQS = minprice => {
	return 'min-price=' + minprice;
};

const setClassQS = _class => {
	if (_class[0].isChecked) {
		if (_class[1].isChecked) {
			return 'class=stay-and-regular';
		} else {
			return 'class=stay';
		}
	} else {
		if (_class[1].isChecked) {
			return 'class=regular';
		} else {
			return '';
		}
	}
};

const setQueryQS = q => {
	return 'q=' + q;
};

export const createPath = Filters => {
	return (
		setRegionPath(Filters.region) +
		setDescPath(Filters.no_of_bedrooms, Filters.property_type)
	);
};

export const createQS = (Filters, price_range = false) => {
	var _class = setClassQS(Filters.property_class);
	var arr = [setQueryQS(Filters.town)];
	if (price_range) {
		arr.push(setMaxPriceQS(Filters.price_max));
		arr.push(setMinPriceQS(Filters.price_min));
	}
	if (!(_class === '')) {
		arr.push(_class);
	}
	console.log(arr);
	return joinQS(arr);
};

export const urlStringer = (Filters, price_range = false) => {
	return createPath(Filters) + '?' + createQS(Filters, price_range);
};
