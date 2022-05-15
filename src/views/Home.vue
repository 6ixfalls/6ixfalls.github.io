<template>
  <div ref="maindiv" class="text-white">
    <h1 class="text-6xl font-bold pt-12 pb-5 drop-shadow-2xl">
      Hey, I'm
      <span
        class="
          text-transparent
          bg-clip-text bg-gradient-to-r
          from-sky-500
          to-sky-300
          bg-400%
          animate-gradient-y
        "
        >sixfalls</span
      >.
    </h1>
    <a class="pl-6 mt-5 text-xl pb-10 drop-shadow-2xl"
      >Developer & Programmer for 3+ years.</a
    >

    <button
      type="button"
      class="
        group
        flex
        mt-10
        ml-12
        items-center
        px-4
        py-2
        font-semibold
        leading-6
        text-sm
        shadow-2xl
        rounded-md
        text-sky-500
        bg-gray-850
      "
      id="see-more"
      @click="seeMore"
    >
      See More
      <i
        class="
          fa-solid fa-chevron-right
          pl-3
          inline
          transition-transform
          group-hover:animate-arrow
        "
      ></i>
    </button>
  </div>

  <Renderer
    ref="renderer"
    alpha="true"
    class="top-0 left-0 absolute z-[-1] canvas-blur"
  >
    <Camera ref="camera" :position="{ z: 20 }" />
    <Scene> </Scene>
  </Renderer>
</template>

<script>
import * as THREE from "three";
import ThreeMeshUI from "three-mesh-ui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { BasisTextureLoader } from "three/examples/jsm/loaders/BasisTextureLoader";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const checkElement = async (selector) => {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });
  }
  return document.querySelector(selector);
};

const setAzimuth = function (orbitControls, goalAzimuth) {
  var orig = [orbitControls.minAzimuthAngle, orbitControls.maxAzimuthAngle];

  orbitControls.minAzimuthAngle = goalAzimuth;
  orbitControls.maxAzimuthAngle = goalAzimuth;
  orbitControls.update();

  orbitControls.minAzimuthAngle = orig[0];
  orbitControls.maxAzimuthAngle = orig[1];
  orbitControls.update();
};

const setPolar = function (orbitControls, goalPolar) {
  var orig = [orbitControls.minPolarAngle, orbitControls.maxPolarAngle];

  orbitControls.minPolarAngle = goalPolar;
  orbitControls.maxPolarAngle = goalPolar;
  orbitControls.update();

  orbitControls.minPolarAngle = orig[0];
  orbitControls.maxPolarAngle = orig[1];
  orbitControls.update();
};

const setZoom = function (orbitControls, goalZoom) {
  var orig = [orbitControls.minDistance, orbitControls.maxDistance];

  orbitControls.minDistance = goalZoom;
  orbitControls.maxDistance = goalZoom;
  orbitControls.update();

  orbitControls.minDistance = orig[0];
  orbitControls.maxDistance = orig[1];
  orbitControls.update();
};

const texLoader = new THREE.TextureLoader();

const loader = new GLTFLoader();
const modelLoader = function (url) {
  return new Promise((resolve, reject) => {
    loader.load(url, (data) => resolve(data), null, reject);
  });
};

const mtlloader = new MTLLoader();
const loadMtl = function (url) {
  return new Promise((resolve, reject) => {
    mtlloader.load(url, (data) => resolve(data), null, reject);
  });
};

const objloader = new MTLLoader();
const loadObj = function (url) {
  return new Promise((resolve, reject) => {
    objloader.load(url, (data) => resolve(data), null, reject);
  });
};

const easeInOutCubic = function (x) {
  return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
};

const lerp = function (v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
};

const getRobloxHash = (hash) => {
  for (var i = 31, t = 0; t < 32; t++) i ^= hash[t].charCodeAt(0);
  return `https://t${(i % 8).toString()}.rbxcdn.com/${hash}`;
};

// interactive elements ui
const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();
mouse.x = mouse.y = null;

let selectState = false;

window.addEventListener("pointermove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("pointerdown", () => {
  selectState = true;
});

window.addEventListener("pointerup", () => {
  selectState = false;
});

