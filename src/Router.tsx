import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import TrombiPage from "./TrombiPage";
import { useState } from "react";
import { Trombi } from "./types/Trombi";
import { useParams } from "react-router-dom";


function Index() {
    const [trombis, setTrombis] = useState<Trombi[]>([]);

    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route
                    path="/trombi/:id"
                    element={<TrombiPageWrapper trombis={trombis} />}
                />
            </Routes>
        </Router>
    );
}

// 🔹 Wrapper pour gérer l'extraction du bon `Trombi`

const TrombiPageWrapper: React.FC<{ trombis: Trombi[] }> = ({ trombis }) => {
    const { id } = useParams<{ id: string }>();
    const trombi = trombis.find(t => t.id === Number(id));

    if (!trombi) {
        return <p className="text-red-500">Trombinoscope non trouvé.</p>;
    }

    return <TrombiPage trombi={trombi} />;
};

export default Index;
