import type { ReactNode } from "react";

export type CardProps = {
    title: string;
    description?: string;
}

export type ActionsType = {
    title: string;
    type: 'white' | 'danger' | 'info';
    function: () => void;
}

export type CardComponentProps = {
    card: CardProps;
    actions?: ReactNode;
    children: ReactNode;
}