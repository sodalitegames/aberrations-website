/* eslint-disable @next/next/no-img-element */
export default function HeroSection({ data }) {
  return (
    <div className="relative">
      {data.image ? (
        <main className="lg:relative">
          <div className="w-full pt-16 pb-20 mx-auto text-center max-w-7xl lg:py-48 lg:text-left">
            <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block">{data.heading}</span>
                <span className="block text-primary">{data.headingHighlight}</span>
              </h1>
              <p className="max-w-md mx-auto mt-3 text-lg text-gray-500 dark:text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">{data.text}</p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href={data.primaryButton.href}
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md bg-primary hover:bg-primary-light md:py-4 md:text-lg md:px-10"
                  >
                    {data.primaryButton.text}
                  </a>
                </div>
                {data.secondaryButton.text && data.secondaryButton.href ? (
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <a
                      href={data.secondaryButton.href}
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md dark:text-gray-100 dark:bg-dark-200 hover:bg-gray-50 dark:hover:bg-dark-300 md:py-4 md:text-lg md:px-10"
                    >
                      {data.secondaryButton.text}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <img className="absolute inset-0 object-cover w-full h-full" src={data.image} alt="" />
          </div>
        </main>
      ) : (
        <div className="relative overflow-hidden">
          <div className="relative pt-6 pb-12 sm:pb-24">
            <main className="px-4 mx-auto mt-6 sm:mt-6">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="block">{data.heading}</span>
                  <span className="block text-primary">{data.headingHighlight}</span>
                </h1>
                <p className="max-w-md mx-auto mt-3 text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">{data.text}</p>
                <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <a
                      href={data.primaryButton.href}
                      className="flex items-center justify-center w-full px-8 py-3 font-medium text-white border border-transparent rounded-md bg-primary hover:bg-primary-light md:py-4 md:text-lg md:px-10"
                    >
                      {data.primaryButton.text}
                    </a>
                  </div>
                  {data.secondaryButton.text && data.secondaryButton.href ? (
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                      <a
                        href={data.secondaryButton.href}
                        className="flex items-center justify-center w-full px-8 py-3 font-medium text-gray-900 bg-white border border-transparent rounded-md dark:text-gray-200 dark:bg-dark-200 hover:bg-gray-50 dark:hover:bg-dark-300 md:py-4 md:text-lg md:px-10"
                      >
                        {data.secondaryButton.text}
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
