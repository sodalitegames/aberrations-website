import Link from 'next/link';

import { getIcon } from 'utils/functions/get-icon';

const NavigationCards = ({ data }) => {
  if (data.config === 'LIST') {
    return (
      <>
        {data.cards.map((card, index) => {
          const icon = getIcon(card.iconRef);
          return (
            <Link key={index} href={card.href}>
              <a>
                <div className="mb-8 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow dark:bg-dark-150 hover:bg-gray-50 dark:hover:bg-dark-200">
                  <div className="flex flex-wrap items-center justify-between px-4 py-5 sm:px-6 md:flex-nowrap">
                    <div className="flex justify-between flex-nowrap">
                      <div>
                        <span className="inline-flex p-3 text-gray-100 rounded-lg dark:text-white bg-secondary-fade dark:bg-secondary">
                          <icon.icon className="w-6 h-6" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-xl font-medium leading-6 dark:text-gray-200">{card.name}</h4>
                        <p className="mt-1 text-gray-500 text-md dark:text-gray-300">{card.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </>
    );
  }

  if (data.config === 'GRID') {
    return (
      <div className="relative">
        <div className="px-4 mx-auto text-center sm:px-6 lg:px-8">
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.cards.map((card, index) => {
                const icon = getIcon(card.iconRef);
                return (
                  <div key={index} className="pt-6">
                    <Link href={card.href}>
                      <a>
                        <div className="flow-root px-6 pb-8 rounded-lg bg-gray-50 dark:bg-dark-150">
                          <div className="-mt-6">
                            <div>
                              <span className="inline-flex items-center justify-center p-3 rounded-md shadow-lg bg-secondary">
                                <icon.icon className="w-6 h-6 text-white" aria-hidden="true" />
                              </span>
                            </div>
                            <h3 className="mt-8 text-lg font-medium tracking-tight">{card.name}</h3>
                            <p className="mt-5 text-base text-gray-500 dark:text-gray-300">{card.description}</p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NavigationCards;
