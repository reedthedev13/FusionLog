import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Select from "../components/Select";
import Button from "../components/Button";
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

export default function AddTrade() {
  const [trade, setTrade] = useState({
    ticker: "",
    entry: "",
    exit: "",
    setup: "",
    notes: "",
  });

  const handleChange = (e) => {
    setTrade({ ...trade, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(trade);
    // TODO: backend submission
  };

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          ➕ Log a New Trade
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Ticker Symbol" name="ticker" onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Entry Price"
              name="entry"
              type="number"
              onChange={handleChange}
            />
            <Input
              label="Exit Price"
              name="exit"
              type="number"
              onChange={handleChange}
            />
          </div>
          <Select
            label="Trade Setup"
            name="setup"
            onChange={handleChange}
            options={[
              { label: "Select Setup", value: "" },
              { label: "HTF Breakout", value: "htf" },
              { label: "Parabolic Short", value: "parabolic" },
              { label: "EP", value: "ep" },
            ]}
          />
          <Textarea
            label="Trade Notes"
            name="notes"
            rows="4"
            onChange={handleChange}
          />
          <Button type="submit" className="w-full">
            Save Trade
          </Button>
        </form>
      </div>
    </PageWrapper>
  );
}
