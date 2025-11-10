import { Suspense } from "react";
import MainMembership from "./mainmembership";

export default function Page() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <MainMembership />
    </Suspense>
  );
}
