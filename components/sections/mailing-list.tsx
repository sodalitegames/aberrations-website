import MailerLiteForm from 'components/elements/mailer-lite-form';

interface MailingListProps {
  data: {
    heading: string;
    text: string;
  };
}

const MailingList: React.VFC<MailingListProps> = ({ data }) => {
  return (
    <div className="relative sm:py-16">
      <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative px-6 py-10 overflow-hidden shadow-xl rounded-2xl bg-primary dark:bg-primary-dark sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
              <path className="text-primary-fade text-opacity-40 dark:text-opacity-10" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
              <path className="text-primary-light text-opacity-40 dark:text-opacity-10" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
            </svg>
          </div>
          <div className="relative">
            <div className="sm:text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white dark:text-gray-200 sm:text-4xl">{data.heading}</h2>
              <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-300">{data.text}</p>
            </div>
            <div className="mt-8 sm:mx-auto sm:max-w-2xl sm:flex">
              <MailerLiteForm type="primary" classes="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailingList;
