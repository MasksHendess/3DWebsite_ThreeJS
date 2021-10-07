import './style.css';
import * as THREE from 'three';
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

// --------------------------------

const geometry = new THREE.ConeGeometry( 5, 20, 32 ); 
// https://threejs.org/docs/#api/en/geometries/BoxGeometry 
const material = new THREE.MeshBasicMaterial( {color:0xFF6347, wireframe:true});
const torus = new THREE.Mesh( geometry, material);


scene.add(torus);
renderer.render(scene, camera);


function animate()
{
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y +=0.01;
  torus.rotation.z +=0.01;

  renderer.render (scene , camera);
}

animate()