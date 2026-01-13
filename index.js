import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/Addons.js";

// scene
const scene = new THREE.Scene();
// cam
const cam = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);
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
const normalMapLantai = LoaderLantai.load(
  "Assets/Lantai/WoodFloor_NormalGL.png"
);
const roughMapLantai = LoaderLantai.load(
  "Assets/Lantai/WoodFloor_Roughness.png"
);
// const dispMapLantai = LoaderLantai.load("Assets/Lantai/WoodFloor_Displacement.png");
const lantai_geo = new THREE.PlaneGeometry(12, 12, 100, 100);
const mat_lantai = new THREE.MeshStandardMaterial({
  map: colorMapLantai,
  normalMap: normalMapLantai,
  roughnessMap: roughMapLantai,
});
const lantai = new THREE.Mesh(lantai_geo, mat_lantai);
lantai.rotation.x = -Math.PI / 2;
lantai.position.y = -0;
scene.add(lantai);

// Dinding gak pake gpt
const LoaderTembok = new THREE.TextureLoader();
const colorMapTembok = LoaderTembok.load("Assets/Tembok/Wallpaper_Color.png");
const normalMapTembok = LoaderTembok.load(
  "Assets/Tembok/Wallpaper_NormalGL.png"
);
const roughMapTembok = LoaderTembok.load(
  "Assets/Tembok/Wallpaper_Roughness.png"
);

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

// ==== SOFA (GPT) ====
// sofa1 meshes & material
let sofaMesh = [];
let defaultMaterial;
const texLoader = new THREE.TextureLoader();

// sofa 1 (bisa ganti texture)
loader.load("Assets/Models/sofa_02_4k/sofa_02_4k.gltf", (gltf) => {
  const sofa1 = gltf.scene;
  sofa1.scale.set(1, 1, 1);
  sofa1.position.set(0, 0, -0.2);

  // ambil semua mesh sofa supaya bisa ganti texture
  sofa1.traverse((child) => {
    if (child.isMesh) sofaMesh.push(child);
  });

  roomObjects.add(sofa1);
});

// sofa 2 (default)
loader.load("Assets/Models/sofa_02_4k/sofa_02_4k.gltf", (gltf) => {
  const sofa2 = gltf.scene;
  sofa2.scale.set(1, 1, 1);
  sofa2.position.set(0, 0, 3);
  sofa2.rotation.y = Math.PI;
  roomObjects.add(sofa2);

  // simpan material sofa2 sebagai default
  sofa2.traverse((child) => {
    if (child.isMesh && !defaultMaterial) defaultMaterial = child.material.clone();
  });
});

// ================== Fungsi Ganti Texture ==================
function changeSofaTexture(color) {
  if (!sofaMesh.length) return;

  let albedo, normal, roughness;

  switch (color) {
    case "default":
      sofaMesh.forEach((mesh) => {
        mesh.material = defaultMaterial.clone();
        mesh.material.needsUpdate = true;
      });
      break;
    case "brown":
      albedo = texLoader.load("Assets/Texture/SofaTextures/brown_leather_albedo_4k.jpg");
      normal = texLoader.load("Assets/Texture/SofaTextures/brown_leather_nor_gl_4k.jpg");
      roughness = texLoader.load("Assets/Texture/SofaTextures/brown_leather_rough_4k.jpg");
      sofaMesh.forEach((mesh) => {
        mesh.material.map = albedo;
        mesh.material.normalMap = normal;
        mesh.material.roughnessMap = roughness;
        mesh.material.needsUpdate = true;
      });
      break;
    case "red":
      albedo = texLoader.load("Assets/Texture/SofaTextures/fabric_pattern_07_col_1_4k.jpg");
      normal = texLoader.load("Assets/Texture/SofaTextures/fabric_pattern_07_nor_gl_4k.jpg");
      roughness = texLoader.load("Assets/Texture/SofaTextures/fabric_pattern_07_rough_4k.jpg");
      sofaMesh.forEach((mesh) => {
        mesh.material.map = albedo;
        mesh.material.normalMap = normal;
        mesh.material.roughnessMap = roughness;
        mesh.material.needsUpdate = true;
      });
      break;
    default:
      console.warn("Texture color not found:", color);
      return;
  }
}

