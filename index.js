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
  sofa1.position.set(0, 0, 2);
  sofa1.rotation.y = Math.PI;

  sofa1.traverse((child) => {
    if (child.isMesh) {
      sofaMesh.push(child);
      if (!defaultMaterial) {
        defaultMaterial = child.material.clone();
      }
      child.rotation.y += Math.PI;
    }
  });
  roomObjects.add(sofa1);
});

// sofa 2 (default)
loader.load("Assets/Models/sofa_02_4k/sofa_02_4k.gltf", (gltf) => {
  const sofa2 = gltf.scene;
  sofa2.scale.set(1, 1, 1);
  sofa2.position.set(-1.8, 0, 3.5);
  sofa2.rotation.y = Math.PI / 2;
  roomObjects.add(sofa2);

  // simpan material sofa2 sebagai default
  sofa2.traverse((child) => {
    if (child.isMesh && !defaultMaterial)
      defaultMaterial = child.material.clone();
  });
});

// sofa 3 (default)
loader.load("Assets/Models/sofa_02_4k/sofa_02_4k.gltf", (gltf) => {
  const sofa3 = gltf.scene;
  sofa3.scale.set(1, 1, 1);
  sofa3.position.set(1.8, 0, 3.5);
  sofa3.rotation.y = Math.PI / 2 + Math.PI;
  roomObjects.add(sofa3);

  // simpan material sofa2 sebagai default
  sofa3.traverse((child) => {
    if (child.isMesh && !defaultMaterial)
      defaultMaterial = child.material.clone();
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
      albedo = texLoader.load(
        "Assets/Texture/SofaTextures/brown_leather_albedo_4k.jpg"
      );
      normal = texLoader.load(
        "Assets/Texture/SofaTextures/brown_leather_nor_gl_4k.jpg"
      );
      roughness = texLoader.load(
        "Assets/Texture/SofaTextures/brown_leather_rough_4k.jpg"
      );
      sofaMesh.forEach((mesh) => {
        mesh.material.map = albedo;
        mesh.material.normalMap = normal;
        mesh.material.roughnessMap = roughness;
        mesh.material.needsUpdate = true;
      });
      break;
    case "red":
      albedo = texLoader.load(
        "Assets/Texture/SofaTextures/fabric_pattern_07_col_1_4k.jpg"
      );
      normal = texLoader.load(
        "Assets/Texture/SofaTextures/fabric_pattern_07_nor_gl_4k.jpg"
      );
      roughness = texLoader.load(
        "Assets/Texture/SofaTextures/fabric_pattern_07_rough_4k.jpg"
      );
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
    const x = ((vector.x + 1) / 2) * window.innerWidth;
    const y = ((-vector.y + 1) / 2) * window.innerHeight;

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
    coffeeTable.position.set(0, 0, 3.5);
    coffeeTable.traverse((child) => {
      if (child.isMesh) {
        child.rotation.y += Math.PI;
      }
    });
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

        // Buku di meja
        loader.load("Assets/Models/medieval_open_book_1/scene.gltf", (gltf) => {
          const book = gltf.scene;

          book.scale.set(0.25, 0.25, 0.25);
          book.rotation.x = Math.PI / 2;
          book.position.set(0.1, 0.55, -0.4);
          book.rotation.y = Math.PI;

          coffeeTable.add(book);

          loader.load(
            "Assets/Models/pokemon_oras_pikachu_doll/scene.gltf",
            (gltf) => {
              const pikachu = gltf.scene;

              pikachu.scale.set(0.1, 0.1, 0.1);
              pikachu.position.set(-0.4, 0.55, -0.4);
              pikachu.rotation.y = Math.PI / 2;

              coffeeTable.add(pikachu);
            }
          );
        });
      }
    );
  }
);

//PAINTINGS
loader.load("Assets/Models/ps1_paintings/scene.gltf", (gltf) => {
  const painting = gltf.scene;

  painting.scale.set(0.8, 0.8, 0.8);

  painting.position.set(5.7, 1.6, 0);
  painting.rotation.y = Math.PI;

  scene.add(painting);
});

