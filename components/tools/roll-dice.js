import Link from 'next/link';
import { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import Die from './pieces/die';

import classNames from '../../utils/functions/classnames';

const rollOne = () => {
  const roll = Math.floor(Math.random() * 6) + 1;
  return roll;
};

const RollDice = () => {
  const [dice, setDice] = useState(3);
  const [advantage, setAdvantage] = useState(0);
  const [calculate, setCalculate] = useState(true);
  const [rolls, setRolls] = useState([]);
  const [advantageRolls, setAdvantageRolls] = useState([]);

  const [rollData, setRollData] = useState(null);

  const rollDice = () => {
    let newRolls = [];

    // create the array of rolls
    for (let i = 0; i < dice + Math.abs(advantage); i++) {
      newRolls.push(rollOne(dice));
    }

    if (!calculate) {
      setRolls(newRolls);
      return;
    }

    if (advantage > 0) {
      let newAdvantageRolls = [];

      for (let i = 0; i < advantage; i++) {
        // find the min value
        const min = Math.min(...newRolls);

        // find index of min value
        const index = newRolls.indexOf(min);

        // remove the first instance of the min value from the array
        newRolls.splice(index, 1);

        // add that min value to the advantage rolls array
        newAdvantageRolls.push(min);
      }

      setAdvantageRolls(newAdvantageRolls);
    }

    if (advantage < 0) {
      let newAdvantageRolls = [];

      for (let i = 0; i > advantage; i--) {
        // find the max value
        const max = Math.max(...newRolls);

        // find index of max value
        const index = newRolls.indexOf(max);

        // remove the first instance of the max value from the array
        newRolls.splice(index, 1);

        // add that max value to the advantage rolls array
        newAdvantageRolls.push(max);
      }

      setAdvantageRolls(newAdvantageRolls);
    }

    let successes = 0;
    let sixes = 0;
    let ones = 0;
    let exhaustion = 0;
    let experience = 0;
    let crit = false;

    // set successes, sixes, and ones by looping through the rolls array
    newRolls.forEach(roll => {
      if (roll > 3) {
        successes++;

        if (roll === 6) {
          sixes++;
        }
      } else if (roll === 1) {
        ones++;
      }
    });

    // set experience, crit, and exhaustion based on the rolls
    if (sixes > dice / 2) {
      successes = dice;
      experience++;
      crit = true;
    }

    if (ones > dice / 2) {
      successes = 0;
      exhaustion++;
    }

    if (successes > dice / 2) {
      experience++;
    }

    // save the new data in state
    setRolls(newRolls);
    setRollData({
      successes,
      exhaustion,
      experience,
      crit,
    });
  };

  return (
    <>
      <div>
        {/* NUMBER OF DICE */}
        <div className="px-4 py-3 flex items-center justify-between sm:px-6">
          {/* MOBILE */}
          <div className="flex-1 flex justify-between md:hidden">
            <div className="pr-8">
              <p className="text-sm text-gray-700 dark:text-gray-300">Number of dice to roll</p>
            </div>
            <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Choose number of dice to roll">
              <span
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300 cursor-pointer"
                onClick={() => setDice(dice - 1)}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300 inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                {dice}
              </span>
              <span
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300 cursor-pointer"
                onClick={() => setDice(dice + 1)}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
          </div>
          {/* DESKTOP */}
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <div className="pr-8">
              <p className="text-sm text-gray-700 dark:text-gray-300">Number of dice to roll</p>
            </div>
            <div>
              <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Choose number of dice to roll">
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 1
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-l-md cursor-pointer'
                  )}
                  onClick={() => setDice(1)}
                >
                  1
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 2
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(2)}
                >
                  2
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 3
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    ' relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(3)}
                >
                  3
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 4
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    ' relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(4)}
                >
                  4
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 5
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(5)}
                >
                  5
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 6
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(6)}
                >
                  6
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 7
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(7)}
                >
                  7
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 8
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(8)}
                >
                  8
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 9
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(9)}
                >
                  9
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 10
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(10)}
                >
                  10
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 11
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(11)}
                >
                  11
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 12
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(12)}
                >
                  12
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 13
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(13)}
                >
                  13
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 14
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(14)}
                >
                  14
                </span>
                <span
                  aria-current="page"
                  className={classNames(
                    dice === 15
                      ? 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300'
                      : 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300',
                    'relative inline-flex items-center px-4 py-2 border rounded-r-md text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => setDice(15)}
                >
                  15
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* ADVANTAGE */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 sm:px-6">
          <div className="flex-1 flex items-center justify-between">
            <div className="pr-8">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Advantage (Adds dice to your roll,{' '}
                <Link href="/get-started/player-rules#advantage">
                  <a className="text-link-accent3 font-normal">see rules about advantage</a>
                </Link>
                )
              </p>
            </div>
            <div>
              <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Select what advantage you have">
                <span
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300 cursor-pointer"
                  onClick={() => {
                    if (advantage === 1) {
                      setAdvantage(advantage - 1);
                      setAdvantageRolls([]);
                    } else {
                      setAdvantage(advantage - 1);
                    }
                  }}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300 inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                  {advantage}
                </span>
                <span
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300 cursor-pointer"
                  onClick={() => {
                    if (advantage === -1) {
                      setAdvantage(advantage + 1);
                      setAdvantageRolls([]);
                    } else {
                      setAdvantage(advantage + 1);
                    }
                  }}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* CALCULATE RESULTS */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 sm:px-6">
          <div className="flex-1 flex items-center justify-between">
            <div className="mr-8">
              <p className="text-sm text-gray-700 dark:text-gray-300">Calculate the results for me (changing this option will clear any current results)</p>
            </div>
            <div>
              <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Choose whether to automatically calculate results">
                <span
                  className={classNames(
                    'relative inline-flex items-center px-2 py-2',
                    calculate
                      ? 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300'
                      : 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300',
                    'rounded-l-md border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => {
                    setCalculate(false);
                    setRollData(null);
                    setRolls([]);
                  }}
                >
                  <span>No thanks</span>
                </span>
                <span
                  className={classNames(
                    'relative inline-flex items-center px-2 py-2',
                    !calculate
                      ? 'border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400 dark:hover:text-gray-300'
                      : 'z-10 bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-700 dark:text-gray-300',
                    'rounded-r-md border text-sm font-medium cursor-pointer'
                  )}
                  onClick={() => {
                    setCalculate(true);
                    setRollData(null);
                    setRolls([]);
                  }}
                >
                  <span>Yes please</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* ROLL DICE */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 sm:px-6">
          <div className="flex-1 flex items-center justify-between">
            <div className="mr-8">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Roll {dice > 1 ? `${dice} dice` : `${dice} die`}, with {advantage} advantage
              </p>
            </div>
            <div>
              <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Roll the dice">
                <button
                  type="button"
                  className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 dark:border-gray-800 bg-primary text-sm font-medium text-gray-100 hover:bg-primary-light"
                  onClick={rollDice}
                >
                  <span>Roll the dice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {rollData && calculate ? (
        <div className="relative rounded-2xl px-6 py-6 bg-gray-100 dark:bg-dark-200 shadow-xl sm:px-12 sm:py-12 mt-8">
          <div className="flex flex-col md:flex-row justify-between">
            {/* DISPLAY ROLL DATA */}
            <div>
              {rollData.crit ? (
                <>
                  <h2 className="text-xl font-bold">
                    Critical Success! ({rolls.length} {rolls.length === 1 ? 'success' : 'successes'})
                  </h2>
                  <div className="text-8xl text-green-600 flex flex-wrap">
                    {rolls.map((roll, index) => {
                      return <Die key={index} roll={roll} />;
                    })}
                  </div>
                </>
              ) : rollData.exhaustion ? (
                <>
                  <h2 className="text-xl font-bold">Critical Failure! (0 successes)</h2>
                  <div className="text-8xl text-red-500 flex flex-wrap">
                    {rolls.map((roll, index) => {
                      return <Die key={index} roll={roll} />;
                    })}
                  </div>
                </>
              ) : (
                <>
                  {rollData.successes ? (
                    <>
                      <h2 className="text-xl font-bold">Successes ({rollData.successes})</h2>
                      <div className="text-8xl text-green-600 flex flex-wrap">
                        {rolls.map((roll, index) => {
                          return roll > 3 ? <Die key={index} roll={roll} /> : null;
                        })}
                      </div>
                    </>
                  ) : null}
                  {rolls.length - rollData.successes > 0 ? (
                    <>
                      {' '}
                      <h2 className="text-xl font-bold">Fails ({rolls.length - rollData.successes})</h2>
                      <div className="text-8xl text-red-500 flex flex-wrap">
                        {rolls.map((roll, index) => {
                          return roll < 4 ? <Die key={index} roll={roll} /> : null;
                        })}
                      </div>
                    </>
                  ) : null}
                </>
              )}
              {advantage && advantageRolls.length ? (
                <>
                  <h2 className="text-xl font-bold">Advantage ({`${advantageRolls.length} ${advantage > 0 ? 'lowest' : 'highest'} ${advantageRolls.length === 1 ? 'die' : 'dice'}`} removed)</h2>
                  <div className="text-8xl text-gray-400 flex flex-wrap">
                    {advantageRolls.map((roll, index) => {
                      return <Die key={index} roll={roll} />;
                    })}
                  </div>
                </>
              ) : null}
            </div>
            {/* DISPLAY MESSAGES */}
            <div className="md:px-8 pt-8 md:pt-0 border-t md:border-t-0 md:border-l md:ml-4 border-gray-900 dark:border-gray-800 md:max-w-xs">
              <h2 className="text-xl font-bold mb-2">Messages:</h2>
              {rollData.successes ? (
                <p className="text-blue-500 dark:text-blue-300 mb-2">
                  You got {rollData.successes} {rollData.successes === 1 ? 'success' : 'successes'}. {rollData.successes === rolls.length ? 'Not even a single failure!' : ''}
                </p>
              ) : null}
              {rollData.crit ? <p className="text-green-600 dark:text-green-400 mb-2">Congrats on your critical success! You have gained {rollData.experience} experience points!</p> : null}
              {!rollData.crit && rollData.experience ? <p className="text-green-600 dark:text-green-400 mb-2">You have gained {rollData.experience} experience point!</p> : null}
              {rollData.exhaustion ? (
                <p className="text-red-600 dark:text-red-400 mb-2">Oops, sorry about that, you have gained {rollData.exhaustion} condition (injured or disturbed) due to your critical failure.</p>
              ) : null}

              {!rollData.successes && !rollData.exhaustion ? <p className="text-blue-500 dark:text-blue-300 mb-2">Wow, not even a single success. Better luck next time I guess.</p> : null}
            </div>
          </div>
        </div>
      ) : rolls.length && !calculate ? (
        <div className="relative rounded-2xl px-6 py-6 bg-gray-100 dark:bg-gray-800 shadow-xl sm:px-12 sm:py-12 mt-8">
          <div className="text-8xl flex flex-wrap">
            {rolls.map((roll, index) => {
              return <Die key={index} roll={roll} />;
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RollDice;
