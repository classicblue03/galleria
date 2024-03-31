$(function () {
    let curr = $(this).scrollTop(); //현재스크롤바의 위치


    // 스크롤시 gnb
    $(window).scroll(function () {
        curr = $(this).scrollTop();
        gnb = $('.header .gnb').innerHeight();

        if (curr > gnb) {
            $('.header .gnb').addClass('fixed')
        } else {
            $('.header .gnb').removeClass('fixed')
        }
    })
    $(window).trigger('scroll');


    // 실시간 검색어 히든메뉴
    $('.sc-realtime .group-time .btn-arrow').click(function (e) {
        e.preventDefault();
        // $(this).next().slideToggle();

        $('.sc-realtime .group-time').toggleClass('hide');
        $('.sc-realtime .hidden-menu').stop().slideToggle('on');
        $(this).find('.icon').toggleClass('active');
    });


    // header 돋보기 아이콘
    $('.header .group-flex .btn-search').click(function (e) {
        e.preventDefault();
        $('body').addClass('hidden')
        $('.hd-hidden').addClass('on');
    })


    // header 돋보기 아이콘 클릭시, 히든메뉴
    $('.hd-hidden .btn-close').click(function (e) {
        e.preventDefault();
        $('body').removeClass('hidden')
        $('.hd-hidden').removeClass('on');
    })


    // header 돋보기 아이콘 클릭시, 히든메뉴 슬라이드
    hiddenmenuSlide = new Swiper('.hd-hidden .group-slide .swiper', {
        slidesPerView: 1.2,
        spaceBetween: 12,
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        // breakpoints: {
        //     768: {
        //         slidesPerView: 1.1
        //     },
        // }
    });


    // 1. 메인슬라이드 배경
    visualSlide1 = new Swiper('.visual-slide1', {
        effect: 'fade'
    })
    // 2. 메인슬라이드 이미지
    visualSlide2 = new Swiper('.visual-slide2', {
        loop: true
    });
    // 3. 메인슬라이드 텍스트
    visualSlide3 = new Swiper('.visual-slide3', {
        touchRatio: 0,
        effect: 'fade',
        loop: true,
        pagination: {
            el: '.num',
            type: 'fraction'
        }
    });

    visualSlide2.on('slideChange', function () {
        visualSlide1.slideToLoop(this.realIndex)
        visualSlide3.slideToLoop(this.realIndex)
    });


    // 메인슬라이드 재생/멈춤
    $('.sc-visual .btn-autoplay').click(function () {
        if ($(this).hasClass('on')) {
            visualSlide2.autoplay.start()
        } else {
            visualSlide2.autoplay.stop()
        }
        $(this).toggleClass('on')
    });


    // 메인슬라이드 + 버튼 클릭 시 스크롤 메뉴 block
    $('.sc-visual .fraction').click(function (e) {
        e.preventDefault();
        $('.visual-scroll').addClass('on');
        $('.sc-visual .visual-slide1').addClass('index');
        $('body').addClass('hidden')
    })
    $('.visual-scroll .btn-close').click(function (e) {
        e.preventDefault();
        $('.visual-scroll').removeClass('on');
        $('.sc-visual .visual-slide1').removeClass('index');
        $('body').removeClass('hidden')
    });


    /* 
        고객님을 위한 추천상품
        금주의 신상품
        최근 1시간 동안 많이 팔린 상품
        위시리스트 인기 상품
        주간 인기상품
    */

    basicSlide = new Swiper('.basic-slide', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    // 갤러리아 딜 Pagination
    dealSlide = new Swiper('.sc-deal .deal-slide', {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    iconSlide = new Swiper('.sc-icon .icon-slide', {
        slidesPerView: 'auto',
        freeMode: true
    });


    // NEW & HOT
    aesopSlide = new Swiper('.sc-newhot .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        freeMode: true,
    });


    // 실시간 검색어 Mousewheel control
    // https://codesandbox.io/p/sandbox/lbej0o?file=%2Findex.html%3A66%2C9
    realtimeSlide = new Swiper(".realtime-slide", {
        direction: "vertical",
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: false,
    });


    // 배너 슬라이드
    bannerSlide = new Swiper('.sc-banner .banner-slide', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.fraction',
            type: 'fraction'
        }
    })

    $('.sc-banner .banner-slide .btn-autoplay').click(function () {
        if ($(this).hasClass('on')) {
            bannerSlide.autoplay.start();
        } else {
            bannerSlide.autoplay.stop();
        }
        $(this).toggleClass('on')
    })


    // BRAND FOCUS
    focusSlide = new Swiper(".focus-slide", {
        slidesPerView: 'auto',
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    // BRAND FOCUS 탭메뉴
    $('.sc-focus .tab-nav .tab').click(function (e) {
        e.preventDefault();
        target = $(this).data('target');

        $('.sc-focus .tab-nav .tab').removeClass('active');
        $(this).addClass('active');
        $(target).addClass('active').siblings('.sc-focus .category-area .category').removeClass('active');
    })


    // 동영상 썸네일
    $(".sc-live .btnwrap").on('click', function () {
        $(".sc-live .video-thumb").hide();
    });


    // 고메이
    gourmetSlide = new Swiper('.gourmet-slide', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    // 고객님을 위한 추천상품 Json

    fetch('./assets/data/prd.json')
        .then(res => res.json())
        .then(json => {

            data = json.item;
            let html = ``;

            data.forEach(element => {

                html += `<div class="swiper-slide slide1">
                            <a href="" class="link-prd">
                                <img src="${element.thumbnailUrl}" alt>
                                <div class="prd-info">
                                    <strong class="brand">${element.brand}</strong>
                                        <p class="name">${element.productName}</p>
                                        <strong class="price">
                                        ${element.price.current.toLocaleString()}
                                        <span class="won">원</span>
                                    </strong>
                                </div>
                            </a>
                        </div>`;
            });
            $('#recommList').html(html);
        })

    // 금주의 추천기획전
    recommendSlide = new Swiper('.thisweek-slide', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    // 최하단 햄버거 히든메뉴 - 카테고리 탭메뉴
    $('.btm-hidden-layout .sc-cate .tab-nav a').click(function (e) {
        e.preventDefault();
        target = $(this).data('target');

        $('.btm-hidden-layout .sc-cate .tab-nav a').removeClass('active');
        $(this).addClass('active');
        $(target).addClass('active').siblings('.btm-hidden-layout .sc-cate .prd-area').removeClass('active');
    })


    // 첫번째 LI 에 뒤로가기탭 : 닫혀야함
    $('.btm-hidden-layout .sc-cate .sub-area li:first-child').keydown(function (e) {
        code = e.keyCode;
        if (code === 9 && e.shiftKey) {
            $('.btn-related').removeClass('on');
            $('.sub-area').stop().slideUp();
        }
    })

    // 마지막 LI 에 그냥탭 : 닫혀야함
    $('.btm-hidden-layout .sc-cate .sub-area li:last-child').keydown(function (e) {
        code = e.keyCode;
        if (code === 9 && !e.shiftKey) {
            $('.btn-related').removeClass('on');
            $('.sub-area').stop().slideUp();
        }
    });


    /* 
        하단 고정메뉴 - 버튼 클릭시 open
        open - 스르륵 1초 동안위로 올라옴
        close - 0.5초 동안 아래로 닫힘
    */
    $('.btm-hidden-menu .menu-list .menu').click(function (e) {
        e.preventDefault();
        $('.btm-hidden-layout').addClass('on');
        $('body').addClass('hidden')
    })
    $('.btm-hidden-layout .btn-close').click(function (e) {
        e.preventDefault();
        $('.btm-hidden-layout').removeClass('on');
        $('body').removeClass('hidden')
    })


    // 하단 고정메뉴 open 되었을때
    $('.btm-hidden-layout .sc-cate .btn-related').click(function (e) {
        e.preventDefault();

        if ($(this).hasClass('on')) {
            $('.btn-related').removeClass('on');
            $('.sub-area').stop().slideUp();
        } else {
            $('.sub-area').stop().slideUp();
            $('.btn-related').removeClass('on');
            $(this).addClass('on').next().stop().slideDown();
        }
    });


    let lastScroll = 0;

    $(window).scroll(function () {
        curr = $(this).scrollTop(); //현재스크롤바의 위치
        console.log(curr);
        target = $('.wrapper').height();
        result = target - window.innerHeight;

        if ((curr + 1) >= result) {
            $('.btm-hidden-menu').removeClass('hide');
        } else {
            if (curr > lastScroll) { // bottom 0이라면
                $('.btm-hidden-menu').addClass('hide');
            } else {
                $('.btm-hidden-menu').removeClass('hide');
                $('.fixed-btn').addClass('show');
            }
        }
        lastScroll = curr;


        if ($('.btm-hidden-menu').hasClass('hide')) {
            $('.fixed-btn').addClass('up');
        } else {
            $('.fixed-btn').removeClass('up');
        }


        // 사용자가 스크롤값한 값
        let scrollValue = $(document).scrollTop();

        if (scrollValue !== 0) {
            $('.fixed-btn').removeClass('hide');
        } else {
            $('.fixed-btn').addClass('hide');
        }
    });


    $('.fixed-btn a').click(function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    });


}); //end