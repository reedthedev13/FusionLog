const Textarea = ({ label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 font-medium">{label}</label>}
    <textarea
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

export default Textarea;
