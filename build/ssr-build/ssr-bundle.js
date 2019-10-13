module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "3FBL":
/***/ (function(module, exports) {

module.exports = {"skills":[{"title":"Front-end","text":"judging by the looks","skills":["HTML5 / CSS3","JS / jQuery","React / Angular "]},{"title":"Back-end","text":"got data?","skills":["NodeJS / Express","Redis / postgreSQL","Nginx / Server Setup"]},{"title":"DevOps","text":"and another cloud provider","skills":["Docker","Kubernetes","AWS / DigitalOcean"]},{"title":"General","text":"when trying too hard","skills":["Webpack / Gulp","React-Native","Debugging / Clean Code"]}]}

/***/ }),

/***/ "8c+i":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"skills":"skills__199ZI"};

/***/ }),

/***/ "GM/b":
/***/ (function(module, exports) {

module.exports = {"title":"Elvis Graholskis","subtitle":"Web Developer"}

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.scss
var style = __webpack_require__("yY49");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// CONCATENATED MODULE: ./components/header/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var _ref = Object(preact_min["h"])(
	'nav',
	null,
	Object(preact_min["h"])(
		match["Link"],
		{ activeClassName: 'active', href: '/' },
		'Skills'
	),
	Object(preact_min["h"])(
		match["Link"],
		{ activeClassName: 'active', href: '/hobbies' },
		'Hobbies'
	),
	Object(preact_min["h"])(
		match["Link"],
		{ activeClassName: 'active', href: '/random' },
		'Random'
	)
);

var header_Header = function (_Component) {
	_inherits(Header, _Component);

	function Header() {
		var _temp, _this, _ret;

		_classCallCheck(this, Header);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			class: ''
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Header.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		this.timeoutId = setTimeout(function () {
			_this2.setState(function () {
				return { class: 'header--mounted' };
			});
		}, 10);
	};

	Header.prototype.componentWillUnmount = function componentWillUnmount() {
		clearTimeout(this.timeoutId);
	};

	Header.prototype.render = function render() {
		return Object(preact_min["h"])(
			'header',
			{ 'class': 'header ' + this.state.class },
			_ref
		);
	};

	return Header;
}(preact_min["Component"]);


// CONCATENATED MODULE: ../node_modules/preact-feather/dist/index.es.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var index_es_Activity = function Activity(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "22 12 18 12 15 21 9 3 6 12 2 12"
  }));
};

var index_es_Airplay = function Airplay(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
  }), Object(preact_min["h"])("polygon", {
    points: "12 15 17 21 7 21 12 15"
  }));
};

var index_es_AlertCircle = function AlertCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "16"
  }));
};

var index_es_AlertOctagon = function AlertOctagon(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "16"
  }));
};

var index_es_AlertTriangle = function AlertTriangle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "13"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "17"
  }));
};

var index_es_AlignCenter = function AlignCenter(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "18",
    y1: "10",
    x2: "6",
    y2: "10"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "6",
    x2: "3",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "14",
    x2: "3",
    y2: "14"
  }), Object(preact_min["h"])("line", {
    x1: "18",
    y1: "18",
    x2: "6",
    y2: "18"
  }));
};

var index_es_AlignJustify = function AlignJustify(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "10",
    x2: "3",
    y2: "10"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "6",
    x2: "3",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "14",
    x2: "3",
    y2: "14"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "18",
    x2: "3",
    y2: "18"
  }));
};

var index_es_AlignLeft = function AlignLeft(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "17",
    y1: "10",
    x2: "3",
    y2: "10"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "6",
    x2: "3",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "14",
    x2: "3",
    y2: "14"
  }), Object(preact_min["h"])("line", {
    x1: "17",
    y1: "18",
    x2: "3",
    y2: "18"
  }));
};

var index_es_AlignRight = function AlignRight(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "10",
    x2: "7",
    y2: "10"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "6",
    x2: "3",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "14",
    x2: "3",
    y2: "14"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "18",
    x2: "7",
    y2: "18"
  }));
};

var index_es_Anchor = function Anchor(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "5",
    r: "3"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "22",
    x2: "12",
    y2: "8"
  }), Object(preact_min["h"])("path", {
    d: "M5 12H2a10 10 0 0 0 20 0h-3"
  }));
};

var index_es_Aperture = function Aperture(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "14.31",
    y1: "8",
    x2: "20.05",
    y2: "17.94"
  }), Object(preact_min["h"])("line", {
    x1: "9.69",
    y1: "8",
    x2: "21.17",
    y2: "8"
  }), Object(preact_min["h"])("line", {
    x1: "7.38",
    y1: "12",
    x2: "13.12",
    y2: "2.06"
  }), Object(preact_min["h"])("line", {
    x1: "9.69",
    y1: "16",
    x2: "3.95",
    y2: "6.06"
  }), Object(preact_min["h"])("line", {
    x1: "14.31",
    y1: "16",
    x2: "2.83",
    y2: "16"
  }), Object(preact_min["h"])("line", {
    x1: "16.62",
    y1: "12",
    x2: "10.88",
    y2: "21.94"
  }));
};

var index_es_Archive = function Archive(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "21 8 21 21 3 21 3 8"
  }), Object(preact_min["h"])("rect", {
    x: "1",
    y: "3",
    width: "22",
    height: "5"
  }), Object(preact_min["h"])("line", {
    x1: "10",
    y1: "12",
    x2: "14",
    y2: "12"
  }));
};

var index_es_ArrowDownCircle = function ArrowDownCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("polyline", {
    points: "8 12 12 16 16 12"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "16"
  }));
};

var index_es_ArrowDownLeft = function ArrowDownLeft(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "17",
    y1: "7",
    x2: "7",
    y2: "17"
  }), Object(preact_min["h"])("polyline", {
    points: "17 17 7 17 7 7"
  }));
};

var index_es_ArrowDownRight = function ArrowDownRight(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "7",
    y1: "7",
    x2: "17",
    y2: "17"
  }), Object(preact_min["h"])("polyline", {
    points: "17 7 17 17 7 17"
  }));
};

var index_es_ArrowDown = function ArrowDown(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), Object(preact_min["h"])("polyline", {
    points: "19 12 12 19 5 12"
  }));
};

var index_es_ArrowLeftCircle = function ArrowLeftCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("polyline", {
    points: "12 8 8 12 12 16"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "12",
    x2: "8",
    y2: "12"
  }));
};

var index_es_ArrowLeft = function ArrowLeft(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "19",
    y1: "12",
    x2: "5",
    y2: "12"
  }), Object(preact_min["h"])("polyline", {
    points: "12 19 5 12 12 5"
  }));
};

var index_es_ArrowRightCircle = function ArrowRightCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("polyline", {
    points: "12 16 16 12 12 8"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "12",
    x2: "16",
    y2: "12"
  }));
};

var index_es_ArrowRight = function ArrowRight(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }), Object(preact_min["h"])("polyline", {
    points: "12 5 19 12 12 19"
  }));
};

var index_es_ArrowUpCircle = function ArrowUpCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("polyline", {
    points: "16 12 12 8 8 12"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "8"
  }));
};

var index_es_ArrowUpLeft = function ArrowUpLeft(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "17",
    y1: "17",
    x2: "7",
    y2: "7"
  }), Object(preact_min["h"])("polyline", {
    points: "7 17 7 7 17 7"
  }));
};

var index_es_ArrowUpRight = function ArrowUpRight(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "7",
    y1: "17",
    x2: "17",
    y2: "7"
  }), Object(preact_min["h"])("polyline", {
    points: "7 7 17 7 17 17"
  }));
};

var index_es_ArrowUp = function ArrowUp(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "5"
  }), Object(preact_min["h"])("polyline", {
    points: "5 12 12 5 19 12"
  }));
};

var index_es_AtSign = function AtSign(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), Object(preact_min["h"])("path", {
    d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"
  }));
};

var index_es_Award = function Award(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "8",
    r: "7"
  }), Object(preact_min["h"])("polyline", {
    points: "8.21 13.89 7 23 12 20 17 23 15.79 13.88"
  }));
};

var index_es_BarChart2 = function BarChart2(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "18",
    y1: "20",
    x2: "18",
    y2: "10"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "4"
  }), Object(preact_min["h"])("line", {
    x1: "6",
    y1: "20",
    x2: "6",
    y2: "14"
  }));
};

var index_es_BarChart = function BarChart(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "10"
  }), Object(preact_min["h"])("line", {
    x1: "18",
    y1: "20",
    x2: "18",
    y2: "4"
  }), Object(preact_min["h"])("line", {
    x1: "6",
    y1: "20",
    x2: "6",
    y2: "16"
  }));
};

var index_es_BatteryCharging = function BatteryCharging(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"
  }), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "13",
    x2: "23",
    y2: "11"
  }), Object(preact_min["h"])("polyline", {
    points: "11 6 7 12 13 12 9 18"
  }));
};

var index_es_Battery = function Battery(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "1",
    y: "6",
    width: "18",
    height: "12",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "13",
    x2: "23",
    y2: "11"
  }));
};

var index_es_BellOff = function BellOff(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M8.56 2.9A7 7 0 0 1 19 9v4m-2 4H2a3 3 0 0 0 3-3V9a7 7 0 0 1 .78-3.22M13.73 21a2 2 0 0 1-3.46 0"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }));
};

var index_es_Bell = function Bell(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"
  }));
};

var index_es_Bluetooth = function Bluetooth(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"
  }));
};

var index_es_Bold = function Bold(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
  }), Object(preact_min["h"])("path", {
    d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
  }));
};

var index_es_BookOpen = function BookOpen(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
  }), Object(preact_min["h"])("path", {
    d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
  }));
};

var index_es_Book = function Book(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
  }), Object(preact_min["h"])("path", {
    d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
  }));
};

var index_es_Bookmark = function Bookmark(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
  }));
};

var index_es_Box = function Box(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"
  }), Object(preact_min["h"])("polyline", {
    points: "2.32 6.16 12 11 21.68 6.16"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "22.76",
    x2: "12",
    y2: "11"
  }));
};

var index_es_Briefcase = function Briefcase(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "2",
    y: "7",
    width: "20",
    height: "14",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("path", {
    d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
  }));
};

var index_es_Calendar = function Calendar(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  }));
};

var index_es_CameraOff = function CameraOff(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }), Object(preact_min["h"])("path", {
    d: "M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"
  }));
};

var index_es_Camera = function Camera(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "13",
    r: "4"
  }));
};

var index_es_Cast = function Cast(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"
  }), Object(preact_min["h"])("line", {
    x1: "2",
    y1: "20",
    x2: "2",
    y2: "20"
  }));
};

var index_es_CheckCircle = function CheckCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), Object(preact_min["h"])("polyline", {
    points: "22 4 12 14.01 9 11.01"
  }));
};

