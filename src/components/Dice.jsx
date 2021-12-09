import react, { useRef } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { DiceManager } from './dice';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Die } from './Die';
import { useMount, useRaf } from 'react-use';
import { Planet } from './Planet';

// standard global variables
var scene, camera, renderer, controls, world;

const PLANET_SIZE = 1000;

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
    camera.position.set(0, PLANET_SIZE + 5, 10);

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;

    // LIGHTING
    let ambient = new THREE.AmbientLight('#ffffff', 0.3);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight('#ffffff', 0.5);
    directionalLight.position.x = -1000;
    directionalLight.position.y = 1000;
    directionalLight.position.z = 1000;
    scene.add(directionalLight);

    let light = new THREE.SpotLight(0xefdfd5, 0.1);
    light.position.y = 1200;
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
    });

    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    // scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);
    scene.add(skyBox);

    world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    DiceManager.setWorld(world);

    // Refs
    sceneRef.current = scene;
    worldRef.current = world;
  });

  useRaf(() => {});

  if (renderer && scene && world) {
    world.step(1.0 / 60.0);
    controls.update();
    renderer.render(scene, camera);
  }

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
            />
          ))}
        </>
      )}
    </div>
  );
};
