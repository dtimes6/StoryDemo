var App = angular.module('App', ['ngRoute'])
    .constant('$doc', DOC)
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

App.controller('PageCtrl', function($scope, $routeParams, $doc, $speech) {
    var id = Number($routeParams.id);
    var sz = $doc.length;
    $scope.id = id;
    $scope.prev_id = id - 1; if ($scope.prev_id  <  0) { $scope.prev_id = 0; }
    $scope.next_id = id + 1; if ($scope.next_id >= sz) { $scope.next_id = sz - 1; }

    $scope.image_url = "story/" + id + ".jpg";

    $scope.playVoice = function() {
        var words = $doc[$scope.id];
        if (words.length) {
            $speech.speak(words[0]);
        }
    }
});