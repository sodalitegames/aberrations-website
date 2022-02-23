import classNames from 'utils/functions/classnames';

const MailerLiteForm = ({ classes, type }: { classes?: string; type?: 'primary' | 'secondary' }) => {
  if (process.env.NODE_ENV !== 'production') {
    return <p className="w-full mt-4 text-center text-gray-400">Subscription form hidden while in development mode.</p>;
  }

  if (type === 'secondary') {
    return <div className={classNames('ml-form-embed', classes)} data-account="3705686:d2m1d8e0x9" data-form="5513480:t6r0s5"></div>;
  }
  return <div className={classNames('ml-form-embed', classes)} data-account="3705686:d2m1d8e0x9" data-form="5225651:y8o3z3" />;
};

export default MailerLiteForm;
