import { CheckIcon } from '@heroicons/react/outline';
import NewlineText from 'components/utility/newline-text';

export default function FeaturesList({ data }) {
  return (
    <div>
      {data.config === 'LIST' ? (
        <div className="px-4 py-8 mx-auto sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-base font-semibold tracking-wide uppercase text-primary-light">{data.subheading}</h2>
            <h2 className="text-3xl font-extrabold">{data.heading}</h2>
            <div className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              <NewlineText text={data.text} />
            </div>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {data.list.map(feature => (
              <div key={feature.name} className="relative">
                <dt>
                  <CheckIcon className="absolute w-6 h-6 text-green-500" aria-hidden="true" />
                  <p className="text-lg font-medium leading-6 ml-9">{feature.name}</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500 ml-9 dark:text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div>
            <h2 className="text-base font-semibold tracking-wide uppercase text-primary-light">{data.subheading}</h2>
            <p className="mt-2 text-3xl font-extrabold">{data.heading}</p>
            <div className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              <NewlineText text={data.text} />
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
              {data.list.map(feature => (
                <div key={feature.name} className="relative">
                  <dt>
                    <CheckIcon className="absolute w-6 h-6 text-green-500" aria-hidden="true" />
                    <p className="text-lg font-medium leading-6 ml-9">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 ml-9 dark:text-gray-400">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
