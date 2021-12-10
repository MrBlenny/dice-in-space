import react, { useRef } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { DiceManager } from './dice';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Die } from './Die';
import { useMount, useRafLoop } from 'react-use';
import { Planet } from './Planet';
import gsap from 'gsap';

// standard global variables
var scene, camera, renderer, controls, world;

const PLANET_SIZE = 1000;

const gravities = {
  jupiter: 24.79,
  mars: 3.721,
  mercury: 3.7,
  moon: 1.62,
  neptune: 11.15,
  saturn: 10.44,
};

export const Dice = ({ dice = [], setValue, planet }) => {
  const rendererEl = useRef();
  const sceneRef = useRef();
  const worldRef = useRef();

  useMount(() => {
    if (!rendererEl.current) {
      return;
    }
    if (typeof window == 'undefined' && typeof document == 'undefined') {
      return;
    }
    const container = rendererEl.current;

    const loader = new THREE.TextureLoader();

    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45,
      ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
      NEAR = 0.01,
      FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 0, 4000);

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableDamping = true;

    // LIGHTING
    // let ambient = new THREE.AmbientLight('#ffffff', 0.3);
    // scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.x = -1000;
    directionalLight.position.y = 800;
    directionalLight.position.z = 1000;
    scene.add(directionalLight);

    let light = new THREE.SpotLight(0xffffff, 0.1);
    light.position.y = 1100;
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add(light);

    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.SphereGeometry(10000, 64, 64);
    var skyBoxMaterial = new THREE.MeshStandardMaterial({
      side: THREE.BackSide,
      map: loader.load('/images/stars.jpg'),
      fog: false,
    });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.fog = new THREE.Fog(0x000000, 50, 200);
    scene.add(skyBox);

    world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    DiceManager.setWorld(world);

    gsap
      .to(camera.position, { y: PLANET_SIZE + 3, z: 10, duration: 2 })
      .delay(1);

    // Refs
    sceneRef.current = scene;
    worldRef.current = world;
  });

  useRafLoop(() => {
    world.step(1.0 / 60.0);
    controls.update();
    renderer.render(scene, camera);
    const distance = camera.position.distanceTo(controls.target);
    scene.fog.near = distance;
    scene.fog.far = distance + 200;
  });

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={rendererEl}>
      {sceneRef.current && worldRef.current && (
        <>
          <Planet
            planet={planet}
            scene={scene}
            world={world}
            size={PLANET_SIZE}
          />
          {dice.map((die, idx) => (
            <Die
              key={idx}
              scene={sceneRef.current}
              diceType={die.type}
              launched={die.launched}
              setValue={setValue}
              controls={controls}
              gravity={gravities[planet]}
              focus={idx === dice.length - 1}
            />
          ))}
        </>
      )}
    </div>
  );
};
