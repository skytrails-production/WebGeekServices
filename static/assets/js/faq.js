var firstCategory = $('.category-heading li:first-child').get(0).id;

$(document).ready(function () {
    $(".category-heading li:first-child").addClass('selected').siblings().removeClass('selected');
    $(".category-heading li:first-child").addClass('active').siblings().removeClass('active');

    $(".category-heading ul li span:first-child").each(function () {
        var icon = $(this).attr("class");
        $(this).attr('data-content', icon);
    });

    $('.result').each(function () {
        if (this.id != '' || this.id == firstCategory) {
            $(this).removeAttr("style");
            $(this).attr("style", "display:block;");
        }
    });

    ShowNoCategoryBasedOnCategorySelected(firstCategory);

    LoadFAQBasedOnCategory(firstCategory);

    $('#clear').click(function () {
        $('#txtFAQSearchContent').val('');
        $('#dvNoResultsFound').hide();
        onReload();
        if ($('#txtFAQSearchContent').val() === '') {
            onReload();
            $("#clear").hide();
            var firstCategory = $('.category-heading li:first-child').get(0).id;
            ShowNoCategoryBasedOnCategorySelected(firstCategory);

        } else {
            $("#clear").show();
        }
    });

    $("#clear").hide();

    $('#txtFAQSearchContent').click(function () {
        $("#clear").show();
    });

    if ($('.category-heading ul').find("li").length > 1) {
        $(".category-heading ul").attr("style", "justify-content:space-around");
    } else { $(".category-heading ul").attr("style", "justify-content:left"); }
});

var format = function (str, col) {
    col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);

    return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m == "{{") { return "{"; }
        if (m == "}}") { return "}"; }
        return col[n];
    });
};

function onReload() {
    $('#txtFAQSearchContent').val('');
    $(".dvCategoryHeading").attr("style", "display:block;");
    $('#dvResultCount').attr("style", "display:none;");
    $('#dvResultCount').hide();
    $("#clear").hide();
    $('#dvNoResultsFound').hide();
    $('.panel-collapse').removeClass("in");
    $(".accordion-toggle.plus-minus").addClass("collapsed");   

    $('.result').each(function () {
        $(this).attr("style", "display:block;");
    });

    $('.nosubcategory').each(function () {
        $(this).removeAttr("style");
        $(this).attr("style", "display:block;");
    });

    $('#dvCategoryResults > .container > .panel > .panel-heading').each(function (index) {
        $('.faqresults').hide();
        $('#dvResultCount').hide();
        ShowNoCategoryBasedOnCategorySelected(firstCategory);
        $(this).next().find('.subcategoryResults').show();

        if ($(this).attr('data-filter') != firstCategory) {
            $('.subcategoryResults').removeClass("in");
        }

        if ($(this).attr('data-filter') == firstCategory) {
            $(this).removeAttr("style");
            $(this).attr("style", "display:block");

            $(".category-heading li:first-child").addClass('selected').siblings().removeClass('selected');
            $(".category-heading li:first-child").addClass('active').siblings().removeClass('active');
            $(".subcategoryHeading").addClass("collapsed");
        }
    });
}

function LoadMoreFaQs() {
    ClearCategoryFilter();
    $("#hdnFAQCount").val($("#hdnFAQCount").val() * 2);
    for (var iCounter = 1; iCounter <= $("#hdnFAQCount").val(); iCounter++) {
        $("#faq" + iCounter).show();
    }
    if ($("#hdnFAQCount").val() >= $("#hdnFAQTotalCount").val()) {
        $("#lnkFAQLoadMore").hide();
    }
    return false;
}

