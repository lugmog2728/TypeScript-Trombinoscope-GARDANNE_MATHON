import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import TrombiPage from "./TrombiPage";


function Index() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/trombi/:id" element={<TrombiPage />} />
            </Routes>
        </Router>
    );
}

export default Index;