var index_es_CheckSquare = function CheckSquare(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "9 11 12 14 22 4"
  }), Object(preact_min["h"])("path", {
    d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
  }));
};

var index_es_Check = function Check(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "20 6 9 17 4 12"
  }));
};

var index_es_ChevronDown = function ChevronDown(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "6 9 12 15 18 9"
  }));
};

var index_es_ChevronLeft = function ChevronLeft(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "15 18 9 12 15 6"
  }));
};

var index_es_ChevronRight = function ChevronRight(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "9 18 15 12 9 6"
  }));
};

var index_es_ChevronUp = function ChevronUp(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "18 15 12 9 6 15"
  }));
};

var index_es_ChevronsDown = function ChevronsDown(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "7 13 12 18 17 13"
  }), Object(preact_min["h"])("polyline", {
    points: "7 6 12 11 17 6"
  }));
};

var index_es_ChevronsLeft = function ChevronsLeft(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "11 17 6 12 11 7"
  }), Object(preact_min["h"])("polyline", {
    points: "18 17 13 12 18 7"
  }));
};

var index_es_ChevronsRight = function ChevronsRight(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "13 17 18 12 13 7"
  }), Object(preact_min["h"])("polyline", {
    points: "6 17 11 12 6 7"
  }));
};

var index_es_ChevronsUp = function ChevronsUp(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "17 11 12 6 7 11"
  }), Object(preact_min["h"])("polyline", {
    points: "17 18 12 13 7 18"
  }));
};

var index_es_Chrome = function Chrome(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), Object(preact_min["h"])("line", {
    x1: "21.17",
    y1: "8",
    x2: "12",
    y2: "8"
  }), Object(preact_min["h"])("line", {
    x1: "3.95",
    y1: "6.06",
    x2: "8.54",
    y2: "14"
  }), Object(preact_min["h"])("line", {
    x1: "10.88",
    y1: "21.94",
    x2: "15.46",
    y2: "14"
  }));
};

var index_es_Circle = function Circle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }));
};

var index_es_Clipboard = function Clipboard(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
  }), Object(preact_min["h"])("rect", {
    x: "8",
    y: "2",
    width: "8",
    height: "4",
    rx: "1",
    ry: "1"
  }));
};

var index_es_Clock = function Clock(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("polyline", {
    points: "12 6 12 12 16 14"
  }));
};

var index_es_CloudDrizzle = function CloudDrizzle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "19",
    x2: "8",
    y2: "21"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "13",
    x2: "8",
    y2: "15"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "19",
    x2: "16",
    y2: "21"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "13",
    x2: "16",
    y2: "15"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "23"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "17"
  }), Object(preact_min["h"])("path", {
    d: "M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"
  }));
};

var index_es_CloudLightning = function CloudLightning(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"
  }), Object(preact_min["h"])("polyline", {
    points: "13 11 9 17 15 17 11 23"
  }));
};

var index_es_CloudOff = function CloudOff(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }));
};

var index_es_CloudRain = function CloudRain(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "13",
    x2: "16",
    y2: "21"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "13",
    x2: "8",
    y2: "21"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "23"
  }), Object(preact_min["h"])("path", {
    d: "M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"
  }));
};

var index_es_CloudSnow = function CloudSnow(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "16",
    x2: "8",
    y2: "16"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "20",
    x2: "8",
    y2: "20"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "18",
    x2: "12",
    y2: "18"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "22",
    x2: "12",
    y2: "22"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "16",
    x2: "16",
    y2: "16"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "20",
    x2: "16",
    y2: "20"
  }));
};

var index_es_Cloud = function Cloud(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
  }));
};

var index_es_Code = function Code(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "16 18 22 12 16 6"
  }), Object(preact_min["h"])("polyline", {
    points: "8 6 2 12 8 18"
  }));
};

var index_es_Codepen = function Codepen(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "22",
    x2: "12",
    y2: "15.5"
  }), Object(preact_min["h"])("polyline", {
    points: "22 8.5 12 15.5 2 8.5"
  }), Object(preact_min["h"])("polyline", {
    points: "2 15.5 12 8.5 22 15.5"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "8.5"
  }));
};

var index_es_Coffee = function Coffee(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M18 8h1a4 4 0 0 1 0 8h-1"
  }), Object(preact_min["h"])("path", {
    d: "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
  }), Object(preact_min["h"])("line", {
    x1: "6",
    y1: "1",
    x2: "6",
    y2: "4"
  }), Object(preact_min["h"])("line", {
    x1: "10",
    y1: "1",
    x2: "10",
    y2: "4"
  }), Object(preact_min["h"])("line", {
    x1: "14",
    y1: "1",
    x2: "14",
    y2: "4"
  }));
};

var index_es_Command = function Command(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
  }));
};

var index_es_Compass = function Compass(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("polygon", {
    points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
  }));
};

var index_es_Copy = function Copy(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("path", {
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  }));
};

var index_es_CornerDownLeft = function CornerDownLeft(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "9 10 4 15 9 20"
  }), Object(preact_min["h"])("path", {
    d: "M20 4v7a4 4 0 0 1-4 4H4"
  }));
};

var index_es_CornerDownRight = function CornerDownRight(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "15 10 20 15 15 20"
  }), Object(preact_min["h"])("path", {
    d: "M4 4v7a4 4 0 0 0 4 4h12"
  }));
};

var index_es_CornerLeftDown = function CornerLeftDown(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "14 15 9 20 4 15"
  }), Object(preact_min["h"])("path", {
    d: "M20 4h-7a4 4 0 0 0-4 4v12"
  }));
};

var index_es_CornerLeftUp = function CornerLeftUp(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "14 9 9 4 4 9"
  }), Object(preact_min["h"])("path", {
    d: "M20 20h-7a4 4 0 0 1-4-4V4"
  }));
};

var index_es_CornerRightDown = function CornerRightDown(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "10 15 15 20 20 15"
  }), Object(preact_min["h"])("path", {
    d: "M4 4h7a4 4 0 0 1 4 4v12"
  }));
};

var index_es_CornerRightUp = function CornerRightUp(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "10 9 15 4 20 9"
  }), Object(preact_min["h"])("path", {
    d: "M4 20h7a4 4 0 0 0 4-4V4"
  }));
};

var index_es_CornerUpLeft = function CornerUpLeft(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "9 14 4 9 9 4"
  }), Object(preact_min["h"])("path", {
    d: "M20 20v-7a4 4 0 0 0-4-4H4"
  }));
};

var index_es_CornerUpRight = function CornerUpRight(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "15 14 20 9 15 4"
  }), Object(preact_min["h"])("path", {
    d: "M4 20v-7a4 4 0 0 1 4-4h12"
  }));
};

var index_es_Cpu = function Cpu(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "16",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "6"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "1",
    x2: "9",
    y2: "4"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "1",
    x2: "15",
    y2: "4"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "20",
    x2: "9",
    y2: "23"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "20",
    x2: "15",
    y2: "23"
  }), Object(preact_min["h"])("line", {
    x1: "20",
    y1: "9",
    x2: "23",
    y2: "9"
  }), Object(preact_min["h"])("line", {
    x1: "20",
    y1: "14",
    x2: "23",
    y2: "14"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "9",
    x2: "4",
    y2: "9"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "14",
    x2: "4",
    y2: "14"
  }));
};

var index_es_CreditCard = function CreditCard(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "1",
    y: "4",
    width: "22",
    height: "16",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "10",
    x2: "23",
    y2: "10"
  }));
};

var index_es_Crop = function Crop(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M6.13 1L6 16a2 2 0 0 0 2 2h15"
  }), Object(preact_min["h"])("path", {
    d: "M1 6.13L16 6a2 2 0 0 1 2 2v15"
  }));
};

var index_es_Crosshair = function Crosshair(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "22",
    y1: "12",
    x2: "18",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "6",
    y1: "12",
    x2: "2",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "6",
    x2: "12",
    y2: "2"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "22",
    x2: "12",
    y2: "18"
  }));
};

var index_es_Database = function Database(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("ellipse", {
    cx: "12",
    cy: "5",
    rx: "9",
    ry: "3"
  }), Object(preact_min["h"])("path", {
    d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
  }), Object(preact_min["h"])("path", {
    d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
  }));
};

var index_es_Delete = function Delete(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
  }), Object(preact_min["h"])("line", {
    x1: "18",
    y1: "9",
    x2: "12",
    y2: "15"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "9",
    x2: "18",
    y2: "15"
  }));
};

var index_es_Disc = function Disc(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }));
};

var index_es_DollarSign = function DollarSign(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "1",
    x2: "12",
    y2: "23"
  }), Object(preact_min["h"])("path", {
    d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
  }));
};

var index_es_DownloadCloud = function DownloadCloud(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "8 17 12 21 16 17"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "12",
    x2: "12",
    y2: "21"
  }), Object(preact_min["h"])("path", {
    d: "M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"
  }));
};

var index_es_Download = function Download(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), Object(preact_min["h"])("polyline", {
    points: "7 10 12 15 17 10"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  }));
};

var index_es_Droplet = function Droplet(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
  }));
};

var index_es_Edit2 = function Edit2(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "16 3 21 8 8 21 3 21 3 16 16 3"
  }));
};

var index_es_Edit3 = function Edit3(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "14 2 18 6 7 17 3 17 3 13 14 2"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "22",
    x2: "21",
    y2: "22"
  }));
};

var index_es_Edit = function Edit(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"
  }), Object(preact_min["h"])("polygon", {
    points: "18 2 22 6 12 16 8 16 8 12 18 2"
  }));
};

var index_es_ExternalLink = function ExternalLink(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  }), Object(preact_min["h"])("polyline", {
    points: "15 3 21 3 21 9"
  }), Object(preact_min["h"])("line", {
    x1: "10",
    y1: "14",
    x2: "21",
    y2: "3"
  }));
};

var index_es_EyeOff = function EyeOff(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }));
};

var index_es_Eye = function Eye(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }));
};

var index_es_Facebook = function Facebook(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
  }));
};

var index_es_FastForward = function FastForward(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "13 19 22 12 13 5 13 19"
  }), Object(preact_min["h"])("polygon", {
    points: "2 19 11 12 2 5 2 19"
  }));
};

var index_es_Feather = function Feather(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "8",
    x2: "2",
    y2: "22"
  }), Object(preact_min["h"])("line", {
    x1: "17.5",
    y1: "15",
    x2: "9",
    y2: "15"
  }));
};

var index_es_FileMinus = function FileMinus(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), Object(preact_min["h"])("polyline", {
    points: "14 2 14 8 20 8"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "15",
    x2: "15",
    y2: "15"
  }));
};

var index_es_FilePlus = function FilePlus(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), Object(preact_min["h"])("polyline", {
    points: "14 2 14 8 20 8"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "18",
    x2: "12",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "15",
    x2: "15",
    y2: "15"
  }));
};

