/** @author: Alexander Korolev */

$(function () {

	/**
	 * "Выпадающий" контейнер
	 */
	$(".j-box").each(function () {
		var lock = $(this).find(".j-box-lock"),
			contents = $(this).find(".j-box-contents");
		lock.on("click", function () {
			$(this).toggleClass("b-box-opened");
			contents.fadeToggle(200);
		});
	});

	/**
	 * Оглавление
	 */

	var contentsContainer = $(".j-contents"), contentsData = new Contents();

	/**
	 * Формирование объекта для оглавления
	 */
	$(".j-section").each(function (sectionIndex) {
		var chapters = [];
		$(this).find(".j-chapter").each(function (chapterIndex) {
			$(this).attr("id", "chapter-" + (sectionIndex + 1) + "-" + (chapterIndex + 1));
			chapters.push(new Chapter($(this).find(".j-chapter-title").text().replace(/:/ig, ""), chapterIndex));
		});
		$(this).attr("id", "section-" + (sectionIndex + 1));
		contentsData.sections[sectionIndex] = new Section($(this).find(".j-section-title").text(), chapters);
	});

	/**
	 * Вывод оглавления
	 */

	if (contentsData.sections.length > 0) {

		var contentsOl = $("<ol />");

		$.each(contentsData.sections, function (sectionIndex, section) {
			var sectionOl = $("<ol />");
			$.each(section.chapters, function (chapterIndex, chapter) {
				var chapterLi = $("<li class='b-contents-chapter'><a class='j-scroll' href='#chapter-" + (sectionIndex + 1) + "-" + (chapterIndex + 1) + "'>" + chapter.title + "</a></li>");
				sectionOl.append(chapterLi);
			});
			var sectionLi = $("<li class='b-contents-section'><a class='j-scroll' href='#section-" + (sectionIndex + 1) + "'>" + section.title + "</a></li>");
			sectionLi.append(sectionOl).appendTo(contentsOl);
		});

		contentsContainer.append("<h2 class='b-contents-title'>Оглавление</h2>");
		contentsContainer.append(contentsOl);

		$("body").on("click", ".j-scroll", function (event) {
			$('body').scrollTo($($(this).attr("href")), 500, {offset:{top:-100}});
			return false;
		});

		var scrollHeight = contentsContainer.height() + 18;
		var floatingContents = contentsContainer.clone();
		floatingContents.addClass("g-floating");
		floatingContents.addClass("j-accordion")
			.find(".b-contents-section")//.addClass("j-accordion-section")
			.find("ol").addClass("j-accordion-contents")
			.before("&#160;<span class='j-accordion-key b-accordion-key'></span>");

		$(".l-wrapper").prepend(floatingContents);

		$(".j-accordion-key").on("click",function () {
			if (!$(this).hasClass("g-accordion-current")) {
				$(".j-accordion-contents").slideUp("slow");
				$(".g-accordion-current").removeClass("g-accordion-current");
				$(this).addClass("g-accordion-current").next(".j-accordion-contents").slideToggle("slow");
			} else {

			}
			return false;
		}).next().hide();
	}


	var topButton = $(".j-top_button");

	/**
	 *  Значение [0] - видимость кнопки "наверх", значение [1] - видимость плавающего оглавления (0 - невидимо, 1 - видимо)
	 * @type {Array}
	 */
	function onWindowScroll() {

		var scrollProperty;
		if (window.pageYOffset == null) {
			scrollProperty = document.documentElement.scrollTop;
		} else {
			scrollProperty = window.pageYOffset;
		}

		if (scrollProperty > 300) {
			if (!topButton.is(":visible")) {
				topButton.fadeIn(200);
			}
		} else {
			topButton.fadeOut(200);
		}

		if (contentsData.sections.length > 0 && scrollProperty > scrollHeight) {
			if (!floatingContents.is(":visible")) {
				floatingContents.fadeIn(500);
			}
			floatingContents.css({
				top: scrollProperty + 15
			})
		} else {
			floatingContents.hide();
		}
	}

	topButton.on("click", function () {
		$.scrollTo($('body'), 500, { axis:'y' });
	});

	$(window).on("scroll", function () {
		onWindowScroll();
	});

	onWindowScroll();

	/**
	 * Совместимость
	 */

	$(".b-section:last-child").addClass("last-child");
});

/**
 * @class Оглавление
 * @param {Array.<Section>=}
	* @constructor
 */
function Contents(sections) {
	/**
	 * @type {Array.<Section>}
	 */
	this.sections = sections || [];
}

/**
 * @class Раздел оглавления
 * @param {String} title
 * @param {Array.<Chapter>} chapters
 * @constructor
 */
function Section(title, chapters) {
	/**
	 * @type {String}
	 */
	this.title = title || "";

	/**
	 * @type {Array.<Chapter>}
	 */
	this.chapters = chapters || [];
}

/**
 * @class Глава
 * @param {String} title
 * @param {Number=} position
 * @constructor
 */
function Chapter(title, position) {
	/**
	 * @type {String}
	 */
	this.title = title || "";

	/**
	 * @type {Number}
	 */
	this.position = position || 0;
}