import { Spinner } from "../ui/spinner";

export const NoChatsSelected = () => {
  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <p className="text-gray-500 text-xl font-medium">Select a chat to start message.</p>
    </div>
  );
};

export const LoadingState = () => {
  return (
    <div className="flex items-center mt-10 justify-center bg-black h-screen">
      <Spinner className="text-gray-300 h-12 w-12" />
    </div>
  );
};

export const ErrorState = ({ dataError }: { dataError?: string }) => {
  return (
    <div className="flex h-full items-start mt-6 justify-center">
      <div className="bg-dark-40 p-3 w-full m-4 rounded-md">
        <p className="font-medium text-gray-400 text-center">
          {dataError ?? "Failed to fetch users"}
        </p>
      </div>
    </div>
  );
};

export const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex h-full items-center justify-center text-gray-400 text-sm">
      {message}
    </div>
  );
};
