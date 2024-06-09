import "./App.css";
import { useBreeds } from "./hooks/useBreeds";

function App() {
  const {
    allBreeds,
    breedsPerPage: breeds,
    isLoadingAllBreeds,
    isLoadingSinglePage,
  } = useBreeds();

  const isEmpty = breeds.length === 0;

  console.log(allBreeds.length);

  return (
    <>
      {isLoadingSinglePage && <div>Loading very initial data</div>}
      {!isLoadingSinglePage && isEmpty && <div>No breeds!</div>}
      {breeds.length > 0 &&
        breeds.map((breed) => (
          <div key={breed.attributes.name}>{breed.attributes.name}</div>
        ))}
      {isLoadingAllBreeds && <div>Loading all breeds</div>}
    </>
  );
}

export default App;
