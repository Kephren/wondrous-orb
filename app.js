$(document).ready(function () {
  /**
   * Created by Taylor on 2/8/2017.
   */
//creting renderer
  var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('myCanvas'),
    antialias: true
  });
  renderer.setClearColor(0xeeeeee);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

//creating camera
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1, 1000);
  camera.position.set(0, 0, 30);

//create scene
  var scene = new THREE.Scene();

//loading the orb's texture
  var cubeLoader = new THREE.CubeTextureLoader();
  cubeLoader.setPath('envMap/');
  var cubeTexture = cubeLoader.load([
    'posx.png', 'negx.png',
    'posy.png', 'negy.png',
    'posz.png', 'negz.png']);

  var floorLoader = new THREE.TextureLoader();
  var floorTexture = floorLoader.load('floor.png');

//creating the orb
  var sphereGeometry = new THREE.SphereGeometry(15, 50, 50);
  var sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    envMap: cubeTexture
  });

  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.geometry.dynamic = true;

//adding a surface below the sphere
  var planeGeometry = new THREE.PlaneGeometry(50, 50, 50);
  var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    map: floorTexture,
    transparent: true
  });

  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = Math.PI * -0.5;
  plane.position.y = -20;

  scene.add(sphere);
  scene.add(plane);

//setting the camera to look at the action no matter what
  camera.lookAt(scene.position);
//adding my meshes to the scene

//render that sheeeeit
  renderer.render(scene, camera);

  var angle = 0;
  var radius = 50;

  function animate(e) {
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    angle += 0.01;
    if (angle >= Math.PI) { angle = 0; }
    renderer.render(scene, camera);
  }

  setInterval(animate, 10);
});



