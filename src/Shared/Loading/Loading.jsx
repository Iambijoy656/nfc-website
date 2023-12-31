import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <MoonLoader size={60} color="#a6adbb" />
    </div>
  );
};

export default Loading;
