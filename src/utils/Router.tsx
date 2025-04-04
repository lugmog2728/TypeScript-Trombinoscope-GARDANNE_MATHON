import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Home from "../pages/home";
import TrombiPage from "../pages/TrombiPage";
import React, { useEffect, useState } from "react";
import { Trombi, getAllTrombi } from "../types/Trombi";


function Index() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/trombi/:id" element={<TrombiPageWrapper />} />
            </Routes>
        </Router>
    );
}

// 🔹 Wrapper pour gérer la récupération du Trombi selon l'ID
const TrombiPageWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [trombis, setTrombis] = useState<Trombi[]>([]);

    useEffect(() => {
        getAllTrombi(setTrombis);
    }, []);

    const trombi = trombis.find(t => t.id === Number(id));
    if (!trombi) return <p className="text-red-500">Trombinoscope non trouvé.</p>;
    return <TrombiPage trombi={trombi} />;
};

export default Index;
