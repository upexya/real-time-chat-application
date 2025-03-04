export default function Modal(props: {
  children?: React.ReactNode;
  is_open: boolean;
  setIsOpen: (is_open: boolean) => void;
  title: string;
  width?: string;
}) {
  const { children, is_open, setIsOpen, title, width } = props;

  if (!is_open) return null;

  return (
    <>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full max-h-full bg-gray-700 bg-opacity-50"
      >
        <div className="relative p-10 w-full h-full flex justify-center items-center">
          {/* <!-- Modal content --> */}
          <div
            className="relative bg-white rounded-lg shadow-sm max-w-2xl"
            style={{
              width: width || "auto",
            }}
          >
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
              <h3 className="font-work-sans text-2xl font-medium text-gray-700 text-center w-full mr-4">
                {title}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="p-4 space-y-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
