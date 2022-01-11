import classNames from '../../utils/functions/classnames';

const Heading = ({ data }) => {
  return (
    <div className={classNames('text-base max-w-prose lg:max-w-none', data.centered ? 'text-center' : '')}>
      <h2 className="leading-6 text-primary-light font-semibold tracking-wide uppercase">{data.subheading}</h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">{data.heading}</p>
      {data.text ? <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500 dark:text-gray-400">{data.text}</p> : null}
    </div>
  );
};

export default Heading;
