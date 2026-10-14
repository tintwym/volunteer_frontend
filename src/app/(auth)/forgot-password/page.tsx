import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { ForgotPasswordForm } from "@/components/auth/PasswordResetForms";

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link to choose a new password."
    >
      <ForgotPasswordForm />
    </AuthSplitLayout>
  );
}
