import LoadingSpinner from './loading-spinner';

import classNames from 'utils/functions/classnames';

const SubmitButton = ({ type, text, loadingText, loading, classes, disabled, notFull }) => {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className={classNames(
        type === 'primary' ? 'btn-primary' : '',
        type === 'secondary' ? 'btn-secondary' : '',
        type === 'tertiary' ? 'btn-tertiary' : '',
        notFull ? 'py-2 px-4' : 'w-full',
        disabled ? 'bg-gray-300 hover:bg-gray-300 text-gray-100' : '',
        classes
      )}
    >
      {loading && <LoadingSpinner />}
      {loading ? loadingText || 'Processing' : text}
    </button>
  );
};

export default SubmitButton;
