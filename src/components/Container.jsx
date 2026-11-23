export function Container({ children, className = '' }) {
  return (
    <div
      className={`mx-auto w-full max-w-5xl min-w-0 px-4 sm:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
