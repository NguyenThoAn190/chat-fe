import Link from "next/link";

export default function Forbidden403() {
  return (
    <div className="animate-fade-in mx-4 flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#fffbe1] to-[#f3f6ff] py-16 shadow-lg md:mx-auto">
      <div className="mb-6 flex items-center justify-center">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="36" cy="36" r="36" fill="#FBBF24" fillOpacity="0.15" />
          <rect
            x="28"
            y="28"
            width="16"
            height="16"
            rx="8"
            stroke="#D97706"
            strokeWidth="3"
          />
          <rect x="34" y="36" width="4" height="8" rx="2" fill="#D97706" />
        </svg>
      </div>
      <h1 className="mb-2 text-6xl font-extrabold tracking-wider text-yellow-600 drop-shadow-lg">
        403
      </h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Truy cập bị từ chối
      </h2>
      <p className="mb-6 max-w-md text-center text-gray-600">
        Bạn không có quyền truy cập vào trang này.
        <br />
        Vui lòng liên hệ quản trị viên nếu bạn nghĩ đây là nhầm lẫn.
      </p>
      <Link
        href="/"
        className="mt-2 inline-block rounded bg-yellow-500 px-6 py-2 font-medium text-white shadow transition-colors duration-200 hover:bg-yellow-600"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
