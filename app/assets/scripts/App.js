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

var curve = new THREE.SplineCurve3([
  new THREE.Vector3(-5, 0, 0),
  new THREE.Vector3(0, 5, 0),
  new THREE.Vector3(5, 2, 0)
]);
var geometry = new THREE.TubeGeometry(curve, 10, 1, 4, false);

var material = new THREE.MeshLambertMaterial({ 
  color: 'green',
  side: THREE.DoubleSide
});
var mesh = new THREE.Mesh(geometry, material);
// mesh.position.z = -100;

scene.add(mesh);

requestAnimationFrame(render);

function render() {
  // mesh.rotation.x += 0.05;
  // mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

