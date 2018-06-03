// geometry
var curve = new THREE.SplineCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, 5, 0),
    new THREE.Vector3(10, 2, 0)
  ]);
  var geometry = new THREE.TubeGeometry(curve, 10, 1, 4, false);
  
  var points = curve.getPoints();
  console.log('points:  ', points);
  
  var curtainShape = new THREE.Shape();
  curtainShape.moveTo(0,0,0);
  for(let i = 0; i < points.length; i++) {
    curtainShape.lineTo(points[i].x, points[i].y, points[i].z);
    
    //if at end of points, draw the bottom of the curtain
    if(i + 1 === points.length) {
      curtainShape.lineTo(points[i].x, 0, points[i].z);
    }
  }
  
  var extrudeSettings = {
    amounts: 1,
    steps: 1
  };
  
  var curtainGeometry = new THREE.ShapeGeometry(curtainShape);
  var curtainMesh = new THREE.Mesh(curtainGeometry, new THREE.MeshLambertMaterial());
  scene.add(curtainMesh);
  
  // material
  var material = new THREE.MeshLambertMaterial({ 
    color: 'green',
    side: THREE.DoubleSide
  });
  
  // mesh
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  
  