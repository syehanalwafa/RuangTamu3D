import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";

// scene
const scene = new THREE.Scene();
// cam
const cam = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  100
);
// render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
cam.position.set(0, 1.6, 4);
cam.lookAt(0, 1.6, 0);

// ================== CONTROLS (GPT) ==================

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const speed = 0.5;

// Keyboard input
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      moveForward = true;
      break;
    case "KeyS":
      moveBackward = true;
      break;
    case "KeyA":
      moveLeft = true;
      break;
    case "KeyD":
      moveRight = true;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyW":
      moveForward = false;
      break;
    case "KeyS":
      moveBackward = false;
      break;
    case "KeyA":
      moveLeft = false;
      break;
    case "KeyD":
      moveRight = false;
      break;
  }
});

// Pointer Lock Controls
const controls = new PointerLockControls(cam, document.body);

document.addEventListener("click", () => {
  controls.lock();
});

scene.add(cam);

// Clock untuk movement
const clock = new THREE.Clock();
// ====================================

// Lantai(Murni)
const LoaderLantai = new THREE.TextureLoader();
const colorMapLantai = LoaderLantai.load("img/Lantai/WoodFloor_Color.png");
const normalMapLantai = LoaderLantai.load("img/Lantai/WoodFloor_NormalGL.png");
const roughMapLantai = LoaderLantai.load("img/Lantai/WoodFloor_Roughness.png");
const dispMapLantai = LoaderLantai.load("img/Lantai/WoodFloor_Displacement.png");
const lantai_geo = new THREE.PlaneGeometry(10, 10);
const mat_lantai = new THREE.MeshBasicMaterial({
  map: colorMapLantai,
  normalMap: normalMapLantai,
  roughnessMap: roughMapLantai,
  displacementMap: dispMapLantai,
});
const lantai = new THREE.Mesh(lantai_geo, mat_lantai);
lantai.rotation.x = -Math.PI / 2;
lantai.position.y = 0;
scene.add(lantai);

// Dinding gak pake gpt
const LoaderTembok = new THREE.TextureLoader();
const colorMapTembok = LoaderTembok.load("img/Tembok/Wallpaper_Color.png");
const normalMapTembok = LoaderTembok.load("img/Tembok/Wallpaper_NormalGL.png");
const roughMapTembok = LoaderTembok.load("img/Tembok/Wallpaper_Roughness.png");
const dispMapTembok = LoaderTembok.load("img/Tembok/Wallpaper_Displacement.png");
// Dinding 1
const geometry = new THREE.BoxGeometry(10, 10, 0.5);
const material = new THREE.MeshBasicMaterial({ map:colorMapTembok, normalMap:normalMapTembok, roughnessMap:roughMapTembok, displacementMap:dispMapTembok });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = -Math.PI / 2;
cube.position.set(-0, 5, 5);
scene.add(cube);

// Dinding 2
const geometry2 = new THREE.BoxGeometry(10, 10, 0.5);
const material2 = new THREE.MeshBasicMaterial({ map:colorMapTembok, normalMap:normalMapTembok, roughnessMap:roughMapTembok, displacementMap:dispMapTembok});
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.y = -Math.PI / 2;
cube2.position.set(-0, 5, -5);
scene.add(cube2);

// Dinding 3
const geometry3 = new THREE.BoxGeometry(0.5, 10, 10);
const material3 = new THREE.MeshBasicMaterial({ map:colorMapTembok, normalMap:normalMapTembok, roughnessMap:roughMapTembok, displacementMap:dispMapTembok});
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.y = -Math.PI / 2;
cube3.position.set(-5, 5, 0);
scene.add(cube3);

// Dinding 4
const geometry4 = new THREE.BoxGeometry(0.5, 10, 10);
const material4 = new THREE.MeshBasicMaterial({ map:colorMapTembok, normalMap:normalMapTembok, roughnessMap:roughMapTembok, displacementMap:dispMapTembok});
const cube4 = new THREE.Mesh(geometry4, material4);
cube4.position.y = -Math.PI / 2;
cube4.position.set(5, 5, 0);
scene.add(cube4);

// atap
const LoaderAtap = new THREE.TextureLoader();
const colorMapAtap = LoaderAtap.load("img/Atap/WoodFloor_Color.png");
const normalMapAtap = LoaderAtap.load("img/Atap/WoodFloor_NormalGL.png");
const roughMapAtap = LoaderAtap.load("img/Atap/WoodFloor_Roughness.png");
const dispMapAtap = LoaderAtap.load("img/Atap/WoodFloor_Displacement.png");

const geometry5 = new THREE.BoxGeometry(10, 2, 10);
const material5 = new THREE.MeshBasicMaterial({ map:colorMapAtap, normalMap:normalMapAtap, roughnessMap:roughMapAtap, displacementMap:dispMapAtap });
const cube5 = new THREE.Mesh(geometry5, material5);
cube5.position.y = -Math.PI / 2;
cube5.position.set(0, 10, 0);
scene.add(cube5);

function draw() {
  // =========== GPT ==============
  const delta = clock.getDelta();

  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;

  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);
  direction.normalize();

  if (moveForward || moveBackward) velocity.z -= direction.z * speed * delta;

  if (moveLeft || moveRight) velocity.x -= direction.x * speed * delta;

  controls.moveRight(-velocity.x);
  controls.moveForward(-velocity.z);
  // ==============================

  renderer.render(scene, cam);
  requestAnimationFrame(draw);
}

draw();
