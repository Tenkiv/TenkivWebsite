const i_sections = document.querySelectorAll('.i_section');

if (i_sections) {
    window.sr = ScrollReveal({ reset: false });

    for (let i = 0; i < i_sections.length; i++ ) {
        sr.reveal(i_sections[i], { delay: 200, duration: 300, distance : '0px', origin: 'top', scale: 1 });
    }
}