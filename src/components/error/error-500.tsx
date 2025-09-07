import Link from "next/link";

export default function ServerError500() {
  return (
    <div className="animate-fade-in mx-4 flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#fff1f1] to-[#f3f6ff] py-16 shadow-lg md:mx-auto">
      <div className="mb-6 flex items-center justify-center">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="36" cy="36" r="36" fill="#F87171" fillOpacity="0.15" />
          <path
            d="M36 22V40"
            stroke="#DC2626"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="36" cy="50" r="2.5" fill="#DC2626" />
        </svg>
      </div>
      <h1 className="mb-2 text-6xl font-extrabold tracking-wider text-red-600 drop-shadow-lg">
        500
      </h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Đã xảy ra lỗi máy chủ
      </h2>
      <p className="mb-6 max-w-md text-center text-gray-600">
        Xin lỗi, đã có sự cố xảy ra khi tải dữ liệu sự kiện.
        <br />
        Vui lòng thử lại sau hoặc liên hệ quản trị viên nếu sự cố tiếp tục.
      </p>
      <Link
        href="/"
        className="mt-2 inline-block rounded bg-red-500 px-6 py-2 font-medium text-white shadow transition-colors duration-200 hover:bg-red-600"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
