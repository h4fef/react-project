import type { ButtonCustomProps } from "@/props/ButtonProps";
import { Button } from "../tailgrids/core/button";

export const ButtonPrimary = ({
  action,
  doAction,
  type,
  ...props
}: ButtonCustomProps) => {
  return (
    <Button
      type={type || "button"}
      onClick={doAction}
      className="inline-flex items-center rounded-lg! bg-primary-600 text-primary-foreground hover:bg-primary-hover"
      {...props}
    >
      {action}
    </Button>
  );
};
