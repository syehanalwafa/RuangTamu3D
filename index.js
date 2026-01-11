import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/Addons.js";

// scene
const scene = new THREE.Scene();
// cam
const cam = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 0.1, 300);
// render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
cam.position.set(0, 0.8, 4);      
cam.lookAt(0, 0.8, 0);   

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

// LIGHT 
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// Hemisphere (biar lantai & dinding lebih hidup)
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.8));

// Lampu tengah ruangan (biar dinding kena semua)
const roomLight = new THREE.PointLight(0xffffff, 1.5, 20);
roomLight.position.set(0, 2, 0);
scene.add(roomLight);

// Lampu dinding depan
const wallLightFront = new THREE.PointLight(0xffffff, 1, 15);
wallLightFront.position.set(0, 2, 4);
scene.add(wallLightFront);

// Lampu dinding belakang
const wallLightBack = new THREE.PointLight(0xffffff, 1, 15);
wallLightBack.position.set(0, 2, -4);
scene.add(wallLightBack);

// Lampu dinding kiri
const wallLightLeft = new THREE.PointLight(0xffffff, 1, 15);
wallLightLeft.position.set(-4, 2, 0);
scene.add(wallLightLeft);

// Lampu dinding kanan
const wallLightRight = new THREE.PointLight(0xffffff, 1, 15);
wallLightRight.position.set(4, 2, 0);
scene.add(wallLightRight);

// Lantai(Murni)
const LoaderLantai = new THREE.TextureLoader();
const colorMapLantai = LoaderLantai.load("Assets/Lantai/WoodFloor_Color.png");
const normalMapLantai = LoaderLantai.load("Assets/Lantai/WoodFloor_NormalGL.png");
const roughMapLantai = LoaderLantai.load("Assets/Lantai/WoodFloor_Roughness.png");
// const dispMapLantai = LoaderLantai.load("Assets/Lantai/WoodFloor_Displacement.png");
const lantai_geo = new THREE.PlaneGeometry(12, 12,100, 100);
const mat_lantai = new THREE.MeshStandardMaterial({map: colorMapLantai, normalMap: normalMapLantai, roughnessMap: roughMapLantai});
const lantai = new THREE.Mesh(lantai_geo, mat_lantai);
lantai.rotation.x = -Math.PI / 2;
lantai.position.y = -0;
scene.add(lantai);

// Dinding gak pake gpt
const LoaderTembok = new THREE.TextureLoader();
const colorMapTembok = LoaderTembok.load("Assets/Tembok/Wallpaper_Color.png");
const normalMapTembok = LoaderTembok.load("Assets/Tembok/Wallpaper_NormalGL.png");
const roughMapTembok = LoaderTembok.load("Assets/Tembok/Wallpaper_Roughness.png");

