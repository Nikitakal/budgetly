import { Button, Container, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";

function App() {
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        {/* me-auto makes it so that Budgets is always on the left side of our screen */}
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary">Add Budget</Button>
        <Button variant="outline-primary">Add Expense</Button>
      </Stack>
      {/* Using CSS Grids */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          // Using flex-start, because not all of our cards will have the same size
          alignItems: "flex-start",
        }}
      >
        {/* Added some placeholder values to visualize the code */}
        <BudgetCard name="Entertainment" amount={200} max={1000}></BudgetCard>
      </div>
    </Container>
  );
}

export default App;
