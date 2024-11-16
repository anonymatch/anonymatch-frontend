// components/BackButton.jsx
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({ className, ...props }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} className={className} {...props}>
      <ArrowLeft className="h-6 w-6" />
    </button>
  );
};

export default BackButton;
