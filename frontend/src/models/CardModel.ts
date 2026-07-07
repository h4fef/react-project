export type CardProps = {
    title: string;
    description?: string;
    actionsTop?: ActionsType[];
    // actionsBottom?: ActionsType[];
}

export type ActionsType = {
    title: string;
    type: 'white' | 'danger' | 'info';
    function: () => void;
}