import React from 'react';
import { useEffect } from 'react';
import { useMount } from 'react-use';
import { DiceD6, DiceD8, DiceD10, DiceD12, DiceD20 } from './dice';

const getDie = (type) => {
  if (type === '6') {
    return DiceD6;
  }
  if (type === '8') {
    return DiceD8;
  }
  if (type === '10') {
    return DiceD10;
  }
  if (type === '12') {
    return DiceD12;
  }
  if (type === '20') {
    return DiceD20;
  }
};

let die;

export const Die = ({ scene, diceType, setValue, controls, launched }) => {
  useMount(() => {
    const DieClass = getDie(diceType);
    die = new DieClass({ size: 1.5, backColor: '#ff0000' });
    scene.add(die.getObject());
  });
  if (die && controls) {
    die.updateMeshFromBody();
    controls.target = die.object.position;
  }

  const value = die && die.getUpsideValue();

  useEffect(() => {
    if (launched) {
      setValue(value);
    }
  }, [setValue, value]);

  useEffect(() => {
    if (launched) {
      let yRand = Math.random() * 10;
      let xRand = Math.random() * 10 - 5;
      let zRand = Math.random() * 10 - 5;

      die.resetBody(); // As the die is going to be reused between throws, it is necessary to reset the body
      die.getObject().quaternion.x =
        ((Math.random() * 90 - 45) * Math.PI) / 180;
      die.getObject().quaternion.z =
        ((Math.random() * 90 - 45) * Math.PI) / 180;
      die.updateBodyFromMesh();
      die.getObject().body.velocity.set(xRand, 20 + yRand, zRand);
      die
        .getObject()
        .body.angularVelocity.set(
          20 * Math.random() - 10,
          20 * Math.random() - 10,
          20 * Math.random() - 10,
        );
    }
  }, [launched]);

  return null;
};