loader.load(
  "Assets/Models/FirePlace/lincoln_-_traditional_ethanol_fireplace.glb",
  (gltf) => {
    const FirePlace = gltf.scene;
    FirePlace.scale.set(2, 2, 2);
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

loader.load(
  "Assets/Models/monstera_deliciosa_potted_mid-century_plant/scene.gltf",
  (gltf) => {
    const plant2 = gltf.scene;
    plant2.scale.set(0.6, 0.6, 0.6);
    plant2.position.set(5.6, 0.25, 5.59);
    // plant2.rotation.y = Math.PI;
    scene.add(plant2);
  }
);
loader.load(
  "Assets/Models/antique_wooden_bookcase_-_game_model/scene.gltf",
  (gltf) => {
    const rakBuku = gltf.scene;
    rakBuku.scale.set(0.5, 0.5, 0.5);
    rakBuku.position.set(2.2, 0, 5.9);
    rakBuku.rotation.y = Math.PI;
    scene.add(rakBuku);

    rakBuku.traverse((child) => {
      if (child.isMesh) {
        console.log(child.material);
      }
    });
  }
);

loader.load(
  "Assets/Models/antique_wooden_bookcase_-_game_model/scene.gltf",
  (gltf) => {
    const rakBuku2 = gltf.scene;
    rakBuku2.scale.set(0.5, 0.5, 0.5);
    rakBuku2.position.set(4, 0, 5.9);
    rakBuku2.rotation.y = Math.PI;
    scene.add(rakBuku2);

    rakBuku2.traverse((child) => {
      if (child.isMesh) {
        console.log(child.material);
      }
    });
  }
);

loader.load(
  "Assets/Models/antique_wooden_bookcase_-_game_model/scene.gltf",
  (gltf) => {
    const rakBuku3 = gltf.scene;
    rakBuku3.scale.set(0.5, 0.5, 0.5);
    rakBuku3.position.set(-2.2, 0, 5.9);
    rakBuku3.rotation.y = Math.PI;
    scene.add(rakBuku3);

    rakBuku3.traverse((child) => {
      if (child.isMesh) {
        console.log(child.material);
      }
    });
  }
);

loader.load(
  "Assets/Models/antique_wooden_bookcase_-_game_model/scene.gltf",
  (gltf) => {
    const rakBuku4 = gltf.scene;
    rakBuku4.scale.set(0.5, 0.5, 0.5);
    rakBuku4.position.set(-4, 0, 5.9);
    rakBuku4.rotation.y = Math.PI;
    scene.add(rakBuku4);

    rakBuku4.traverse((child) => {
      if (child.isMesh) {
        console.log(child.material);
      }
    });
  }
);

loader.load("Assets/Models/tv_cabinet/scene.gltf", (gltf) => {
  const tvCabinet = gltf.scene;
  tvCabinet.scale.set(0.09, 0.09, 0.09);
  tvCabinet.position.set(0, 0, -3.9);
  scene.add(tvCabinet);

  tvCabinet.traverse((child) => {
    if (child.isMesh) {
      console.log(child.material);
    }
  });
});

loader.load("Assets/Models/sofa_web/scene.gltf", (gltf) => {
  const sofaTv = gltf.scene;
  sofaTv.scale.set(0.002, 0.002, 0.002);
  sofaTv.position.set(0, 0, -2);
  sofaTv.rotation.y = 0;
  sofaTv.rotation.y = -Math.PI;
  scene.add(sofaTv);

  sofaTv.traverse((child) => {
    if (child.isMesh) {
      console.log(child.material);
    }
  });
});

loader.load("Assets/Models/old_persian_carpet/scene.gltf", (gltf) => {
  const carpet = gltf.scene;
  carpet.scale.set(1, 1, 1);
  carpet.position.set(0, 0.01, 3.2);
  carpet.rotation.y = Math.PI / 2;

  roomObjects.add(carpet);
});

loader.load(
  "Assets/Models/smoldering_logs_red_light_bonfire_l/scene.gltf",
  (gltf) => {
    const fireLogs = gltf.scene;

    fireLogs.scale.set(0.4, 0.4, 0.4);
    fireLogs.position.set(0, 0.6, 5.6);
    fireLogs.rotation.y = Math.PI;

    fireLogs.traverse((child) => {
     if (child.isMesh && child.material) {
       child.material.emissive = new THREE.Color(0xff3300);
       child.material.emissiveIntensity = 1.2;
     }
    });

    roomObjects.add(fireLogs);

    const fireLight = new THREE.PointLight(0xff6622, 2, 6);
    fireLight.position.set(0, 1.1, 5.6);
    roomObjects.add(fireLight);
    
    fireLogs.userData.fireLight = fireLight;
  }
);

let floorLamp = null;
let floorLampLight = null;
let lampOn = true;

window.addEventListener("mousedown", (e) => {
  if (!floorLamp) return;

  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, cam);

  const hit = raycaster.intersectObject(floorLamp, true);

  if (hit.length > 0) {
    lampOn = !lampOn;

    // ON / OFF LIGHT
    floorLampLight.intensity = lampOn ? 1.5 : 0;
    floorLamp.traverse((child) => {
      if (child.isMesh && child.material && child.material.emissive) {
        child.material.emissiveIntensity = lampOn ? 0.8 : 0;
      }
    });
  }
});
loader.load("Assets/Models/floor_lamp/scene.gltf", (gltf) => {
  console.log("FLOOR LAMP LOADED");

  floorLamp = gltf.scene;
  floorLamp.scale.set(0.6, 0.6, 0.6);
  floorLamp.position.set(1.1, 0.1, 2.2);
  floorLamp.rotation.y = Math.PI;

  floorLamp.traverse((child) => {
    if (
      child.isMesh &&
      child.material &&
      (child.name.toLowerCase().includes("bulb") ||
        child.name.toLowerCase().includes("shade") ||
        child.name.toLowerCase().includes("glass"))
    ) {
      child.material.emissive = new THREE.Color(0xffe0b3);
      child.material.emissiveIntensity = 0.8;
    }
  });

  floorLampLight = new THREE.PointLight(0xffe0b3, 1.5, 6);
  floorLampLight.position.set(0, 1.4, 0);
  floorLamp.add(floorLampLight);

  roomObjects.add(floorLamp);
});

loader.load("Assets/Models/double_door_window/scene.gltf", (gltf) => {
  const door = gltf.scene;

  const box = new THREE.Box3().setFromObject(door);
  const size = new THREE.Vector3();
  box.getSize(size);

  const targetHeight = 2;
  const scale = targetHeight / size.y;
  door.scale.setScalar(scale);

  door.position.set(-5.8, 0, 0);
  door.rotation.y = Math.PI / 2;

  scene.add(door);
});

loader.load("Assets/Models/curtain/scene.gltf", (gltf) => {
  const curtain = gltf.scene;

  curtain.scale.set(0.9, 0.9, 0.9);
  curtain.position.set(-5.6, 0, -4);
  curtain.rotation.y = Math.PI / 2;

  scene.add(curtain);
});



loader.load("Assets/Models/acoustic_guitar/scene.gltf", (gltf) => {
  const guitar = gltf.scene;

  guitar.scale.set(0.9, 0.9, 0.9);
  guitar.position.set(-5.7, 0, 4);
  guitar.rotation.y = Math.PI / 2;

  scene.add(guitar);
});

loader.load("Assets/Models/dusty_old_piano/scene.gltf", (gltf) => {
  const piano = gltf.scene;

  piano.scale.set(0.6, 0.6, 0.6);
  piano.position.set(-5.7, 0, 2.5);

  scene.add(piano);
});

loader.load(
  "Assets/Models/sillent_hill_pt_paintings__pack_1/scene.gltf",
  (gltf) => {
    const paintingPT = gltf.scene;

    paintingPT.scale.set(0.15, 0.15, 0.15);
    paintingPT.position.set(-5.7, 1.3, 3);

    scene.add(paintingPT);
  }
);

loader.load("Assets/Models/mirror_b/scene.gltf", (gltf) => {
  const mirror = gltf.scene;

  mirror.scale.set(0.9, 0.9, 0.9);
  mirror.position.set(-5.7, 0, -2);
  mirror.rotation.y = Math.PI / 2;

  scene.add(mirror);
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

  // ====== BOUNDARY TEMBOK  ======
  cam.position.x = THREE.MathUtils.clamp(cam.position.x, -5.4, 5.4);
  cam.position.z = THREE.MathUtils.clamp(cam.position.z, -5.4, 5.4);

  // update UI posisi floating
  updateUIPosition();
  // ==============================

  renderer.render(scene, cam);
  requestAnimationFrame(draw);
}

draw();
