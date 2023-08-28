import GuestGuard from 'auth/guards/guest';

import PageLayout from 'layouts/PageLayout';

import ResetPasswordForm from 'components/auth/ResetPasswordForm';

export default function ResetPassword() {
  return (
    <GuestGuard>
      <PageLayout title="Reset password" seo={{ title: 'Reset password' }} full>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-center">Reset password</h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">Enter your new password and password confirmation below.</p>
        </div>

        {/* Reset password form */}
        <ResetPasswordForm />
        {/* End reset password form */}
      </PageLayout>
    </GuestGuard>
  );
}
