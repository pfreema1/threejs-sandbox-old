var renderer = new THREE.WebGLRenderer({
  antialias: true
});
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.z = 20;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var scene = new THREE.Scene();

var size = 10;
var divisions = 10;

// helplers
var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// lights
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light1 = new THREE.PointLight(0xffffff, 0.5);
// light1.position.set(0, 20000, 0);
scene.add(light1);

// geometry
const NUM_LINES = 100;
const NUM_POINTS_PER_LINE = 100;
const SPACE_BETWEEN_POINTS = 5;
const MAX_HEIGHT = 30;
const Z_OFFSET = -10;
const Y_OFFSET = 1;
const HEIGHT_SCALAR = .1;
let lineVectors = [];
let lineCurves = [];
let linePoints = [];
let lineGeometries = [];
let lineMeshes = [];
let curtainShapes = [];
let curtainGeometries = [];
let curtainMeshes = [];

 // line material
let lineMaterial = new THREE.MeshBasicMaterial({
  color: '#d1d1d1',
  side: THREE.DoubleSide
});

// runs for each line
for(let i = 0; i < NUM_LINES; i++) {
  // create array of vector points for line
  lineVectors.push(returnVectorPointsForLine(Z_OFFSET * i));
  // add curve to array of curves
  lineCurves.push(new THREE.SplineCurve3(lineVectors[i]));
  // use getPoints to get an array of points on the curve so we can draw the curtain
  linePoints.push(lineCurves[i].getPoints(100));
  // create geometries
  lineGeometries.push(new THREE.TubeGeometry(lineCurves[i], 200, 1, 4, false));
  // create mesh
  lineMeshes.push(new THREE.Mesh(lineGeometries[i], lineMaterial));
  // offset line mesh
  lineMeshes[i].position.y += Y_OFFSET * i;
  scene.add(lineMeshes[i]);

  curtainShapes.push(new THREE.Shape());
  curtainShapes[i].moveTo(0,0,0);
  // iterate through points to draw curtain
  for(let j = 0; j < linePoints[i].length; j++) {
    curtainShapes[i].lineTo(linePoints[i][j].x, linePoints[i][j].y, linePoints[i][j].z);

    // if at end of points, draw the bottom of the curtain
    if(j + 1 === linePoints[i].length) {
      curtainShapes[i].lineTo(linePoints[i][j].x, 0, linePoints[i][j].z);
    }
  }

  curtainGeometries.push(new THREE.ShapeGeometry(curtainShapes[i]));
  curtainMeshes.push(new THREE.Mesh(curtainGeometries[i], new THREE.MeshLambertMaterial({
    color: 'black'
  })));
  // offset curtain mesh
  curtainMeshes[i].position.y += Y_OFFSET * i;
  curtainMeshes[i].position.z += Z_OFFSET * i;

  scene.add(curtainMeshes[i]);

  
}


// render
requestAnimationFrame(render);

function render() {
  // mesh.rotation.x += 0.05;
  // mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function returnVectorPointsForLine(zOff) {
  let lineVecArr = [];

  for(let i = 0; i < NUM_POINTS_PER_LINE; i++) {
    let heightVal = THREE.Math.randInt(0, MAX_HEIGHT);
  
    if(i < NUM_POINTS_PER_LINE * .25 || i > NUM_POINTS_PER_LINE * .75) {
      heightVal *= HEIGHT_SCALAR;
    }
  
    lineVecArr.push(new THREE.Vector3(i * SPACE_BETWEEN_POINTS, heightVal, zOff));
  }

  return lineVecArr;
}


