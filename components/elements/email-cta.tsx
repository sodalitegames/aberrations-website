import MailerLiteForm from 'components/elements/mailer-lite-form';

export default function EmailCTA({ ctaText }: { ctaText: string }) {
  return (
    <div className="py-8 mt-4 border-t border-b sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center dark:border-gray-800">
      <p className="text-xl text-gray-500 dark:text-gray-400">{ctaText}</p>
      <div className="flex -my-6">
        <MailerLiteForm type="secondary" classes="w-full" />
      </div>
    </div>
  );
}
