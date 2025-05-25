import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex h-screen w-screen m-auto items-center justify-center">
      <Loader2 className="size-6 animate-spin text-primary" />
    </div>
  );
}
