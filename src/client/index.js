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
			peices: {
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
				// c14 does not exist
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
			},
			// this will be used to check if the cube is in a compelted state
			// these are order from the same orientation points that are noted in the
			// setInitialState function
			faceColors: {
				red: [ "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"  ],
				blue: [ "c21", "c12", "c3", "c24", "c15", "c6", "c27", "c18", "c9" ],
				orange: [ "c19", "c20", "c21", "c22", "c23", "c24", "c25", "c26", "c27" ],
				green: [ "c19", "c10", "c1", "c22", "c13", "c4", "c25", "c16", "c7" ],
				white: [ "c19", "c20", "c21", "c10", "c11", "c14", "c1", "c2", "c3" ],
				yellow: [ "c25", "c26", "c27", "c16", "c17", "c18", "c25", "c26", "c27" ]
			}
		};

		this.init = this.init.bind( this );
		this.animate = this.animate.bind( this );
		this.render3j = this.render3j.bind( this );
		this.rotateSection = this.rotateSection.bind( this );
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

			setInitialState.call( this, object );



			this.rotateSection( "y", "back", true );
			this.rotateSection( "y", "back" );


			// add object to scene
			this.three.Scene.add( object );

			// animate the scene
			this.animate();
		} );
	}

	rotateSection( axis, section, counterClockwise ) {
		let key;
		if ( !counterClockwise ) {
			for ( key in this.kube.sections[ axis ][ section ] ) {
				this.kube.peices[ this.kube.sections[ axis ][ section ][ key ] ].rotation[ axis ] -= Math.PI / 2;
			}
			updateSctions.call( this, axis, section );
		} else {
			for ( key in this.kube.sections[ axis ][ section ] ) {
				this.kube.peices[ this.kube.sections[ axis ][ section ][ key ] ].rotation[ axis ] += Math.PI / 2;
			}
			updateSctions.call( this, axis, section, counterClockwise );
		}
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






function setInitialState( object ) {
	// whole cube
	this.kube.whole = object.children[ 0 ];

	object.traverse( ( child ) => {
		// take light from scene and adjust for 3js
		if ( child instanceof THREE.PointLight ) {
			child.intensity = 10;
			child.position.x = 0;
			child.position.y = 20;
			child.position.z = 15;
		}

		// All face referncing starts on the top left of the face and ends at the bottom right.
		// Starting face reference:
		// Front: Red
		// Right: Blue
		// Back: Yellow
		// Right: Green
		// Top: White
		// Bottom: Yellow


		// All sections are divided as if you are looking at the cube from Y-axis looking directly at
		// the Front ( red face ) in an orthographic view

		// X-axis sections:
		// left, middle, right

		// Y-axis sections:
		// front, middle, back

		// Z-axis sections:
		// top, middle, bottom



		// setup the original sectioning of the cube
		switch ( child.name ) {
			case "c1":
				this.kube.peices.c1 = child;
				this.kube.sections.x.left[ 3 ] = child.name;
				this.kube.sections.y.front[ 1 ] = child.name;
				this.kube.sections.z.top[ 7 ] = child.name;
				break;
			case "c2":
				this.kube.peices.c2 = child;
				this.kube.sections.x.middle[ 3 ] = child.name;
				this.kube.sections.y.front[ 2 ] = child.name;
				this.kube.sections.z.top[ 8 ] = child.name;
				break;
			case "c3":
				this.kube.peices.c3 = child;
				this.kube.sections.x.right[ 3 ] = child.name;
				this.kube.sections.y.front[ 3 ] = child.name;
				this.kube.sections.z.top[ 9 ] = child.name;
				break;
			case "c4":
				this.kube.peices.c4 = child;
				this.kube.sections.x.left[ 6 ] = child.name;
				this.kube.sections.y.front[ 4 ] = child.name;
				this.kube.sections.z.middle[ 7 ] = child.name;
				break;
			case "c5":
				this.kube.peices.c5 = child;
				this.kube.sections.x.middle[ 6 ] = child.name;
				this.kube.sections.y.front[ 5 ] = child.name;
				this.kube.sections.z.middle[ 8 ] = child.name;
				break;
			case "c6":
				this.kube.peices.c6 = child;
				this.kube.sections.x.right[ 6 ] = child.name;
				this.kube.sections.y.front[ 6 ] = child.name;
				this.kube.sections.z.middle[ 9 ] = child.name;
				break;
			case "c7":
				this.kube.peices.c7 = child;
				this.kube.sections.x.left[ 9 ] = child.name;
				this.kube.sections.y.front[ 7 ] = child.name;
				this.kube.sections.z.bottom[ 7 ] = child.name;
				break;
			case "c8":
				this.kube.peices.c8 = child;
				this.kube.sections.x.middle[ 9 ] = child.name;
				this.kube.sections.y.front[ 8 ] = child.name;
				this.kube.sections.z.bottom[ 8 ] = child.name;
				break;
			case "c9":
				this.kube.peices.c9 = child;
				this.kube.sections.x.right[ 9 ] = child.name;
				this.kube.sections.y.front[ 9 ] = child.name;
				this.kube.sections.z.bottom[ 9 ] = child.name;
				break;
			case "c10":
				this.kube.peices.c10 = child;
				this.kube.sections.x.left[ 2 ] = child.name;
				this.kube.sections.y.middle[ 1 ] = child.name;
				this.kube.sections.z.top[ 4 ] = child.name;
				break;
			case "c11":
				this.kube.peices.c11 = child;
				this.kube.sections.x.middle[ 2 ] = child.name;
				this.kube.sections.y.middle[ 2 ] = child.name;
				this.kube.sections.z.top[ 5 ] = child.name;
				break;
			case "c12":
				this.kube.peices.c12 = child;
				this.kube.sections.x.right[ 2 ] = child.name;
				this.kube.sections.y.middle[ 3 ] = child.name;
				this.kube.sections.z.top[ 6 ] = child.name;
				break;
			case "c13":
				this.kube.peices.c13 = child;
				this.kube.sections.x.left[ 5 ] = child.name;
				this.kube.sections.y.middle[ 4 ] = child.name;
				this.kube.sections.z.middle[ 4 ] = child.name;
				break;
			// c14 doesn't exist
			case "c15":
				this.kube.peices.c15 = child;
				this.kube.sections.x.right[ 5 ] = child.name;
				this.kube.sections.y.middle[ 6 ] = child.name;
				this.kube.sections.z.middle[ 6 ] = child.name;
				break;
			case "c16":
				this.kube.peices.c16 = child;
				this.kube.sections.x.left[ 8 ] = child.name;
				this.kube.sections.y.middle[ 7 ] = child.name;
				this.kube.sections.z.bottom[ 4 ] = child.name;
				break;
			case "c17":
				this.kube.peices.c17 = child;
				this.kube.sections.x.middle[ 8 ] = child.name;
				this.kube.sections.y.middle[ 8 ] = child.name;
				this.kube.sections.z.bottom[ 5 ] = child.name;
				break;
			case "c18":
				this.kube.peices.c18 = child;
				this.kube.sections.x.right[ 8 ] = child.name;
				this.kube.sections.y.middle[ 9 ] = child.name;
				this.kube.sections.z.bottom[ 6 ] = child.name;
				break;
			case "c19":
				this.kube.peices.c19 = child;
				this.kube.sections.x.left[ 1 ] = child.name;
				this.kube.sections.y.back[ 1 ] = child.name;
				this.kube.sections.z.top[ 1 ] = child.name;
				break;
			case "c20":
				this.kube.peices.c20 = child;
				this.kube.sections.x.middle[ 1 ] = child.name;
				this.kube.sections.y.back[ 2 ] = child.name;
				this.kube.sections.z.top[ 2 ] = child.name;
				break;
			case "c21":
				this.kube.peices.c21 = child;
				this.kube.sections.x.right[ 1 ] = child.name;
				this.kube.sections.y.back[ 3 ] = child.name;
				this.kube.sections.z.top[ 3 ] = child.name;
				break;
			case "c22":
				this.kube.peices.c22 = child;
				this.kube.sections.x.left[ 4 ] = child.name;
				this.kube.sections.y.back[ 4 ] = child.name;
				this.kube.sections.z.middle[ 1 ] = child.name;
				break;
			case "c23":
				this.kube.peices.c23 = child;
				this.kube.sections.x.middle[ 4 ] = child.name;
				this.kube.sections.y.back[ 5 ] = child.name;
				this.kube.sections.z.middle[ 2 ] = child.name;
				break;
			case "c24":
				this.kube.peices.c24 = child;
				this.kube.sections.x.right[ 4 ] = child.name;
				this.kube.sections.y.back[ 6 ] = child.name;
				this.kube.sections.z.middle[ 3 ] = child.name;
				break;
			case "c25":
				this.kube.peices.c25 = child;
				this.kube.sections.x.left[ 7 ] = child.name;
				this.kube.sections.y.back[ 7 ] = child.name;
				this.kube.sections.z.bottom[ 1 ] = child.name;
				break;
			case "c26":
				this.kube.peices.c26 = child;
				this.kube.sections.x.middle[ 7 ] = child.name;
				this.kube.sections.y.back[ 8 ] = child.name;
				this.kube.sections.z.bottom[ 2 ] = child.name;
				break;
			case "c27":
				this.kube.peices.c27 = child;
				this.kube.sections.x.right[ 7 ] = child.name;
				this.kube.sections.y.back[ 9 ] = child.name;
				this.kube.sections.z.bottom[ 3 ] = child.name;
				break;
		}
	} );

	console.log( this.kube );
}

function updateSctions( axis, section, counterClockwise ) {
	switch ( axis ) {
		case "x":
			switch ( section ) {
				case "left":
					//updateXLeft.call( this );
					break;
				case "middle":
					break;
				case "right":
					break;
			}
			break;
		case "y":
			YRotationUpdate.call( this, section, counterClockwise );
			break;
		case "z":
			switch ( section ) {
				case "top":
					break;
				case "middle":
					break;
				case "bottom":
					console.log( "z-bottom");
					break;
			}
			break;
	}
}

function YRotationUpdate( section, counterClockwise ) {
	if ( !counterClockwise ) {
		let _section = this.kube.sections.y[ section ];
		this.kube.sections.y[ section ] = {
			1: _section[ 7 ],
			2: _section[ 4 ],
			3: _section[ 1 ],
			4: _section[ 8 ],
			// 5 never changes
			6: _section[ 2 ],
			7: _section[ 9 ],
			8: _section[ 6 ],
			9: _section[ 3 ]
		};
	} else {
		let _section = this.kube.sections.y[ section ];
		this.kube.sections.y[ section ] = {
			1: _section[ 3 ],
			2: _section[ 6 ],
			3: _section[ 9 ],
			4: _section[ 2 ],
			// 5 never changes
			6: _section[ 8 ],
			7: _section[ 1 ],
			8: _section[ 4 ],
			9: _section[ 7 ]
		};
	}
}







