import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

require( "../../node_modules/three/examples/js/controls/TrackballControls.js" );

const WIDTH = 800;
const HEIGHT = WIDTH;

class Kubrix extends PureComponent {
	constructor( props ) {
		super( props );

		this.three = { };

		this.kube = { };
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
		this.three.Camera.position.x = 0;
		this.three.Camera.position.y = 8;
		this.three.Camera.position.z = 16;
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