window.addEventListener("touchstart", (event) => {
  selectState = true;
  mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("touchend", () => {
  selectState = false;
  mouse.x = null;
  mouse.y = null;
});
//

const objsToTest = [];

const raycast = () => {
  return objsToTest.reduce((closestIntersection, obj) => {
    const intersection = raycaster.intersectObject(obj, true);

    if (!intersection[0]) return closestIntersection;

    if (
      !closestIntersection ||
      intersection[0].distance < closestIntersection.distance
    ) {
      intersection[0].object = obj;

      return intersection[0];
    }

    return closestIntersection;
  }, null);
};

var controls;

export default {
  methods: {
    seeMore() {
      let threeElement = this.$refs.renderer.three.renderer.domElement;
      threeElement.classList.remove("canvas-blur");
      threeElement.classList.add("canvas-unblur");
      this.$refs.maindiv
        .animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 500,
          easing: "ease-out",
        })
        .addEventListener("finish", () => {
          this.$refs.maindiv.remove();
        });

      new TWEEN.Tween(controls.target)
        .to({ x: -4 }, 2000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
      new TWEEN.Tween({
        polar: controls.getPolarAngle(),
        azimuth: controls.getAzimuthalAngle(),
        zoom: controls.getDistance(),
      })
        .to({ azimuth: 0, zoom: 3 }, 2000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
          setPolar(controls, obj.polar);
          setAzimuth(controls, obj.azimuth);
          setZoom(controls, obj.zoom);
        })
        .start();
    },
    onResize() {
      this.$refs.renderer.three.setSize(window.innerWidth, window.innerHeight);
    },
    updateButtons(camera) {
      // Find closest intersecting object

      let intersect;

      if (mouse.x !== null && mouse.y !== null) {
        raycaster.setFromCamera(mouse, camera);

        intersect = raycast();
      }

      // Update targeted button state (if any)

      if (intersect && intersect.object.isUI) {
        if (selectState) {
          // Component.setState internally call component.set with the options you defined in component.setupState
          intersect.object.setState("selected");
        } else {
          // Component.setState internally call component.set with the options you defined in component.setupState
          intersect.object.setState("hovered");
        }
      }

      // Update non-targeted buttons state

      objsToTest.forEach((obj) => {
        if ((!intersect || obj !== intersect.object) && obj.isUI) {
          // Component.setState internally call component.set with the options you defined in component.setupState
          obj.setState("idle");
        }
      });
    },
  },
  async mounted() {
    const renderer = this.$refs.renderer;

    const basisLoader = new BasisTextureLoader();
    basisLoader.setTranscoderPath(
      "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r134/examples/js/libs/basis/"
    );
    basisLoader.detectSupport(renderer.three.renderer);

    const loadBasis = function (url) {
      return new Promise((resolve, reject) => {
        basisLoader.load(url, (data) => resolve(data), null, reject);
      });
    };

    controls = new OrbitControls(
      renderer.three.camera,
      renderer.three.renderer.domElement
    );

    renderer.three.setSize(window.innerWidth, window.innerHeight);
    renderer.three.renderer.shadowMap.enabled = true;
    renderer.three.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // TODO: make it work with basis format
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      "anime_background/source/px.png",
      "anime_background/source/nx.png",
      "anime_background/source/py.png",
      "anime_background/source/ny.png",
      "anime_background/source/pz.png",
      "anime_background/source/nz.png",
    ]);
    renderer.three.scene.background = texture;

    controls.enabled = false;
    controls.enableDamping = true;
    controls.autoRotate = false;

    //the camera rotation pivot
    let orbit = new THREE.Object3D();
    orbit.rotation.order = "YXZ"; //this is important to keep level, so Z should be the last axis to rotate in order...
    renderer.three.scene.add(orbit);

    //offset the camera and add it to the pivot
    //you could adapt the code so that you can 'zoom' by changing the z value in camera.position in a mousewheel event..
    let cameraDistance = 1;
    renderer.three.camera.position.z = cameraDistance;
    orbit.add(renderer.three.camera);

    let goalY = orbit.rotation.y;
    let goalX = orbit.rotation.x;

    document.addEventListener("mousemove", function (e) {
      goalY = (e.clientX / window.innerWidth - 0.5) * -0.3;
      goalX = (e.clientY / window.innerHeight - 0.5) * -0.3;
    });

    const mod = await modelLoader("testscene.glb");
    renderer.three.scene.add(mod.scene);

    controls.target.set(-5, 2, 5.3);
    setPolar(controls, 1.47);
    setAzimuth(controls, -0.72);

    // render func
    const placeholder = texLoader.load("grid.png");
    placeholder.wrapS = THREE.RepeatWrapping;
    placeholder.wrapT = THREE.RepeatWrapping;
    placeholder.repeat.set(64, 64);

    const floorGeo = new THREE.PlaneBufferGeometry(250, 250, 8, 8);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      map: placeholder,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotateX(-Math.PI / 2);
    floor.position.y = -0.2;

    renderer.three.scene.add(floor);

    const container = new ThreeMeshUI.Block({
      width: 1.2,
      height: 1.8,
      padding: 0.2,
      borderRadius: 0.1,
      fontFamily: "./Roboto-msdf.json",
      fontTexture: "./Roboto-msdf.png",
    });

    const text = new ThreeMeshUI.Text({
      content: "Some text to be displayed",
    });

    // buttons
    // We start by creating objects containing options that we will use with the two buttons,
    // in order to write less code.

    const buttonOptions = {
      width: 0.4,
      height: 0.15,
      justifyContent: "center",
      offset: 0.05,
      margin: 1.2,
      borderRadius: 0.08,
    };

    // Options for component.setupState().
    // It must contain a 'state' parameter, which you will refer to with component.setState( 'name-of-the-state' ).

    const hoveredStateAttributes = {
      state: "hovered",
      attributes: {
        offset: 0.035,
        backgroundColor: new THREE.Color(0x999999),
        backgroundOpacity: 1,
        fontColor: new THREE.Color(0xffffff),
      },
    };

    const idleStateAttributes = {
      state: "idle",
      attributes: {
        offset: 0.035,
        backgroundColor: new THREE.Color(0x666666),
        backgroundOpacity: 0.3,
        fontColor: new THREE.Color(0xffffff),
      },
    };

    const selectedAttributes = {
      offset: 0.02,
      backgroundColor: new THREE.Color(0x777777),
      fontColor: new THREE.Color(0x222222),
    };

    const buttonNext = new ThreeMeshUI.Block(buttonOptions);
    buttonNext.add(
      new ThreeMeshUI.Text({
        content: "Next",
      })
    );

    buttonNext.setupState({
      state: "selected",
      attributes: selectedAttributes,
      onSet: () => {
        // do something on click
      },
    });
    buttonNext.setupState(hoveredStateAttributes);
    buttonNext.setupState(idleStateAttributes);

    container.add(text);
    container.add(buttonNext);

    objsToTest.push(buttonNext);

    container.position.set(-4, 2, 6);
    renderer.three.scene.add(container);

    // lighting
    const al = new THREE.AmbientLight(0x404040);
    renderer.three.scene.add(al);

    const world = new THREE.Vector3();
    floor.material.map.center.set(0.5, 0.5);

    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
      }
    );
    const composer = new EffectComposer(renderer.three.renderer, renderTarget);

    const renderScene = new RenderPass(
      renderer.three.scene,
      renderer.three.camera
    );

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5,
      1,
      0.85
    );
    bloomPass.exposure = 0.1;
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    renderer.three.renderer.setClearColor(0x111827, 1);

    renderer.renderFn = () => {
      composer.render();
    };

    renderer.onBeforeRender(() => {
      renderer.three.camera.getWorldPosition(world);
      floor.rotation.z = controls.getAzimuthalAngle();
      floor.material.map.rotation = -controls.getAzimuthalAngle();

      orbit.rotation.y = lerp(orbit.rotation.y, goalY, 0.1);
      orbit.rotation.x = lerp(orbit.rotation.x, goalX, 0.1);
      orbit.rotation.z = 0;

      controls.update();
      ThreeMeshUI.update();
      TWEEN.update();

      this.updateButtons(renderer.three.camera);
    });

    // resize monitor
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
