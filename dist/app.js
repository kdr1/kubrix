webpackJsonp([1],{

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(THREE) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);








__webpack_require__(291);

var WIDTH = 800;
var HEIGHT = WIDTH;

var Kubrix = function (_PureComponent) {
	__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Kubrix, _PureComponent);

	function Kubrix(props) {
		__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Kubrix);

		var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Kubrix.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Kubrix)).call(this, props));

		_this.three = {};

		_this.kube = {
			whole: null,
			reference: {
				c1: null,
				c2: null,
				c3: null,
				c4: null,
				c5: null,
				c6: null,
				c7: null,
				c8: null,
				c9: null,
				c10: null,
				c11: null,
				c12: null,
				c13: null,
				c14: null,
				c15: null,
				c16: null,
				c17: null,
				c18: null,
				c19: null,
				c20: null,
				c21: null,
				c22: null,
				c23: null,
				c24: null,
				c25: null,
				c26: null,
				c27: null
			},
			sections: {
				x: {
					left: [],
					middle: [],
					right: []
				},
				y: {
					front: [],
					middle: [],
					back: []
				},
				z: {
					top: [],
					middle: [],
					bottom: []
				}
			}
		};
		_this.previousMouseLocation = {
			x: 0,
			y: 0
		};

		_this.init = _this.init.bind(_this);
		_this.animate = _this.animate.bind(_this);
		_this.render3j = _this.render3j.bind(_this);
		return _this;
	}

	__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Kubrix, [{
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate() {
			return false;
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.init();
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			// remove listeners added during init
			this.three.Controls.dispose();
		}
	}, {
		key: "init",
		value: function init() {
			var _this2 = this;

			// create 3js scene
			this.three.Scene = new THREE.Scene();

			// create 3js WebGLRenderer and apply settings
			this.three.Renderer = new THREE.WebGLRenderer({ antialias: true });
			this.three.Renderer.setPixelRatio(window.devicePixelRatio);
			this.three.Renderer.setClearColor(0x232323, 1);
			this.three.Renderer.setSize(WIDTH, HEIGHT);
			this.three.Renderer.gammaInput = true;
			this.three.Renderer.gammaOutput = true;
			this.three.Renderer.shadowMap.enabled = false;

			// append renderer's domElement i.e. the canvas element to the container element
			this.three.container.appendChild(this.three.Renderer.domElement);

			// create and add 3js PerspectiveCamera to scene
			this.three.Camera = new THREE.PerspectiveCamera(40, WIDTH / HEIGHT, 1, 100);
			this.three.Camera.position.x = 12;
			this.three.Camera.position.y = 8;
			this.three.Camera.position.z = 12;
			this.three.Scene.add(this.three.Camera);

			// add a little illumination
			this.three.AmbientLight = new THREE.AmbientLight(0xaaaaaa, 1);
			this.three.Scene.add(this.three.AmbientLight);

			// focus on what's important!
			this.three.SpotLight = new THREE.SpotLight(0xefefef, 1);
			this.three.SpotLight.position.x = this.three.Camera.position.x;
			this.three.SpotLight.position.y = this.three.Camera.position.y;
			this.three.SpotLight.position.z = this.three.Camera.position.z;
			this.three.Scene.add(this.three.SpotLight);

			// using 3js trackball controls
			// need to make these options user definable
			this.three.Controls = new THREE.TrackballControls(this.three.Camera);
			this.three.Controls.rotateSpeed = 7.25;
			this.three.Controls.zoomSpeed = 0.8;
			this.three.Controls.noPan = true;
			this.three.Controls.staticMoving = true;
			this.three.Controls.dynamicDampingFactor = 0.3;

			// load kubrix model from blender json
			var loader = new THREE.ObjectLoader();
			loader.crossOrigin = "";
			loader.load("../../assets/json/kubrix.json", function (object) {

				_this2.kube.all = object.children[0];

				object.traverse(function (child) {
					// take light from scene and adjust for 3js
					if (child instanceof THREE.PointLight) {
						child.intensity = 10;
						child.position.x = 0;
						child.position.y = 20;
						child.position.z = 15;
					}
					switch (child.name) {
						case "c1":
							_this2.kube.reference.c1 = child;
							_this2.kube.sections.x.left.push(child.name);
							_this2.kube.sections.y.front.push(child.name);
							_this2.kube.sections.z.top.push(child.name);
							break;
						case "c2":
							_this2.kube.reference.c2 = child;
							_this2.kube.sections.x.middle.push(child.name);
							_this2.kube.sections.y.front.push(child.name);
							_this2.kube.sections.z.top.push(child.name);
							break;
						case "c3":
							_this2.kube.reference.c3 = child;
							_this2.kube.sections.x.right.push(child.name);
							_this2.kube.sections.y.front.push(child.name);
							_this2.kube.sections.z.top.push(child.name);
							break;
						case "c4":
							_this2.kube.reference.c4 = child;
							_this2.kube.sections.x.left.push(child.name);
							_this2.kube.sections.y.front.push(child.name);
							_this2.kube.sections.z.middle.push(child.name);
							break;
						case "c5":
							_this2.kube.reference.c5 = child;
							_this2.kube.sections.x.middle.push(child.name);
							_this2.kube.sections.y.front.push(child.name);
							_this2.kube.sections.z.middle.push(child.name);
							break;
						case "c6":
							_this2.kube.reference.c6 = child;
							_this2.kube.sections.x.right.push(child.name);
							_this2.kube.sections.y.front.push(child.name);
							_this2.kube.sections.z.middle.push(child.name);
							break;
						case "c7":
							_this2.kube.reference.c7 = child;
							_this2.kube.sections.x.left.push(child.name);
							_this2.kube.sections.y.front.push(child.name);
							_this2.kube.sections.z.bottom.push(child.name);
							break;
						case "c8":
							_this2.kube.reference.c8 = child;
							_this2.kube.sections.x.middle.push(child.name);
							_this2.kube.sections.y.front.push(child.name);
							_this2.kube.sections.z.bottom.push(child.name);
							break;
						case "c9":
							_this2.kube.reference.c9 = child;
							_this2.kube.sections.x.right.push(child.name);
							_this2.kube.sections.y.front.push(child.name);
							_this2.kube.sections.z.bottom.push(child.name);
							break;
						case "c10":
						case "c11":
						case "c12":
						case "c13":
						case "c14":
						case "c15":
						case "c16":
						case "c17":
						case "c18":
						case "c19":
						case "c20":
						case "c21":
						case "c22":
						case "c23":
						case "c24":
						case "c25":
						case "c26":
						case "c27":
							break;
					}
				});

				_this2.kube.sections.y.front.forEach(function (faceName) {
					_this2.kube.reference[faceName].rotation.y -= Math.PI / 2;
				});

				// add object to scene
				_this2.three.Scene.add(object);

				// animate the scene
				_this2.animate();
			});
		}
	}, {
		key: "animate",
		value: function animate() {
			requestAnimationFrame(this.animate);
			this.three.Controls.update();
			this.three.SpotLight.position.x = this.three.Camera.position.x;
			this.three.SpotLight.position.y = this.three.Camera.position.y;
			this.three.SpotLight.position.z = this.three.Camera.position.z;
			this.render3j();
		}
	}, {
		key: "render3j",
		value: function render3j() {
			this.three.Camera.lookAt(this.three.Scene.position);
			this.three.Renderer.render(this.three.Scene, this.three.Camera);
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				"div",
				{ id: "_kubrix" },
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("div", { id: "_3js-container", ref: function ref(el) {
						_this3.three.container = el;
					} })
			);
		}
	}]);

	return Kubrix;
}(__WEBPACK_IMPORTED_MODULE_5_react__["PureComponent"]);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Kubrix, null), document.getElementById("react-app"));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(131)))

/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(132);


/***/ })

},[293]);