//constant
const waterFirst = document.querySelector('.waterFirst');
const globeContainer = document.querySelector('.globeContainer');
const controlFirst = document.querySelector('.controlFirst');
const indexContainer = document.querySelector('.indexContainer');
const topNavItem = document.querySelectorAll('.topNavItem');
const waterFirstTitle = document.querySelector('.waterFirstTitle');
const typedText = document.querySelector('.typedText');
const infoPage = document.querySelector('.infoTopContainer');
var waterDiagramIsLoaded = false;
var waterDiagramLoaded = () => {
    waterDiagramIsLoaded = true;
};

const nHamburger = document.querySelector('.nHamburger');
const nOverlay = document.querySelector('.nOverlay');
const nClose = document.querySelector('.nClose');
const nItems = document.querySelectorAll('.nItem');
const navToggle = document.getElementById('navToggle');

//navbar logic
nClose.addEventListener('click', () => {
    navToggle.checked = false;
});

for (let i=0; i<nItems.length; i++) {
    nItems[i].addEventListener('click', () => {
        navToggle.checked = false;
    });
}

//line length equations for svg animations
const getLineLength = (line) => {
    let x1 = line.getAttribute('x1');
    let x2 = line.getAttribute('x2');
    let y1 = line.getAttribute('y1');
    let y2 = line.getAttribute('y2');
    return Math.sqrt(Math.pow((x2-x1), 2)+Math.pow((y2-y1),2));
};

const getCircleLength = (circle) => {
    let r = circle.getAttribute('r');
    return 2 * Math.PI * r;
};

const getPolylineLength = (polyline) => {
    let totalLength = 0;
    let prevPos;
    for (let i = 0 ; i < polyline.points.numberOfItems;i++) {
        let pos = polyline.points.getItem(i);
        if (i > 0) {
            totalLength += Math.sqrt(Math.pow((pos.x - prevPos.x), 2) + Math.pow((pos.y - prevPos.y), 2));
        }
        prevPos = pos;
    }
    return totalLength;
};

const getEllipseLength = (ellipse) => {
    let rx = parseInt(ellipse.getAttribute('rx'));
    let ry = parseInt(ellipse.getAttribute('ry'));
    let h = Math.pow((rx-ry), 2) / Math.pow((rx+ry), 2);
    return (Math.PI * ( rx + ry )) * (1 + ( (3 * h) / ( 10 + Math.sqrt( 4 - (3 * h) )) ));
};

const getRectangleLength = (rect) => {
    let x = rect.getAttribute('x');
    let y = rect.getAttribute('y');
    return (x*2) + (y*2);
};

const animateLine = (line, length) => {
    line.style.transition = line.style.WebkitTransition = 'none';
    line.style.strokeDasharray = length + ' ' + length;
    line.style.strokeDashoffset = length;
    line.getBoundingClientRect();
    line.style.transition = line.style.WebkitTransition =
        'stroke-dashoffset 2s ease-in-out 1s';
    line.style.strokeDashoffset = '0';
};

const rotateIcon = (icon) => {
    icon.style.msTransform = 'rotate(0deg)';
    icon.style.MozTransform = 'rotate(0deg)';
    icon.style.webkitTransform = 'rotate(0deg)';
    icon.style.transform = 'rotate(0deg)';
};

const getRestOfArray = (array, n) => {
    let arrayCopy = array.slice();
    arrayCopy.splice(n, 1);
    return arrayCopy;
};

