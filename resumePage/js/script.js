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
            chapters.push(new Chapter($(this).find(".j-chapter-title").text().replace(/([\r\n:]|\s{2,})/ig, ""), chapterIndex));
        });
        $(this).attr("id", "section-" + (sectionIndex + 1));
        contentsData.sections[sectionIndex] = new Section($(this).find(".j-section-title").text(), chapters);
    });

    console.log(contentsData);

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

        console.log(contentsOl);

        contentsContainer.append("<h2 class='b-contents-title'>Оглавление</h2>");
        contentsContainer.append(contentsOl);

        $("body").on("click", ".j-scroll", function (event) {
            $('body').scrollTo($($(this).attr("href")), 500, {offset : {top: -100}});
            return false;
        });
    }


    var topButton = $(".j-top_button");
    topButton.on("click", function () {
        $.scrollTo($('body'), 500, { axis:'y' });
    });

    $(window).on("scroll", function () {
        if (window.pageYOffset > 300) {
            topButton.fadeIn(200);
        } else {
            topButton.fadeOut(200);
        }
    });

    if (window.pageYOffset > 300) {
        topButton.fadeIn(200);
    } else {
        topButton.fadeOut(200);
    }
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