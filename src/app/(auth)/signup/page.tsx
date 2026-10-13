import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthSplitLayout
      title="Create your organization"
      subtitle="Set up a workspace as the organizer. You can invite leaders and volunteers later."
    >
      <SignupForm />
    </AuthSplitLayout>
  );
}
