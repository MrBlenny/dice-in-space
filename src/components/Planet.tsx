import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { useMount } from 'react-use';
import { DiceManager } from './dice';

interface IPlanetProps {
  planet: string;
  scene: THREE.Scene;
  world: CANNON.World;
  size: number;
}

const loader = new THREE.TextureLoader();

export const Planet = ({ planet, scene, world, size }: IPlanetProps) => {
  const materialRef = useRef<THREE.MeshLambertMaterial | undefined>();
  useMount(() => {
    // FLOOR
    const material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
    });
    const planetGeometry = new THREE.SphereGeometry(size, 128, 128);
    const planet = new THREE.Mesh(planetGeometry, material);
    planet.receiveShadow = true;
    planet.rotation.x = -Math.PI / 5;
    scene.add(planet);

    const planetBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Sphere(size),
      material: DiceManager.floorBodyMaterial,
    });

    world.addBody(planetBody);

    materialRef.current = material;
  });

  useEffect(() => {
    if (planet && materialRef.current) {
      materialRef.current.map = loader.load(`/images/${planet}.jpg`);
    }
  }, [planet]);

  return null;
};
