var App = angular.module('App', ['ngRoute'])
    .constant('$doc', VoiceOver)
    .constant('$con', Conversation)
    .factory('$speech', function() {
        var service = {};
        service.speak = function(str) {
            if (navigator.network.connection.type == Connection.UNKNOWN ||
                navigator.network.connection.type == Connection.NONE) {
                if (window.device.platform == 'iOS') {
                    TextToSpeech.speak(str, 'zh');
                } else {
                    var utterance = new SpeechSynthesisUtterance;
                    utterance.lang = "zh";
                    utterance.text = str;
                    window.speechSynthesis.speak(utterance);
                }
            } else {
                navigator.speech.startSpeaking(str, {voice_name:'xiaoyu'});
            }
        };
        return service;
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/page/:id', {
                templateUrl:'page.html',
                controller: 'PageCtrl'
            })
            .otherwise({
                redirectTo:'/page/0'
            })
    }]);

App.controller('AppCtrl', function($scope) {

});

App.controller('PageCtrl', function($scope, $routeParams, $doc, $con, $speech) {
    var id = Number($routeParams.id);
    var sz = $doc.length;
    $scope.id = id;
    $scope.prev_id = id - 1; if ($scope.prev_id  <  0) { $scope.prev_id = 0; }
    $scope.next_id = id + 1; if ($scope.next_id >= sz) { $scope.next_id = sz - 1; }

    $scope.image_url = "story/" + id + ".jpg";

    $scope.playVoice = function($event) {
        // get xy coordinate and find is possible a conversation
        var con = $con[$scope.id];
        if (con) {
            $event.stopPropagation();
            var cache = document.getElementById('cache_image');
            cache.width  = $event.target.offsetWidth;
            cache.height = $event.target.offsetHeight;
            var ctx = cache.getContext('2d');
            var image = new Image();
            image.src = "story/" + id + "_mask.jpg";
            image.onload = function () {
                ctx.drawImage(image, 0, 0, $event.target.offsetWidth, $event.target.offsetHeight);
                var imageData = ctx.getImageData($event.clientX - $event.target.offsetLeft, $event.clientY - $event.target.offsetTop, 1, 1);
                var data = imageData.data;

                var hexColor = "#"; var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

                for (var i = 0; i < data.length && i < 3; ++i) {
                    var r = data[i] % 16
                    var c = (data[i] / 16) >> 0;
                    hexColor = hexColor + hex[c] + hex[r];
                }
                // 调试颜色时请打开以确认颜色
                //alert(hexColor);
                var keys = Object.keys(con);
                for (var i in keys) {
                    var color = keys[i];
                    if (color == hexColor) {
                        var word = con[color];
                        if (word) {
                            $speech.speak(word);
                            return;
                        }
                    }
                }

                // if not a conversation play voice-over
                var words = $doc[$scope.id];
                if (words.length) {
                    $speech.speak(words[0]);
                }
            }
        } else {
            // if not a conversation play voice-over
            var words = $doc[$scope.id];
            if (words.length) {
                $speech.speak(words[0]);
            }
        }
    }
});
