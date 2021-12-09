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
  const materialRef = useRef<THREE.MeshStandardMaterial | undefined>();
  useMount(() => {
    // FLOOR
    const material = new THREE.MeshStandardMaterial({
      color: `0x00000`,
      side: THREE.DoubleSide,
    });
    const floorGeometry = new THREE.SphereGeometry(size, 64, 64);
    const floor = new THREE.Mesh(floorGeometry, material);
    floor.receiveShadow = true;
    scene.add(floor);

    const floorBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Sphere(size),
      material: DiceManager.floorBodyMaterial,
    });
    world.addBody(floorBody);

    materialRef.current = material;
  });

  useEffect(() => {
    if (planet && materialRef.current) {
      materialRef.current.map = loader.load(`/images/${planet}.jpg`);
    }
  }, [planet]);

  return null;
};
