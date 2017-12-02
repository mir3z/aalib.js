"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable = require("rxjs/Observable");

require("rxjs/add/operator/map");

require("rxjs/add/operator/do");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractReader = function () {
    function AbstractReader() {
        _classCallCheck(this, AbstractReader);
    }

    _createClass(AbstractReader, [{
        key: "read",
        value: function read() {
            var _this = this;

            return _Observable.Observable.create(function (observer) {
                _this.onRead(observer);
                return _this.onDispose.bind(_this);
            });
        }
    }, {
        key: "onRead",
        value: function onRead() {
            // override
        }
    }, {
        key: "onDispose",
        value: function onDispose() {
            // override
        }
    }]);

    return AbstractReader;
}();

exports.default = AbstractReader;