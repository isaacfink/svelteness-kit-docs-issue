"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



    var _cardFields, _configuration, _configureIsSetup, _handleHasRun, _framesOrigin, _iframePath, _contorllerFrameName, _fieldFrameName, _controllerFrameField, _iframeFields, _dataBasics, _allFramesLoaded, _ensureConfigSetup, _handle, _framesInit, _tokenResponseMessageHandler, _isFrameMessage, _startPaymentRequestInternal;

    var domLoaded = false;
    document.addEventListener("DOMContentLoaded", function (event) {
        return domLoaded = true;
    });
    var script = document.currentScript;

    function log(msg) {
        console.log(msg);
    }

    var uuidField = 'uuid';
    var fieldTypeField = 'fieldType';
    var fieldNamesField = 'fieldNames';
    let CollectJS = new (_cardFields = /*#__PURE__*/new WeakMap(), _configuration = /*#__PURE__*/new WeakMap(), _configureIsSetup = /*#__PURE__*/new WeakMap(), _handleHasRun = /*#__PURE__*/new WeakMap(), _framesOrigin = /*#__PURE__*/new WeakMap(), _iframePath = /*#__PURE__*/new WeakMap(), _contorllerFrameName = /*#__PURE__*/new WeakMap(), _fieldFrameName = /*#__PURE__*/new WeakMap(), _controllerFrameField = /*#__PURE__*/new WeakMap(), _iframeFields = /*#__PURE__*/new WeakMap(), _dataBasics = /*#__PURE__*/new WeakMap(), _allFramesLoaded = /*#__PURE__*/new WeakMap(), _ensureConfigSetup = /*#__PURE__*/new WeakSet(), _handle = /*#__PURE__*/new WeakSet(), _framesInit = /*#__PURE__*/new WeakSet(), _tokenResponseMessageHandler = /*#__PURE__*/new WeakMap(), _isFrameMessage = /*#__PURE__*/new WeakMap(), _startPaymentRequestInternal = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function () {
        function _class2() {
            var _this = this;

            _classCallCheck(this, _class2);

            _framesInit.add(this);

            _handle.add(this);

            _ensureConfigSetup.add(this);

            _cardFields.set(this, {
                writable: true,
                value: ["ccnumber", "ccexp", "cvv", "cardname"]
            });

            _configuration.set(this, {
                writable: true,
                value: {
                    paymentSelector: "#payButton"
                }
            });

            _configureIsSetup.set(this, {
                writable: true,
                value: false
            });

            _handleHasRun.set(this, {
                writable: true,
                value: false
            });

            _framesOrigin.set(this, {
                writable: true,
                value: "https://" + new URL(script.src).host
            });

            _iframePath.set(this, {
                writable: true,
                value: "/custom/collect/iframes/"
            });

            _contorllerFrameName.set(this, {
                writable: true,
                value: "controller.html"
            });

            _fieldFrameName.set(this, {
                writable: true,
                value: "field.html"
            });

            _controllerFrameField.set(this, {
                writable: true,
                value: null
            });

            _iframeFields.set(this, {
                writable: true,
                value: []
            });

            _dataBasics.set(this, {
                writable: true,
                value: void 0
            });

            _allFramesLoaded.set(this, {
                writable: true,
                value: false
            });

            _tokenResponseMessageHandler.set(this, {
                writable: true,
                value: function value(event) {
                    var _classPrivateFieldGet2, _classPrivateFieldGet3;

                    if (!_classPrivateFieldGet(_this, _isFrameMessage).call(_this, event)) return;
                    if (event.source != ((_classPrivateFieldGet2 = _classPrivateFieldGet(_this, _controllerFrameField)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.contentWindow)) return;

                    var setFrameValid = function setFrameValid(name, isValid) {
                        var frame = _classPrivateFieldGet(_this, _iframeFields)[_classPrivateFieldGet(_this, _cardFields).indexOf(name)];

                        var frameValidClass = "CollectJsValid",
                            frameInvalidClass = "CollectJsInvalid";
                        frame.classList.toggle(frameValidClass, isValid);
                        frame.classList.toggle(frameInvalidClass, !isValid);
                    };

                    var validationCallback = (_classPrivateFieldGet3 = _classPrivateFieldGet(_this, _configuration)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.validationCallback;

                    if (event.data.errors && event.data.errors.length) {
                        var errorFields = new Set(); // for/of causes problems after using babel...

                        for (var i = 0; i < event.data.errors.length; i++) {
                            var error = event.data.errors[i];

                            if (validationCallback) {
                                validationCallback(error.field, false, error.errorText);
                            }

                            if (error.field) {
                                setFrameValid(error.field, false);
                                errorFields.add(error.field);
                            }
                        }

                        var validFields = _classPrivateFieldGet(_this, _cardFields).filter(function (f) {
                            return !errorFields.has(f);
                        });

                        validFields.forEach(function (f) {
                            if (validationCallback) {
                                validationCallback(f, true);
                            }

                            setFrameValid(f, true);
                        });
                        return;
                    }

                    if (!event.data.token) {
                        if (validationCallback) {
                            validationCallback("", false, "No token recieved");
                        }

                        log("No token");
                        return;
                    }

                    var response = {
                        token: event.data.token,
                        card: event.data.card
                    };

                    if (_classPrivateFieldGet(_this, _configuration).callback) {
                        _classPrivateFieldGet(_this, _configuration).callback(response);
                    } else {// TODO...
                    }
                }
            });

            _isFrameMessage.set(this, {
                writable: true,
                value: function value(event) {
                    return Object.keys(_classPrivateFieldGet(_this, _dataBasics)).every(function (key) {
                        return event.data[key] == _classPrivateFieldGet(_this, _dataBasics)[key];
                    }) || event.origin == _this.framesOrigin;
                }
            });

            _startPaymentRequestInternal.set(this, {
                writable: true,
                value: function value(event) {
                    if (event instanceof Event) event.preventDefault();

                    if (!_classPrivateFieldGet(_this, _allFramesLoaded)) {
                        log("Attempted to process before all frames loaded, aborting");
                        return; //TODO... maybe some error message
                    } // Not binding it as it would not be removed next time, plus no need to bind it to 'this' as it is a lambda


                    window.removeEventListener("message", _classPrivateFieldGet(_this, _tokenResponseMessageHandler));
                    window.addEventListener("message", _classPrivateFieldGet(_this, _tokenResponseMessageHandler));

                    var msg = _objectSpread(_objectSpread({}, _classPrivateFieldGet(_this, _dataBasics)), {}, {
                        tokenize: true
                    });

                    _classPrivateFieldGet(_this, _controllerFrameField).contentWindow.postMessage(msg, _classPrivateFieldGet(_this, _framesOrigin));
                }
            });
        }

        _createClass(_class2, [{
            key: "configure",
            value: function configure(config) {
                var _this2 = this;

                if (this.handleHasRun || domLoaded) {
                    // Handle is supposed to run after DOMContentLoaded anyway
                    var oldPaymentSelector = _classPrivateFieldGet(this, _configuration).paymentSelector;

                    Object.assign(_classPrivateFieldGet(this, _configuration), config);

                    var newPaymentSelector = _classPrivateFieldGet(this, _configuration).paymentSelector;

                    if (oldPaymentSelector && newPaymentSelector != oldPaymentSelector) {
                        var _document$querySelect;

                        // Not binding it as it would not be removed, plus no need to bind it to 'this' as it is a lambda
                        (_document$querySelect = document.querySelector(oldPaymentSelector)) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.removeEventListener("click", _classPrivateFieldGet(this, _startPaymentRequestInternal));
                    }

                    _classPrivateMethodGet(this, _handle, _handle2).call(this);
                } else if (domLoaded) {
                    _classPrivateMethodGet(this, _ensureConfigSetup, _ensureConfigSetup2).call(this);

                    Object.assign(_classPrivateFieldGet(this, _configuration), config);

                    _classPrivateMethodGet(this, _handle, _handle2).call(this);
                } else {
                    document.addEventListener("DOMContentLoaded", function (event) {
                        _classPrivateMethodGet(_this2, _ensureConfigSetup, _ensureConfigSetup2).call(_this2);

                        Object.assign(_classPrivateFieldGet(_this2, _configuration), config);

                        _classPrivateMethodGet(_this2, _handle, _handle2).call(_this2);
                    });
                }
            }
        }, {
            key: "startPaymentRequest",
            value: function startPaymentRequest(event) {
                _classPrivateFieldGet(this, _startPaymentRequestInternal).call(this, event);
            } // Use lambda for autobinding given that we want to be able to add and remove it as an event listener

        }]);

        return _class2;
    }())();

    function _ensureConfigSetup2() {
        // Can there be multithread issues???
        if (!_classPrivateFieldGet(this, _configureIsSetup)) {
            Object.assign(_classPrivateFieldGet(this, _configuration), script.dataset); // Don't use docuemnt.currentScript as Dataset only works when domLoaded, but in the event handler we no longer have directly the script...
            // https://stackoverflow.com/a/2117523/640195

            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });

            _classPrivateFieldSet(this, _dataBasics, _defineProperty({}, uuidField, uuid));

            _classPrivateFieldSet(this, _configureIsSetup, true);
        }
    }

    function _handle2() {
        var _classPrivateFieldGet4,
            _document$querySelect2,
            _document$querySelect3,
            _this3 = this;

        _classPrivateMethodGet(this, _ensureConfigSetup, _ensureConfigSetup2).call(this);

        var paymentSelector = (_classPrivateFieldGet4 = _classPrivateFieldGet(this, _configuration)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.paymentSelector; // Not binding it as it would not be removed next time, plus no need to bind it to 'this' as it is a lambda

        (_document$querySelect2 = document.querySelector(paymentSelector)) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.removeEventListener("click", _classPrivateFieldGet(this, _startPaymentRequestInternal));
        (_document$querySelect3 = document.querySelector(paymentSelector)) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.addEventListener("click", _classPrivateFieldGet(this, _startPaymentRequestInternal));

        _classPrivateFieldSet(this, _handleHasRun, true);

        _classPrivateFieldGet(this, _iframeFields).forEach(function (f) {
            return f.remove();
        });

        _classPrivateFieldSet(this, _iframeFields, []);

        var config = _classPrivateFieldGet(this, _configuration);

        var dataBasics = _classPrivateFieldGet(this, _dataBasics);

        var basicData = "&".concat(uuidField, "=").concat(encodeURIComponent(dataBasics[uuidField]));
        if (config.stylesheet) {
            basicData += "&stylesheet=".concat(encodeURIComponent(config.stylesheet));
        }

        var framesPath = _classPrivateFieldGet(this, _framesOrigin) + _classPrivateFieldGet(this, _iframePath);

        window.addEventListener("message", function (event) {
            var _event$data, _classPrivateFieldGet5;

            if (!_classPrivateFieldGet(_this3, _isFrameMessage).call(_this3, event)) return;

            if ((_event$data = event.data) !== null && _event$data !== void 0 && _event$data.validationError && (_classPrivateFieldGet5 = _classPrivateFieldGet(_this3, _configuration)) !== null && _classPrivateFieldGet5 !== void 0 && _classPrivateFieldGet5.validationCallback) {
                _classPrivateFieldGet(_this3, _configuration).validationCallback(event.data.fieldType, false, event.data.message);
            }
        });

        _classPrivateMethodGet(this, _framesInit, _framesInit2).call(this, framesPath, basicData); ///TODO... handle submit, do we need to handle styles? autofill? handle the tokenization and errors, does on change work?...

    }

    function _framesInit2(framesPath, basicData) {
        var _this4 = this,
            _classPrivateFieldGet9;

        var controllerLoaded = false;

        var inputFramesLoaded = function inputFramesLoaded() {
            return inputframeLoadTracker.every(function (entry) {
                return entry[1];
            });
        };

        var allFramesLoaded = function allFramesLoaded() {
            return controllerLoaded && inputFramesLoaded();
        };

        var handleAllFramesLoaded = function handleAllFramesLoaded() {
            if (_classPrivateFieldGet(_this4, _configuration).fieldsAvailableCallback) {
                _classPrivateFieldGet(_this4, _configuration).fieldsAvailableCallback();
            }

            _classPrivateFieldSet(_this4, _allFramesLoaded, true);
        };

        if (_classPrivateFieldGet(this, _configuration).timeoutDuration && _classPrivateFieldGet(this, _configuration).timeoutCallback) {
            var start = Date.now();
            setTimeout(function () {
                if (!allFramesLoaded()) {
                    _classPrivateFieldGet(_this4, _configuration).timeoutCallback();
                }
            }, _classPrivateFieldGet(this, _configuration).timeoutDuration);
        }

        _classPrivateFieldGet(this, _cardFields).forEach(function (fieldName, i) {
            var fieldFrame = document.createElement("iframe");
            fieldFrame.style.border = "0";
            fieldFrame.style.padding = "0";
            fieldFrame.style.height = "20px"; // Sensible initial value so it shouldn't flicker much               

            fieldFrame.style.overflow = "hidden"; // Don't show scrollbars initially while we wait for the actual size

            _classPrivateFieldGet(_this4, _iframeFields).push(fieldFrame);
        });

        var inputframeLoadTracker = _classPrivateFieldGet(this, _iframeFields).map(function (frame) {
            return [frame, false];
        }); // Setup listeners before actually creating the iframe, otherwise we might lose them
        // Using arow functions for autobinding


        _classPrivateFieldGet(this, _iframeFields).forEach(function (frame) {
            window.addEventListener("message", function (event) {
                if (!_classPrivateFieldGet(_this4, _isFrameMessage).call(_this4, event) || event.source != frame.contentWindow || !event.data.size) return;
                if (event.data.size && event.data.size.height) frame.style.height = event.data.size.height + "px"; // Avoid issue where the width is 4 as happened before changing to use setTimeout in field.html

                if (event.data.size && event.data.size.width > 10) frame.style.width = event.data.size.width + "px";
                inputframeLoadTracker.find(function (entry) {
                    return entry[0] == frame;
                })[1] = true;
                log("Loaded frame '" + frame.src + "'");

                if (allFramesLoaded() && _classPrivateFieldGet(_this4, _configuration).fieldsAvailableCallback) {
                    _classPrivateFieldGet(_this4, _configuration).fieldsAvailableCallback();
                }

                allFramesLoaded() && handleAllFramesLoaded();
            });
        });

        _classPrivateFieldGet(this, _iframeFields).forEach(function (fieldFrame, i) {
            var _classPrivateFieldGet6, _classPrivateFieldGet7;

            var fieldName = _classPrivateFieldGet(_this4, _cardFields)[i];

            fieldFrame.src = framesPath + _classPrivateFieldGet(_this4, _fieldFrameName) + "?".concat(fieldTypeField, "=") + fieldName + basicData;
            var selectorId = ((_classPrivateFieldGet6 = _classPrivateFieldGet(_this4, _configuration).fields) === null || _classPrivateFieldGet6 === void 0 ? void 0 : (_classPrivateFieldGet7 = _classPrivateFieldGet6[fieldName]) === null || _classPrivateFieldGet7 === void 0 ? void 0 : _classPrivateFieldGet7.selector) || "#" + fieldName;
            document.querySelector(selectorId).appendChild(fieldFrame);
        }); // Using arrow functions for autobindding


        window.addEventListener("message", function (event) {
            var _classPrivateFieldGet8;

            if (!_classPrivateFieldGet(_this4, _isFrameMessage).call(_this4, event)) return;
            if (event.source != ((_classPrivateFieldGet8 = _classPrivateFieldGet(_this4, _controllerFrameField)) === null || _classPrivateFieldGet8 === void 0 ? void 0 : _classPrivateFieldGet8.contentWindow)) return;

            if (event.data.alive && !controllerLoaded) {
                controllerLoaded = true;
                log("Contorller loaded");
                allFramesLoaded() && handleAllFramesLoaded();
            }
        }); // https://stackoverflow.com/a/33352604/640195

        var framesAsArray = _toConsumableArray(Array(window.length).keys()).map(function (i) {
            return window.frames[i];
        });

        var frameIdx = _classPrivateFieldGet(this, _iframeFields).map(function (frame) {
            return framesAsArray.indexOf(frame.contentWindow);
        });

        var msg = _objectSpread(_objectSpread({}, _classPrivateFieldGet(this, _dataBasics)), {}, {
            ping: true,
            framesIdx: frameIdx,
            frameSettings: (_classPrivateFieldGet9 = _classPrivateFieldGet(this, _configuration)) === null || _classPrivateFieldGet9 === void 0 ? void 0 : _classPrivateFieldGet9.fields
        }); // IFrame OnLoad doesn't work in Chrome, but we need to do this before loading (and possibly before calling .src??)


        var intervalToken = setInterval(function () {
            if (controllerLoaded) clearInterval(intervalToken);

            try {
                var _classPrivateFieldGet10, _classPrivateFieldGet11;

                (_classPrivateFieldGet10 = _classPrivateFieldGet(_this4, _controllerFrameField)) === null || _classPrivateFieldGet10 === void 0 ? void 0 : (_classPrivateFieldGet11 = _classPrivateFieldGet10.contentWindow) === null || _classPrivateFieldGet11 === void 0 ? void 0 : _classPrivateFieldGet11.postMessage(msg, _classPrivateFieldGet(_this4, _framesOrigin));
            } catch (_unused) { } // Before the frame fully loads there might be an error due not being the correct origin

        }, 300);
        var controller = document.createElement("iframe");
        controller.src = framesPath + _classPrivateFieldGet(this, _contorllerFrameName) + "?".concat(fieldNamesField, "=") + _classPrivateFieldGet(this, _cardFields).join(',') + basicData;
        controller.height = 0;
        controller.tabIndex = -1;
        controller.style = "visibility: hidden";
        document.body.appendChild(controller);

        _classPrivateFieldSet(this, _controllerFrameField, controller);
    }

export default CollectJS