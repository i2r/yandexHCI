/**
 * Yandex HCI script
 * @author Alexander V. Korolev
 * @since 02.08.2012 11:21
 */

/**
 * Создает экземпляр Машины
 * @this {Car}
 * @param {string} manufacturer Производитель
 * @param {string} model Модель
 * @param {number} year Год производство
 */
function Car(manufacturer, model, year) {
	var date = new Date();

	this.manufacturer = manufacturer;
	this.model = model;
	this.year = year || date.getFullYear();
}

Car.prototype.toString = function () {
	return this.getInfo();
};

Car.prototype.getInfo = function (detailed) {
	var format = "#MF #MD #YR";
	if (detailed) {
		format = "Производитель:#MF. Модель:#MD. Год: #YR";
	}

	return format.replace("#MF", this.manufacturer).replace("#MD", this.model).replace("#YR", this.year);
};

Car.prototype.getDetailedInfo = function () {
	return this.getInfo(true);
};

var bmw = new Car("BMW", "X5", 2010),
		audi = new Car("Audi", "Q5", 2012),
		toyota = new Car("Toyota", "Camry");

// @TODO: если конструктор вызывается без указания текущего года, то подставлять текущий
// @TODO: реализовать методы вывода информации о машине:
console.log('Car: ' + bmw); // Car: BMW X5 2010
console.log(bmw.getInfo()); // BMW X5 2010
console.log(bmw.getDetailedInfo()); // Производитель: BMW. Модель: X5. Год: 2010

/**
 * Создает экземпляр Автосалона
 * @this {CarDealer}
 * @param {string} name Название автосалона
 */
function CarDealer(name) {
	this.name = name;

	/** @type {Array} */
	this.cars = [];
}
/**
 * Принимает один или множество экземпляров класса Car
 * @param {Car} carObjects
 */
CarDealer.prototype.add = function (carObjects) {
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] instanceof Car) {
			var car = arguments[i];
			car.price = {value: 0, currency: ""};
			this.cars.push(car);
		}
	}
	/*var cars = Array.prototype.slice.call(arguments, 0);
	 this.cars = this.cars.concat(cars);*/
	return this;
};

/**
 * Установка цены машины, создается объект
 * @param {String} carName строковое представление машины "Марка Модель Год"
 * @param {String} priceString строковое представление цены "ВалютаКоличество"
 */
CarDealer.prototype.setPrice = function (carName, priceString) {
	var priceRegEx = /(€|¥).*?(\d+)/;

	for (var i = 0; i < this.cars.length; i++) {
		if (this.cars[i].getInfo() == carName && priceRegEx.test(priceString)) {
			var price = priceRegEx.exec(priceString);
			this.cars[i].price = {
				currency: price[1],
				value   : price[2],
				toString: function () {
					return this.currency + this.value;
				}
			};
		}
	}

	return this;
};

// yandex -> carDealer

var carDealer = new CarDealer('Яндекс.Авто');

// @TODO: реализовать метод добавления машин в автосалон. Предусмотреть возможность добавления одной машины, нескольких машин.
carDealer
		.add(toyota)
		.add(bmw, audi);

// @TODO: реализовать метод установки цены на машину
/**
 * Установить цену на машину
 * @param {string} car идентификатор машины
 * @param {string} price стоимость
 */
	// идентификатор машины составляется следующим образом "производитель модель год"
	// стоимость машины может быть задана в двух валютах: йена и евро.
carDealer
		.setPrice('BMW X5 2010', '€2000')
		.setPrice('Audi Q5 2012', '€3000')
		.setPrice('Toyota Camry 2012', '¥3000');

// @TODO: реализовать вывод списка автомобилей в продаже, с фильтрацией по стране производителю, используя метод getCountry:

Car.prototype.getCountry = function () {
	switch (this.manufacturer.toLowerCase()) {
		case 'bmw':
		case 'audi':
			return 'Germany';

		case 'toyota':
			return 'Japan';
	}
};

/**
 * Удиный метод для получения списка машин с необязательным параметром
 * @param country
 * @return {Array}
 */
CarDealer.prototype.getList = function (country) {
	var carInfoList = [];
	var countryRegEx;

	if (country) {
		countryRegEx = new RegExp(country, "i");
	} else {
		countryRegEx = /.*/;
	}

	for (var i = 0; i < this.cars.length; i++) {
		if (countryRegEx.test(this.cars[i].getCountry())) {
			carInfoList.push(this.cars[i].getInfo());
		}
	}

	return carInfoList;
};

/**
 * Вывод строки со списком машин
 * @return {String}
 */
CarDealer.prototype.list = function () {
	var list = this.getList().join(", ");
	console.log(list);
	return list;
};

carDealer.list(); //BMW X5 2010, Audi Q5 2012, Toyota Camry 2012 ну почти =)

/**
 * Вывод строки машин отобранных по стране
 * @param country
 * @return {String}
 */
CarDealer.prototype.listByCountry = function (country) {
	var list = this.getList(country).join(", ");
	console.log(list);
	return list;
};

carDealer.listByCountry('Germany'); //BMW X5 2010, Audi Q5 2012

// @TODO: бонус! выводить список машин с ценой в рублях.

/**
 * Вывод строки с ценами
 * @return {Array}
 */
CarDealer.prototype.listPrices = function () {
	var carInfoListWPrices = [];

	for (var i = 0; i < this.cars.length; i++) {
		var car = this.cars[i];
		var rublePrice = 0;

		// я думаю тут не нужно было писать AJAX-получение курса валют?)

		if (car.price.currency == "€") {
			rublePrice = car.price.value * 39.824;
		} else {
			rublePrice = car.price.value * 0.414;
		}

		carInfoListWPrices.push(car.getInfo() + " " + car.price + " (" + rublePrice + "rur)" );
	}

	console.log(carInfoListWPrices.join(", "));

	return carInfoListWPrices;
};

carDealer.listPrices();