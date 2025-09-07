// import { useEffect, useState } from "react";

// function useFetch<T = any>(url: string, options?: RequestInit) {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<any>(null);

//   useEffect(() => {
//     let isMounted = true;
//     setLoading(true);
//     setError(null);

//     fetch(url, options)
//       .then((res) => {
//         if (!res.ok) throw new Error(res.statusText);
//         return res.json();
//       })
//       .then((data) => {
//         if (isMounted) setData(data);
//       })
//       .catch((err) => {
//         if (isMounted) setError(err);
//       })
//       .finally(() => {
//         if (isMounted) setLoading(false);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [url, JSON.stringify(options)]);

//   return { data, loading, error };
// }

// export default useFetch;
