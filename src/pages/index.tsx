import Head from 'next/head';
import { Dice } from '@/components/Dice';

import styles from '@/styles/Home.module.css';
import { DiceSelector } from '@/components/DiceSelector';
import { DiceValue } from '@/components/DiceValue';
import { RollButton } from '@/components/RollButton';
import { useEffect, useState } from 'react';
import { useLocalStorage, useMount } from 'react-use';
import { Popup } from '@/components/Popup';
import { DiceSimModify } from '@/components/DiceSimModify';

const gravities = {
  mercury: 3.7,
  venus: 8.87,
  earth: 9.81,
  moon: 1.62,
  mars: 3.721,
  jupiter: 24.79,
  saturn: 10.44,
  neptune: 11.15,
  uranus: 8.87,
  templeton: 0.5,
};

interface IDice {
  type: string;
  launched: boolean;
}

export default function Home() {
  const [renderVal, render] = useState(false);
  const [gravity, setGravity] = useState(9.81);
  const [force, setForce] = useState(10);
  const [angle, setAngle] = useState(90);

  const [diceType, setDiceType] = useLocalStorage<string>(`dice`, `20`);
  const [planet, setPlanet] = useLocalStorage<string>(`planet`, `mars`);
  const diceTypeDefaulted = diceType || `20`;
  const planetDefaulted = planet || `mars`;
  const [dice, setDice] = useState<IDice[]>([
    {
      type: diceTypeDefaulted,
      launched: false,
    },
  ]);
  useEffect(() => {
    if (!dice[0].launched) {
      setDice([
        {
          type: diceTypeDefaulted,
          launched: false,
        },
      ]);
    }
  }, [diceTypeDefaulted]);

  useEffect(() => {
    setGravity(gravities[planetDefaulted as keyof typeof gravities]);
  }, [planetDefaulted]);

  useMount(() => {
    // Render defaults
    render(!renderVal);

    console.log(`Code: https://github.com/MrBlenny/dice-in-space`);
    console.log(`Sorry! It isn't the cleanest.`);
  });
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dice In Space</title>
        <meta
          name="description"
          content="Multi-planetary dungeons and dragons dice."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <main className={styles.main}>
        <Dice
          dice={dice}
          setValue={setValue}
          planet={planetDefaulted}
          gravity={gravity}
          force={force}
          angle={angle}
        />
        <DiceValue value={value} diceType={diceTypeDefaulted} />
        <DiceSelector
          diceType={diceTypeDefaulted}
          setDiceType={setDiceType}
          planet={planetDefaulted}
          setPlanet={setPlanet}
        />
        <DiceSimModify
          gravity={gravity}
          setGravity={setGravity}
          force={force}
          setForce={setForce}
          angle={angle}
          setAngle={setAngle}
        />
        <RollButton
          onClick={() => {
            if (dice[0].launched) {
              setDice([
                ...dice,
                {
                  type: diceTypeDefaulted,
                  launched: true,
                },
              ]);
            } else {
              setDice([
                {
                  ...dice[0],
                  launched: true,
                },
              ]);
            }
          }}
        />
        <Popup />
      </main>
    </div>
  );
}
