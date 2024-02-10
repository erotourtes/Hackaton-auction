import { ThemeProvider } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { QueryClientProvider } from "react-query";
import Navigation from "./Navigation";
import { User, addDeposit, getUser } from "./api/userApi";
import queryClient from "./context/queryClient";
import { UserContext } from "./context/userContext";
import theme from "./theme";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser().then((user) => {
      if (user) setUser(user);
      addDeposit(500);
    });
    // TO add user
    // signUp({
    //   avatar:
    //     "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    //   firstname: "Tania1",
    //   lastname: "Asndrew1",
    //   username: "txanaa2ndrew",
    //   email: "122sdf23@gmail.com",
    //   password: "1234568790173",
    // }).then(async (user) => {
    //   if (user) setUser(user);
    //   signIn("122xxasdf23@gmail.com", "1234568790173").then((res) => {
    //     if (res) localStorage.setItem("token", res.token);
    //   });
    // });
    // signIn("122xxasdf23@gmail.com", "1234568790173").then((res) => {
    //   if (res) localStorage.setItem("token", res.token);
    // });
  }, []);

  return (
    <>
      <ThemeProvider value={theme}>
        <QueryClientProvider client={queryClient}>
          <UserContext.Provider value={[user, setUser]}>
            <Navigation />
          </UserContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
