import classNames from 'utils/functions/classnames';

const Heading = ({ data }) => {
  return (
    <div className={classNames('text-base max-w-prose lg:max-w-none', data.centered ? 'text-center' : '')}>
      <h2 className="font-semibold leading-6 tracking-wide uppercase text-primary-light">{data.subheading}</h2>
      <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl">{data.heading}</p>
      {data.text ? <p className="mx-auto mt-5 text-xl text-gray-500 max-w-prose dark:text-gray-400">{data.text}</p> : null}
    </div>
  );
};

export default Heading;
