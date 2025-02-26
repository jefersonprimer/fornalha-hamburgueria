import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin border-t-4 border-red-600 border-solid rounded-full w-16 h-16 mx-auto mb-4"></div>
        <p className="text-xl text-gray-700">Estamos preparando algo delicioso para você...</p>
      </div>
    </div>
  );
};

export default Loading;
