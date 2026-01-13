import { useEffect, useState } from "react";

export function useDebounce(value: string, delay = 500) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
}

//   const debounceQuery = useDebounce(searchQuery, 400);

//   useEffect(() => {
//     if (!debounceQuery) return;
//     const handleSearchUser = async () => {
//       try {
//         await findUserByEmail(debounceQuery);
//       } catch (error) {
//         console.log("failed to get user!", error);
//       }
//     };
//     handleSearchUser();
//   }, [debounceQuery, findUserByEmail]);
