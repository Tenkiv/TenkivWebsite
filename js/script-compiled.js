'use strict';

//constant
var waterFirst = document.querySelector('.waterFirst');
var globeContainer = document.querySelector('.globeContainer');
var controlFirst = document.querySelector('.controlFirst');
var indexContainer = document.querySelector('.indexContainer');
var topNavItem = document.querySelectorAll('.topNavItem');
var waterFirstTitle = document.querySelector('.waterFirstTitle');
var typedText = document.querySelector('.typedText');
var infoPage = document.querySelector('.infoTopContainer');
var waterDiagramIsLoaded = false;
var waterDiagramLoaded = function waterDiagramLoaded() {
    waterDiagramIsLoaded = true;
};

var nHamburger = document.querySelector('.nHamburger');
var nOverlay = document.querySelector('.nOverlay');
var nClose = document.querySelector('.nClose');
var nItems = document.querySelectorAll('.nItem');
var navToggle = document.getElementById('navToggle');

//navbar logic
nClose.addEventListener('click', function () {
    navToggle.checked = false;
});

for (var i = 0; i < nItems.length; i++) {
    nItems[i].addEventListener('click', function () {
        navToggle.checked = false;
    });
}

//line length equations for svg animations
var getLineLength = function getLineLength(line) {
    var x1 = line.getAttribute('x1');
    var x2 = line.getAttribute('x2');
    var y1 = line.getAttribute('y1');
    var y2 = line.getAttribute('y2');
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

var getCircleLength = function getCircleLength(circle) {
    var r = circle.getAttribute('r');
    return 2 * Math.PI * r;
};

var getPolylineLength = function getPolylineLength(polyline) {
    var totalLength = 0;
    var prevPos = void 0;
    for (var _i = 0; _i < polyline.points.numberOfItems; _i++) {
        var pos = polyline.points.getItem(_i);
        if (_i > 0) {
            totalLength += Math.sqrt(Math.pow(pos.x - prevPos.x, 2) + Math.pow(pos.y - prevPos.y, 2));
        }
        prevPos = pos;
    }
    return totalLength;
};

var getEllipseLength = function getEllipseLength(ellipse) {
    var rx = parseInt(ellipse.getAttribute('rx'));
    var ry = parseInt(ellipse.getAttribute('ry'));
    var h = Math.pow(rx - ry, 2) / Math.pow(rx + ry, 2);
    return Math.PI * (rx + ry) * (1 + 3 * h / (10 + Math.sqrt(4 - 3 * h)));
};

var getRectangleLength = function getRectangleLength(rect) {
    var x = rect.getAttribute('x');
    var y = rect.getAttribute('y');
    return x * 2 + y * 2;
};

var animateLine = function animateLine(line, length) {
    line.style.transition = line.style.WebkitTransition = 'none';
    line.style.strokeDasharray = length + ' ' + length;
    line.style.strokeDashoffset = length;
    line.getBoundingClientRect();
    line.style.transition = line.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out 1s';
    line.style.strokeDashoffset = '0';
};

//control page code
if (controlFirst) {
    (function () {
        window.sr = ScrollReveal();
        var controlFourthItem = document.querySelectorAll('.controlFourthItem');
        var footerItem = document.querySelectorAll('.footerItem');

        sr.reveal(controlFourthItem, { duration: 500 });
        sr.reveal(footerItem, { duration: 500 });

        var hiddenLayerArray = [[document.querySelector('#tekdaqcManagerC'), document.querySelector('#tekdaqcManagerHL'), document.querySelector('#tekdaqcManagerContent')], [document.querySelector('#firmwareC'), document.querySelector('#firmwareHL'), document.querySelector('#firmwareContent')], [document.querySelector('#githubC'), document.querySelector('#githubHL'), document.querySelector('#githubContent')], [document.querySelector('#APIDocC'), document.querySelector('#APIDocHL'), document.querySelector('#APIDocContent')]];

        var _loop = function _loop(_i2) {
            hiddenLayerArray[_i2][0].addEventListener('click', function () {
                hiddenLayerArray[_i2][2].className += ' a_controlContentRemove';
                hiddenLayerArray[_i2][1].className += ' a_revealContent';
            });
        };

        for (var _i2 = 0; _i2 < hiddenLayerArray.length; _i2++) {
            _loop(_i2);
        }

        //code for spec section
        // var specTitleContainers = [].slice.call(document.querySelectorAll('.specContainer'));
        // const selectedClass = ' specSelected';
        //
        // for (let i=0; i < specTitleContainers.length; i++) {
        //     specTitleContainers[i].addEventListener('click', () => {
        //         //animate svg close icon
        //         rotateIcon(specTitleContainers[i].childNodes[1].childNodes[3], '0');
        //         //add selected class
        //         specTitleContainers[i].className += selectedClass;
        //         //animate non-selected classes out
        //         var notSelectedContainers = getRestOfArray(specTitleContainers, i);
        //         for (let i=0; i < notSelectedContainers.length; i++) {
        //             Velocity(notSelectedContainers[i], {opacity: 0, height: 0}, {duration: 300});
        //         }
        //
        //         //TODO: finish this
        //         //close all except for selected container
        //
        //         //animate currently selected open once that is finished
        //
        //     });
        // }
    })();
}

//info page code
if (infoPage) {
    var createMap;

    (function () {
        var infoPackSvg = document.querySelector('.infoPackSvg');
        var infoPackPaperContainer = document.querySelector('.infoPackPaperContainer');
        var infoPackShadow = document.querySelector('.infoPackShadow');
        var infoPackFoldedCorner = document.querySelector('.infoPackFoldedCorner');
        var infoPackCorner = document.querySelector('.infoPackCorner');

        infoPackSvg.addEventListener('mouseenter', function () {
            infoPackPaperContainer.setAttribute('class', 'infoPackPaperContainer a_pauseInfoPackPaperContainer');
            infoPackShadow.setAttribute('class', 'infoPackFill infoPackShadow a_pauseInfoPackShadow');
            infoPackFoldedCorner.style.display = 'block';
            infoPackCorner.style.display = 'none';
        });

        infoPackSvg.addEventListener('mouseleave', function () {
            infoPackPaperContainer.setAttribute('class', 'infoPackPaperContainer a_infoPackPaperContainer');
            infoPackShadow.setAttribute('class', 'infoPackFill infoPackShadow a_infoPackShadow');
            infoPackFoldedCorner.style.display = 'none';
            infoPackCorner.style.display = 'block';
        });

        var infoSecondTitle = document.querySelector('.infoSecondTitle');
        var teamItem = document.querySelectorAll('.teamItem');
        window.sr = ScrollReveal();

        sr.reveal(infoSecondTitle, { duration: 300 });
        sr.reveal(teamItem, { duration: 300 });

        //show overlays & background sizing/coloring
        var teamPicZack = document.querySelector('#teamPicZack');
        var teamPicArya = document.querySelector('#teamPicArya');
        var teamPicPachia = document.querySelector('#teamPicPachia');
        var teamPicJoe = document.querySelector('#teamPicJoe');
        var teamPicShan = document.querySelector('#teamPicShan');
        var teamPicEllis = document.querySelector('#teamPicEllis');
        var teamPicViv = document.querySelector('#teamPicViv');
        var teamPicBill = document.querySelector('#teamPicBill');
        var teamPicNyx = document.querySelector('#teamPicNyx');
        var zackO = document.querySelector('#zackO');
        var aryaO = document.querySelector('#aryaO');
        var pachiaO = document.querySelector('#pachiaO');
        var joeO = document.querySelector('#joeO');
        var shanO = document.querySelector('#shanO');
        var ellisO = document.querySelector('#ellisO');
        var vivO = document.querySelector('#vivO');
        var billO = document.querySelector('#billO');
        var nyxO = document.querySelector('#nyxO');

        var teamPicArray = [[teamPicZack, zackO, teamItem[0]], [teamPicArya, aryaO, teamItem[1]], [teamPicPachia, pachiaO, teamItem[2]], [teamPicJoe, joeO, teamItem[3]], [teamPicShan, shanO, teamItem[4]], [teamPicEllis, ellisO, teamItem[5]], [teamPicViv, vivO, teamItem[6]], [teamPicBill, billO, teamItem[7]], [teamPicNyx, nyxO, teamItem[8]]];

        var _loop2 = function _loop2(_i3) {
            teamPicArray[_i3][2].addEventListener('mouseenter', function () {
                teamPicArray[_i3][0].style.backgroundSize = '105%';
                teamPicArray[_i3][0].style.WebkitFilter = 'grayscale(0%)';
                teamPicArray[_i3][0].style.filter = 'none';
                teamPicArray[_i3][0].style.cursor = 'crosshair';
            });
            teamPicArray[_i3][0].addEventListener('mouseenter', function () {
                teamPicArray[_i3][1].style.opacity = 1;
            });
            teamPicArray[_i3][1].addEventListener('mouseenter', function () {
                teamPicArray[_i3][1].style.opacity = 1;
            });
            teamPicArray[_i3][2].addEventListener('mouseleave', function () {
                teamPicArray[_i3][0].style.backgroundSize = null;
                teamPicArray[_i3][0].style.WebkitFilter = null;
                teamPicArray[_i3][0].style.filter = null;
                teamPicArray[_i3][0].style.cursor = null;
            });
            teamPicArray[_i3][0].addEventListener('mouseleave', function () {
                teamPicArray[_i3][1].style.opacity = 0;
            });
            teamPicArray[_i3][1].addEventListener('mouseleave', function () {
                teamPicArray[_i3][1].style.opacity = 0;
            });
        };

        for (var _i3 = 0; _i3 < teamPicArray.length; _i3++) {
            _loop2(_i3);
        }

        createMap = function createMap() {
            var position = { lat: 38.579084, lng: -121.482207 };
            var offsetPosition = { lat: 38.579084, lng: -121.470000 };
            var map = new google.maps.Map(document.querySelector('.tenkivMapContainer'), {
                zoom: 14,
                center: offsetPosition,
                gestureHandling: 'cooperative',
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                disableDefaultUI: true,
                styles: [{
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    }, {
                        "lightness": -100
                    }]
                }, {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#212121"
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#757575"
                    }]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                }, {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                }, {
                    "featureType": "poi.business",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi.medical",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#181818"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "labels.text",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#616161"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#1b1b1b"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": -80
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#8a8a8a"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#373737"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#3c3c3c"
                    }]
                }, {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#4e4e4e"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#616161"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": -55
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#5f20ff"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#3d3d3d"
                    }]
                }]
            });

            var marker = new google.maps.Marker({
                position: position,
                map: map,
                icon: 'assets/imgs/map_marker.png'
            });
        };

        var timeContainer = document.querySelector('.timeContainer');

        var dateToTimeString = function dateToTimeString(dt) {
            var hh = ('0' + dt.getUTCHours()).slice(-2);
            var mm = ('0' + dt.getUTCMinutes()).slice(-2);
            var ss = ('0' + dt.getUTCSeconds()).slice(-2);
            return hh + ':' + mm + ':' + ss;
        };

        var showTime = function showTime(timeZone) {
            var tzTime = new Date(Date.now() + timeZone * 3600000);
            var UTCHour = tzTime.getUTCHours();
            var unicodeTime = '&#9788;';
            if (UTCHour >= 6 && UTCHour < 18) {
                unicodeTime = '&#9788;';
            } else {
                unicodeTime = '&#127769;';
            }

            return unicodeTime + ' ' + dateToTimeString(tzTime);
        };

        setInterval(function () {
            timeContainer.innerHTML = showTime('-8');
        }, 1000);
    })();
}

