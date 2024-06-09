import { useEffect, useState } from "react";
import { BreedData, getBreeds } from "../services/breedsService";
import { BreedsResponse } from "../services/breedsService";

export const useBreeds = () => {
  const [pageLimit, setPageLimit] = useState(0);
  const [breedsPerPage, setBreedsPerPage] = useState<BreedData[]>([]);
  const [allBreeds, setAllBreeds] = useState<BreedData[]>([]);
  const [isLoadingSinglePage, setIsLoadingSinglePage] = useState(true);
  const [isLoadingAllBreeds, setIsLoadingAllBreeds] = useState(false);

  useEffect(() => {
    async function fetchBreedsPerPage(): Promise<BreedsResponse> {
      return await getBreeds();
    }

    fetchBreedsPerPage()
      .then((response: BreedsResponse) => {
        setBreedsPerPage(response.data);
        const lastLink = response?.links?.last;
        if (lastLink) {
          savePageLimit(lastLink);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingSinglePage(false);
      });
  }, []);

  useEffect(() => {
    async function fetchAllBreeds(): Promise<undefined> {
      const promises: Promise<BreedsResponse>[] = Array.from(
        { length: pageLimit },
        (_, i) => getBreeds(i + 1)
      );

      const results = await Promise.allSettled(promises);

      if (results) {
        setAllBreeds(mapResultsToBreeds(results));
      }
    }

    if (pageLimit > 0) {
      setIsLoadingAllBreeds(true);
      fetchAllBreeds()
        .catch((e) => console.log(e))
        .finally(() => setIsLoadingAllBreeds(false));
    }
  }, [pageLimit]);

  const savePageLimit = (link: string) => {
    const startIndex = link.lastIndexOf("=") + 1;
    const count = Number.parseInt(link.slice(startIndex));
    setPageLimit(count);
  };

  const mapResultsToBreeds = (
    results: PromiseSettledResult<BreedsResponse>[]
  ) => {
    const breeds: BreedData[] = [];
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        breeds.push(...result.value.data);
      }
    });
    return breeds;
  };

  return {
    pageLimit,
    allBreeds,
    breedsPerPage,
    isLoadingSinglePage,
    isLoadingAllBreeds,
  };
};
