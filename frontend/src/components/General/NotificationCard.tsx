import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

const NotificationCard = ({ type, message, onClose }: { type: string, message: string, onClose: () => void }) => {
  const icon = type === 'error' ? (
    <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
  ) : (
    <CheckCircleIcon className="w-5 h-5 text-green-500" />
  );

  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
  const borderColor = type === 'error' ? 'border-red-400' : 'border-green-400';

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 border-t ${bgColor} ${borderColor} border-opacity-50`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon}
          <p className="ml-2">{message}</p>
        </div>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
