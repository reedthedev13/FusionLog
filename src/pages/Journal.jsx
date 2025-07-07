import { useState } from "react";
import Textarea from "../components/Textarea";
import Button from "../components/Button";

export default function Journal() {
  const [entry, setEntry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Journal Entry:", entry);
    // TODO: Send to backend
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Trading Journal</h2>
      <form onSubmit={handleSubmit}>
        <Textarea
          label="What did you learn this week?"
          rows="6"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Save Entry
        </Button>
      </form>
    </div>
  );
}