//control page code
if (controlFirst) {
    window.sr = ScrollReveal();
    const controlFourthItem = document.querySelectorAll('.controlFourthItem');
    const footerItem = document.querySelectorAll('.footerItem');

    sr.reveal(controlFourthItem, {duration: 500});
    sr.reveal(footerItem, {duration: 500});

    let hiddenLayerArray = [
        [document.querySelector('#tekdaqcManagerC'), document.querySelector('#tekdaqcManagerHL'), document.querySelector('#tekdaqcManagerContent')],
        [document.querySelector('#firmwareC'), document.querySelector('#firmwareHL'), document.querySelector('#firmwareContent')],
        [document.querySelector('#githubC'), document.querySelector('#githubHL'), document.querySelector('#githubContent')],
        [document.querySelector('#APIDocC'), document.querySelector('#APIDocHL'), document.querySelector('#APIDocContent')]
    ];

    for (let i=0; i<hiddenLayerArray.length; i++) {
        hiddenLayerArray[i][0].addEventListener('click', () => {
            hiddenLayerArray[i][2].className += ' a_controlContentRemove';
            hiddenLayerArray[i][1].className += ' a_revealContent';
        });
    }

    //code for spec section
    let specContainers = [].slice.call(document.querySelectorAll('.specContainer'));
    const selectedClass = ' specSelected';

    for (let i=0; i < specContainers.length; i++) {
        specContainers[i].addEventListener('click', () => {
            //animate svg close icon
            rotateIcon(specContainers[i].childNodes[1].childNodes[3], '0');
            //add selected class
            specContainers[i].className += selectedClass;
            //animate non-selected classes out
            let notSelectedContainers = getRestOfArray(specContainers, i);
            for (let i=0; i < notSelectedContainers.length; i++) {
                notSelectedContainers[i].className += ' a_containersOut';
                notSelectedContainers[i].style.pointerEvents = 'none';
            }
            //animate container height to 100%
            specContainers[i].className += ' a_specContainer';
            //animate the child to appear
            specContainers[i].childNodes[3].className += ' a_childContainerIn';
        });
    }
}

