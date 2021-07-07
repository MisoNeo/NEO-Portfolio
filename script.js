const swiper = new Swiper('.swiper-container', {
    //기본 셋팅
    //방향 셋팅 vertical 수직, horizontal 수평 설정이 없으면 수평
    direction: 'horizontal',
    //한번에 보여지는 페이지 숫자
    slidesPerView: 3,
    //페이지와 페이지 사이의 간격
    spaceBetween: 30,
    //드레그 기능 true 사용가능 false 사용불가
    // debugger: true,
    //마우스 휠기능 true 사용가능 false 사용불가
    mousewheel: false,
    //반복 기능 true 사용가능 false 사용불가
    loop: true,
    //선택된 슬라이드를 중심으로 true 사용가능 false 사용불가 djqt
    centeredSlides: true,
    // 페이지 전환효과 slidesPerView효과와 같이 사용 불가
    // effect: 'fade',


    //자동 스크를링
    autoplay: {
        //시간 1000 이 1초
        delay: 2500,
        disableOnInteraction: false,
    },

    //페이징
    pagination: {
        //페이지 기능
        el: '.swiper-pagination',
        //클릭 가능여부
        clickable: true,
    },

    //방향표
    navigation: {
        //다음페이지 설정
        nextEl: '.swiper-button-next',
        //이전페이지 설정
        prevEl: '.swiper-button-prev',
    },

});

console.clear();

select = e => document.querySelector(e);
selectAll = e => document.querySelectorAll(e);

const container = select('.container');
let wArray = [161, 614, 189, 278, 404],
    tl;

function animate() {
    tl = gsap.timeline({
        delay: 0.5,
        repeat: -1,
        defaults: {
            ease: "expo.inOut",
            duration: 2
        }
    });

    tl.from('.container__base', {
        scaleX: 0,
        duration: 2,
        transformOrigin: "top right",
        // ease: "expo"
    })

    .from('.moon__svg-rects rect', {
        scaleX: 0,
        stagger: 0.07,
        duration: 3,
        ease: "expo"
    }, "-=1.0")

    .to('.moon__txt-bg rect', {
        stagger: 0.14,
        scaleX: 1
    }, "-=2.5")

    .from('text', {
        x: function(i) {
            return -wArray[i]
        },
        ease: 'power4',
        stagger: 0.14
    }, "-=1.6")

    .from('.moon__img', {
        x: "+=200",
        ease: 'power4',
        duration: 15
    }, 0);
}

function init() {
    gsap.set(container, { autoAlpha: 1 });

    gsap.set('.moon__txt-bg rect', {
        width: function(i) {
            return wArray[i]
        },
        scaleX: 0
    })

    animate();

    container.onclick = () => {
        tl.restart();
    }

}

function resize() {
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let wh = container.offsetWidth;
    let scaleFactor = 1;

    if (vw / vh >= 1) {
        scaleFactor = vh / wh
    } else {
        scaleFactor = vw / wh
    }

    if (scaleFactor < 1) {
        gsap.set(container, { scale: scaleFactor });
    } else {
        gsap.set(container, { scale: 1 });
    }
}

window.onresize = resize;

window.onload = () => {
    init();
    resize();
    // GSDevTools.create();
};