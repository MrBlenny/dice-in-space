import Head from 'next/head';
import { Dice } from '@/components/Dice';

import styles from '@/styles/Home.module.css';
import { DiceSelector } from '@/components/DiceSelector';
import { DiceValue } from '@/components/DiceValue';
import { RollButton } from '@/components/RollButton';
import { useState } from 'react';

interface IDice {
  type: string;
  launched: boolean;
}

const gravities = [
  {
    name: `earth`,
    value: -9.81,
  },
  {
    name: `mars`,
    value: -15.81,
  },
  {
    name: `moon`,
    value: -3.81,
  },
];

export default function Home() {
  const [diceType, setDiceType] = useState(`20`);
  const [gravity, setGravity] = useState(gravities[0]);
  const [dice, setDice] = useState<IDice[]>([
    {
      type: diceType,
      launched: false,
    },
  ]);
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <div className={styles.container}>
      <Head>
        <title>Dungeons and Daniels</title>
        <meta name="description" content="Roll some dice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Dice dice={dice} setValue={setValue} gravity={gravity.value} />
        <DiceValue value={value} />
        <DiceSelector diceType={diceType} setDiceType={setDiceType} />
        <RollButton
          onClick={() => {
            if (dice[0].launched) {
              setDice([
                ...dice,
                {
                  type: diceType,
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