//info page code
if (infoPage) {
    const infoPackSvg = document.querySelector('.infoPackSvg');
    const infoPackPaperContainer = document.querySelector('.infoPackPaperContainer');
    const infoPackShadow = document.querySelector('.infoPackShadow');
    const infoPackFoldedCorner = document.querySelector('.infoPackFoldedCorner');
    const infoPackCorner = document.querySelector('.infoPackCorner');

    infoPackSvg.addEventListener('mouseenter', () => {
        infoPackPaperContainer.setAttribute('class', 'infoPackPaperContainer a_pauseInfoPackPaperContainer');
        infoPackShadow.setAttribute('class', 'infoPackFill infoPackShadow a_pauseInfoPackShadow');
        infoPackFoldedCorner.style.display = 'block';
        infoPackCorner.style.display = 'none';
    });

    infoPackSvg.addEventListener('mouseleave', () => {
        infoPackPaperContainer.setAttribute('class', 'infoPackPaperContainer a_infoPackPaperContainer');
        infoPackShadow.setAttribute('class', 'infoPackFill infoPackShadow a_infoPackShadow');
        infoPackFoldedCorner.style.display = 'none';
        infoPackCorner.style.display = 'block';
    });


    const infoSecondTitle = document.querySelector('.infoSecondTitle');
    const teamItem = document.querySelectorAll('.teamItem');
    window.sr = ScrollReveal();

    sr.reveal(infoSecondTitle, {duration: 300});
    sr.reveal(teamItem, {duration: 300});

    //show overlays & background sizing/coloring
    const teamPicZack = document.querySelector('#teamPicZack');
    const teamPicArya = document.querySelector('#teamPicArya');
    const teamPicPachia = document.querySelector('#teamPicPachia');
    const teamPicJoe = document.querySelector('#teamPicJoe');
    const teamPicShan = document.querySelector('#teamPicShan');
    const teamPicEllis = document.querySelector('#teamPicEllis');
    const teamPicViv = document.querySelector('#teamPicViv');
    const teamPicBill = document.querySelector('#teamPicBill');
    const teamPicNyx = document.querySelector('#teamPicNyx');
    const zackO = document.querySelector('#zackO');
    const aryaO = document.querySelector('#aryaO');
    const pachiaO = document.querySelector('#pachiaO');
    const joeO = document.querySelector('#joeO');
    const shanO = document.querySelector('#shanO');
    const ellisO = document.querySelector('#ellisO');
    const vivO = document.querySelector('#vivO');
    const billO = document.querySelector('#billO');
    const nyxO = document.querySelector('#nyxO');

    let teamPicArray = [
        [teamPicZack, zackO, teamItem[0]],
        [teamPicArya, aryaO, teamItem[1]],
        [teamPicPachia, pachiaO, teamItem[2]],
        [teamPicJoe, joeO, teamItem[3]],
        [teamPicShan, shanO, teamItem[4]],
        [teamPicEllis, ellisO, teamItem[5]],
        [teamPicViv, vivO, teamItem[6]],
        [teamPicBill, billO, teamItem[7]],
        [teamPicNyx, nyxO, teamItem[8]]
    ];

    for (let i=0; i<teamPicArray.length; i++) {
        teamPicArray[i][2].addEventListener('mouseenter', () => {
            teamPicArray[i][0].style.backgroundSize = '105%';
            teamPicArray[i][0].style.WebkitFilter = 'grayscale(0%)';
            teamPicArray[i][0].style.filter = 'none';
            teamPicArray[i][0].style.cursor = 'crosshair';
        });
        teamPicArray[i][0].addEventListener('mouseenter', () => {
            teamPicArray[i][1].style.opacity = 1;
        });
        teamPicArray[i][1].addEventListener('mouseenter', () => {
            teamPicArray[i][1].style.opacity = 1;
        });
        teamPicArray[i][2].addEventListener('mouseleave', () => {
            teamPicArray[i][0].style.backgroundSize = null;
            teamPicArray[i][0].style.WebkitFilter = null;
            teamPicArray[i][0].style.filter = null;
            teamPicArray[i][0].style.cursor = null;
        });
        teamPicArray[i][0].addEventListener('mouseleave', () => {
            teamPicArray[i][1].style.opacity = 0;
        });
        teamPicArray[i][1].addEventListener('mouseleave', () => {
            teamPicArray[i][1].style.opacity = 0;
        });
    }

    var createMap = () => {
        let position = {lat: 38.579084, lng: -121.482207};
        let offsetPosition = {lat: 38.579084, lng: -121.470000};
        let map = new google.maps.Map(document.querySelector('.tenkivMapContainer'), {
            zoom: 14,
            center: offsetPosition,
            gestureHandling: 'cooperative',
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            disableDefaultUI: true,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": -100
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#212121"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.medical",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#181818"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1b1b1b"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": -80
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8a8a8a"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#373737"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#3c3c3c"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#4e4e4e"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": -55
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#5f20ff"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#3d3d3d"
                        }
                    ]
                }
            ]
        });

        let marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: 'assets/imgs/map_marker.png'
        });
    };

    const timeContainer = document.querySelector('.timeContainer');

    let dateToTimeString = (dt) => {
        let hh = ('0' + dt.getUTCHours()).slice(-2);
        let mm = ('0' + dt.getUTCMinutes()).slice(-2);
        let ss = ('0' + dt.getUTCSeconds()).slice(-2);
        return hh + ':' + mm + ':' + ss;
    };

    let showTime = (timeZone) => {
        let tzTime = new Date(Date.now() + timeZone * 3600000);
        let UTCHour = tzTime.getUTCHours();
        let unicodeTime = '&#9788;';
        if (UTCHour >= 6 && UTCHour < 18) {
            unicodeTime = '&#9788;';
        } else {
            unicodeTime = '&#127769;';
        }

        return unicodeTime + ' ' + dateToTimeString(tzTime);
    };

    setInterval( () => {
        timeContainer.innerHTML = showTime('-8');
    }, 1000);
}

