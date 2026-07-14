import type { CardComponentProps } from "../../models/CardModel.ts";

const btnClasses: Record<string, string> = {
  info: "bg-primary-600 text-primary-foreground hover:bg-primary-hover",
  danger: "bg-red-600",
  white:
    "bg-layer! border! border-gray-100! text-gray-600 hover:bg-layer-hover!",
};

const Card = ({ card, children, actions }: CardComponentProps) => {
  return (
    <div className="flex flex-col bg-white shadow-2xs rounded-lg">
      <div className="px-4 pt-3 pb-8">
        <div className="flex justify-between items-center">
          <h3 className="card-title text-xl font-medium text-gray-800">
            {card.title}
          </h3>
          {/* azioni */}
          {actions && <div className="flex gap-5">{actions}</div>}

          {/* {card?.actionsTop?.map((action, i) => {
            const btnClss = btnClasses[action.type] ?? "d-btn-info";
            return (
              <Button
                type="button"
                key={`action-top-${i}`}
                onClick={action.function}
                className={`inline-flex items-center rounded-lg! ${btnClss}`}
              >
                {action.title}
              </Button>
            );
          })} */}
        </div>
        {card?.description && (
          <p className="mt-1 mb-4 text-muted-foreground-1">
            {card.description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
