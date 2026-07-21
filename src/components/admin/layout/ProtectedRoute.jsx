export default function ProtectedRoute({ children }) {
  // Implement your authentication logic here
  const isAuthenticated = true; // Replace with real authentication check

  if (!isAuthenticated) {
    return (
      <h1 className="text-3xl font-bold p-8">
        Access Denied
      </h1>
    );
  }

  return children;
}