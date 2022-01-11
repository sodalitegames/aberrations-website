export default function Section({ feature, heading, description, ariaTag, children }) {
  if (feature) {
    return (
      <section aria-labelledby={`${ariaTag}-heading`}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white dark:bg-dark-100 border border-white dark:border-gray-800 py-6 px-4 sm:p-6">
            <div className="py-6 lg:py-12 lg:flex lg:items-center lg:justify-between">
              <h2 id={`${ariaTag}-heading`} className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                <span className="block">{heading}</span>
                <span className="block text-primary-light">{description}</span>
              </h2>
              {children}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby={`${ariaTag}-heading`}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white dark:bg-dark-100 border border-white dark:border-gray-800 py-6 px-4 sm:p-6">
          <div>
            <h2 id={`${ariaTag}-heading`} className="text-lg leading-6 font-medium">
              {heading}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <div className="mt-6 space-y-6 sm:px-6 lg:px-0 lg:col-span-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
