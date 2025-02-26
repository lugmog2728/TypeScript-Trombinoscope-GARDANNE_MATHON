import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import App from "./App";


function Index() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/trombi/:id" element={<App trombi=$id} />} />
            </Routes>
        </Router>
    );
}

export default Index;
