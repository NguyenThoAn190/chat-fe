import Link from "next/link";

export default function NotFound404() {
  return (
    <div className="animate-fade-in mx-4 flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#f1f5ff] to-[#f3f6ff] py-16 shadow-lg md:mx-auto">
      <div className="mb-6 flex items-center justify-center">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="36" cy="36" r="36" fill="#60A5FA" fillOpacity="0.15" />
          <path
            d="M28 32C28 28.6863 30.6863 26 34 26C37.3137 26 40 28.6863 40 32C40 35.3137 37.3137 38 34 38C30.6863 38 28 35.3137 28 32Z"
            stroke="#2563EB"
            strokeWidth="3"
          />
          <rect x="33" y="44" width="2" height="6" rx="1" fill="#2563EB" />
        </svg>
      </div>
      <h1 className="mb-2 text-6xl font-extrabold tracking-wider text-blue-600 drop-shadow-lg">
        404
      </h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Không tìm thấy trang
      </h2>
      <p className="mb-6 max-w-md text-center text-gray-600">
        Trang bạn tìm kiếm không tồn tại hoặc đã bị xoá.
        <br />
        Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
      </p>
      <Link
        href="/"
        className="mt-2 inline-block rounded bg-blue-500 px-6 py-2 font-medium text-white shadow transition-colors duration-200 hover:bg-blue-600"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
