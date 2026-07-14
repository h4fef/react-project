export type ButtonCustomProps = {
  action: string;
  type: "button" | "submit" | "reset";
  doAction?: () => void;
};