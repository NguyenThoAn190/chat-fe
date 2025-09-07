import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-orange-700 to-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="animate-slideIn max-w-lg text-center">
        <h1 className="mb-6 animate-pulse text-8xl font-extrabold tracking-tight text-white sm:text-9xl">
          404
        </h1>
        <p className="mb-4 text-2xl font-semibold text-orange-200 sm:text-3xl">
          Page Not Found
        </p>
        <p className="mx-auto mb-8 max-w-md text-lg text-gray-300">
          It looks like youre lost in space! The page youre looking for doesnt
          exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex transform items-center rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  );
}
