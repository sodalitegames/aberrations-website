import Link from 'next/link';
import { useState } from 'react';

import { roll } from '@aberrations-rpg/functions';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import classNames from 'utils/functions/classnames';

const dice = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

const RollDice = () => {
  const [die, setDie] = useState(2);
  const [advantage, setAdvantage] = useState(0);
  const [modifier, setModifier] = useState(0);

  const [results, setResults] = useState(null);
  const [count, setCount] = useState(0);

  const rollDice = () => {
    const results = roll(die, +advantage, +modifier);
    console.log(results);
    setResults(results);
    setCount(count + 1);
  };

  return (
    <>
      <div>
        {/* NUMBER OF DICE */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          {/* MOBILE */}
          <div className="flex justify-between flex-1 md:hidden">
            <div className="pr-8">
              <p className="text-sm text-gray-700 dark:text-gray-300">Die to roll</p>
            </div>
            <div className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Choose die to roll">
              <span
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 cursor-pointer rounded-l-md dark:border-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300"
                onClick={() => setDie(die === 2 ? 20 : die - 2)}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-100 border border-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                D{die}
              </span>
              <span
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 cursor-pointer rounded-r-md dark:border-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300"
                onClick={() => setDie(die === 20 ? 2 : die + 2)}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </span>
            </div>
          </div>
          {/* DESKTOP */}
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <div className="pr-8">
              <p className="text-sm text-gray-700 dark:text-gray-300">Die to roll</p>
            </div>
            <div>
              <div className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Choose die to roll">
                {dice.map((dieNum, index) => (
                  <span
                    key={dieNum}
                    aria-current="page"
                    className={classNames(
                      die === dieNum
                        ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                        : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer',
                      index === 0 ? 'rounded-l-md' : index === dice.length - 1 ? 'rounded-r-md' : ''
                    )}
                    onClick={() => setDie(dieNum)}
                  >
                    D{dieNum}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* ADVANTAGE */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800 sm:px-6">
          <div className="flex items-center justify-between flex-1">
            <div className="pr-8">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Advantage (Adds or subtracts 2 to your roll,{' '}
                <Link href="/get-started/player-rules#advantage">
                  <a className="font-normal text-link-accent3">see rules about advantage</a>
                </Link>
                )
              </p>
            </div>
            <div>
              <div className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Select what advantage you have">
                <span
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 cursor-pointer rounded-l-md dark:border-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300"
                  onClick={() => setAdvantage(advantage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-100 border border-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                  {advantage}
                </span>
                <span
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 cursor-pointer rounded-r-md dark:border-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300"
                  onClick={() => setAdvantage(advantage + 1)}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MODIFIER */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800 sm:px-6">
          <div className="flex items-center justify-between flex-1">
            <div className="pr-8">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Modifier (Adds or subtracts from to your roll,{' '}
                <Link href="/get-started/player-rules#modifiers">
                  <a className="font-normal text-link-accent3">see rules about modifiers</a>
                </Link>
                )
              </p>
            </div>
            <div>
              <div className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Select what advantage you have">
                <span
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 cursor-pointer rounded-l-md dark:border-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300"
                  onClick={() => setModifier(modifier - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-100 border border-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                  {modifier}
                </span>
                <span
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 cursor-pointer rounded-r-md dark:border-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300"
                  onClick={() => setModifier(modifier + 1)}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ROLL DICE */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800 sm:px-6">
          <div className="flex items-center justify-between flex-1">
            <div className="mr-8">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Roll a D{die}, with {advantage} advantage
              </p>
            </div>
            <div>
              <div className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Roll the dice">
                <button
                  type="button"
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-100 border border-gray-300 rounded-md dark:border-gray-800 bg-primary hover:bg-primary-light"
                  onClick={rollDice}
                >
                  <span>Roll the die</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {results && (
        <div className="relative p-6 mt-8 bg-gray-100 shadow-md rounded-2xl dark:bg-dark-200 sm:p-8">
          <p className="inline px-2 py-1 text-sm font-medium text-white uppercase bg-gray-900 rounded-md dark:bg-gray-800">Roll #{count}</p>
          <div className="flex flex-col items-center rounded-md shrink-0">
            {results.critical.success ? <p className="px-4 py-1 my-1 text-2xl font-semibold text-white uppercase bg-green-600 rounded-md">Critical Success</p> : null}
            {results.critical.failure ? <p className="px-4 py-1 my-1 text-2xl font-semibold text-white uppercase bg-red-600 rounded-md">Critical Failure</p> : null}
            <p className="px-4 py-1 my-2 text-5xl font-semibold text-white bg-gray-900 rounded-md dark:bg-gray-800">{results.total}</p>
            <p className="text-sm font-medium text-gray-500 uppercase dark:text-gray-300">{results.roll} NATURAL</p>
            <p className="text-sm font-medium text-gray-500 uppercase dark:text-gray-300">{results.modifier} MODIFIER</p>
            {results.critical.success ? <p className="text-sm font-medium text-gray-500 uppercase dark:text-gray-300">{results.bonus} BONUS</p> : null}
            <p className="text-sm font-medium text-gray-500 uppercase dark:text-gray-300">{results.advantage.calculated} ADVANTAGE (ADV * 2)</p>
            <p className="text-sm font-medium text-gray-500 uppercase dark:text-gray-300">{results.total} TOTAL</p>
          </div>
        </div>
      )}
    </>
  );
};

export default RollDice;
