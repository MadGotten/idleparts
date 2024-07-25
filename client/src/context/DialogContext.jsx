import { useState, useEffect, createContext, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

export const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(() => {});

  const openDialog = (message, confirmAction) => {
    setMessage(message);
    setOnConfirm(() => confirmAction);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const contextValue = useMemo(() => ({ openDialog }), [openDialog]);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      setIsOpen(false);
      setMessage('');
    };
  }, []);

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {isOpen &&
        createPortal(
          <dialog
            ref={dialogRef}
            onCancel={handleCancel}
            className="absolute left-0 top-0 bottom-0 max-w-96 bg-slate-50 shadow-lg drop-shadow-lg rounded-lg p-4 gap-2 flex flex-col items-center justify-between"
          >
            <div className="w-full flex justify-end text-lg">
              <button className="hover:text-gray-500" onClick={handleCancel}>
                &#10006;
              </button>
            </div>
            <p className="mb-4 text-center">{message}</p>
            <div className="flex gap-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
                onClick={() => handleConfirm()}
              >
                Confirm
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </dialog>,
          document.body
        )}
    </DialogContext.Provider>
  );
};

export default DialogContext;
