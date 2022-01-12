import SubmitButton from '../../elements/submit-button';

export default function FormSection({ heading, description, ariaTag, submitText, submitDescription, submitColor, submitHandler, processing, children }) {
  return (
    <section aria-labelledby={`${ariaTag}-heading`}>
      <form onSubmit={submitHandler}>
        <div className="shadow sm:rounded-md sm:overflow-hidden border border-white dark:border-gray-800 ">
          <div className="bg-white dark:bg-dark-100 py-6 px-4 sm:p-6">
            <div>
              <h2 id={`${ariaTag}-heading`} className="text-lg leading-6 font-medium">
                {heading}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>

            <div className="mt-6">{children}</div>
          </div>

          <div className="px-4 py-3 bg-gray-50 dark:bg-dark-200 sm:px-6 flex justify-between items-center">
            <span className="text-sm font-base text-gray-500 dark:text-gray-300">{submitDescription}</span>
            <SubmitButton type={submitColor || 'secondary'} text={submitText} loading={processing} loadingText="Saving" notFull />
          </div>
        </div>
      </form>
    </section>
  );
}
