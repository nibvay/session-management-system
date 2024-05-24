function Dropdown({ title, value, onChange, options }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <select
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map(({ key, display, value }) => (
          <option key={key} value={value}>
            {display}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