// ================== UI Overlay (floating near sofa) ==================
const uiDiv = document.getElementById("textureUI");
uiDiv.style.display = "none"; // sembunyikan awal
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.getElementById("defaultBtn").style.backgroundImage =
  'url("Assets/Texture/SofaTextures/sofa2_albedo.jpg")';
document.getElementById("brownBtn").style.backgroundImage =
  'url("Assets/Texture/SofaTextures/brown_leather_albedo_4k.jpg")';
document.getElementById("redBtn").style.backgroundImage =
  'url("Assets/Texture/SofaTextures/fabric_pattern_07_col_1_4k.jpg")';

// flag klik sofa
let sofaClicked = false;

// klik sofa → tampilkan UI
window.addEventListener("mousedown", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, cam);

  if (sofaMesh.length) {
    const intersects = raycaster.intersectObjects(sofaMesh, true);
    if (intersects.length > 0) {
      sofaClicked = true;
      uiDiv.style.display = "flex"; // tampilkan UI
      // unlock pointer sementara biar bisa klik tombol
      controls.unlock();
    }
  }
});

// tombol ganti texture
["default", "brown", "red"].forEach((color) => {
  document.getElementById(color + "Btn").addEventListener("click", () => {
    changeSofaTexture(color);
    uiDiv.style.display = "none";
    sofaClicked = false;
    controls.lock(); // kunci pointer lagi
  });
});

// ================== Update posisi UI tiap frame ==================
function updateUIPosition() {
  if (sofaClicked) {
    // posisi sofa1 di world
    const sofaPos = new THREE.Vector3();
    sofaMesh[0].getWorldPosition(sofaPos);

    // offset sedikit di atas & samping sofa
    sofaPos.y += 1; // naik sedikit
    sofaPos.x += 1; // geser ke samping

    // project ke 2D screen
    const vector = sofaPos.clone().project(cam);
    const x = (vector.x + 1) / 2 * window.innerWidth;
    const y = (-vector.y + 1) / 2 * window.innerHeight;

    uiDiv.style.left = x + "px";
    uiDiv.style.top = y + "px";
  }
}

// ==== TABLE & ITEMS ====
let coffeeTable;
loader.load(
  "Assets/Models/gothic_coffee_table_4k/gothic_coffee_table_4k.gltf",
  (gltf) => {
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
    loader.load(
      "Assets/Models/brass_goblets_4k/brass_goblets_4k.gltf",
      (gltf) => {
        const goblets = gltf.scene;
        goblets.scale.set(0.5, 0.5, 0.5);
        goblets.position.set(0.4, 0.55, 0);
        coffeeTable.add(goblets);
      }
    );

    // Suitcase kanan
    loader.load(
      "Assets/Models/vintage_suitcase_4k/vintage_suitcase_4k.gltf",
      (gltf) => {
        const suitcase = gltf.scene;
        suitcase.scale.set(0.5, 0.5, 0.5);
        suitcase.position.set(0.65, 0, 1.5);
        suitcase.position.set(
          coffeeTable.position.x + 0.65,
          0,
          coffeeTable.position.z
        );
        suitcase.rotation.y = Math.PI / 2;
        roomObjects.add(suitcase);
      }
    );
  }
);

loader.load(
  "Assets/Models/FirePlace/lincoln_-_traditional_ethanol_fireplace.glb",
  (gltf) => {
    const FirePlace = gltf.scene;
    FirePlace.scale.set(5, 2, 5);
    FirePlace.position.set(0, -0.35, 5.7);
    FirePlace.rotation.y = Math.PI;
    scene.add(FirePlace);
  }
);

loader.load(
  "Assets/Models/monstera_deliciosa_potted_mid-century_plant/scene.gltf",
  (gltf) => {
    const plant = gltf.scene;
    plant.scale.set(0.6, 0.6, 0.6);
    plant.position.set(-5.6, 0.25, 5.59);
    // plant.rotation.y = Math.PI;
    scene.add(plant);
  }
);

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

  // update UI posisi floating
  updateUIPosition();
  // ==============================

  renderer.render(scene, cam);
  requestAnimationFrame(draw);
}

draw();
