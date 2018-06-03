var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var clock = new THREE.Clock();

// axes helper
// The X axis is red. The Y axis is green. The Z axis is blue.
var axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );

var worldWidth = 256;
var worldDepth = 256;
var worldHalfWidth = worldWidth / 2; 
var worldHalfDepth = worldDepth / 2;


// background color
scene.background = new THREE.Color( 'black' );

// controls
controls = new THREE.FirstPersonControls( camera );
controls.movementSpeed = 1000;

// height data
var data = generateHeight( worldWidth, worldDepth );
console.log('data:  ', data);



/**********
 *   curve
 */

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function (t) {
    var tx = (t * 8 - 1.5);
    var ty = (data[counter] * .01) + (offset1 * OFFSET_MULTI); 
    var tz = 0 + (offset1 * OFFSET_MULTI);

    counter++;
    offset1++;
    offset2++;
    // console.log('counter:  ', counter);
    // console.log('t:  ', t * 200);
    // note: t is the tracker for points along the line

    if(t * 200 < 50 || t * 200 > 150) {
        ty = ((data[counter] * .01) / END_OF_LINE_DIVISOR) + (offset1 * OFFSET_MULTI);
        // ty /= 20;
    } else {

    }

	return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

};

var counter = 0;
var offset1 = 0;
var offset2 = 0;
var OFFSET_MULTI = 0.001;
var NUM_LINES = 1;
var NUM_POINTS_PER_LINE = 200;
var END_OF_LINE_DIVISOR = 7;
var planeArr = [];

// runs for each line
for(let i = 0; i < NUM_LINES; i++) {
    var path = new CustomSinCurve(100);
    console.log('path:  ', path);
    // PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)
    var planeGeom = new THREE.PlaneGeometry(200, 200, 200, 200);
    planeArr.push(new THREE.Mesh(planeGeom, new THREE.MeshBasicMaterial({
      color: 'blue',
      wireframe: false,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    })));
    scene.add(planeArr[i]);

    // TubeBufferGeometry(path : Curve, tubularSegments : Integer, radius : Float, radialSegments : Integer, closed : Boolean)
    var geometry = new THREE.TubeBufferGeometry( path, NUM_POINTS_PER_LINE, 2, 4, false );
    var material = new THREE.MeshBasicMaterial( { color: '#D1D1D1' } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
}

/********************** */
console.log('planeArr:  ', planeArr);

// camera positioning
camera.position.x = 333.322;
camera.position.y = 346.895;
camera.position.z = -331.2867;





function generateHeight( width, height ) {
    var size = width * height;
    var data = new Uint8Array( size );
    var perlin = new ImprovedNoise();
    var quality = 1;
    var z = Math.random() * 100;

    for ( var j = 0; j < 4; j ++ ) {
        for ( var i = 0; i < size; i ++ ) {
            var x = i % width;
            var y = ~~ ( i / width );
            data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
            // console.log('data[i]:  ', data[i]);
        }
        quality *= 5;
    }
    
    return data;
}



function CustomSinCurve( scale ) {
    
	THREE.Curve.call( this );

	this.scale = ( scale === undefined ) ? 1 : scale;

}

function animate() {
    requestAnimationFrame( animate );
    controls.update( clock.getDelta() );
    renderer.render( scene, camera );
}

animate();