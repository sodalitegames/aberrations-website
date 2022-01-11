import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

import useDarkMode from '../../hooks/useDarkMode';

import classNames from '../../utils/functions/classnames';

export default function DarkModeToggle() {
  const [theme, setTheme] = useDarkMode();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (theme === 'light') {
      setEnabled(false);
    }
  }, [theme, enabled]);

  const handleToggleChange = () => {
    setEnabled(!enabled);

    if (enabled) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleToggleChange}
      className={classNames(
        enabled ? 'bg-gray-800' : 'bg-gray-200',
        'relative inline-flex flex-shrink-0 h-8 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black focus:ring-accent3-dark dark:focus:ring-blue-200'
      )}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={classNames(
          enabled ? 'translate-x-4' : 'translate-x-0',
          'pointer-events-none relative inline-block h-7 w-7 rounded-full bg-white dark:bg-dark-50 shadow transform ring-0 transition ease-in-out duration-200'
        )}
      >
        <span
          className={classNames(enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity')}
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent3-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </span>
        <span
          className={classNames(enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity')}
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </span>
      </span>
    </Switch>
  );
}
