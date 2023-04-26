import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Routes, Route, useNavigate } from "react-router-dom";
import Error from "./components/Error";
import { useEffect, useContext } from "react";
import { LoginContext } from "./components/ContextProvider/Context";

function App() {
  const [data, setData] = useState(false);
  const { logindata, setLogindata } = useContext(LoginContext);
  const history = useNavigate();
  const DashboardValid = async () => {
    let token = localStorage.getItem("userdatatoken");
    const res = await fetch("/validusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    if (data.status == 401 || !data) {
      history("*");
    } else {
      console.log("user verify");
      setLogindata(data);
      history("/dash");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);
  return (
    <>
      {data ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default App;
