import { useEffect, useState } from 'react';

export const useContact = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);


  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://randomuser.me/api/?results=45');
        const { results, error } = await response.json();
        if (error) {
          throw new Error(error);
        }
        setData(results);
        setIsError(false);
      } catch (e) {
        setIsError(true);
      }
      finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, [isRefresh, setIsRefresh])
  return {
    data,
    isLoading,
    isError,
    isRefresh,
    setIsRefresh
  }
}