var index_es_FileText = function FileText(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), Object(preact_min["h"])("polyline", {
    points: "14 2 14 8 20 8"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "13",
    x2: "8",
    y2: "13"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "17",
    x2: "8",
    y2: "17"
  }), Object(preact_min["h"])("polyline", {
    points: "10 9 9 9 8 9"
  }));
};

var index_es_File = function File(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
  }), Object(preact_min["h"])("polyline", {
    points: "13 2 13 9 20 9"
  }));
};

var index_es_Film = function Film(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "20",
    rx: "2.18",
    ry: "2.18"
  }), Object(preact_min["h"])("line", {
    x1: "7",
    y1: "2",
    x2: "7",
    y2: "22"
  }), Object(preact_min["h"])("line", {
    x1: "17",
    y1: "2",
    x2: "17",
    y2: "22"
  }), Object(preact_min["h"])("line", {
    x1: "2",
    y1: "12",
    x2: "22",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "2",
    y1: "7",
    x2: "7",
    y2: "7"
  }), Object(preact_min["h"])("line", {
    x1: "2",
    y1: "17",
    x2: "7",
    y2: "17"
  }), Object(preact_min["h"])("line", {
    x1: "17",
    y1: "17",
    x2: "22",
    y2: "17"
  }), Object(preact_min["h"])("line", {
    x1: "17",
    y1: "7",
    x2: "22",
    y2: "7"
  }));
};

var index_es_Filter = function Filter(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
  }));
};

var index_es_Flag = function Flag(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
  }), Object(preact_min["h"])("line", {
    x1: "4",
    y1: "22",
    x2: "4",
    y2: "15"
  }));
};

var index_es_FolderMinus = function FolderMinus(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "14",
    x2: "15",
    y2: "14"
  }));
};

var index_es_FolderPlus = function FolderPlus(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "11",
    x2: "12",
    y2: "17"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "14",
    x2: "15",
    y2: "14"
  }));
};

var index_es_Folder = function Folder(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
  }));
};

var index_es_Frown = function Frown(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("path", {
    d: "M16 16s-1.5-2-4-2-4 2-4 2"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "9",
    x2: "9.01",
    y2: "9"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "9",
    x2: "15.01",
    y2: "9"
  }));
};

var index_es_Gift = function Gift(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "20 12 20 22 4 22 4 12"
  }), Object(preact_min["h"])("rect", {
    x: "2",
    y: "7",
    width: "20",
    height: "5"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "22",
    x2: "12",
    y2: "7"
  }), Object(preact_min["h"])("path", {
    d: "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"
  }), Object(preact_min["h"])("path", {
    d: "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"
  }));
};

var index_es_GitBranch = function GitBranch(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "6",
    y1: "3",
    x2: "6",
    y2: "15"
  }), Object(preact_min["h"])("circle", {
    cx: "18",
    cy: "6",
    r: "3"
  }), Object(preact_min["h"])("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), Object(preact_min["h"])("path", {
    d: "M18 9a9 9 0 0 1-9 9"
  }));
};

var index_es_GitCommit = function GitCommit(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), Object(preact_min["h"])("line", {
    x1: "1.05",
    y1: "12",
    x2: "7",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "17.01",
    y1: "12",
    x2: "22.96",
    y2: "12"
  }));
};

var index_es_GitMerge = function GitMerge(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "18",
    cy: "18",
    r: "3"
  }), Object(preact_min["h"])("circle", {
    cx: "6",
    cy: "6",
    r: "3"
  }), Object(preact_min["h"])("path", {
    d: "M6 21V9a9 9 0 0 0 9 9"
  }));
};

var index_es_GitPullRequest = function GitPullRequest(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "18",
    cy: "18",
    r: "3"
  }), Object(preact_min["h"])("circle", {
    cx: "6",
    cy: "6",
    r: "3"
  }), Object(preact_min["h"])("path", {
    d: "M13 6h3a2 2 0 0 1 2 2v7"
  }), Object(preact_min["h"])("line", {
    x1: "6",
    y1: "9",
    x2: "6",
    y2: "21"
  }));
};

var index_es_Github = function Github(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
  }));
};

var index_es_Gitlab = function Gitlab(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"
  }));
};

var index_es_Globe = function Globe(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "2",
    y1: "12",
    x2: "22",
    y2: "12"
  }), Object(preact_min["h"])("path", {
    d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
  }));
};

var index_es_Grid = function Grid(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "7"
  }), Object(preact_min["h"])("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "7"
  }), Object(preact_min["h"])("rect", {
    x: "14",
    y: "14",
    width: "7",
    height: "7"
  }), Object(preact_min["h"])("rect", {
    x: "3",
    y: "14",
    width: "7",
    height: "7"
  }));
};

var index_es_HardDrive = function HardDrive(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "22",
    y1: "12",
    x2: "2",
    y2: "12"
  }), Object(preact_min["h"])("path", {
    d: "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
  }), Object(preact_min["h"])("line", {
    x1: "6",
    y1: "16",
    x2: "6",
    y2: "16"
  }), Object(preact_min["h"])("line", {
    x1: "10",
    y1: "16",
    x2: "10",
    y2: "16"
  }));
};

var index_es_Hash = function Hash(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "4",
    y1: "9",
    x2: "20",
    y2: "9"
  }), Object(preact_min["h"])("line", {
    x1: "4",
    y1: "15",
    x2: "20",
    y2: "15"
  }), Object(preact_min["h"])("line", {
    x1: "10",
    y1: "3",
    x2: "8",
    y2: "21"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "3",
    x2: "14",
    y2: "21"
  }));
};

var index_es_Headphones = function Headphones(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M3 18v-6a9 9 0 0 1 18 0v6"
  }), Object(preact_min["h"])("path", {
    d: "M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
  }));
};

var index_es_Heart = function Heart(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  }));
};

var index_es_HelpCircle = function HelpCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("path", {
    d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "17"
  }));
};

var index_es_Home = function Home(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
  }), Object(preact_min["h"])("polyline", {
    points: "9 22 9 12 15 12 15 22"
  }));
};

var index_es_Image = function Image(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("circle", {
    cx: "8.5",
    cy: "8.5",
    r: "1.5"
  }), Object(preact_min["h"])("polyline", {
    points: "21 15 16 10 5 21"
  }));
};

var index_es_Inbox = function Inbox(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "22 12 16 12 14 15 10 15 8 12 2 12"
  }), Object(preact_min["h"])("path", {
    d: "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
  }));
};

var index_es_Info = function Info(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "8"
  }));
};

var index_es_Instagram = function Instagram(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "20",
    rx: "5",
    ry: "5"
  }), Object(preact_min["h"])("path", {
    d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
  }), Object(preact_min["h"])("line", {
    x1: "17.5",
    y1: "6.5",
    x2: "17.5",
    y2: "6.5"
  }));
};

var index_es_Italic = function Italic(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "19",
    y1: "4",
    x2: "10",
    y2: "4"
  }), Object(preact_min["h"])("line", {
    x1: "14",
    y1: "20",
    x2: "5",
    y2: "20"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "4",
    x2: "9",
    y2: "20"
  }));
};

var index_es_Layers = function Layers(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "12 2 2 7 12 12 22 7 12 2"
  }), Object(preact_min["h"])("polyline", {
    points: "2 17 12 22 22 17"
  }), Object(preact_min["h"])("polyline", {
    points: "2 12 12 17 22 12"
  }));
};

var index_es_Layout = function Layout(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "9",
    x2: "21",
    y2: "9"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "21",
    x2: "9",
    y2: "9"
  }));
};

var index_es_LifeBuoy = function LifeBuoy(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), Object(preact_min["h"])("line", {
    x1: "4.93",
    y1: "4.93",
    x2: "9.17",
    y2: "9.17"
  }), Object(preact_min["h"])("line", {
    x1: "14.83",
    y1: "14.83",
    x2: "19.07",
    y2: "19.07"
  }), Object(preact_min["h"])("line", {
    x1: "14.83",
    y1: "9.17",
    x2: "19.07",
    y2: "4.93"
  }), Object(preact_min["h"])("line", {
    x1: "14.83",
    y1: "9.17",
    x2: "18.36",
    y2: "5.64"
  }), Object(preact_min["h"])("line", {
    x1: "4.93",
    y1: "19.07",
    x2: "9.17",
    y2: "14.83"
  }));
};

var index_es_Link2 = function Link2(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "12",
    x2: "16",
    y2: "12"
  }));
};

var index_es_Link = function Link(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
  }), Object(preact_min["h"])("path", {
    d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
  }));
};

var index_es_Linkedin = function Linkedin(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
  }), Object(preact_min["h"])("rect", {
    x: "2",
    y: "9",
    width: "4",
    height: "12"
  }), Object(preact_min["h"])("circle", {
    cx: "4",
    cy: "4",
    r: "2"
  }));
};

var index_es_List = function List(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "6",
    x2: "21",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "12",
    x2: "21",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "18",
    x2: "21",
    y2: "18"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "6",
    x2: "3",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "12",
    x2: "3",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "18",
    x2: "3",
    y2: "18"
  }));
};

var index_es_Loader = function Loader(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "18",
    x2: "12",
    y2: "22"
  }), Object(preact_min["h"])("line", {
    x1: "4.93",
    y1: "4.93",
    x2: "7.76",
    y2: "7.76"
  }), Object(preact_min["h"])("line", {
    x1: "16.24",
    y1: "16.24",
    x2: "19.07",
    y2: "19.07"
  }), Object(preact_min["h"])("line", {
    x1: "2",
    y1: "12",
    x2: "6",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "18",
    y1: "12",
    x2: "22",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "4.93",
    y1: "19.07",
    x2: "7.76",
    y2: "16.24"
  }), Object(preact_min["h"])("line", {
    x1: "16.24",
    y1: "7.76",
    x2: "19.07",
    y2: "4.93"
  }));
};

var index_es_Lock = function Lock(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  }));
};

var index_es_LogIn = function LogIn(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
  }), Object(preact_min["h"])("polyline", {
    points: "10 17 15 12 10 7"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "12",
    x2: "3",
    y2: "12"
  }));
};

var index_es_LogOut = function LogOut(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
  }), Object(preact_min["h"])("polyline", {
    points: "16 17 21 12 16 7"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "12",
    x2: "9",
    y2: "12"
  }));
};

var index_es_Mail = function Mail(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
  }), Object(preact_min["h"])("polyline", {
    points: "22,6 12,13 2,6"
  }));
};

var index_es_MapPin = function MapPin(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  }));
};

var index_es_Map = function Map(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "18"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "6",
    x2: "16",
    y2: "22"
  }));
};

