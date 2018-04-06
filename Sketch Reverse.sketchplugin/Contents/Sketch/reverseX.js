var that = this;
function run (key, context) {
  that.context = context;

var exports =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reverse = __webpack_require__(1);

var _reverse2 = _interopRequireDefault(_reverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var reverseX = function reverseX(ctx) {
  return (0, _reverse2['default'])(ctx, 'x');
};
exports['default'] = reverseX;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// generate layers array
var getlyrs = function getlyrs(sel, count) {
  var lyrs = [];

  for (var i = 0; i <= count - 1; i += 1) {
    var lyr = sel.objectAtIndex(i);
    var frame = lyr.frame();

    lyrs.push({
      pointer: lyr,
      name: lyr.name(),
      w: frame.width(),
      h: frame.height(),
      x: frame.x(),
      y: frame.y(),
      dist: {
        x: 0,
        y: 0
      }
    });
  }

  return lyrs;
};

// reorder array by position rather than depth
var reorder = function reorder(lyrs, axis) {
  return [].concat(_toConsumableArray(lyrs)).sort(function (a, b) {
    return a[axis] - b[axis];
  });
};

// store distance between bottom/right edge of a layer and its subsequent one
var getdist = function getdist(lyrs) {
  lyrs.forEach(function (lyr, idx) {
    var next = lyrs[idx + 1];
    lyr.dist.y = next ? next.y - lyr.y - lyr.h : 0;
    lyr.dist.x = next ? next.x - lyr.x - lyr.w : 0;
  });

  return lyrs;
};

// reposition the layers on the artboard
var reposition = function reposition(lyrs, axis) {
  lyrs.reverse().forEach(function (lyr, idx) {
    var prev = lyrs[idx - 1];
    var lastPos = lyrs[lyrs.length - 1][axis];
    var dim = axis === 'y' ? 'h' : 'w';
    var prevBounds = prev ? prev.pointer.frame()[axis]() + prev[dim] : lastPos;

    lyr.pointer.frame()[axis] = prevBounds + lyr.dist[axis];
  });
};

// get parent layer
var getParent = function getParent(sel) {
  return sel && sel.firstObject().parentGroup();
};

// reverse layers depth
var redepth = function redepth(sel, lyrs, parent) {
  var ph = MSLayer.alloc().init();

  parent.insertLayers_beforeLayer([ph], sel.firstObject());
  lyrs.reverse().forEach(function (lyr) {
    lyr.pointer.moveToLayer_beforeLayer(lyr.pointer.parentGroup(), ph);
  });
  ph.removeFromParent();
};

// exit and print message
var exit = function exit(doc, msg) {
  doc.showMessage(msg);
  doc.reloadInspector();
};

// reverse the layer order on a specific axis, or just their depth
var reverse = function reverse(ctx, axis) {
  var doc = ctx.document;
  var sel = ctx.selection;
  var count = sel.count();
  var err = 'Select two (or more) layers! 🙏';
  var lyrs = getlyrs(sel, count);

  if (count <= 1) {
    doc.showMessage(err);
    return;
  }

  if (axis === 'dpt') {
    redepth(sel, lyrs, getParent(sel));
    exit(doc, 'Reversed order of ' + String(count) + ' layers. \uD83C\uDF89');
  } else {
    reposition(getdist(reorder(lyrs, axis)), axis);
    exit(doc, 'Reversed position of ' + String(count) + ' layers on the ' + String(axis.toUpperCase()) + ' axis. \uD83C\uDF89');
  }
};

exports['default'] = reverse;

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = run.bind(this, 'default')
