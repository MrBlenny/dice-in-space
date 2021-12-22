import React, { useCallback } from 'react';
import { useEffect, useRef } from 'react';
import { useMount, useRafLoop } from 'react-use';
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

export const Die = ({
  scene,
  diceType,
  setValue,
  controls,
  launched,
  planet,
  gravity,
  focus,
  force,
  angle,
  edit,
}) => {
  const dieRef = useRef();

  const launch = useCallback(() => {
    if (dieRef.current && launched) {
      let yRand = Math.random() * 10;
      let xRand = Math.random() * 10 - 5;
      let zRand = Math.random() * 10 - 5;

      dieRef.current.resetBody(); // As the dieRef.current is going to be reused between throws, it is necessary to reset the body
      dieRef.current.getObject().quaternion.x =
        ((Math.random() * 90 - 45) * Math.PI) / 180;
      dieRef.current.getObject().quaternion.z =
        ((Math.random() * 90 - 45) * Math.PI) / 180;
      dieRef.current.updateBodyFromMesh();
      if (edit) {
        dieRef.current
          .getObject()
          .body.velocity.set(
            force * Math.sin((angle / 180) * Math.PI),
            20 + yRand,
            force * Math.cos((angle / 180) * Math.PI),
          );
      } else {
        dieRef.current.getObject().body.velocity.set(xRand, 20 + yRand, zRand);
      }

      dieRef.current
        .getObject()
        .body.angularVelocity.set(
          20 * Math.random() - 0.5,
          20 * Math.random() - 0.5,
          20 * Math.random() - 0.5,
        );
    }
  }, [launched, dieRef.current]);

  useRafLoop(() => {
    if (dieRef.current && controls) {
      dieRef.current.updateMeshFromBody();
      const value = dieRef.current && dieRef.current.getUpsideValue();
      if (focus) {
        controls.target = dieRef.current.object.position;
      }
      if (launched && focus) {
        setValue(value);
      }
    }
  });

  useEffect(() => {
    launch();
  }, [launched]);

  useEffect(() => {
    if (dieRef.current) {
      console.log(diceType);
      dieRef.current.resetBody();
      scene.remove(dieRef.current.getObject());
    }
    const DieClass = getDie(diceType);
    dieRef.current = new DieClass({ size: 1.5, backColor: '#ff0000' });
    scene.add(dieRef.current.getObject());
    launch();
  }, [diceType]);

  useEffect(() => {
    if (dieRef.current && dieRef.current.object && dieRef.current.object.body) {
      dieRef.current.object.body.preStep = function () {
        if (!dieRef.current.isFinished()) {
          this.force.set(
            -gravity * this.position.x,
            -gravity * this.position.y,
            -gravity * this.position.z,
          );
        } else {
          this.force.set(0, 0, 0);
          this.velocity.set(0, 0, 0);
          this.angularVelocity.set(0, 0, 0);
        }
      };
    }
  }, [gravity, dieRef.current?.object?.body?.id]);

  return null;
};