var index_es_Maximize2 = function Maximize2(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "15 3 21 3 21 9"
  }), Object(preact_min["h"])("polyline", {
    points: "9 21 3 21 3 15"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "3",
    x2: "14",
    y2: "10"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "21",
    x2: "10",
    y2: "14"
  }));
};

var index_es_Maximize = function Maximize(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
  }));
};

var index_es_Meh = function Meh(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "15",
    x2: "16",
    y2: "15"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "9",
    x2: "9.01",
    y2: "9"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "9",
    x2: "15.01",
    y2: "9"
  }));
};

var index_es_Menu = function Menu(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  }));
};

var index_es_MessageCircle = function MessageCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
  }));
};

var index_es_MessageSquare = function MessageSquare(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  }));
};

var index_es_MicOff = function MicOff(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }), Object(preact_min["h"])("path", {
    d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"
  }), Object(preact_min["h"])("path", {
    d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "23"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "23",
    x2: "16",
    y2: "23"
  }));
};

var index_es_Mic = function Mic(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
  }), Object(preact_min["h"])("path", {
    d: "M19 10v2a7 7 0 0 1-14 0v-2"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "23"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "23",
    x2: "16",
    y2: "23"
  }));
};

var index_es_Minimize2 = function Minimize2(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "4 14 10 14 10 20"
  }), Object(preact_min["h"])("polyline", {
    points: "20 10 14 10 14 4"
  }), Object(preact_min["h"])("line", {
    x1: "14",
    y1: "10",
    x2: "21",
    y2: "3"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "21",
    x2: "10",
    y2: "14"
  }));
};

var index_es_Minimize = function Minimize(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
  }));
};

var index_es_MinusCircle = function MinusCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "12",
    x2: "16",
    y2: "12"
  }));
};

var index_es_MinusSquare = function MinusSquare(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "12",
    x2: "16",
    y2: "12"
  }));
};

var index_es_Minus = function Minus(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }));
};

var index_es_Monitor = function Monitor(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "2",
    y: "3",
    width: "20",
    height: "14",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "21",
    x2: "16",
    y2: "21"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "21"
  }));
};

var index_es_Moon = function Moon(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  }));
};

var index_es_MoreHorizontal = function MoreHorizontal(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }), Object(preact_min["h"])("circle", {
    cx: "19",
    cy: "12",
    r: "1"
  }), Object(preact_min["h"])("circle", {
    cx: "5",
    cy: "12",
    r: "1"
  }));
};

var index_es_MoreVertical = function MoreVertical(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "5",
    r: "1"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "19",
    r: "1"
  }));
};

var index_es_Move = function Move(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "5 9 2 12 5 15"
  }), Object(preact_min["h"])("polyline", {
    points: "9 5 12 2 15 5"
  }), Object(preact_min["h"])("polyline", {
    points: "15 19 12 22 9 19"
  }), Object(preact_min["h"])("polyline", {
    points: "19 9 22 12 19 15"
  }), Object(preact_min["h"])("line", {
    x1: "2",
    y1: "12",
    x2: "22",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "22"
  }));
};

var index_es_Music = function Music(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"
  }), Object(preact_min["h"])("polyline", {
    points: "9 17 9 5 21 3 21 15"
  }));
};

var index_es_Navigation2 = function Navigation2(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "12 2 19 21 12 17 5 21 12 2"
  }));
};

var index_es_Navigation = function Navigation(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "3 11 22 2 13 21 11 13 3 11"
  }));
};

var index_es_Octagon = function Octagon(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
  }));
};

var index_es_Package = function Package(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"
  }), Object(preact_min["h"])("polyline", {
    points: "2.32 6.16 12 11 21.68 6.16"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "22.76",
    x2: "12",
    y2: "11"
  }), Object(preact_min["h"])("line", {
    x1: "7",
    y1: "3.5",
    x2: "17",
    y2: "8.5"
  }));
};

var index_es_Paperclip = function Paperclip(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
  }));
};

var index_es_PauseCircle = function PauseCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "10",
    y1: "15",
    x2: "10",
    y2: "9"
  }), Object(preact_min["h"])("line", {
    x1: "14",
    y1: "15",
    x2: "14",
    y2: "9"
  }));
};

var index_es_Pause = function Pause(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "6",
    y: "4",
    width: "4",
    height: "16"
  }), Object(preact_min["h"])("rect", {
    x: "14",
    y: "4",
    width: "4",
    height: "16"
  }));
};

var index_es_Percent = function Percent(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "19",
    y1: "5",
    x2: "5",
    y2: "19"
  }), Object(preact_min["h"])("circle", {
    cx: "6.5",
    cy: "6.5",
    r: "2.5"
  }), Object(preact_min["h"])("circle", {
    cx: "17.5",
    cy: "17.5",
    r: "2.5"
  }));
};

var index_es_PhoneCall = function PhoneCall(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  }));
};

var index_es_PhoneForwarded = function PhoneForwarded(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "19 1 23 5 19 9"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "5",
    x2: "23",
    y2: "5"
  }), Object(preact_min["h"])("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  }));
};

var index_es_PhoneIncoming = function PhoneIncoming(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "16 2 16 8 22 8"
  }), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "1",
    x2: "16",
    y2: "8"
  }), Object(preact_min["h"])("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  }));
};

var index_es_PhoneMissed = function PhoneMissed(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "1",
    x2: "17",
    y2: "7"
  }), Object(preact_min["h"])("line", {
    x1: "17",
    y1: "1",
    x2: "23",
    y2: "7"
  }), Object(preact_min["h"])("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  }));
};

var index_es_PhoneOff = function PhoneOff(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"
  }), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "1",
    x2: "1",
    y2: "23"
  }));
};

var index_es_PhoneOutgoing = function PhoneOutgoing(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "23 7 23 1 17 1"
  }), Object(preact_min["h"])("line", {
    x1: "16",
    y1: "8",
    x2: "23",
    y2: "1"
  }), Object(preact_min["h"])("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  }));
};

var index_es_Phone = function Phone(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  }));
};

var index_es_PieChart = function PieChart(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M21.21 15.89A10 10 0 1 1 8 2.83"
  }), Object(preact_min["h"])("path", {
    d: "M22 12A10 10 0 0 0 12 2v10z"
  }));
};

var index_es_PlayCircle = function PlayCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("polygon", {
    points: "10 8 16 12 10 16 10 8"
  }));
};

var index_es_Play = function Play(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "5 3 19 12 5 21 5 3"
  }));
};

var index_es_PlusCircle = function PlusCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "16"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "12",
    x2: "16",
    y2: "12"
  }));
};

var index_es_PlusSquare = function PlusSquare(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "16"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "12",
    x2: "16",
    y2: "12"
  }));
};

var index_es_Plus = function Plus(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), Object(preact_min["h"])("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }));
};

var index_es_Pocket = function Pocket(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"
  }), Object(preact_min["h"])("polyline", {
    points: "8 10 12 14 16 10"
  }));
};

var index_es_Power = function Power(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M18.36 6.64a9 9 0 1 1-12.73 0"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "12"
  }));
};

var index_es_Printer = function Printer(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "6 9 6 2 18 2 18 9"
  }), Object(preact_min["h"])("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), Object(preact_min["h"])("rect", {
    x: "6",
    y: "14",
    width: "12",
    height: "8"
  }));
};

var index_es_Radio = function Radio(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  }), Object(preact_min["h"])("path", {
    d: "M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
  }));
};

var index_es_RefreshCcw = function RefreshCcw(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "1 4 1 10 7 10"
  }), Object(preact_min["h"])("polyline", {
    points: "23 20 23 14 17 14"
  }), Object(preact_min["h"])("path", {
    d: "M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
  }));
};

var index_es_RefreshCw = function RefreshCw(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "23 4 23 10 17 10"
  }), Object(preact_min["h"])("polyline", {
    points: "1 20 1 14 7 14"
  }), Object(preact_min["h"])("path", {
    d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
  }));
};

var index_es_Repeat = function Repeat(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "17 1 21 5 17 9"
  }), Object(preact_min["h"])("path", {
    d: "M3 11V9a4 4 0 0 1 4-4h14"
  }), Object(preact_min["h"])("polyline", {
    points: "7 23 3 19 7 15"
  }), Object(preact_min["h"])("path", {
    d: "M21 13v2a4 4 0 0 1-4 4H3"
  }));
};

var index_es_Rewind = function Rewind(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "11 19 2 12 11 5 11 19"
  }), Object(preact_min["h"])("polygon", {
    points: "22 19 13 12 22 5 22 19"
  }));
};

var index_es_RotateCcw = function RotateCcw(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "1 4 1 10 7 10"
  }), Object(preact_min["h"])("path", {
    d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
  }));
};

var index_es_RotateCw = function RotateCw(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "23 4 23 10 17 10"
  }), Object(preact_min["h"])("path", {
    d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
  }));
};

var index_es_Rss = function Rss(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M4 11a9 9 0 0 1 9 9"
  }), Object(preact_min["h"])("path", {
    d: "M4 4a16 16 0 0 1 16 16"
  }), Object(preact_min["h"])("circle", {
    cx: "5",
    cy: "19",
    r: "1"
  }));
};

var index_es_Save = function Save(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
  }), Object(preact_min["h"])("polyline", {
    points: "17 21 17 13 7 13 7 21"
  }), Object(preact_min["h"])("polyline", {
    points: "7 3 7 8 15 8"
  }));
};

var index_es_Scissors = function Scissors(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "6",
    cy: "6",
    r: "3"
  }), Object(preact_min["h"])("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), Object(preact_min["h"])("line", {
    x1: "20",
    y1: "4",
    x2: "8.12",
    y2: "15.88"
  }), Object(preact_min["h"])("line", {
    x1: "14.47",
    y1: "14.48",
    x2: "20",
    y2: "20"
  }), Object(preact_min["h"])("line", {
    x1: "8.12",
    y1: "8.12",
    x2: "12",
    y2: "12"
  }));
};

var index_es_Search = function Search(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  }));
};

var index_es_Send = function Send(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "22",
    y1: "2",
    x2: "11",
    y2: "13"
  }), Object(preact_min["h"])("polygon", {
    points: "22 2 15 22 11 13 2 9 22 2"
  }));
};

var index_es_Server = function Server(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "8",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("rect", {
    x: "2",
    y: "14",
    width: "20",
    height: "8",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "6",
    y1: "6",
    x2: "6",
    y2: "6"
  }), Object(preact_min["h"])("line", {
    x1: "6",
    y1: "18",
    x2: "6",
    y2: "18"
  }));
};

var index_es_Settings = function Settings(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), Object(preact_min["h"])("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
  }));
};

