import Head from 'next/head';
import { Dice } from '@/components/Dice';

import styles from '@/styles/Home.module.css';
import { DiceSelector } from '@/components/DiceSelector';
import { DiceValue } from '@/components/DiceValue';
import { RollButton } from '@/components/RollButton';
import { useEffect, useState } from 'react';
import { useLocalStorage, useMount } from 'react-use';

interface IDice {
  type: string;
  launched: boolean;
}

export default function Home() {
  const [renderVal, render] = useState(false);
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

  useMount(() => {
    // Render defaults
    render(!renderVal);
  });
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <div className={styles.container}>
      <Head>
        <title>Dice In Space</title>
        <meta
          name="description"
          content="Roll some dice on different planets"
        />
        <link rel="icon" href="/favicon.ico" />
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
      </Head>

      <main className={styles.main}>
        <Dice dice={dice} setValue={setValue} planet={planetDefaulted} />
        <DiceValue value={value} diceType={diceTypeDefaulted} />
        <DiceSelector
          diceType={diceTypeDefaulted}
          setDiceType={setDiceType}
          planet={planetDefaulted}
          setPlanet={setPlanet}
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
      </main>
    </div>
  );
}
