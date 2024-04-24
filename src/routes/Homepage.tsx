import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Contact Book</h1>
        <p className="text-gray-700 text-center mb-6">
          Welcome to the Contact Book web app! Here, you can easily create,
          update, and delete contacts, keeping your personal and professional
          connections organized and accessible.
        </p>
        <div className="flex justify-center">
          <Link
            to="/contacts/all-contacts"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
