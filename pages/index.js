import BaseLayout from "@/components/BaseLayout/BaseLayout";
import Dashboard from "@/components/Hero/Hero";

export default function Index() {
  return (
    <BaseLayout title={"Home"}>
      <Dashboard />
    </BaseLayout>
  );
}
