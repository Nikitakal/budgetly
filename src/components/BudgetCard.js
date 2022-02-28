import { Card, ProgressBar } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function BudgetCard({ name, amount, max }) {
  return (
    <Card>
      <Card.Body>
        {/* justify-content-between will give us space between the values. Using baseline since the numbers and the title will have different fonts */}
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          {/* Want flex display because we have multiple items in the card to align */}
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {/* Separating the second part into a span since we want to change the color */}
            <span className="text-muted fs-6 ms-1">
              / {currencyFormatter.format(max)}
            </span>
          </div>
        </Card.Title>
        {/* Give ProgressBar a variant that takes a function so that we can change color of the bar as the amount increases */}
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}