// Dinding 1
const geometry = new THREE.BoxGeometry(12, 3, 0.3);
const material = new THREE.MeshStandardMaterial({
  map: colorMapTembok,
  normalMap: normalMapTembok,
  roughnessMap: roughMapTembok,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-0, 1.5, 6);
scene.add(cube);

// Dinding 2
const geometry2 = new THREE.BoxGeometry(12, 3, 0.3);
const material2 = new THREE.MeshStandardMaterial({
  map: colorMapTembok,
  normalMap: normalMapTembok,
  roughnessMap: roughMapTembok,
});
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(-0, 1.5, -6);
scene.add(cube2);

// Dinding 3
const geometry3 = new THREE.BoxGeometry(0.3, 3, 12);
const material3 = new THREE.MeshStandardMaterial({
  map: colorMapTembok,
  normalMap: normalMapTembok,
  roughnessMap: roughMapTembok,
});
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.set(-6, 1.5, 0);
scene.add(cube3);

// Dinding 4
const geometry4 = new THREE.BoxGeometry(0.3, 3, 12);
const material4 = new THREE.MeshStandardMaterial({
  map: colorMapTembok,
  normalMap: normalMapTembok,
  roughnessMap: roughMapTembok,
});
const cube4 = new THREE.Mesh(geometry4, material4);
cube4.position.set(6, 1.5, 0);
scene.add(cube4);

// atap
const LoaderAtap = new THREE.TextureLoader();
const colorMapAtap = LoaderAtap.load("Assets/Atap/WoodFloor_Color.png");
const normalMapAtap = LoaderAtap.load("Assets/Atap/WoodFloor_NormalGL.png");
const roughMapAtap = LoaderAtap.load("Assets/Atap/WoodFloor_Roughness.png");

const geometry5 = new THREE.BoxGeometry(12, 0.3, 12);
const material5 = new THREE.MeshStandardMaterial({
  map: colorMapAtap,
  normalMap: normalMapAtap,
  roughnessMap: roughMapAtap,
});
const cube5 = new THREE.Mesh(geometry5, material5);
cube5.position.y = -Math.PI / 2;
cube5.position.set(0, 3.15, 0);
scene.add(cube5);

// Model
const loader = new GLTFLoader();

// ===== ROOM OBJECTS GROUP =====
const roomObjects = new THREE.Group(); // parent group
scene.add(roomObjects);

// ==== SOFAS ====
loader.load("Assets/Models/sofa_02_4k/sofa_02_4k.gltf", (gltf) => {
  const sofa1 = gltf.scene;
  sofa1.scale.set(1, 1, 1);
  sofa1.position.set(0, 0, -0.2);
  roomObjects.add(sofa1);
});

loader.load("Assets/Models/sofa_02_4k/sofa_02_4k.gltf", (gltf) => {
  const sofa2 = gltf.scene;
  sofa2.scale.set(1, 1, 1);
  sofa2.position.set(0, 0, 3);
  sofa2.rotation.y = Math.PI;
  roomObjects.add(sofa2);
});

// ==== TABLE & ITEMS ====
let coffeeTable;
loader.load("Assets/Models/gothic_coffee_table_4k/gothic_coffee_table_4k.gltf", (gltf) => {
  coffeeTable = gltf.scene;
  coffeeTable.scale.set(0.8, 0.8, 0.8);
  coffeeTable.position.set(0, 0, 1.5);
  roomObjects.add(coffeeTable);

  // Catur
  loader.load("Assets/Models/chess_set_4k/chess_set_4k.gltf", (gltf) => {
    const chess = gltf.scene;
    chess.scale.set(0.7, 0.7, 0.7);
    chess.position.set(0, 0.55, 0);
    coffeeTable.add(chess); 
  });

  // Goblets
  loader.load("Assets/Models/brass_goblets_4k/brass_goblets_4k.gltf", (gltf) => {
    const goblets = gltf.scene;
    goblets.scale.set(0.5, 0.5, 0.5);
    goblets.position.set(0.4, 0.55, 0);
    coffeeTable.add(goblets);
  });

  // Suitcase kanan
  loader.load("Assets/Models/vintage_suitcase_4k/vintage_suitcase_4k.gltf", (gltf) => {
    const suitcase = gltf.scene;
    suitcase.scale.set(0.5, 0.5, 0.5);
    suitcase.position.set(0.65, 0, 1.5);
    suitcase.position.set(coffeeTable.position.x + 0.65, 0, coffeeTable.position.z);
    suitcase.rotation.y = Math.PI / 2;
    roomObjects.add(suitcase);
  });
});

loader.load("Assets/Models/FirePlace/lincoln_-_traditional_ethanol_fireplace.glb", (gltf)=>{
  const FirePlace = gltf.scene;
  FirePlace.scale.set(2,2,2);
  FirePlace.position.set(-1, -0.35, 5.73);
  FirePlace.rotation.y = Math.PI;
  scene.add(FirePlace);

});

loader.load("Assets/Models/monstera_deliciosa_potted_mid-century_plant/scene.gltf", (gltf)=>{
  const plant = gltf.scene;
  plant.scale.set(0.6,0.6,0.6);
  plant.position.set(-5.6,0.25, 5.59);
  // plant.rotation.y = Math.PI;
  scene.add(plant);

});


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
