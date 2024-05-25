import { useState, useContext, createContext } from "react";

const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [callback, setCallback] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const openDialog = (title, content, callback) => {
    setTitle(title);
    setContent(content);
    setCallback(() => callback);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setContent(null);
    setCallback(null);
    setData(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (callback) {
      const result = await callback(data);
      if (result === "error") {
        setError(true);
        return;
      }
    }
    closeDialog();
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, setDialogData: setData }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg p-6 z-10">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mt-2">{content}</div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                className={`${
                  error
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                } text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                Submit
              </button>
              <button
                onClick={closeDialog}
                className="ml-3 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}