function SearchFAQData() {
    $('.subcategoryHeading').removeAttr("style");
    $('.subcategoryHeading').attr("style", "display:none;");
    $('.dvCategoryHeading').hide();
    $('.faqresults').show();
    $('#dvNoResultsFound').hide();
    $('#dvResultCount').hide();
    $('.subcategoryResults').removeClass("in");

    $("#accordion .result").each(function (index) {
        if (($(this).html().toString().toLowerCase().indexOf($('#txtFAQSearchContent').val().toString().toLowerCase()) > -1)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });

    $('.nosubcategory').each(function () {
        $(this).removeAttr("style");
        $(this).attr("style", "display:none;");
    });

    var divCount = 0;
    var resultCount = 0;
    $('.faqresults .result').each(function () {
        var style = $(this).attr("style");
        if (style == "display: none;") {
            divCount += 1;
        } else
            resultCount += 1;
    });


    if ($('#txtFAQSearchContent').val() === '') {
        onReload();
        ShowNoCategoryBasedOnCategorySelected(firstCategory);
    }

    if (divCount == $('#hdnFAQTotalCount').val()) {
        $('#dvResultCount').removeAttr("style");
        $('#dvResultCount').attr("style", "display:none;");
        $('#dvNoResultsFound').removeAttr("style");
        $('#dvNoResultsFound').attr("style", "display:block;");
        $('#dvNoResultsFound').html(format($('#hdnNoResultsFound').val(), { 0: $('#txtFAQSearchContent').val(), 1: '<a style="cursor: pointer;" onclick="onReload()">', 2: '</a>' }));
    } else {
        $('#dvNoResultsFound').removeAttr("style");
        $('#dvNoResultsFound').attr("style", "display:none;");
        $('#dvResultCount').removeAttr("style");
        $('#dvResultCount').attr("style", "display:block;");
        $('#dvResultCount').text(format($('#hdnResultCount').val(), { 0: resultCount }));

        if ($('#txtFAQSearchContent').val() === '') {
            $('#dvResultCount').text('');
            $('#dvResultCount').hide();
        }
    }

    $("#accordion .result .panel-collapse").each(function (index) {
        if ($('#txtFAQSearchContent').val() != "") {
            $(".category-heading").addClass('active').siblings().removeClass('active');
            $(".category-heading li:first-child").addClass('selected').siblings().removeClass('selected');
            $(".category-heading li:first-child").addClass('active').siblings().removeClass('active');
        }
    });

    return false;
}

$("#txtFAQSearchContent").on('keyup', function (e) {
    var keycode = e.which;

    if (keycode == 13) {
        SearchFAQData();
    }
});

$("#txtFAQSearchContent").blur(function () {
    if ($('#txtFAQSearchContent').val() === '') {
        $("#clear").hide();
        onReload();
    } else {
        $("#clear").show();
    }
});

$(".category-heading li").on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $(".subcategoryHeading").addClass("collapsed");
    $(".accordion-toggle.plus-minus").addClass("collapsed");

    if ($(this).addClass('active')) {
        $(this).addClass('selected').siblings().removeClass('selected');
    }
});

function LoadFAQBasedOnCategory(category) {

    ShowNoCategoryBasedOnCategorySelected(category);

    var categoryIds = [];
    $(".category-heading li").each(function () {
        categoryIds.push($(this).attr('data-filter'));
    });

    $('#dvCategoryResults > .container > .panel > .panel-heading').each(function () {
        $(this).attr("style", "display:block");
        $('.panel-collapse').removeClass("in");

        if ($(this).attr('data-filter') != '' && $(this).attr('data-filter') != category) {
            $(this).removeAttr("style");
            $(this).attr("style", "display:none");
        } else {
            $(this).attr("style", "display:block;");
        }
    });

    $("#clear").hide();
}

function ClearCategoryFilter() {
    $('.result').each(function () {
        $(this).attr("style", "display:block;");
    });
}

function ShowNoCategoryBasedOnCategorySelected(category) {
    $('.nosubcategory .result').each(function () {
        if (this.id != '' && this.id == category) {
            $(this).removeAttr("style");
            $(this).attr("style", "display:block;");
        } else {
            $(this).removeAttr("style");
            $(this).attr("style", "display:none;");
        }
    });
}