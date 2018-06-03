var renderer = new THREE.WebGLRenderer({
  antialias: true
});
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.z = 10;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var scene = new THREE.Scene();

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light1 = new THREE.PointLight(0xffffff, 0.5);
// light1.position.set(0, 20000, 0);
scene.add(light1);

var geometry = new THREE.Geometry();
geometry.vertices.push(
  new THREE.Vector3(-10, 10, 0),
  new THREE.Vector3(-10, -10, 0),
  new THREE.Vector3(10, -10, 0)
);
geometry.faces.push(new THREE.Face3(0, 1, 2));

var material = new THREE.MeshLambertMaterial({ 
  color: 'green',
  side: THREE.DoubleSide
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.z = -100;

scene.add(mesh);

requestAnimationFrame(render);

function render() {
  // mesh.rotation.x += 0.05;
  // mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

