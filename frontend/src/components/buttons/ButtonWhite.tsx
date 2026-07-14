import type { ButtonCustomProps } from "@/props/ButtonProps";
import { Button } from "../tailgrids/core/button";

export const ButtonWhite = ({
  action,
  doAction,
  type,
  ...props
}: ButtonCustomProps) => {
  return (
    <Button
      type={type || "button"}
      onClick={doAction}
      className="inline-flex items-center rounded-lg! bg-gray-50 text-gray-400 hover:bg-primary-hover"
      {...props}
    >
      {action}
    </Button>
  );
};
