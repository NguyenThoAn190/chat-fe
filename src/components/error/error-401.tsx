import Link from "next/link";

export default function Unauthorized401() {
  return (
    <div className="animate-fade-in mx-4 flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#e1f7ff] to-[#f3f6ff] py-16 shadow-lg md:mx-auto">
      <div className="mb-6 flex items-center justify-center">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="36" cy="36" r="36" fill="#38BDF8" fillOpacity="0.15" />
          <rect
            x="28"
            y="32"
            width="16"
            height="8"
            rx="4"
            stroke="#0EA5E9"
            strokeWidth="3"
          />
          <rect x="34" y="40" width="4" height="4" rx="2" fill="#0EA5E9" />
        </svg>
      </div>
      <h1 className="mb-2 text-6xl font-extrabold tracking-wider text-sky-600 drop-shadow-lg">
        401
      </h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Chưa xác thực
      </h2>
      <p className="mb-6 max-w-md text-center text-gray-600">
        Bạn cần đăng nhập để truy cập trang này.
        <br />
        Vui lòng đăng nhập hoặc quay về trang chủ.
      </p>
      <Link
        href="/"
        className="mt-2 inline-block rounded bg-sky-500 px-6 py-2 font-medium text-white shadow transition-colors duration-200 hover:bg-sky-600"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
