import React, { useState } from "react";
import "../../style/form.css";
import { Person } from "../../types/Person";
import PdfGenerator from "../../utils/PdfGenerator";

interface ExportPdfProps {
    personList: Person[];
    onClose: () => void;
    trombiName: string;
}

const ExportPdf: React.FC<ExportPdfProps> = ({ personList, onClose, trombiName }) => {
    const [name, setName] = useState<string>(trombiName);
    const [roles, setRoles] = useState<string[]>([]);

    const toggleRole = (role: string) => {
        setRoles((prevRoles) =>
            prevRoles.includes(role)
                ? prevRoles.filter((r) => r !== role)
                : [...prevRoles, role]
        );
    };

    return (
        <div className="modal">
            <div>
                <h2>Exporter en PDF</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Entrez le nom"
                        />
                    </div>

                    <div className="form-group">
                        <label>Rôles</label>
                        <div className="checkbox-group">
                            {["Stagiaire", "Professeur", "Etudiant"].map((role) => (
                                <div key={role}>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={roles.includes(role)}
                                            onChange={() => toggleRole(role)}
                                        />
                                        {role}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose}>Fermer</button>
                        <PdfGenerator people={personList} trombiName={name} roles={roles} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExportPdf;
