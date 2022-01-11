import LoadingSpinner from './loading-spinner';

import classNames from '../../utils/functions/classnames';

const SubmitButton = ({ type, text, loadingText, loading, classes, notFull }) => {
  if (loading) {
    return (
      <button
        type="button"
        className={classNames(
          type === 'primary' ? 'btn-primary' : '',
          type === 'secondary' ? 'btn-secondary' : '',
          type === 'tertiary' ? 'btn-tertiary' : '',
          notFull ? 'py-2 px-4' : 'w-full',
          classes
        )}
      >
        <LoadingSpinner />
        {loadingText || 'Processing'}
      </button>
    );
  }

  return (
    <button
      type="submit"
      className={classNames(type === 'primary' ? 'btn-primary' : '', type === 'secondary' ? 'btn-secondary' : '', type === 'tertiary' ? 'btn-tertiary' : '', notFull ? 'py-2 px-4' : 'w-full', classes)}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