var index_es_Share2 = function Share2(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "18",
    cy: "5",
    r: "3"
  }), Object(preact_min["h"])("circle", {
    cx: "6",
    cy: "12",
    r: "3"
  }), Object(preact_min["h"])("circle", {
    cx: "18",
    cy: "19",
    r: "3"
  }), Object(preact_min["h"])("line", {
    x1: "8.59",
    y1: "13.51",
    x2: "15.42",
    y2: "17.49"
  }), Object(preact_min["h"])("line", {
    x1: "15.41",
    y1: "6.51",
    x2: "8.59",
    y2: "10.49"
  }));
};

var index_es_Share = function Share(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
  }), Object(preact_min["h"])("polyline", {
    points: "16 6 12 2 8 6"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "15"
  }));
};

var index_es_ShieldOff = function ShieldOff(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"
  }), Object(preact_min["h"])("path", {
    d: "M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }));
};

var index_es_Shield = function Shield(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  }));
};

var index_es_ShoppingBag = function ShoppingBag(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
  }), Object(preact_min["h"])("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), Object(preact_min["h"])("path", {
    d: "M16 10a4 4 0 0 1-8 0"
  }));
};

var index_es_ShoppingCart = function ShoppingCart(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "9",
    cy: "21",
    r: "1"
  }), Object(preact_min["h"])("circle", {
    cx: "20",
    cy: "21",
    r: "1"
  }), Object(preact_min["h"])("path", {
    d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
  }));
};

var index_es_Shuffle = function Shuffle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "16 3 21 3 21 8"
  }), Object(preact_min["h"])("line", {
    x1: "4",
    y1: "20",
    x2: "21",
    y2: "3"
  }), Object(preact_min["h"])("polyline", {
    points: "21 16 21 21 16 21"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "15",
    x2: "21",
    y2: "21"
  }), Object(preact_min["h"])("line", {
    x1: "4",
    y1: "4",
    x2: "9",
    y2: "9"
  }));
};

var index_es_Sidebar = function Sidebar(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "3",
    x2: "9",
    y2: "21"
  }));
};

var index_es_SkipBack = function SkipBack(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "19 20 9 12 19 4 19 20"
  }), Object(preact_min["h"])("line", {
    x1: "5",
    y1: "19",
    x2: "5",
    y2: "5"
  }));
};

var index_es_SkipForward = function SkipForward(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "5 4 15 12 5 20 5 4"
  }), Object(preact_min["h"])("line", {
    x1: "19",
    y1: "5",
    x2: "19",
    y2: "19"
  }));
};

var index_es_Slack = function Slack(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M22.08 9C19.81 1.41 16.54-.35 9 1.92S-.35 7.46 1.92 15 7.46 24.35 15 22.08 24.35 16.54 22.08 9z"
  }), Object(preact_min["h"])("line", {
    x1: "12.57",
    y1: "5.99",
    x2: "16.15",
    y2: "16.39"
  }), Object(preact_min["h"])("line", {
    x1: "7.85",
    y1: "7.61",
    x2: "11.43",
    y2: "18.01"
  }), Object(preact_min["h"])("line", {
    x1: "16.39",
    y1: "7.85",
    x2: "5.99",
    y2: "11.43"
  }), Object(preact_min["h"])("line", {
    x1: "18.01",
    y1: "12.57",
    x2: "7.61",
    y2: "16.15"
  }));
};

var index_es_Slash = function Slash(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "4.93",
    y1: "4.93",
    x2: "19.07",
    y2: "19.07"
  }));
};

var index_es_Sliders = function Sliders(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "4",
    y1: "21",
    x2: "4",
    y2: "14"
  }), Object(preact_min["h"])("line", {
    x1: "4",
    y1: "10",
    x2: "4",
    y2: "3"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "3"
  }), Object(preact_min["h"])("line", {
    x1: "20",
    y1: "21",
    x2: "20",
    y2: "16"
  }), Object(preact_min["h"])("line", {
    x1: "20",
    y1: "12",
    x2: "20",
    y2: "3"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "14",
    x2: "7",
    y2: "14"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "8",
    x2: "15",
    y2: "8"
  }), Object(preact_min["h"])("line", {
    x1: "17",
    y1: "16",
    x2: "23",
    y2: "16"
  }));
};

var index_es_Smartphone = function Smartphone(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "5",
    y: "2",
    width: "14",
    height: "20",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "18",
    x2: "12",
    y2: "18"
  }));
};

var index_es_Smile = function Smile(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("path", {
    d: "M8 14s1.5 2 4 2 4-2 4-2"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "9",
    x2: "9.01",
    y2: "9"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "9",
    x2: "15.01",
    y2: "9"
  }));
};

var index_es_Speaker = function Speaker(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "4",
    y: "2",
    width: "16",
    height: "20",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "14",
    r: "4"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "6",
    x2: "12",
    y2: "6"
  }));
};

var index_es_Square = function Square(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }));
};

var index_es_Star = function Star(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
  }));
};

var index_es_StopCircle = function StopCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "6"
  }));
};

var index_es_Sun = function Sun(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "1",
    x2: "12",
    y2: "3"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "23"
  }), Object(preact_min["h"])("line", {
    x1: "4.22",
    y1: "4.22",
    x2: "5.64",
    y2: "5.64"
  }), Object(preact_min["h"])("line", {
    x1: "18.36",
    y1: "18.36",
    x2: "19.78",
    y2: "19.78"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "12",
    x2: "3",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "12",
    x2: "23",
    y2: "12"
  }), Object(preact_min["h"])("line", {
    x1: "4.22",
    y1: "19.78",
    x2: "5.64",
    y2: "18.36"
  }), Object(preact_min["h"])("line", {
    x1: "18.36",
    y1: "5.64",
    x2: "19.78",
    y2: "4.22"
  }));
};

var index_es_Sunrise = function Sunrise(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M17 18a5 5 0 0 0-10 0"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "9"
  }), Object(preact_min["h"])("line", {
    x1: "4.22",
    y1: "10.22",
    x2: "5.64",
    y2: "11.64"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "18",
    x2: "3",
    y2: "18"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "18",
    x2: "23",
    y2: "18"
  }), Object(preact_min["h"])("line", {
    x1: "18.36",
    y1: "11.64",
    x2: "19.78",
    y2: "10.22"
  }), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "22",
    x2: "1",
    y2: "22"
  }), Object(preact_min["h"])("polyline", {
    points: "8 6 12 2 16 6"
  }));
};

var index_es_Sunset = function Sunset(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M17 18a5 5 0 0 0-10 0"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "2"
  }), Object(preact_min["h"])("line", {
    x1: "4.22",
    y1: "10.22",
    x2: "5.64",
    y2: "11.64"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "18",
    x2: "3",
    y2: "18"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "18",
    x2: "23",
    y2: "18"
  }), Object(preact_min["h"])("line", {
    x1: "18.36",
    y1: "11.64",
    x2: "19.78",
    y2: "10.22"
  }), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "22",
    x2: "1",
    y2: "22"
  }), Object(preact_min["h"])("polyline", {
    points: "16 5 12 9 8 5"
  }));
};

var index_es_Tablet = function Tablet(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "4",
    y: "2",
    width: "16",
    height: "20",
    rx: "2",
    ry: "2",
    transform: "rotate(180 12 12)"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "18",
    x2: "12",
    y2: "18"
  }));
};

var index_es_Tag = function Tag(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
  }), Object(preact_min["h"])("line", {
    x1: "7",
    y1: "7",
    x2: "7",
    y2: "7"
  }));
};

var index_es_Target = function Target(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "6"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  }));
};

var index_es_Terminal = function Terminal(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "4 17 10 11 4 5"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "19",
    x2: "20",
    y2: "19"
  }));
};

var index_es_Thermometer = function Thermometer(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"
  }));
};

var index_es_ThumbsDown = function ThumbsDown(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
  }));
};

var index_es_ThumbsUp = function ThumbsUp(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
  }));
};

var index_es_ToggleLeft = function ToggleLeft(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "1",
    y: "5",
    width: "22",
    height: "14",
    rx: "7",
    ry: "7"
  }), Object(preact_min["h"])("circle", {
    cx: "8",
    cy: "12",
    r: "3"
  }));
};

var index_es_ToggleRight = function ToggleRight(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "1",
    y: "5",
    width: "22",
    height: "14",
    rx: "7",
    ry: "7"
  }), Object(preact_min["h"])("circle", {
    cx: "16",
    cy: "12",
    r: "3"
  }));
};

var index_es_Trash2 = function Trash2(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "3 6 5 6 21 6"
  }), Object(preact_min["h"])("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), Object(preact_min["h"])("line", {
    x1: "10",
    y1: "11",
    x2: "10",
    y2: "17"
  }), Object(preact_min["h"])("line", {
    x1: "14",
    y1: "11",
    x2: "14",
    y2: "17"
  }));
};

var index_es_Trash = function Trash(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "3 6 5 6 21 6"
  }), Object(preact_min["h"])("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }));
};

var index_es_Trello = function Trello(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("rect", {
    x: "7",
    y: "7",
    width: "3",
    height: "9"
  }), Object(preact_min["h"])("rect", {
    x: "14",
    y: "7",
    width: "3",
    height: "5"
  }));
};

var index_es_TrendingDown = function TrendingDown(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "23 18 13.5 8.5 8.5 13.5 1 6"
  }), Object(preact_min["h"])("polyline", {
    points: "17 18 23 18 23 12"
  }));
};

var index_es_TrendingUp = function TrendingUp(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "23 6 13.5 15.5 8.5 10.5 1 18"
  }), Object(preact_min["h"])("polyline", {
    points: "17 6 23 6 23 12"
  }));
};

var index_es_Triangle = function Triangle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  }));
};

var index_es_Truck = function Truck(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "1",
    y: "3",
    width: "15",
    height: "13"
  }), Object(preact_min["h"])("polygon", {
    points: "16 8 20 8 23 11 23 16 16 16 16 8"
  }), Object(preact_min["h"])("circle", {
    cx: "5.5",
    cy: "18.5",
    r: "2.5"
  }), Object(preact_min["h"])("circle", {
    cx: "18.5",
    cy: "18.5",
    r: "2.5"
  }));
};

var index_es_Tv = function Tv(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "2",
    y: "7",
    width: "20",
    height: "15",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("polyline", {
    points: "17 2 12 7 7 2"
  }));
};

var index_es_Twitter = function Twitter(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
  }));
};

var index_es_Type = function Type(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "4 7 4 4 20 4 20 7"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "20",
    x2: "15",
    y2: "20"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "4",
    x2: "12",
    y2: "20"
  }));
};

var index_es_Umbrella = function Umbrella(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"
  }));
};

var index_es_Underline = function Underline(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"
  }), Object(preact_min["h"])("line", {
    x1: "4",
    y1: "21",
    x2: "20",
    y2: "21"
  }));
};

