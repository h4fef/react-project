import type { ActionsType } from "./CardModel";

export type ModalProps = {
  title: string;
  description?: string;
  actions?: ActionsType[];
}
