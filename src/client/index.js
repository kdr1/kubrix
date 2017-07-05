import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

require( "../../node_modules/three/examples/js/controls/TrackballControls.js" );

const WIDTH = 800;
const HEIGHT = WIDTH;

const rotateSection = ( section, axis, counterClockwise ) => {
	let key;
	if ( !counterClockwise ) {
		for ( key in section ) {
			section[ key ].rotation[ axis ] -= Math.PI / 2;
		}
	} else {
		for ( key in section ) {
			section[ key ].rotation[ axis ] += Math.PI / 2;
		}
	}
}

class Kubrix extends PureComponent {
	constructor( props ) {
		super( props );

		this.three = { };

		this.kube = {
			whole: null,
			sections: {
				x: {
					left: { },
					middle: { },
					right: { }
				},
				y: {
					front: { },
					middle: { },
					back: { }
				},
				z: {
					top: { },
					middle: { },
					bottom: { }
				}
			}
		};

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








				// setup the original sectioning of the cube
				switch ( child.name ) {
					case "c1":
						this.kube.sections.y.front[ 1 ] = child;
						break;
					case "c2":
						this.kube.sections.y.front[ 2 ] = child;
						break;
					case "c3":
						this.kube.sections.y.front[ 3 ] = child;
						break;
					case "c4":
						this.kube.sections.y.front[ 4 ] = child;
						break;
					case "c5":
						this.kube.sections.y.front[ 5 ] = child;
						break;
					case "c6":
						this.kube.sections.y.front[ 6 ] = child;
						break;
					case "c7":
						this.kube.sections.y.front[ 7 ] = child;
						break;
					case "c8":
						this.kube.sections.y.front[ 8 ] = child;
						break;
					case "c9":
						this.kube.sections.y.front[ 9 ] = child;
						break;





					case "c10":
						this.kube.sections.y.middle[ 1 ] = child;
						break;
					case "c11":
						this.kube.sections.y.middle[ 2 ] = child;
						break;
					case "c12":
						this.kube.sections.y.middle[ 3 ] = child;
						break;
					case "c13":
						this.kube.sections.y.middle[ 4 ] = child;
						break;
					// c14 doesn't exist
					case "c15":
						this.kube.sections.y.middle[ 6 ] = child;
						break;
					case "c16":
						this.kube.sections.y.middle[ 7 ] = child;
						break;
					case "c17":
						this.kube.sections.y.middle[ 8 ] = child;
						break;
					case "c18":
						this.kube.sections.y.middle[ 9 ] = child;
						break;



					case "c19":
						this.kube.sections.y.back[ 1 ] = child;
						break;
					case "c20":
						this.kube.sections.y.back[ 2 ] = child;
						break;
					case "c21":
						this.kube.sections.y.back[ 3 ] = child;
						break;
					case "c22":
						this.kube.sections.y.back[ 4 ] = child;
						break;
					case "c23":
						this.kube.sections.y.back[ 5 ] = child;
						break;
					case "c24":
						this.kube.sections.y.back[ 6 ] = child;
						break;
					case "c25":
						this.kube.sections.y.back[ 7 ] = child;
						break;
					case "c26":
						this.kube.sections.y.back[ 8 ] = child;
						break;
					case "c27":
						this.kube.sections.y.back[ 9 ] = child;
						break;

				}
			} );



			rotateSection( this.kube.sections.y.back, "y" );




			/*this.kube.sections.y.front.forEach( ( faceName ) => {
				this.kube.reference[ faceName ].rotation.y -= Math.PI / 2;
			} );*/

			/*this.kube.sections.z.middle.forEach( ( faceName ) => {
				this.kube.reference[ faceName ].rotation.z -= Math.PI / 2;
			} );*/


			/*this.kube.sections.x.right.forEach( ( faceName ) => {
				this.kube.reference[ faceName ].rotation.x -= Math.PI / 2;
			} );*/

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