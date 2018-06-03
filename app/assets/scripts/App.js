var renderer = new THREE.WebGLRenderer({
  antialias: true
});
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

var scene = new THREE.Scene();

var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light1 = new THREE.PointLight(0xffffff, 0.5);
light1.position.set(0, 20000, 0);
scene.add(light1);

var geometry = new THREE.CubeGeometry(100, 100, 100);
var material = new THREE.MeshLambertMaterial({ color: 'blue' });
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0,0,-1000);

scene.add(mesh);

requestAnimationFrame(render);

function render() {
  mesh.rotation.x += 0.05;
  mesh.rotation.y += 0.02
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

