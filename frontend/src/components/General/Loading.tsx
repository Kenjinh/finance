import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-primary opacity-75"></span>
      <ArrowPathIcon className="text-primary w-12 h-12 animate-spin absolute"></ArrowPathIcon>
    </div>
  )
}