import SubmitButton from '../../elements/submit-button';

export default function FormSection({ heading, description, ariaTag, submitText, submitDescription, submitColor, submitHandler, submitDisabled, processing, children }) {
  return (
    <section aria-labelledby={`${ariaTag}-heading`}>
      <form onSubmit={submitHandler}>
        <div className="border border-white shadow sm:rounded-md sm:overflow-hidden dark:border-gray-800 ">
          <div className="px-4 py-6 bg-white dark:bg-dark-100 sm:p-6">
            <div>
              <h2 id={`${ariaTag}-heading`} className="text-lg font-medium leading-6">
                {heading}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>

            <div className="mt-6">{children}</div>
          </div>

          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-dark-200 sm:px-6">
            <span className="text-sm text-gray-500 font-base dark:text-gray-300">{submitDescription}</span>
            <SubmitButton type={submitColor || 'secondary'} text={submitText} loading={processing} disabled={submitDisabled} loadingText="Saving" notFull />
          </div>
        </div>
      </form>
    </section>
  );
}
