/** @author: Alexander Korolev */

$(function () {

	/**
	 * "Выпадающий" контейнер
	 */
	$(".j-box").each(function () {
		var lock = $(this).find(".j-box-lock"),
			contents = $(this).find(".j-box-contents");
		$(this).on("click", lock, function () {
			$(this).toggleClass("b-box-opened");
			contents.fadeToggle(200);
		});
	});

	/**
	 * Оглавление
	 */

	var contentsContainer = $(".j-contents"), contentsData = new Contents();

	$(".j-section").each(function (index) {
		var chapters = [];
		$(this).find(".j-chapter").each(function (index) {
			chapters.push(new Chapter($(this).find(".j-chapter-title").text().replace(/([\r\n:]|\s{2,})/ig,""), index));
		});
		contentsData.sections[index] = new Section($(this).find(".j-section-title").text(), chapters);
	});

	console.log(contentsData);

});

/**
 * @class
 * @constructor
 */
function Contents(sections) {
	/**
	 * @type {Section[]}
	 */
	this.sections = sections || [];
}

/**
 * @class
 * @constructor
 */
function Section(name, chapters) {
	/**
	 * @type {String}
	 */
	this.name = name || "";

	/**
	 * @type {Chapter[]}
	 */
	this.chapters = chapters || [];
}

/**
 * @param name
 * @constructor
 */
function Chapter(name, position) {
	/**
	 * @type {String}
	 */
	this.name = name || "";

	/**
	 * @type {Number}
	 */
	this.position = position || 0;
}