var index_es_Unlock = function Unlock(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("path", {
    d: "M7 11V7a5 5 0 0 1 9.9-1"
  }));
};

var index_es_UploadCloud = function UploadCloud(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "16 16 12 12 8 16"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "12",
    x2: "12",
    y2: "21"
  }), Object(preact_min["h"])("path", {
    d: "M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
  }), Object(preact_min["h"])("polyline", {
    points: "16 16 12 12 8 16"
  }));
};

var index_es_Upload = function Upload(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), Object(preact_min["h"])("polyline", {
    points: "17 8 12 3 7 8"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "3",
    x2: "12",
    y2: "15"
  }));
};

var index_es_UserCheck = function UserCheck(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), Object(preact_min["h"])("circle", {
    cx: "8.5",
    cy: "7",
    r: "4"
  }), Object(preact_min["h"])("polyline", {
    points: "17 11 19 13 23 9"
  }));
};

var index_es_UserMinus = function UserMinus(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), Object(preact_min["h"])("circle", {
    cx: "8.5",
    cy: "7",
    r: "4"
  }), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "11",
    x2: "17",
    y2: "11"
  }));
};

var index_es_UserPlus = function UserPlus(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), Object(preact_min["h"])("circle", {
    cx: "8.5",
    cy: "7",
    r: "4"
  }), Object(preact_min["h"])("line", {
    x1: "20",
    y1: "8",
    x2: "20",
    y2: "14"
  }), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "11",
    x2: "17",
    y2: "11"
  }));
};

var index_es_UserX = function UserX(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), Object(preact_min["h"])("circle", {
    cx: "8.5",
    cy: "7",
    r: "4"
  }), Object(preact_min["h"])("line", {
    x1: "18",
    y1: "8",
    x2: "23",
    y2: "13"
  }), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "8",
    x2: "18",
    y2: "13"
  }));
};

var index_es_User = function User(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
  }), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  }));
};

var index_es_Users = function Users(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), Object(preact_min["h"])("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), Object(preact_min["h"])("path", {
    d: "M23 21v-2a4 4 0 0 0-3-3.87"
  }), Object(preact_min["h"])("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  }));
};

var index_es_VideoOff = function VideoOff(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }));
};

var index_es_Video = function Video(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "23 7 16 12 23 17 23 7"
  }), Object(preact_min["h"])("rect", {
    x: "1",
    y: "5",
    width: "15",
    height: "14",
    rx: "2",
    ry: "2"
  }));
};

var index_es_Voicemail = function Voicemail(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "5.5",
    cy: "11.5",
    r: "4.5"
  }), Object(preact_min["h"])("circle", {
    cx: "18.5",
    cy: "11.5",
    r: "4.5"
  }), Object(preact_min["h"])("line", {
    x1: "5.5",
    y1: "16",
    x2: "18.5",
    y2: "16"
  }));
};

var index_es_Volume1 = function Volume1(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
  }), Object(preact_min["h"])("path", {
    d: "M15.54 8.46a5 5 0 0 1 0 7.07"
  }));
};

var index_es_Volume2 = function Volume2(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
  }), Object(preact_min["h"])("path", {
    d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
  }));
};

var index_es_VolumeX = function VolumeX(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
  }), Object(preact_min["h"])("line", {
    x1: "23",
    y1: "9",
    x2: "17",
    y2: "15"
  }), Object(preact_min["h"])("line", {
    x1: "17",
    y1: "9",
    x2: "23",
    y2: "15"
  }));
};

var index_es_Volume = function Volume(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
  }));
};

var index_es_Watch = function Watch(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "7"
  }), Object(preact_min["h"])("polyline", {
    points: "12 9 12 12 13.5 13.5"
  }), Object(preact_min["h"])("path", {
    d: "M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"
  }));
};

var index_es_WifiOff = function WifiOff(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }), Object(preact_min["h"])("path", {
    d: "M16.72 11.06A10.94 10.94 0 0 1 19 12.55"
  }), Object(preact_min["h"])("path", {
    d: "M5 12.55a10.94 10.94 0 0 1 5.17-2.39"
  }), Object(preact_min["h"])("path", {
    d: "M10.71 5.05A16 16 0 0 1 22.58 9"
  }), Object(preact_min["h"])("path", {
    d: "M1.42 9a15.91 15.91 0 0 1 4.7-2.88"
  }), Object(preact_min["h"])("path", {
    d: "M8.53 16.11a6 6 0 0 1 6.95 0"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "20"
  }));
};

var index_es_Wifi = function Wifi(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M5 12.55a11 11 0 0 1 14.08 0"
  }), Object(preact_min["h"])("path", {
    d: "M1.42 9a16 16 0 0 1 21.16 0"
  }), Object(preact_min["h"])("path", {
    d: "M8.53 16.11a6 6 0 0 1 6.95 0"
  }), Object(preact_min["h"])("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "20"
  }));
};

var index_es_Wind = function Wind(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
  }));
};

var index_es_XCircle = function XCircle(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "9",
    x2: "9",
    y2: "15"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "9",
    x2: "15",
    y2: "15"
  }));
};

var index_es_XSquare = function XSquare(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), Object(preact_min["h"])("line", {
    x1: "9",
    y1: "9",
    x2: "15",
    y2: "15"
  }), Object(preact_min["h"])("line", {
    x1: "15",
    y1: "9",
    x2: "9",
    y2: "15"
  }));
};

var index_es_X = function X(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), Object(preact_min["h"])("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
};

var index_es_Youtube = function Youtube(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("path", {
    d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
  }), Object(preact_min["h"])("polygon", {
    points: "9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
  }));
};

var index_es_ZapOff = function ZapOff(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polyline", {
    points: "12.41 6.75 13 2 10.57 4.92"
  }), Object(preact_min["h"])("polyline", {
    points: "18.57 12.91 21 10 15.66 10"
  }), Object(preact_min["h"])("polyline", {
    points: "8 8 3 14 12 14 11 22 16 16"
  }), Object(preact_min["h"])("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }));
};

var index_es_Zap = function Zap(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
  }));
};

var index_es_ZoomIn = function ZoomIn(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  }), Object(preact_min["h"])("line", {
    x1: "11",
    y1: "8",
    x2: "11",
    y2: "14"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "11",
    x2: "14",
    y2: "11"
  }));
};

var index_es_ZoomOut = function ZoomOut(props) {
  var color = props.color || 'currentColor';
  var size = props.size || 24;
  delete props.color;
  delete props.size;
  return Object(preact_min["h"])("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, props), Object(preact_min["h"])("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), Object(preact_min["h"])("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  }), Object(preact_min["h"])("line", {
    x1: "8",
    y1: "11",
    x2: "14",
    y2: "11"
  }));
};


//# sourceMappingURL=index.es.js.map
// EXTERNAL MODULE: ./assets/content/general.json
var general = __webpack_require__("ednZ");
var general_default = /*#__PURE__*/__webpack_require__.n(general);

// CONCATENATED MODULE: ./components/contactBox/index.js


function contactBox__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function contactBox__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function contactBox__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var contactBox__ref = Object(preact_min["h"])(index_es_Mail, { size: 20 });

var contactBox_ContactBox = function (_Component) {
  contactBox__inherits(ContactBox, _Component);

  function ContactBox() {
    var _temp, _this, _ret;

    contactBox__classCallCheck(this, ContactBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = contactBox__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      visible: false,
      contactText: general["contact"].text.split("\n"),
      class: ""
    }, _this.toggleVisibility = function (e) {
      _this.setState(function (state) {
        return { visible: !state.visible };
      });
    }, _this.getStateClass = function () {
      return _this.state.visible ? " contact-box--active" : "";
    }, _this.copyToClipboard = function () {
      navigator.clipboard.writeText(general["contact"].email);
      _this.toggleVisibility();
    }, _temp), contactBox__possibleConstructorReturn(_this, _ret);
  }

  ContactBox.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.timeoutId = setTimeout(function () {
      _this2.setState(function () {
        return { class: "contact-box--mounted" };
      });
    }, 10);
  };

  ContactBox.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeoutId);
  };

  ContactBox.prototype.render = function render() {
    return Object(preact_min["h"])(
      'section',
      { 'class': 'contact-box ' + this.state.class + ' ' + this.getStateClass() },
      Object(preact_min["h"])(
        'div',
        { 'class': "contact-box__heading", onClick: this.toggleVisibility },
        contactBox__ref,
        Object(preact_min["h"])(
          'h4',
          null,
          general["contact"].btnText
        )
      ),
      Object(preact_min["h"])(
        'div',
        { 'class': "contact-box__info" },
        Object(preact_min["h"])(
          'div',
          null,
          this.state.contactText.map(function (val) {
            return Object(preact_min["h"])(
              'p',
              null,
              val
            );
          })
        ),
        Object(preact_min["h"])(
          'button',
          { 'class': 'contact-box__copy', onClick: this.copyToClipboard },
          general["contact"].clipboardText
        )
      )
    );
  };

  return ContactBox;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/stage/animation.js
function animation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function animation(canvas) {
	var context = canvas.getContext('2d');
	var stageDom = document.getElementsByClassName('stage')[0];
	var allRects = [];

	var setCanvasHeight = function setCanvasHeight() {
		canvas.width = stageDom.offsetWidth;
		canvas.height = stageDom.offsetHeight;
		canvas.style.width = stageDom.offsetWidth + 'px';
		canvas.style.height = stageDom.offsetHeight + 'px';
	};

	var generateRect = function generateRect() {
		var randWidth = Math.random() * (30 - 10) + 10;
		var randX = Math.random() * (canvas.width - randWidth - 30) + 30;
		var randY = Math.random() * (canvas.height - 200 - 50) + 50;

		allRects.push(new Rect(randX, randY, randWidth, '204, 24, 30'));
	};

	setCanvasHeight();
	for (var i = 0; i < 20; i++) {
		generateRect();
	}

	var animate = function animate() {
		requestAnimationFrame(animate);
		setCanvasHeight();
		context.clearRect(0, 0, canvas.width, canvas.height);

		allRects.forEach(function (rect, index, object) {
			rect.draw(context, canvas);

			if (rect.deleteMe) {
				object.splice(index, 1);
				generateRect();
			}
		});
	};

	setTimeout(function () {
		animate();
	}, 2000);
}

