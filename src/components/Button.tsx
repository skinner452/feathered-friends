type Props = {
  text: string;
  onClick: () => void;
  color: keyof typeof ColorClasses;
  size?: keyof typeof SizeClasses;
  disabled?: boolean;
};

// Define these separately to get intellisense
const GreenClass = "bg-green-500 hover:bg-green-600 active:bg-green-700";
const BlueClass = "bg-blue-500 hover:bg-blue-600 active:bg-blue-700";
const YellowClass = "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700";
const OrangeClass = "bg-orange-500 hover:bg-orange-600 active:bg-orange-700";

const ColorClasses = {
  green: GreenClass,
  blue: BlueClass,
  yellow: YellowClass,
  orange: OrangeClass,
};

const xlClass = "text-xl rounded-xl px-20 py-4";
const mdClass = "text-md rounded-md px-8 py-3";
const smClass = "text-sm rounded-sm px-4 py-2";

const SizeClasses = {
  xl: xlClass,
  md: mdClass,
  sm: smClass
}

export const Button = (props: Props) => {
  return (
    <button
      className={`${ColorClasses[props.color]} ${SizeClasses[props.size || "xl"]} ${
        props.disabled ? "cursor-not-allowed opacity-30" : ""
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
