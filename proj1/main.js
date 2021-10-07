import './style.css';
import * as THREE from 'three';
import { AmbientLight } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
/*
1. Scene
2. Camera
3. Renderer
*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
// parameters are: Field of View, Aspect Ratio, View Frustum

const renderer = new THREE.WebGLRenderer
({
canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);

// Geometries

const geometry = new THREE.TorusGeometry( 8, 1, 5, 100 ); // width, Height, Density
// https://threejs.org/docs/#api/en/geometries/BoxGeometry 
const material = new THREE.MeshStandardMaterial( {color:0xffffff });
const torus = new THREE.Mesh( geometry, material);
scene.add(torus);

// Lighting

const pointLight = new THREE.PointLight(0xffffff); // Lights up from specific point
pointLight.position.set(10,10,5); // X Y Z
const lightHelper = new THREE.PointLightHelper(pointLight) // shows light origin for parameter

const ambientLight = new THREE.AmbientLight(0xffffff); // Lights up everything

scene.add(pointLight); // add lights here 

const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);

// WOOPAH

const wooperTexture = new THREE.TextureLoader().load('wooperLink.png');
const woop = new THREE.Mesh(
new THREE.BoxGeometry(3,3,3),
new THREE.MeshBasicMaterial( {map: wooperTexture})

);

//scene.add(woop);

const planetTexture = new THREE.TextureLoader().load('planet.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial( {
    map:planetTexture,
    normalMap: normalTexture,
  })
  );
scene.add(planet);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
//const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial( {
    map:moonTexture,
    normalMap: normalTexture,
  })
  );
  moon.position.z = 30;
  moon.position.x = -10;
scene.add(moon);

// "Stars"
function addStar()
{
  const geometry = new THREE.SphereGeometry( 0.10, 24, 24 );
  const material = new THREE.MeshStandardMaterial({color:  0xffffff });
  const star = new THREE.Mesh ( geometry, material);

  const [x,y,z] =Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar);


// Background image
const spaceTexture = new THREE.TextureLoader().load('943323.jpg');
scene.background = spaceTexture;

function moveCamera()
{
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  
}

document.body.onscroll = moveCamera

function animate()
{
  requestAnimationFrame( animate );


  torus.rotation.x += 0.01;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.05;


  controls.update();

  renderer.render (scene , camera);
}

animate()