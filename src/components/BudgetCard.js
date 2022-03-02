import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  onViewExpensesClick,
  hideButtons,
}) {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }
  return (
    <Card>
      <Card.Body className={classNames.join(" ")}>
        {/* justify-content-between will give us space between the values. Using baseline since the numbers and the title will have different fonts */}
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          {/* Want flex display because we have multiple items in the card to align */}
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {/* Separating the second part into a span since we want to change the color */}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {/* Give ProgressBar a variant that takes a function so that we can change color of the bar as the amount increases */}
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-secondary">
              View Expense
            </Button>
          </Stack>
        )}
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
