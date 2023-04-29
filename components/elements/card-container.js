import classNames from 'utils/functions/classnames';

const CardContainer = ({ heading, imageUrl, noImage, noPadding, noMargin, children }) => {
  return (
    <div className={classNames('bg-white dark:bg-dark-100 shadow border b-gray-100 dark:border-gray-800 sm:rounded-lg', noMargin ? 'mt-0' : 'mt-8')}>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6">{heading}</h3>
      </div>
      {noImage ? (
        <div className={classNames('border-t border-gray-200 dark:border-gray-800 px-4 py-5', noPadding ? 'sm:p-0' : 'sm:px-6')}>{children}</div>
      ) : (
        <div className="flex flex-col-reverse px-4 py-5 border-t border-gray-200 dark:border-gray-800 sm:px-6 sm:flex-row">
          <div className="w-full sm:w-1/2 lg:w-3/4">{children}</div>
          <div
            className="flex items-center justify-center w-full h-48 mb-8 text-gray-500 bg-gray-300 sm:h-auto sm:ml-6 sm:w-1/2 lg:w-1/4 sm:mb-0 dark:bg-gray-800"
            style={{ backgroundImage: `url(${imageUrl || ''})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          >
            IMAGE COMING SOON
          </div>
        </div>
      )}
    </div>
  );
};

export default CardContainer;
