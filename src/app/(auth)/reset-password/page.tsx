import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { ResetPasswordForm } from "@/components/auth/PasswordResetForms";

export default function ResetPasswordPage() {
  return (
    <AuthSplitLayout title="Choose a new password" subtitle="Pick something you haven't used before.">
      <ResetPasswordForm />
    </AuthSplitLayout>
  );
}
