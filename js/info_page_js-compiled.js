'use strict';

var sections = document.querySelectorAll('.section');

window.sr = ScrollReveal({ reset: false });

for (var i = 0; i < sections.length; i++) {
    sr.reveal(sections[i], { delay: 200, duration: 300, distance: '0px', origin: 'top', scale: 1 });
}

//# sourceMappingURL=info_page_js-compiled.js.map