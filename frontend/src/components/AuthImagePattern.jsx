const AuthImagePattern = ({
  title = "Welcome!",
  subtitle = "Sign in to continue",
}) => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${
                i % 2 === 0 ? "bg-blue-500 animate-pulse" : "bg-blue-300"
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
