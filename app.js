var app = angular.module('FixtureApp', ['ngMaterial']);

app.controller('MainCtrl', ['$scope',
    function($scope) {

        $scope.names = [];

        $scope.$watchCollection('names', function(names) {
            $scope.combos = fixtureList(names.length % 2 != 0 ? names.concat([undefined]) : names);
        });

        var fixtureList = function(names) {
            var combos = [];
            for (var i = 1; i < names.length; i++) {
                var temp = [];
                for (var j = 0; j < names.length / 2; j++) {
                    temp.push([names[j], names[names.length - j - 1]].sort());
                }
                combos.push(temp);
                names.splice(1, 0, names.pop());
            }
            return combos;
        }
    }
]);

var min = 00;
var sec = 00;
var msec = 00;
var Interval;

function start(index) {
    const elementIndex = index.dataset.elementId;
    var timerAnimation = document.querySelector("#countdown-" + elementIndex + "  svg circle");
    var resetButton = document.querySelector("#reset-" + elementIndex);

    clearInterval(Interval);
    Interval = setInterval(timer, 10, elementIndex);

    timerAnimation.classList.add("animate-timer");
    index.classList.add("disabled");
    resetButton.classList.remove("disabled");
}

function reset(index) {
    const elementIndex = index.dataset.elementId;
    var elemSec = document.getElementById("sec-" + elementIndex);
    var elemMin = document.getElementById("min-" + elementIndex);
    var timerAnimation = document.querySelector("#countdown-" + elementIndex + "  svg circle");
    var startButton = document.querySelector("#start-" + elementIndex);

    clearInterval(Interval);

    sec = "00";
    min = "00";
    elemSec.innerHTML = sec;
    elemMin.innerHTML = min;

    timerAnimation.classList.remove("animate-timer");
    startButton.classList.remove("disabled");
    index.classList.add("disabled");
}

// function pause(index) {
//     clearInterval(Interval)
// }

function timer(index) {
    var elemMin = document.getElementById("min-" + index);
    var elemSec = document.getElementById("sec-" + index);

    msec++;

    if (msec > 99) {
        sec++;
        elemSec.innerHTML = "0" + sec;
        msec = 0;
    }
    if (sec > 9) {
        elemSec.innerHTML = sec;
    }
    if (sec > 59) {
        min++;
        elemMin.innerHTML = "0" + min;
        sec = 0;
        elemSec.innerHTML = "0" + 0;
    }
    if (min > 9) {
        elemMin.innerHTML = min;
    }
}
