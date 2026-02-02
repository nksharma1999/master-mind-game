import axios from "axios";
import { useEffect, useState } from "react";

export const ReactMount: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  const getUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((data) => {
        console.log(data.data);
        setUsers(data.data);
      })
      .catch(() => {
        setError("Failed to fetch users");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const it = setInterval(() => {
      setCount((pre) => pre + 1);
    }, 1000);

    return () => clearInterval(it);
  }, []);

  useEffect(()=>{
    console.log("Count: " + count);
  },[count]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h2>{count}</h2>
    </>
  );
};
