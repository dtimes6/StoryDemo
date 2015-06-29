cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.notenaticz.speech.speak/www/iosspeak.js",
        "id": "com.notenaticz.speech.speak.TextToSpeech",
        "clobbers": [
            "window.TextToSpeech"
        ]
    },
    {
        "file": "plugins/com.rjfun.cordova.plugin.iflyspeech/www/speech.js",
        "id": "com.rjfun.cordova.plugin.iflyspeech.speech",
        "clobbers": [
            "navigator.speech"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device-motion/www/Acceleration.js",
        "id": "org.apache.cordova.device-motion.Acceleration",
        "clobbers": [
            "Acceleration"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device-motion/www/accelerometer.js",
        "id": "org.apache.cordova.device-motion.accelerometer",
        "clobbers": [
            "navigator.accelerometer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.notenaticz.speech.speak": "0.0.1",
    "com.rjfun.cordova.plugin.iflyspeech": "0.0.2",
    "org.apache.cordova.device": "0.2.13",
    "org.apache.cordova.network-information": "0.2.14",
    "org.apache.cordova.speech.speechsynthesis": "0.1.0",
    "org.apache.cordova.device-motion": "0.2.11"
}
// BOTTOM OF METADATA
});