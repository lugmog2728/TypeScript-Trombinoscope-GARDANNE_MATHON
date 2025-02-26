import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import TrombiPage from "./TrombiPage";


function Index() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/trombi/:id" element={<TrombiPage trombi={  {
                    id: 4,
                    name: "M1 DA",
                    photo: "data:image/jpeg;base64,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",
                    peoples: [
                        {
                            id: 1,
                            name: "Alice",
                            photo: "https://soriavie.fr/wp-content/uploads/pissenlit.jpg",
                            category: "Professeur"
                        },
                        {
                            id: 2,
                            name: "Bob",
                            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScg5NorMDQhcXtEYCHA8MhWzjCeZiBd6dChQ&s",
                            category: "Professeur"
                        },
                        {
                            id: 3,
                            name: "Charlie",
                            photo: "https://soriavie.fr/wp-content/uploads/pissenlit.jpg",
                            category: "Stagiaire"
                        },
                        {
                            id: 4,
                            name: "Diane",
                            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScg5NorMDQhcXtEYCHA8MhWzjCeZiBd6dChQ&s",
                            category: "Stagiaire"
                        },
                        {
                            id: 5,
                            name: "Eve",
                            photo: "https://soriavie.fr/wp-content/uploads/pissenlit.jpg",
                            category: "Etudiant"
                        },
                        {
                            id: 6,
                            name: "Frank",
                            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScg5NorMDQhcXtEYCHA8MhWzjCeZiBd6dChQ&s",
                            category: "Etudiant"
                        },
                        {
                            id: 7,
                            name: "Grace",
                            photo: "https://soriavie.fr/wp-content/uploads/pissenlit.jpg",
                            category: "Etudiant"
                        },
                        {
                            id: 8,
                            name: "Hugo",
                            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScg5NorMDQhcXtEYCHA8MhWzjCeZiBd6dChQ&s",
                            category: "Etudiant"
                        },
                        {
                            id: 9,
                            name: "Irene",
                            photo: "https://soriavie.fr/wp-content/uploads/pissenlit.jpg",
                            category: "Etudiant"
                        },
                        {
                            id: 10,
                            name: "Jack",
                            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScg5NorMDQhcXtEYCHA8MhWzjCeZiBd6dChQ&s",
                            category: "Etudiant"
                        }
                    ]
                }} />} />
            </Routes>
        </Router>
    );
}

export default Index;