var Rect = function () {
	function Rect(posX, posY, maxGrow, color) {
		animation__classCallCheck(this, Rect);

		//rect
		this.posX = posX;
		this.posY = posY;
		this.maxGrow = maxGrow;
		this.color = color;
		this.width = 0;
		this.height = 0;
		this.opacity = 1;

		//animation
		this.animationCycle = 0;
		this.wait = 0;
		this.deleteMe = false;
		this.firstY = this.posY;

		//physics
		this.dy = 0;
		this.dx = 0;
		this.bounce_factor = 0.8;
		this.gravity = 0.81;
		this.friction = 0.6;

		//crash
		this.smallRects = [];
	}

	Rect.prototype.draw = function draw(context, canvas) {
		context.fillStyle = 'rgb(' + this.color + ',' + this.opacity;
		context.fillRect(this.posX, this.posY, this.width, this.height);

		if (this.animationCycle === 0) {
			this.animateGrow(canvas);
		} else if (this.animationCycle === 1) {
			this.animateFall(canvas);
		} else if (this.animationCycle === 2) {
			this.animateCrash(context, canvas);
		} else {
			this.deleteMe = true;
		}
	};

	Rect.prototype.animateFall = function animateFall(canvas) {
		if (this.posY + this.height + this.dy >= canvas.height + this.height) {
			this.dy += this.gravity;
			this.generateRects(canvas);
			this.animationCycle = this.animationCycle + 1;
		} else {
			this.dy += this.gravity;
		}

		this.posX += this.dx;
		this.posY += this.dy;
	};

	Rect.prototype.animateGrow = function animateGrow() {
		if (this.width < this.maxGrow) {
			this.width = this.width + 1;
			this.height = this.height + 1;
			this.posX = this.posX - 0.5;
			this.posY = this.posY - 0.5;
		} else if (this.wait < 30) {
			this.wait = this.wait + 1;
		} else {
			this.wait = 0;
			this.animationCycle = this.animationCycle + 1;
		}
	};

	Rect.prototype.generateRects = function generateRects(canvas) {
		var dividor = (canvas.height - this.firstY) / 10;

		while (this.smallRects.length <= this.width / 2) {
			var yMov = Math.random() * (dividor - 0) + 0;
			var xMov = Math.random() * (dividor - -dividor) + -dividor;
			this.smallRects.push(new RectSmall(this.posX, this.posY, this.width / 2, this.height / 2, this.color, xMov, yMov));
		}
	};

	Rect.prototype.animateCrash = function animateCrash(context, canvas) {
		this.smallRects.forEach(function (rect, index, object) {
			rect.draw(context, canvas);

			if (rect.doDelete()) {
				object.splice(index, 1);
			}
		});

		if (this.smallRects.length <= 0) {
			this.animationCycle = this.animationCycle + 1;
			this.doDelete = true;
		}
	};

	return Rect;
}();

var RectSmall = function () {
	function RectSmall(posX, posY, width, height, color, xMovement, yMovement) {
		animation__classCallCheck(this, RectSmall);

		//rect
		this.posX = posX;
		this.posY = posY;
		this.color = color;
		this.width = width;
		this.height = height;
		this.opacity = 1;

		//animation
		this.deleteMe = false;

		//physics
		this.dy = yMovement;
		this.dx = xMovement;
		this.bounce_factor = 0.8;
		this.gravity = 0.81;
		this.friction = 0.6;
	}

	RectSmall.prototype.draw = function draw(context, canvas) {
		context.fillStyle = 'rgb(' + this.color + ',' + this.opacity;
		context.fillRect(this.posX, this.posY, this.width, this.height);

		this.animateFall(canvas);
	};

	RectSmall.prototype.animateFall = function animateFall(canvas) {
		if (this.opacity <= 0) {
			this.deleteMe = true;
			return;
		}

		if (this.posY + this.height + this.dy > canvas.height) {
			this.dy = -this.dy;
			this.dy = this.dy * this.friction;
			this.dx = this.dx * (this.friction * 1.1);

			this.opacity = this.opacity - 0.3;
		} else {
			this.dy += this.gravity;
		}

		if (this.posX + this.width >= canvas.width || this.posX - this.width <= 0) {
			this.dx = -this.dx;
		}

		this.posX += this.dx;
		this.posY += this.dy;
	};

	RectSmall.prototype.doDelete = function doDelete() {
		return this.deleteMe;
	};

	return RectSmall;
}();
// EXTERNAL MODULE: ./assets/content/stage.json
var stage = __webpack_require__("GM/b");
var stage_default = /*#__PURE__*/__webpack_require__.n(stage);

// CONCATENATED MODULE: ./components/stage/index.js


function stage__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function stage__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function stage__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var stage_Stage = function (_Component) {
  stage__inherits(Stage, _Component);

  function Stage() {
    var _temp, _this, _ret;

    stage__classCallCheck(this, Stage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = stage__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      class: ""
    }, _this.canvasRef = Object(preact_min["createRef"])(), _this.canvas = undefined, _temp), stage__possibleConstructorReturn(_this, _ret);
  }

  Stage.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.timeoutId = setTimeout(function () {
      _this2.setState(function () {
        return { class: "stage--mounted" };
      });
    }, 10);

    this.canvas = this.canvasRef.current;
    animation(this.canvas);
  };

  Stage.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeoutId);
  };

  Stage.prototype.render = function render() {
    return Object(preact_min["h"])(
      'section',
      { 'class': 'stage ' + this.state.class },
      Object(preact_min["h"])('canvas', { ref: this.canvasRef, 'class': "stage__canvas" }),
      Object(preact_min["h"])(
        'div',
        { 'class': "stage__title" },
        Object(preact_min["h"])(
          'h1',
          null,
          stage["title"]
        ),
        Object(preact_min["h"])(
          'h3',
          null,
          stage["subtitle"]
        )
      )
    );
  };

  return Stage;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/skills/style.scss
var skills_style = __webpack_require__("8c+i");
var skills_style_default = /*#__PURE__*/__webpack_require__.n(skills_style);

// CONCATENATED MODULE: ./components/skillCard/index.js


function skillCard__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function skillCard__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function skillCard__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var skillCard_SkillCard = function (_Component) {
  skillCard__inherits(SkillCard, _Component);

  function SkillCard() {
    var _temp, _this, _ret;

    skillCard__classCallCheck(this, SkillCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = skillCard__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      swing: undefined,
      swingCount: 0
    }, _this.onClick = function () {
      if (!_this.state.swing) {

        if (_this.state.swingCount > 0 && _this.state.swingCount % 3 === 0) {
          _this.setState(function (state) {
            return { swing: "swing--big", swingCount: _this.state.swingCount + 1 };
          });

          _this.timeoutId = setTimeout(function () {
            _this.setState(function (state) {
              return { swing: undefined };
            });
          }, 1000);
        } else {
          _this.setState(function (state) {
            return { swing: "swing", swingCount: _this.state.swingCount + 1 };
          });

          _this.timeoutId = setTimeout(function () {
            _this.setState(function (state) {
              return { swing: undefined };
            });
          }, 1000);
        }
      }
    }, _temp), skillCard__possibleConstructorReturn(_this, _ret);
  }

  SkillCard.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeoutId);
  };

  SkillCard.prototype.render = function render() {
    return Object(preact_min["h"])(
      'section',
      { 'class': "skill-card" },
      Object(preact_min["h"])(index_es_Anchor, { size: 22, onClick: this.onClick, 'class': this.state.swing ? this.state.swing : "" }),
      Object(preact_min["h"])(
        'h2',
        { 'class': 'skill-card-title' },
        this.props.title
      ),
      Object(preact_min["h"])(
        'p',
        { 'class': 'skill-card-text' },
        this.props.text
      ),
      Object(preact_min["h"])(
        'div',
        { 'class': 'skill-card__skills' },
        this.props.skills && this.props.skills.map(function (skill, index) {
          return Object(preact_min["h"])(
            'p',
            { key: index },
            skill
          );
        })
      )
    );
  };

  return SkillCard;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./assets/content/skills.json
var skills = __webpack_require__("3FBL");
var skills_default = /*#__PURE__*/__webpack_require__.n(skills);

// CONCATENATED MODULE: ./routes/skills/index.js


function skills__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function skills__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function skills__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var skills_Skills = function (_Component) {
	skills__inherits(Skills, _Component);

	function Skills() {
		skills__classCallCheck(this, Skills);

		return skills__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Skills.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': skills_style_default.a.skills },
			skills["skills"].map(function (skill) {
				return Object(preact_min["h"])(skillCard_SkillCard, { title: skill.title, text: skill.text, skills: skill.skills });
			})
		);
	};

	return Skills;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/videoCard/index.js



function VideoCard() {

	return Object(preact_min["h"])(
		'a',
		{ 'class': 'video-card', href: this.props.videoUrl, rel: 'noopener noreferrer', target: '_blank' },
		Object(preact_min["h"])('img', { src: this.props.imgSrc }),
		Object(preact_min["h"])(
			'div',
			{ 'class': 'video-card__text' },
			Object(preact_min["h"])(
				'h2',
				{ 'class': 'video-card-title' },
				this.props.title
			)
		)
	);
}
// EXTERNAL MODULE: ./assets/content/hobbies.json
var hobbies = __webpack_require__("oHWI");
var hobbies_default = /*#__PURE__*/__webpack_require__.n(hobbies);

// CONCATENATED MODULE: ./routes/hobbies/index.js


function hobbies__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function hobbies__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function hobbies__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var hobbies__ref = Object(preact_min["h"])(index_es_ArrowLeft, { size: 30 });

var _ref2 = Object(preact_min["h"])(index_es_ArrowRight, { size: 30 });