if (waterFirst) {
    var animateWaterDiagram;

    (function () {
        if (document.documentMode || /Edge/.test(navigator.userAgent)) {
            var fullscreenVideo = document.querySelector('.fullscreenVideo');
            fullscreenVideo.style.position = 'absolute';
            var waterTopSvgLine = document.querySelectorAll('.waterTopSvgLine');
            for (var _i4 = 0; _i4 < waterTopSvgLine.length; _i4++) {
                waterTopSvgLine.className += ' edgeLineScaling';
            }
        }

        //firebase email form
        var config = {
            apiKey: "AIzaSyBz9LfUL9cZP1bnZHGgwBovGyfa-YyloDw",
            authDomain: "tenkivwebsite.firebaseapp.com",
            databaseURL: "https://tenkivwebsite.firebaseio.com",
            storageBucket: "tenkivwebsite.appspot.com",
            messagingSenderId: "906948543213"
        };

        firebase.initializeApp(config);
        var database = firebase.database();
        var databaseRef = database.ref('emails');
        var emailInput = document.querySelector('.emailInput');
        var submitButton = document.querySelector('.submitButton');
        var successMessage = document.querySelector('.successMessage');
        var successMessageCheckmarkLine = document.querySelector('.successMessageCheckmarkLine');
        var successMessageCheckmarkLineCircle = document.querySelector('.successMessageCheckmarkLineCircle');
        var successMessageText = document.querySelector('.successMessageText');
        var bottomWaterExplanationText = document.querySelector('.bottomWaterExplanationText');

        //check if email is valid
        var validateEmail = function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        };

        //save email to firebase database
        var saveEmail = function saveEmail(email) {
            databaseRef.push(email, function () {
                console.log('Email successfully submitted');
                //remove email & submit stuff
                emailInput.style.opacity = '0';
                submitButton.style.opacity = '0';
                bottomWaterExplanationText.style.opacity = '0';
                setTimeout(function () {
                    emailInput.style.display = 'none';
                    submitButton.style.display = 'none';
                    bottomWaterExplanationText.style.display = 'none';
                    setTimeout(function () {
                        //show success message stuff
                        successMessage.className = 'successMessageFlex';
                        successMessageCheckmarkLine.setAttribute("class", "successMessageCheckmarkLine a_successMessageCheckmarkLine");
                        successMessageCheckmarkLineCircle.setAttribute("class", "successMessageCheckmarkLineCircle a_successMessageCheckmarkLineCircle");
                        successMessageText.className += ' a_successMessageText';
                    }, 500);
                }, 500);
            });
        };

        submitButton.addEventListener('click', function () {
            var email = emailInput.value.toString();
            //submit to firebase
            saveEmail(email);
        });

        emailInput.addEventListener('input', function () {
            var email = emailInput.value;
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
        var wsItemContainer = document.querySelectorAll('.wsItemContainer');
        var waterSecondBottom = document.querySelector('.waterSecondBottom');

        var sunSection = document.querySelector('.sunSection');
        var smogEarthContainer = document.querySelector('.smogEarthContainer');
        var smogEarthSVG = document.querySelector('.smogEarthSVG');
        var earthText = document.querySelector('.earthText');
        var sunSVG = document.querySelector('.sunSVG');
        var sunText = document.querySelector('.sunText');
        var sunBottomText = document.querySelector('.sunBottomText');

        var waterThirdTitle = document.querySelector('.waterThirdTitle');
        var waterThirdTagline = document.querySelector('.waterThirdTagline');
        var waterDiagramContainer = document.querySelector('.waterDiagramContainer');
        var faucetWater = document.querySelector('.faucetWater');
        var bottomWaterTopText = document.querySelector('.bottomWaterTopText');
        var emailContainer = document.querySelector('.emailContainer');

        var footerItem = document.querySelectorAll('.footerItem');
        window.sr = ScrollReveal();

        //reveal elements
        sr.reveal(wsItemContainer, { duration: 500 });
        sr.reveal(waterSecondBottom, { duration: 500 });

        sr.reveal(smogEarthContainer, { duration: 0, afterReveal: function afterReveal() {
                smogEarthContainer.className += ' a_smogEarthContainer';
                smogEarthSVG.className += ' a_smogEarthSVG';
                earthText.className += ' a_earthText';
                sunSVG.className += ' a_sunSVG';
                sunText.className += ' a_sunText';
                sunBottomText.className += ' a_sunBottomText';
            } });

        sr.reveal(waterThirdTitle, { duration: 500 });
        sr.reveal(waterThirdTagline, { duration: 500 });
        sr.reveal(waterDiagramContainer, { duration: 0, afterReveal: function afterReveal() {
                //start the diagram animations here
                if (waterDiagramIsLoaded) {
                    animateWaterDiagram();
                } else {
                    setTimeout(animateWaterDiagram, 1000);
                }
            } });

        sr.reveal(bottomWaterTopText, { duration: 500 });
        sr.reveal(emailContainer, { duration: 500 });

        sr.reveal(footerItem, { duration: 500 });

        //water section top constants
        var taglineOne = 'Water Crisis. Energy Shortage. Climate Change.';
        var cursor = document.querySelector('.cursor');
        var intervalFunction = void 0;

        var challengeAcceptedText = document.querySelector('.challengeAcceptedText');
        var CAJoiningLineTop = document.querySelector('.CAJoiningLineTop');
        var waterTopSvgLines = document.querySelectorAll('.waterTopSvgLine');
        var CAJoiningLineBottom = document.querySelector('.CAJoiningLineBottom');

        //typing animation
        setTimeout(function () {
            var i = 0;
            intervalFunction = setInterval(function () {
                typedText.insertAdjacentHTML("beforeEnd", taglineOne.charAt(i));
                i++;
                if (i > taglineOne.length - 1) {
                    cursor.style.display = 'none';
                }

                if (i > taglineOne.length) {
                    //animation is over, clear the interval
                    clearInterval(intervalFunction);

                    //animate in the rest of the page
                    challengeAcceptedText.className += ' a_challengeAcceptedText';
                    CAJoiningLineTop.className += ' a_CAJoiningLineTop';
                    for (var _i5 = 0; _i5 < waterTopSvgLines.length; _i5++) {
                        if (document.documentMode || /Edge/.test(navigator.userAgent)) {
                            waterTopSvgLines[_i5].setAttribute("class", "waterTopSvgLine edgeLineScaling a_waterTopSvgEdge");
                        } else {
                            waterTopSvgLines[_i5].setAttribute("class", "waterTopSvgLine a_waterTopSvg");
                        }
                    }
                    CAJoiningLineBottom.className += ' a_CAJoiningLineBottom';
                }
            }, 75);
        }, 1000);

        var solidLines = document.querySelectorAll('.solidLine');
        var dashedLines = document.querySelectorAll('.dashedLine');
        var diagramInfoItems = document.querySelectorAll('.diagramInfoItem');

        var animatePopupOut = function animatePopupOut(t) {
            Velocity(t, { scale: 0 }, { duration: 200, easing: 'swing', complete: function complete() {
                    document.querySelector('body').removeChild(t);
                } });
        };

        var animatePopupIn = function animatePopupIn(t) {
            document.querySelector('body').appendChild(t);
            t.style.transform = 'scale(0)';
            Velocity(t, { scale: 0 }, { duration: 0, complete: function complete() {
                    Velocity(t, { scale: 1 }, { duration: 200, easing: 'swing' });
                } });
        };

        var setPopupPosition = function setPopupPosition(popupContainer, x, y, width) {
            popupContainer.style.top = y + 'px';

            if (popupContainer.id == 'systemPopup') {
                popupContainer.style.left = x - width + 'px';
            } else if (popupContainer.id == 'inputsPopup') {
                popupContainer.style.left = x + 'px';
            } else {
                popupContainer.style.left = x - width / 2 + 'px';
            }
        };

        var setPopupWidth = function setPopupWidth() {
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

        var createInfoItemPopup = function createInfoItemPopup(diagramInfoItem, mouseX, mouseY) {
            var cursorX = mouseX;
            var cursorY = mouseY;
            var _popupListener;
            var width = setPopupWidth();

            var infoItemPopupContainer = document.createElement('div');
            infoItemPopupContainer.className = 'infoItemPopupContainer';

            var infoItemClose = document.createElement('div');
            infoItemClose.className = 'infoItemClose';

            infoItemClose.addEventListener('click', function () {
                animatePopupOut(infoItemPopupContainer);
                window.removeEventListener('resize', _popupListener);
            });

            infoItemPopupContainer.appendChild(infoItemClose);

            var infoItemContent = document.createElement('div');
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

            window.addEventListener('resize', _popupListener = function popupListener() {
                width = setPopupWidth();
                animatePopupOut(infoItemPopupContainer);
                window.removeEventListener('resize', _popupListener);
            });

            setPopupPosition(infoItemPopupContainer, cursorX, cursorY, width);
            animatePopupIn(infoItemPopupContainer);
        };

        animateWaterDiagram = function animateWaterDiagram() {
            document.querySelector('.waterDiagram').style.opacity = 1;

            for (var _i6 = 0; _i6 < solidLines.length; _i6++) {
                switch (solidLines[_i6].tagName) {
                    case 'path':
                        animateLine(solidLines[_i6], solidLines[_i6].getTotalLength() + 10);
                        break;
                    case 'line':
                        animateLine(solidLines[_i6], getLineLength(solidLines[_i6]) + 10);
                        break;
                    case 'polyline':
                        animateLine(solidLines[_i6], getPolylineLength(solidLines[_i6]) + 10);
                        break;
                    case 'circle':
                        animateLine(solidLines[_i6], getCircleLength(solidLines[_i6]) + 10);
                        break;
                    case 'ellipse':
                        animateLine(solidLines[_i6], getEllipseLength(solidLines[_i6]) + 10);
                        break;
                    case 'rect':
                        animateLine(solidLines[_i6], getRectangleLength(solidLines[_i6]) + 10);
                        break;
                    default:
                        console.log('svg error');
                }
            }

            Velocity(dashedLines, { opacity: 1 }, {
                duration: 1000, delay: 3000, complete: function complete() {
                    var _loop3 = function _loop3(_i7) {
                        diagramInfoItems[_i7].addEventListener('click', function (e) {
                            var mouseX = e.pageX;
                            var mouseY = e.pageY;
                            switch (diagramInfoItems[_i7].id) {
                                case 'infoItemOne':
                                    if (document.querySelectorAll('#inputsPopup').length == 0) {
                                        createInfoItemPopup(diagramInfoItems[_i7], mouseX, mouseY);
                                    }
                                    break;
                                case 'infoItemTwo':
                                    if (document.querySelectorAll('#modulesPopup').length == 0) {
                                        createInfoItemPopup(diagramInfoItems[_i7], mouseX, mouseY);
                                    }
                                    break;
                                case 'infoItemThree':
                                    if (document.querySelectorAll('#systemPopup').length == 0) {
                                        createInfoItemPopup(diagramInfoItems[_i7], mouseX, mouseY);
                                    }
                                    break;
                                default:
                                    console.log('error');
                            }
                        });

                        var fillCup = document.querySelector('.fillCup');
                        var sparkle = document.querySelector('.sparkle');
                        Velocity(fillCup, { scaleY: 0, scaleX: 0, translateX: -17.93, translateY: -12.21 }, {
                            duration: 0, complete: function complete() {
                                Velocity(fillCup, { scaleY: 1, scaleX: 1 }, { duration: 1000 });
                            }
                        });

                        Velocity(diagramInfoItems[_i7], { opacity: 1, scale: 1 }, { duration: 200 });

                        faucetWater.setAttribute('class', 'faucetWater a_FaucetWater');
                    };

                    for (var _i7 = 0; _i7 < diagramInfoItems.length; _i7++) {
                        _loop3(_i7);
                    }
                }
            });
        };
    })();
}

//# sourceMappingURL=script-compiled.js.map