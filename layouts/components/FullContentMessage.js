import Link from 'next/link';

const FullContentMessage = ({ data }) => {
  return (
    <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-16">
        <div className="text-center">
          <p className="text-sm font-semibold text-accent3-dark dark:text-accent3 uppercase tracking-wide">{data.subheading}</p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-gray-300 tracking-tight sm:text-5xl">{data.heading}</h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{data.message}</p>
          <div className="mt-6">
            <Link href={data.linkHref}>
              <a className="text-link-accent3">
                {data.linkText}
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FullContentMessage;