var hobbies_Hobbies = function (_Component) {
	hobbies__inherits(Hobbies, _Component);

	function Hobbies() {
		hobbies__classCallCheck(this, Hobbies);

		var _this = hobbies__possibleConstructorReturn(this, _Component.call(this));

		_this.clickLeft = function () {
			if (_this.state.galleryShift > 0) {
				_this.setState(function (state) {
					return { galleryShift: state.galleryShift - state.defaultWidth };
				});
			} else {
				//no more shift animation left
				_this.applyAnimation('anim-left');
			}
		};

		_this.clickRight = function () {
			if (_this.state.galleryShift < _this.state.galleryCount * _this.state.defaultWidth) {
				_this.setState(function (state) {
					return { galleryShift: state.galleryShift + state.defaultWidth };
				});
			} else {
				//no more shift animation right
				_this.applyAnimation('anim-right');
			}
		};

		_this.spinAnimHandler = function () {
			if (!_this.state.spinIcon) {
				_this.setState(function (state) {
					return { spinIcon: 'spin-icon' };
				});
				_this.timeoutSpinId = setTimeout(function () {
					_this.setState(function (state) {
						return { spinIcon: undefined };
					});
				}, 1000);
			}
		};

		try {
			_this.state = {
				galleryShift: 0,
				galleryCount: hobbies["second"].music.length - 1,
				defaultWidth: 280,
				currentAnimation: '',
				spinIcon: undefined
			};
		} catch (e) {
			// hobbiesData is undefined or whatever
			console.error(e);
		}
		return _this;
	}

	Hobbies.prototype.applyAnimation = function applyAnimation(animName) {
		var _this2 = this;

		//no more shift animation left
		if (this.state.currentAnimation === animName) {
			this.setState(function (state) {
				return { currentAnimation: '' };
			});

			clearTimeout(this.timeoutId);

			this.timeoutId = setTimeout(function () {
				_this2.setState(function (state) {
					return { currentAnimation: animName };
				});
			}, 20);
		} else {
			this.setState(function (state) {
				return { currentAnimation: animName };
			});
		}
	};

	Hobbies.prototype.componentWillUnmount = function componentWillUnmount() {
		clearTimeout(this.timeoutId);
		clearTimeout(this.timeoutSpinId);
	};

	Hobbies.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': 'hobbies' },
			Object(preact_min["h"])(
				'div',
				{ 'class': 'hobbies__small' },
				Object(preact_min["h"])(
					'h2',
					{ 'class': 'hobbies-title' },
					hobbies["first"].title
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': 'hobbies__interests' },
					hobbies["first"].interests && hobbies["first"].interests.map(function (int) {
						return Object(preact_min["h"])(
							'p',
							null,
							int
						);
					})
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'hobbies__large' },
				Object(preact_min["h"])(
					'h2',
					{ 'class': 'hobbies-title' },
					hobbies["second"].title,
					' ',
					Object(preact_min["h"])(index_es_Youtube, { onClick: this.spinAnimHandler, size: 22, 'class': this.state.spinIcon ? this.state.spinIcon : '' })
				),
				Object(preact_min["h"])(
					'h5',
					null,
					hobbies["second"].subtitle
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': 'hobbies-arrow hobbies-arrow--left', onClick: this.clickLeft },
					hobbies__ref
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': 'hobbies__music ' + this.state.currentAnimation, style: 'left: -' + this.state.galleryShift + 'px;' },
					hobbies["second"].music && hobbies["second"].music.map(function (song) {
						return Object(preact_min["h"])(VideoCard, { title: song.title, subtitle: song.subtitle, imgSrc: song.imgSrc, videoUrl: song.videoUrl });
					})
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': 'hobbies-arrow hobbies-arrow--right', onClick: this.clickRight },
					_ref2
				)
			)
		);
	};

	return Hobbies;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./assets/content/random.json
var random = __webpack_require__("W4IA");
var random_default = /*#__PURE__*/__webpack_require__.n(random);

// CONCATENATED MODULE: ./routes/random/index.js


function random__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function random__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function random__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var random_Random = function (_Component) {
	random__inherits(Random, _Component);

	//todo
	//george carlin quote generator
	//about this website
	// 2 to 1 layout (george 2 about 1)

	function Random() {
		random__classCallCheck(this, Random);

		var _this = random__possibleConstructorReturn(this, _Component.call(this));

		_this.spinAnimHandler = function () {
			if (!_this.state.spinIcon) {
				_this.setState(function (state) {
					return { spinIcon: "spin-icon" };
				});
				_this.timeoutSpinId = setTimeout(function () {
					_this.setState(function (state) {
						return { spinIcon: undefined };
					});
				}, 1000);
			}
		};

		_this.shakeAnimHandler = function () {
			if (!_this.state.shakeIcon) {
				_this.setState(function (state) {
					return { shakeIcon: "shake-icon" };
				});
				_this.timeoutShakeId = setTimeout(function () {
					_this.setState(function (state) {
						return { shakeIcon: undefined };
					});
				}, 1000);
			}
		};

		_this.state = {
			currentQuote: _this.randomQuote("", random["large"].quotes),
			spinIcon: undefined,
			shakeIcon: undefined
		};

		_this.setRandomQuote = _this.setRandomQuote.bind(_this);
		return _this;
	}

	Random.prototype.randomQuote = function randomQuote(currentQuote, list) {
		var newList = [].concat(list);
		var index = newList.indexOf(currentQuote);
		if (index > -1) {
			newList.splice(index, 1);
		}
		return newList[Math.floor(Math.random() * newList.length)];
	};

	Random.prototype.setRandomQuote = function setRandomQuote() {
		var _this2 = this;

		if (random["large"].quotes) {
			this.setState(function (state) {
				return { currentQuote: _this2.randomQuote(state.currentQuote, random["large"].quotes) };
			});
		}
	};

	Random.prototype.componentWillUnmount = function componentWillUnmount() {
		clearTimeout(this.timeoutSpinId);
		clearTimeout(this.timeoutShakeId);
	};

	Random.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': 'random' },
			Object(preact_min["h"])(
				'div',
				{ 'class': 'random__large' },
				Object(preact_min["h"])(
					'h3',
					null,
					random["large"].headline
				),
				Object(preact_min["h"])(
					'h5',
					null,
					random["large"].subheadline
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': 'random__quote' },
					Object(preact_min["h"])(
						'p',
						null,
						'"' + this.state.currentQuote + '"'
					),
					Object(preact_min["h"])(
						'button',
						{ onClick: this.setRandomQuote },
						random["large"].btnText
					)
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'random__small' },
				Object(preact_min["h"])(
					'h3',
					null,
					random["small"].title
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': 'random__info' },
					Object(preact_min["h"])(
						'div',
						null,
						Object(preact_min["h"])(index_es_Code, { onClick: this.shakeAnimHandler, 'class': this.state.shakeIcon ? this.state.shakeIcon : "" }),
						Object(preact_min["h"])(
							'p',
							null,
							random["small"].stack
						)
					),
					Object(preact_min["h"])(
						'div',
						null,
						Object(preact_min["h"])(index_es_Sun, { onClick: this.spinAnimHandler, 'class': this.state.spinIcon ? this.state.spinIcon : "" }),
						Object(preact_min["h"])(
							'p',
							null,
							random["small"].further
						)
					)
				)
			)
		);
	};

	return Random;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








// Code-splitting is automated for routes




var app__ref = Object(preact_min["h"])(stage_Stage, null);

var app__ref2 = Object(preact_min["h"])(header_Header, null);

var _ref3 = Object(preact_min["h"])(
	preact_router_es["Router"],
	null,
	Object(preact_min["h"])(skills_Skills, { path: '/' }),
	Object(preact_min["h"])(hobbies_Hobbies, { path: '/hobbies' }),
	Object(preact_min["h"])(random_Random, { path: '/random' })
);

var _ref4 = Object(preact_min["h"])(contactBox_ContactBox, null);

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		app__classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			class: ''
		}, _temp), app__possibleConstructorReturn(_this, _ret);
	}

	App.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		this.timeoutId = setTimeout(function () {
			_this2.setState(function () {
				return { class: 'router-section--mounted' };
			});
		}, 10);
	};

	App.prototype.componentWillUnmount = function componentWillUnmount() {
		clearTimeout(this.timeoutId);
	};

	App.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			app__ref,
			app__ref2,
			Object(preact_min["h"])(
				'div',
				{ 'class': 'router-section ' + this.state.class },
				_ref3
			),
			_ref4
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index_0 = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "W4IA":
/***/ (function(module, exports) {

module.exports = {"large":{"headline":"Random George Carlin Quotes","subheadline":"enjoy","btnText":"more","quotes":["The planet is fine. The people are fucked.","Electricity is really just organized lightning.","May the forces of evil become confused on the way to your house.","Fighting for peace is like screwing for virginity.","Just ‘cause you got the monkey off your back doesn’t mean that the circus has left town.","We have multiplied our possessions but reduced our values. We talk too much, love too seldom, and hate too often. We’ve learned how to make a living but not a life. We’ve added years to life, not life to years.","Frisbeetarianism is the belief that when you die, your soul goes up on the roof and gets stuck.","That’s why they call it the American Dream, because you have to be asleep to believe it.","Don’t just teach your children to read…teach them to question everything that they read…teach them to question everything.","In America, anyone can become president. That’s the problem.","If you try to fail, and succeed, which have you done?","Have you ever noticed that anybody driving slower than you is an idiot, and anyone going faster than you is a maniac?","I went to a bookstore and asked the saleswoman, ‘Where’s the self-help section?’ She said if she told me, it would defeat the purpose.","A house is just a place to keep your stuff while you go out and get more stuff.","Some people see the glass half full, others see it half empty. I see a glass that’s twice as big as it needs to be.","Death is caused by swallowing small amounts of saliva over a long period of time.","Atheism is a non-prophet organization.","I often warn people: ‘Somewhere along the way, someone is going to tell you, ‘There is no ‘I’ in team.’ What you should tell them is, ‘Maybe not. But there is an ‘I’ in independence, individuality, and integrity.","If it’s true that our species is alone in the universe, then I’d have to say the universe aimed rather low and settled for very little.","The caterpillar does all the work, but the butterfly gets all the publicity.","The future will soon be a thing of the past.","Life gets really simple once you cut out all the bullshit they teach you in school.","If you can’t say something nice about a person, go ahead.","I would never want to be a member of a group whose symbol was a guy nailed to two pieces of wood.","Well, if crime fighters fight crime and fire fighters fight fire, what do freedom fighters fight? They never mention that part to us, do they?","By and large, language is a tool for concealing the truth.","Here’s a bumper sticker I’d like to see: “We are the proud parents of a child who’s self-esteem is sufficient that he doesn’t need us promoting his minor scholastic achievements on the back of our car.”","The future will soon be a thing of the past"]},"small":{"title":"For your information","stack":"This website is build using Preact, Sass and preact-feather library (for the icons) and it is hosted on DigitalOcean.","further":"I am a web developer with Computer Science degree and experience in this field. Please contact me if you are interensted."}}

/***/ }),

/***/ "ednZ":
/***/ (function(module, exports) {

module.exports = {"contact":{"text":"Let us connect!\nelvis.graho@gmail.com","email":"elvis.graho@gmail.com","clipboardText":"Copy email","btnText":"Contact me"}}

/***/ }),

/***/ "oHWI":
/***/ (function(module, exports) {

module.exports = {"first":{"title":"My interests","interests":["sports","music","electric guitar","running","trying to list more hobbies by differentiating between sports and running"]},"second":{"title":"Check out my music","subtitle":"prepare your ears","music":[{"imgSrc":"http://i3.ytimg.com/vi/qhz4Ju7UT3I/maxresdefault.jpg","videoUrl":"https://www.youtube.com/watch?v=qhz4Ju7UT3I","title":"Fill it","subtitle":"fffff"},{"imgSrc":"http://i3.ytimg.com/vi/TnhCLsqF8UE/maxresdefault.jpg","videoUrl":"https://www.youtube.com/watch?v=TnhCLsqF8UE","title":"Decisions","subtitle":"fffff"},{"imgSrc":"http://i3.ytimg.com/vi/aeXX8IYZ1lU/maxresdefault.jpg","videoUrl":"https://www.youtube.com/watch?v=aeXX8IYZ1lU","title":"Hello","subtitle":"fffff"}]}}

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "yY49":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map