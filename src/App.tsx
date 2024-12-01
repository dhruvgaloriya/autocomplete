import { AutoComplete } from "@/components/molecule/autocomplete/src";
import { useState } from "react";
import styles from "./App.module.css";
import useFetchData from "./hooks/use-fetchdata";
import mockdata from "./mockdata/data.json";

interface Country {
  id: number;
  name: string;
  currency: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const {
    data: countries,
    loading,
    error,
  } = useFetchData<Country>(
    "", // Replace with API URL if needed (https://cors-anywhere.herokuapp.com/https://freetestapi.com/api/v1/countries) (Please follow readme API PlaceHolder section)
    query,
    750,
    mockdata.countries // Provide mock data for local testing
  );

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleInputChange = (value: string) => {
    if (selectedCountry) {
      setSelectedCountry(null);
    }
    setQuery(value.trim());
  };

  return (
    <div className={styles.appContainer}>
      <h1>AutoComplete Example</h1>
      <AutoComplete
        filterKey="name"
        items={countries}
        onInputChange={handleInputChange} // Pass query input change to AutoComplete
        onItemSelect={handleSelect}
        placeholder="Search for a country..."
        loading={loading}
        isSelected={!!selectedCountry} // Pass selected status to AutoComplete
      />
      {error && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
};

export default App;