if (waterFirst) {
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
        const fullscreenVideo = document.querySelector('.fullscreenVideo');
        fullscreenVideo.style.position = 'absolute';
        const waterTopSvgLine = document.querySelectorAll('.waterTopSvgLine');
        for (let i=0; i<waterTopSvgLine.length; i++) {
            waterTopSvgLine.className += ' edgeLineScaling';
        }
    }

    //firebase email form
    const config = {
        apiKey: "AIzaSyBz9LfUL9cZP1bnZHGgwBovGyfa-YyloDw",
        authDomain: "tenkivwebsite.firebaseapp.com",
        databaseURL: "https://tenkivwebsite.firebaseio.com",
        storageBucket: "tenkivwebsite.appspot.com",
        messagingSenderId: "906948543213"
    };

    firebase.initializeApp(config);
    const database = firebase.database();
    const databaseRef = database.ref('emails');
    const emailInput = document.querySelector('.emailInput');
    const submitButton = document.querySelector('.submitButton');
    const successMessage = document.querySelector('.successMessage');
    const successMessageCheckmarkLine = document.querySelector('.successMessageCheckmarkLine');
    const successMessageCheckmarkLineCircle = document.querySelector('.successMessageCheckmarkLineCircle');
    const successMessageText = document.querySelector('.successMessageText');
    const bottomWaterExplanationText = document.querySelector('.bottomWaterExplanationText');

    //check if email is valid
    let validateEmail = (email) => {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    };

    //save email to firebase database
    let saveEmail = (email) => {
        databaseRef.push(email, () => {
            console.log('Email successfully submitted');
            //remove email & submit stuff
            emailInput.style.opacity = '0';
            submitButton.style.opacity = '0';
            bottomWaterExplanationText.style.opacity = '0';
            setTimeout(() => {
                emailInput.style.display = 'none';
                submitButton.style.display = 'none';
                bottomWaterExplanationText.style.display = 'none';
                setTimeout(() => {
                    //show success message stuff
                    successMessage.className = 'successMessageFlex';
                    successMessageCheckmarkLine.setAttribute("class", "successMessageCheckmarkLine a_successMessageCheckmarkLine");
                    successMessageCheckmarkLineCircle.setAttribute("class", "successMessageCheckmarkLineCircle a_successMessageCheckmarkLineCircle");
                    successMessageText.className += ' a_successMessageText';
                }, 500);
            }, 500);
        });
    };

    submitButton.addEventListener('click', () => {
        let email = emailInput.value.toString();
        //submit to firebase
        saveEmail(email);
    });

    emailInput.addEventListener('input', () => {
        let email = emailInput.value;
        if (validateEmail(email)) {
            //animate input box
            emailInput.style.border = '6px solid #0ae084';
            //show submit button & make it clickable
            submitButton.style.opacity = '1';
            submitButton.style.pointerEvents = 'all';
        } else {
            emailInput.style.border = null;
            submitButton.style.opacity = 0;
            submitButton.style.pointerEvents = 'none';
        }
    });

    //water elements to reveal
    const wsItemContainer = document.querySelectorAll('.wsItemContainer');
    const waterSecondBottom = document.querySelector('.waterSecondBottom');

    const sunSection = document.querySelector('.sunSection');
    const smogEarthContainer = document.querySelector('.smogEarthContainer');
    const smogEarthSVG = document.querySelector('.smogEarthSVG');
    const earthText = document.querySelector('.earthText');
    const sunSVG = document.querySelector('.sunSVG');
    const sunText = document.querySelector('.sunText');
    const sunBottomText = document.querySelector('.sunBottomText');

    const waterThirdTitle = document.querySelector('.waterThirdTitle');
    const waterThirdTagline = document.querySelector('.waterThirdTagline');
    const waterDiagramContainer = document.querySelector('.waterDiagramContainer');
    const faucetWater = document.querySelector('.faucetWater');
    const bottomWaterTopText = document.querySelector('.bottomWaterTopText');
    const emailContainer = document.querySelector('.emailContainer');

    const footerItem = document.querySelectorAll('.footerItem');
    window.sr = ScrollReveal();

    //reveal elements
    sr.reveal(wsItemContainer, {duration: 500});
    sr.reveal(waterSecondBottom, {duration: 500});

    sr.reveal(smogEarthContainer, {duration: 0, afterReveal: () => {
        smogEarthContainer.className += ' a_smogEarthContainer';
        smogEarthSVG.className += ' a_smogEarthSVG';
        earthText.className += ' a_earthText';
        sunSVG.className += ' a_sunSVG';
        sunText.className += ' a_sunText';
        sunBottomText.className += ' a_sunBottomText';
    }});

    sr.reveal(waterThirdTitle, {duration: 500});
    sr.reveal(waterThirdTagline, {duration: 500});
    sr.reveal(waterDiagramContainer, {duration: 0, afterReveal: () => {
        //start the diagram animations here
        if (waterDiagramIsLoaded ) {
            animateWaterDiagram();
        } else {
            setTimeout(animateWaterDiagram, 1000);
        }
    }});

    sr.reveal(bottomWaterTopText, {duration: 500});
    sr.reveal(emailContainer, {duration: 500});

    sr.reveal(footerItem, {duration: 500});

    //water section top constants
    const taglineOne = 'Water Crisis. Energy Shortage. Climate Change.';
    const cursor = document.querySelector('.cursor');
    let intervalFunction;

    const challengeAcceptedText = document.querySelector('.challengeAcceptedText');
    const CAJoiningLineTop = document.querySelector('.CAJoiningLineTop');
    const waterTopSvgLines = document.querySelectorAll('.waterTopSvgLine');
    const CAJoiningLineBottom = document.querySelector('.CAJoiningLineBottom');

    //typing animation
    setTimeout(() => {
        let i = 0;
        intervalFunction = setInterval(() => {
            typedText.insertAdjacentHTML("beforeEnd", taglineOne.charAt(i));
            i++;
            if ( i > taglineOne.length - 1) {
                cursor.style.display = 'none';
            }

            if (i > taglineOne.length) {
                //animation is over, clear the interval
                clearInterval(intervalFunction);

                //animate in the rest of the page
                challengeAcceptedText.className += ' a_challengeAcceptedText';
                CAJoiningLineTop.className += ' a_CAJoiningLineTop';
                for (let i=0; i<waterTopSvgLines.length; i++) {
                    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
                        waterTopSvgLines[i].setAttribute("class", "waterTopSvgLine edgeLineScaling a_waterTopSvgEdge");
                    } else {
                        waterTopSvgLines[i].setAttribute("class", "waterTopSvgLine a_waterTopSvg");
                    }
                }
                CAJoiningLineBottom.className += ' a_CAJoiningLineBottom';
            }
        }, 75);
    }, 1000);

    const solidLines = document.querySelectorAll('.solidLine');
    const dashedLines = document.querySelectorAll('.dashedLine');
    const diagramInfoItems = document.querySelectorAll('.diagramInfoItem');

    const animatePopupOut = (t) => {
        Velocity(t, {scale: 0}, {duration: 200, easing: 'swing', complete: () => {
            document.querySelector('body').removeChild(t);
        }});
    };

    const animatePopupIn = (t) => {
        document.querySelector('body').appendChild(t);
        t.style.transform = 'scale(0)';
        Velocity(t, {scale: 0}, {duration: 0, complete: () => {
            Velocity(t, {scale: 1}, {duration: 200, easing: 'swing'});
        }});
    };

    const setPopupPosition = (popupContainer, x, y, width) => {
        popupContainer.style.top = y + 'px';

        if (popupContainer.id == 'systemPopup') {
            popupContainer.style.left = x - width + 'px';
        } else if (popupContainer.id == 'inputsPopup') {
            popupContainer.style.left = x + 'px';
        } else {
            popupContainer.style.left = x - (width/2) + 'px';
        }
    };

    const setPopupWidth = () => {
        var width;
        if (window.innerWidth < 1025) {
            width = 300;
        } else if (window.innerWidth < 1920) {
            width = 350;
        } else {
            width = 400;
        }
        return width;
    };

    const createInfoItemPopup = (diagramInfoItem, mouseX, mouseY) => {
        let cursorX = mouseX;
        let cursorY = mouseY;
        var popupListener;
        var width = setPopupWidth();

        let infoItemPopupContainer = document.createElement('div');
        infoItemPopupContainer.className = 'infoItemPopupContainer';

        let infoItemClose = document.createElement('div');
        infoItemClose.className = 'infoItemClose';

        infoItemClose.addEventListener('click', () => {
            animatePopupOut(infoItemPopupContainer);
            window.removeEventListener('resize', popupListener);
        });

        infoItemPopupContainer.appendChild(infoItemClose);

        let infoItemContent = document.createElement('div');
        infoItemContent.className = 'infoItemContent';
        infoItemPopupContainer.appendChild(infoItemContent);
        switch (diagramInfoItem.id) {
            case 'infoItemOne':
                //stuff for water diagram inputs here
                infoItemPopupContainer.id = 'inputsPopup';
                infoItemContent.innerHTML = 'The <a href="info.html#section-3" class="bold" target="_blank"> Tenkiv Nexus</a> water filtration module can use feed water from any source. River water, ocean water, or other contaminated waters are all able to be processed using the power that our system produces.';
                break;
            case 'infoItemTwo':
                //stuff for modules here
                infoItemPopupContainer.id = 'modulesPopup';
                infoItemContent.innerHTML = 'The heat generated from the <a href="info.html#section-3" class="bold" target="_blank">Tenkiv Nexus</a> is routed to and from a module in order to power different types of systems.<br><br>The module can vary: heating, electricity production, refridgeration, water filtration– <a href="info.html#section-8" class="bold" target="_blank">anything</a> that requires power can be connected.';
                break;
            case 'infoItemThree':
                //stuff for tenkiv system here
                infoItemPopupContainer.id = 'systemPopup';
                infoItemContent.innerHTML = 'The <a href="info.html#section-3" class="bold" target="_blank">Tenkiv Nexus</a> is a scalable, modular, and clean system that uses solar thermal collectors in order to capture heat from the sun. The Nexus can then distribute the collected heat only where its needed.<br><br>Our <a href="info.html#section-2" class="bold" target="_blank">solar thermal collectors</a> are made from cost-effective materials: steel and glass. Because of their uniquely cheap cost and durability, they can be used in virtually any environment.';
                break;
            default:
                console.log('error here');
        }

        window.addEventListener('resize', popupListener = () => {
            width = setPopupWidth();
            animatePopupOut(infoItemPopupContainer);
            window.removeEventListener('resize', popupListener);
        });

        setPopupPosition(infoItemPopupContainer, cursorX, cursorY, width);
        animatePopupIn(infoItemPopupContainer);
    };

    var animateWaterDiagram = () => {
        document.querySelector('.waterDiagram').style.opacity = 1;

        for (let i=0; i < solidLines.length; i++) {
            switch (solidLines[i].tagName) {
                case 'path':
                    animateLine(solidLines[i], solidLines[i].getTotalLength() + 10);
                    break;
                case 'line':
                    animateLine(solidLines[i], getLineLength(solidLines[i]) + 10);
                    break;
                case 'polyline':
                    animateLine(solidLines[i], getPolylineLength(solidLines[i]) + 10);
                    break;
                case 'circle':
                    animateLine(solidLines[i], getCircleLength(solidLines[i]) + 10);
                    break;
                case 'ellipse':
                    animateLine(solidLines[i], getEllipseLength(solidLines[i]) + 10);
                    break;
                case 'rect':
                    animateLine(solidLines[i], getRectangleLength(solidLines[i]) + 10);
                    break;
                default:
                    console.log('svg error');
            }
        }

        Velocity(dashedLines, {opacity: 1}, {
            duration: 1000, delay: 3000, complete: () => {
                for (let i = 0; i < diagramInfoItems.length; i++) {
                    diagramInfoItems[i].addEventListener('click', (e) => {
                        let mouseX = e.pageX;
                        let mouseY = e.pageY;
                        switch (diagramInfoItems[i].id) {
                            case 'infoItemOne':
                                if (document.querySelectorAll('#inputsPopup').length == 0) {
                                    createInfoItemPopup(diagramInfoItems[i], mouseX, mouseY);
                                }
                                break;
                            case 'infoItemTwo':
                                if (document.querySelectorAll('#modulesPopup').length == 0) {
                                    createInfoItemPopup(diagramInfoItems[i], mouseX, mouseY);
                                }
                                break;
                            case 'infoItemThree':
                                if (document.querySelectorAll('#systemPopup').length == 0) {
                                    createInfoItemPopup(diagramInfoItems[i], mouseX, mouseY);
                                }
                                break;
                            default:
                                console.log('error');
                        }

                    });

                    let fillCup = document.querySelector('.fillCup');
                    let sparkle = document.querySelector('.sparkle');
                    Velocity(fillCup, {scaleY: 0, scaleX: 0, translateX: -17.93, translateY: -12.21}, {
                        duration: 0, complete: () => {
                            Velocity(fillCup, {scaleY: 1, scaleX: 1}, {duration: 1000});
                        }
                    });

                    Velocity(diagramInfoItems[i], {opacity: 1, scale: 1}, {duration: 200});

                    faucetWater.setAttribute('class', 'faucetWater a_FaucetWater');
                }
            }
        });
    };

}