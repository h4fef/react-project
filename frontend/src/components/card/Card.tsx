import type { CardProps } from "../../models/CardModel.ts";
import type { ReactNode } from "react";

const btnClasses: Record<string, string> = {
  info: "btn-info",
  danger: "btn-error",
  white: "btn-outline btn-secondary",
};

const Card = ({ card, children }: { card: CardProps; children: ReactNode }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex justify-between">
          <h5 className="card-title text-xl font-medium text-gray-800">
            {card.title}
          </h5>
          <div className="flex gap-5">
            {card?.actionsTop?.map((action, i) => {
              const btnClss = btnClasses[action.type] ?? "d-btn-info";
              return (
                <button
                  type="button"
                      key={`action-top-${i}`}
                      onClick={action.function}
                  className={`d-btn d-${btnClss}`}
                >
                  {action.title}
                </button>
              );
            })}
          </div>
        </div>
        {card.description && <p className="mb-4">{card.description}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;
