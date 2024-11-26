import { AutoComplete } from "@/components/molecule/autocomplete/src";

import React from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com" },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
  },
  {
    id: 3,
    name: "Alice Johnson",
    username: "alicej",
    email: "alice@example.com",
  },
];

const App: React.FC = () => {
  const handleSelect = (user: User) => {
    console.log("Selected User:", user);
  };

  return (
    <div>
      <h1>AutoComplete Example</h1>
      <AutoComplete
        items={users}
        filterKey="name"
        placeholder="Search for a user"
        onSelect={handleSelect}
      />
    </div>
  );
};

export default App;

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
