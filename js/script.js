window.addEventListener('DOMContentLoaded', function() {
    'use strict'
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    let deadline = '2019-06-30';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 100) % 60),
            minutes = Math.floor((t / 100 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {
            let t = getTimeRemaining(endtime);


            function addZeroInTimer(num) {
                if (num <= 9) {
                    return "0" + num;
                } else {
                    return num;
                }
            };

            hours.textContent = addZeroInTimer(t.hours);
            minutes.textContent = addZeroInTimer(t.minutes);
            seconds.textContent = addZeroInTimer(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minute.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);



    let massage = {
        loading: 'Loading',
        success: "Дякую, ми скоро з Вами зв'яжемось",
        failure: "Error"
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessege = document.createElement(statusMessege);

    statusMessege.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessege);

        let request = new XMLHttpRequest();
        request.open('POST', 'someserver');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let objForTransformJSON = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(objForTransformJSON);

        request.send(JSON);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessege.innerHTML = massage.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessege.innerHTML = massage.success;
            } else {
                statusMessege.innerHTML = massage.failure;
            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });
});