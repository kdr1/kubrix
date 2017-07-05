import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

require( "../../node_modules/three/examples/js/controls/TrackballControls.js" );

const WIDTH = 800;
const HEIGHT = WIDTH;

class Kubrix extends PureComponent {
	constructor( props ) {
		super( props );

		this.three = { };

		this.kube = {
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
					left: [ ],
					middle: [ ],
					right: [ ]
				},
				y: {
					front: [ ],
					middle: [ ],
					back: [ ]
				},
				z: {
					top: [ ],
					middle: [ ],
					bottom: [ ]
				}
			}
		};
		this.previousMouseLocation = {
			x: 0,
			y: 0
		}

		this.init = this.init.bind( this );
		this.animate = this.animate.bind( this );
		this.render3j = this.render3j.bind( this );
	}

	shouldComponentUpdate() {
		return false;
	}

	componentDidMount() {
		this.init();
	}

	componentWillUnmount() {
		// remove listeners added during init
		this.three.Controls.dispose();
	}

	init() {
		// create 3js scene
		this.three.Scene = new THREE.Scene();

		// create 3js WebGLRenderer and apply settings
		this.three.Renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.three.Renderer.setPixelRatio( window.devicePixelRatio );
		this.three.Renderer.setClearColor( 0x232323, 1 );
		this.three.Renderer.setSize( WIDTH, HEIGHT );
		this.three.Renderer.gammaInput = true;
		this.three.Renderer.gammaOutput = true;
		this.three.Renderer.shadowMap.enabled = false;

		// append renderer's domElement i.e. the canvas element to the container element
		this.three.container.appendChild( this.three.Renderer.domElement );

		// create and add 3js PerspectiveCamera to scene
		this.three.Camera = new THREE.PerspectiveCamera( 40, WIDTH / HEIGHT, 1, 100 );
		this.three.Camera.position.x = 12;
		this.three.Camera.position.y = 8;
		this.three.Camera.position.z = 12;
		this.three.Scene.add( this.three.Camera );

		// add a little illumination
		this.three.AmbientLight = new THREE.AmbientLight( 0xaaaaaa, 1 );
		this.three.Scene.add( this.three.AmbientLight );

		// focus on what's important!
		this.three.SpotLight = new THREE.SpotLight( 0xefefef, 1 );
		this.three.SpotLight.position.x = this.three.Camera.position.x;
		this.three.SpotLight.position.y = this.three.Camera.position.y;
		this.three.SpotLight.position.z = this.three.Camera.position.z;
		this.three.Scene.add( this.three.SpotLight );

		// using 3js trackball controls
		// need to make these options user definable
		this.three.Controls = new THREE.TrackballControls( this.three.Camera );
		this.three.Controls.rotateSpeed = 7.25;
		this.three.Controls.zoomSpeed = 0.8;
		this.three.Controls.noPan = true;
		this.three.Controls.staticMoving = true;
		this.three.Controls.dynamicDampingFactor = 0.3;

		// load kubrix model from blender json
		let loader = new THREE.ObjectLoader();
		loader.crossOrigin = "";
		loader.load( "../../assets/json/kubrix.json", ( object ) => {

			this.kube.all = object.children[ 0 ];

			object.traverse( ( child ) => {
				// take light from scene and adjust for 3js
				if ( child instanceof THREE.PointLight ) {
					child.intensity = 10;
					child.position.x = 0;
					child.position.y = 20;
					child.position.z = 15;
				}
				switch ( child.name ) {
					case "c1":
						this.kube.reference.c1 = child;
						this.kube.sections.x.left.push( child.name );
						this.kube.sections.y.front.push( child.name );
						this.kube.sections.z.top.push( child.name );
						break;
					case "c2":
						this.kube.reference.c2 = child;
						this.kube.sections.x.middle.push( child.name );
						this.kube.sections.y.front.push( child.name );
						this.kube.sections.z.top.push( child.name );
						break;
					case "c3":
						this.kube.reference.c3 = child;
						this.kube.sections.x.right.push( child.name );
						this.kube.sections.y.front.push( child.name );
						this.kube.sections.z.top.push( child.name );
						break;
					case "c4":
						this.kube.reference.c4 = child;
						this.kube.sections.x.left.push( child.name );
						this.kube.sections.y.front.push( child.name );
						this.kube.sections.z.middle.push( child.name );
						break;
					case "c5":
						this.kube.reference.c5 = child;
						this.kube.sections.x.middle.push( child.name );
						this.kube.sections.y.front.push( child.name );
						this.kube.sections.z.middle.push( child.name );
						break;
					case "c6":
						this.kube.reference.c6 = child;
						this.kube.sections.x.right.push( child.name );
						this.kube.sections.y.front.push( child.name );
						this.kube.sections.z.middle.push( child.name );
						break;
					case "c7":
						this.kube.reference.c7 = child;
						this.kube.sections.x.left.push( child.name );
						this.kube.sections.y.front.push( child.name );
						this.kube.sections.z.bottom.push( child.name );
						break;
					case "c8":
						this.kube.reference.c8 = child;
						this.kube.sections.x.middle.push( child.name );
						this.kube.sections.y.front.push( child.name );
						this.kube.sections.z.bottom.push( child.name );
						break;
					case "c9":
						this.kube.reference.c9 = child;
						this.kube.sections.x.right.push( child.name );
						this.kube.sections.y.front.push( child.name );
						this.kube.sections.z.bottom.push( child.name );
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
			} );

			this.kube.sections.y.front.forEach( ( faceName ) => {
				this.kube.reference[ faceName ].rotation.y -= Math.PI / 2;
			} );

			// add object to scene
			this.three.Scene.add( object );

			// animate the scene
			this.animate();
		} );
	}

	animate() {
		requestAnimationFrame( this.animate );
		this.three.Controls.update();
		this.three.SpotLight.position.x = this.three.Camera.position.x;
		this.three.SpotLight.position.y = this.three.Camera.position.y;
		this.three.SpotLight.position.z = this.three.Camera.position.z;
		this.render3j();
	}

	render3j() {
		this.three.Camera.lookAt( this.three.Scene.position );
		this.three.Renderer.render( this.three.Scene, this.three.Camera );
	}

	render() {
		return (
			<div id="_kubrix">
				<div id="_3js-container" ref={ ( el ) => { this.three.container = el; } } />
			</div>
		);
	}
}

ReactDOM.render(<Kubrix />, document.getElementById("react-app"));