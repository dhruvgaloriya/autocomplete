import { AutoComplete } from "@/components/molecule/autocomplete/src";
import { useState } from "react";
import styles from "./App.module.css";
import useFetchData from "./hooks/use-fetchdata";
import mockdata from "./mockdata/data.json";

interface Country {
  id: number;
  name: string;
  currency?: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  /*
  1. You can enable/disable the mock data by changing the isMockEnabled variable to true or false.
  2. If you want to use the API, you need to set the isMockEnabled variable to false. 
     Please follow readme. API PlaceHolder section for enable CORS for this
  */

  const isMockEnabled = true;

  const {
    data: countries,
    loading,
    error,
  } = useFetchData<Country>(
    isMockEnabled
      ? ""
      : "https://cors-anywhere.herokuapp.com/https://freetestapi.com/api/v1/countries",
    query,
    isMockEnabled ? 0 : 750,
    isMockEnabled ? mockdata.countries : undefined
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
      <p> Try with "in" or any other keyword to test</p>
      <AutoComplete
        filterKey="name"
        items={countries}
        onInputChange={handleInputChange}
        onItemSelect={handleSelect}
        placeholder="Search for a country..."
        loading={loading}
        isSelected={!!selectedCountry}
      />
      {error && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
};

export default App;
