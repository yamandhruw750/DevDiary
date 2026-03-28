export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500/10 to-purple-500/10 ">
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-100 h-100 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {children}
    </div>
  );
}
