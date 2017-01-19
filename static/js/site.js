var $menuToggle = $('#js-menu-toggle'),
    $menuParent = $menuToggle.parents('.menu'),
    $document = $(document),
    $window = $(window),
    $body = $('body');

function setEvent() {
    $menuToggle.on('click', function () {
        $menuParent.toggleClass('menu-expand');
    });
    $document.on('click', function (event) {
        if ($menuParent.hasClass('menu-expand')){
            if ($menuParent[0] != event.target && !$.contains($menuParent[0], event.target)){
                $menuParent.removeClass('menu-expand');
            }
        }
    });
}

function setBack2Top() {
    var $trigger = $('<div class="backToTop icon icon-up-big"></div>');
    $body.append($trigger);

    $window.on('scroll', debounce(function() {
        if ($body.scrollTop() > 0) {
            $trigger.css('display', 'block');
        } else {
            $trigger.css('display', 'none');
        }
    }, 250));

    $document.on('click', '.backToTop', function() {
        document.body.scrollTop = 0;
    });
}

function debounce(action, delay) {
    var last;
    return function() {
        var ctx = this,
            args = arguments;
        clearTimeout(last);

        last = setTimeout(function() {
            action.apply(ctx, args);
        }, delay);
    };
}

function setImages() {
    if ($('img').length > 0){
        $('img').addClass('lazy');
        var imgArr = $('img'),
            img = '/static/imgs/empty.jpg';
        imgArr.each(function (i) {
           var self = $(this),
               imgSrc = self.attr('src');
           self.attr('data-original', imgSrc)
               .attr('src', img);
        });
    }
}

function loadImage() {
    $("img.lazy").lazyload({
        placeholder : "/static/imgs/empty.jpg",
        threshold :200
    });
}

function init() {
    setEvent();
    setBack2Top();
    setImages();
    loadImage();
}

init();
