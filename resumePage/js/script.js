/** @author: Alexander Korolev */

$(function () {
    $(".j-box").each(function () {
        var lock = $(this).find(".j-box-lock"), contents = $(this).find(".j-box-contents");
        $(this).on("click", lock, function () {
            $(this).toggleClass("b-box-opened");
            contents.fadeToggle(200);
        });
    });
});