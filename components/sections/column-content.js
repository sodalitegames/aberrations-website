import RichText from './rich-text';

export default function ColumnContent({ data }) {
  return (
    <div className="mb-12 md:mb-0 py-2 px-2 overflow-hidden">
      <div className="max-w-max mx-auto">
        <div className="relative z-10 mb-8 md:mb-2 md:px-6">
          <div className="text-base max-w-prose lg:max-w-none">
            <h2 className="leading-6 text-primary-light font-semibold tracking-wide uppercase">{data.subheading}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">{data.heading}</p>
          </div>
        </div>
        <div className="md:p-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-6">
            <div>
              <RichText data={{ content: data.contentLeft }} />
            </div>
            <div className="mt-6 lg:mt-0">
              <RichText data={{ content: data.contentRight }} />
            </div>
          </div>
          {data.buttonText && data.buttonHref ? (
            <div className="mt-8 inline-flex rounded-md shadow">
              <a href={data.buttonHref} className="btn-secondary">
                {data.buttonText}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
