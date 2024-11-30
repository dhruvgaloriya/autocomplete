import { AutoComplete } from "@/components/molecule/autocomplete/src";
import { useEffect, useState } from "react";
import useDebounce from "./hooks/use-debouce";
import mockdata from "./mockdata/data.json";

interface Country {
  id: number;
  name: string;
  currency: string;
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [query, setQuery] = useState<string>(""); // Query for search
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null); // Track selected country

  const mockCountries: Country[] = mockdata.countries;
  const debouncedQuery = useDebounce(query, 750);

  useEffect(() => {
    if (debouncedQuery && !selectedCountry) {
      setLoading(true);
      setTimeout(() => {
        const filteredCountries = mockCountries.filter((country) =>
          country.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setCountries(filteredCountries);
        setLoading(false);
      }, 1000); // Simulate a 1-second delay
    } else if (!debouncedQuery) {
      setCountries([]); // Clear list when query is empty
    }
  }, [debouncedQuery, selectedCountry]); // No search if country is selected

  const handleSelect = (country: Country) => {
    setSelectedCountry(country); // Mark as selected
    setQuery(country.name); // Set query to the selected country
    setCountries([]); // Clear dropdown after selection
    setQuery("");
  };

  const handleInputChange = (value: string) => {
    if (selectedCountry) {
      setSelectedCountry(null); // Clear selection when typing a new value
    }
    setQuery(value); // Update query with the new input
  };

  return (
    <div>
      <h1>AutoComplete Example</h1>
      <AutoComplete
        filterKey="name"
        items={countries}
        onInputChange={handleInputChange} // Pass query input change to AutoComplete
        onItemSelect={handleSelect}
        placeholder="Search for a country"
        loading={loading}
        isSelected={!!selectedCountry} // Pass selected status to AutoComplete
      />
    </div>
  );
};

export default App;

/*
  const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://freetestapi.com/api/v1/countries?search=${debouncedQuery}`
        );
        const data: Country[] = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  } else {
    setCountries([]);
  }
  */

// import React, { useEffect, useState } from "react";
// import { DataList } from "./components/atom/data-lists/src";
// import { Input } from "./components/atom/input/src";
// import useDebounce from "./hooks/use-debouce";
// import { highlightText } from "./utils/highlighted-text";

// const App: React.FC = () => {
//   const [input, setInput] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<User[]>([]);
//   const [selected, setSelected] = useState<boolean>(false);
//   const [users, setUsers] = useState<User[]>([]);
//   const [buttonClicked, setButtonClicked] = useState<boolean>(false);
//   const [personUsername, setPersonUsername] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [gettingData, setGettingData] = useState<boolean>(false);
//   const debouncedValue = useDebounce<string>(input, 750);
//   const [info, setInfo] = useState<string>("");
//   const [cache, setCache] = useState<{ [key: string]: User[] }>({});

//   useEffect(() => {
//     const getData = async (value: string) => {
//       try {
//         if (cache[value]) {
//           setSuggestions(cache[value]);
//           setGettingData(true);
//         } else {
//           const response = await fetch(
//             "https://jsonplaceholder.typicode.com/users"
//           );

//           if (!response.ok) {
//             setInfo("Network response was not ok");
//             throw new Error("Network response was not ok");
//           }

//           setInfo("");
//           const users: User[] = await response.json();
//           setUsers(users);
//           const filteredUsers = users.filter((user) =>
//             user.name.toLowerCase().includes(value.toLowerCase())
//           );
//           setCache({ ...cache, [value]: filteredUsers });
//           setSuggestions(filteredUsers);
//           setGettingData(true);
//         }
//       } catch (error) {
//         setInfo("Something went wrong");
//       }
//     };

//     if (debouncedValue) {
//       getData(debouncedValue);
//     } else {
//       setSuggestions([]);
//       setSelected(false);
//     }
//   }, [debouncedValue, cache]);

//   useEffect(() => {
//     if (input.length === 0) {
//       setGettingData(false);
//       setInfo("");
//     }
//   }, [input]);

//   const handleInputChange = (value: string) => {
//     setInput(value);
//     setSelected(false);
//     setButtonClicked(false);
//   };

//   const handleSelect = (name: string) => {
//     setInput(name);
//     setSuggestions([]);
//     setSelected(true);
//     setGettingData(false);
//   };

//   const getInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     const currentUser = users.find((user) => user.name === input);
//     if (currentUser) {
//       setButtonClicked(true);
//       setSuggestions([]);
//       setGettingData(false);
//       setPersonUsername(currentUser.username);
//       setEmail(currentUser.email);
//     }
//     return currentUser;
//   };

//   const clearFields = () => {
//     setButtonClicked(false);
//     setSuggestions([]);
//     setSelected(false);
//     setGettingData(false);
//     setInput("");
//     setPersonUsername("");
//     setEmail("");
//     setInfo("");
//   };

//   return (
//     <div className="container">
//       {/* <Header /> */}
//       <div className="content">
//         <section>
//           <form>
//             <Input
//               value={input}
//               onInputChange={handleInputChange}
//               placeholder="Search..."
//             />
//           </form>
//         </section>
//         {suggestions.length > 0 && !selected && (
//           <DataList
//             items={suggestions}
//             onSelect={handleSelect}
//             renderItem={(item) => (
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: highlightText(item.name, input),
//                 }}
//               ></div>
//             )}
//           />
//         )}
//         {/* <Info
//           input={input}
//           info={info}
//           suggestions={suggestions}
//           personUsername={personUsername}
//           email={email}
//           buttonClicked={buttonClicked}
//           gettingData={gettingData}
//         />
//         <Controls
//           input={input}
//           selected={selected}
//           getInfo={getInfo}
//           clearFields={clearFields}
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default App;
