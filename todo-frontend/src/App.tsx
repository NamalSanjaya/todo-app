import {Routes, Route} from "react-router-dom"
import Container from "./components/Container";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PageNotFound from "./components/PageNotFound";


function App() {
  return( 
    <Routes>
    <Route path="/" element={ <Container />} />
    <Route path="/login" element={ <Login />} />
    <Route path="/signup" element={ <SignUp />} />
    <Route path="*" element={ <PageNotFound />} />

    </Routes>
)
}

export default App;
