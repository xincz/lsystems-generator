$(function () {
    // 语言切换动画效果
    $(".lang-box").hover(function () {
        $(this).css({
            'cursor': 'pointer'
        });
        $(this).stop().animate({
            'background-color': '#E6E6FA',
            'color': '#6A5ACD'
        });
    });

    $(".lang").mouseleave(function () {
        $(".lang-select").slideUp('fast', function () {
            $(".lang-box").animate({
                'background-color': '#6A5ACD',
                'color': 'white'
            }, 200);
        });
    });

    $(".lang-box").click(function () {
        $(".lang-select").stop().slideToggle(300);
    });

    $(".lang-select li").hover(function () {
        $(this).animate({
            'background-color': '#E6E6FA'
        }, 'fast');
    }, function () {
        $(this).animate({
            'background-color': '#E6E6FA'
        }, 'fast');
    });

    $(".lang-select li").click(function () {
        $(".lang-select").slideUp('fast', function () {
            $(".lang-box").animate({
                'background-color': '#6A5ACD',
                'color': 'white'
            });
        });
    });


    // 搜索栏动画效果
    $(".search button").hover(function () {
        $(".search button").animate({
            'background-color': '#E6E6FA',
            'color': '#483D8B'
        })
    }, function () {
        $(".search button, .search input").animate({
            'background-color': '#483D8B',
            'color': '#fff'
        })
    });

    $(".search button").click(function () {
        $(".search input").css("background-color", "#fff");
        $(".search input").stop().animate({
            width: 'toggle',
            'background-color': '#483D8B',
            'color': '#fff'
        }, 300);
    });

    // 导航栏动画效果
    $(".header nav ul li a").hover(function () {
        $(this).stop().animate({
            'background-color': '#E6E6FA',
            'color': '#6A5ACD'
        })
    }, function () {
        $(this).stop().animate({
            'background-color': '#6A5ACD',
            'color': '#FFF'
        })
    }, 200);

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $(".goto-top").fadeIn("fast");
        } else {
            $(".goto-top").fadeOut("fast");
        }
    })
})

window.addEventListener('load', function () {
    var gotoTop = document.querySelector('.goto-top');

    gotoTop.addEventListener('click', function () {
        animateY(window, 0);
    })

    function animateY(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            window.scroll(0, window.pageYOffset + step);
        }, 15);
    }
})