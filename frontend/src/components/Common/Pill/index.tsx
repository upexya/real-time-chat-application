import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function Pill(props: { text: string; onRemove: () => void }) {
  const { text, onRemove } = props;

  return (
    <div className="bg-blue-600 text-gray-100 font-medium px-2 py-1 rounded-full w-fit">
      {text}
      <FontAwesomeIcon
        icon={faClose}
        className="ml-2 cursor-pointer"
        onClick={onRemove}
      />
    </div>
  );
}
