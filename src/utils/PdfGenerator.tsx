import { Person } from "../types/Person";
import jsPDF from "jspdf";

const loadImage = (url: string | Blob): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);

        if (url instanceof Blob) {
            url = URL.createObjectURL(url);
        }

        img.src = url as string;
    });
};

interface PdfGeneratorProps {
    people: Person[];
    trombiName: string;
    roles: string[];
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ people, trombiName, roles }) => {
    const generatePDF = async () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        doc.setFontSize(22);
        doc.text(trombiName, 105, 15, { align: "center" });

        doc.setFontSize(10);
        doc.text(`Généré le : ${new Date().toLocaleDateString("fr-FR")}`, 105, 22, { align: "center" });

        let margin = 10;
        let currentY = 35;
        const cardWidth = 40;
        const cardHeight = 50;
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
        const cardsPerRow = 4;
        const spacing = (pageWidth - 2 * margin - cardsPerRow * cardWidth) / (cardsPerRow - 1);

        // Filtrer les personnes en fonction des rôles sélectionnés
        const filteredPeople = people.filter(person => roles.includes(person.category));

        for (let i = 0; i < filteredPeople.length; i++) {
            const person = filteredPeople[i];
            const col = i % cardsPerRow;
            const row = Math.floor(i / cardsPerRow);

            let x = margin + col * (cardWidth + spacing);
            let y = currentY + row * (cardHeight + 8);

            // Vérifier si on dépasse la page
            if (y + cardHeight > pageHeight - margin) {
                doc.addPage();
                currentY = 30;
                y = currentY;
            }

            // Carte
            doc.setFillColor(245, 245, 245);
            doc.roundedRect(x, y, cardWidth, cardHeight, 2, 2, "F");

            // Image
            try {
                const img = await loadImage(person.photo);  // Passe la photo (Blob ou URL) à loadImage
                doc.addImage(img, "JPEG", x + 10, y + 5, 20, 20);
            } catch {
                doc.setFillColor(200, 200, 200);
                doc.roundedRect(x + 10, y + 5, 20, 20, 2, 2, "F");
            }

            // Nom
            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.text(person.name, x + 20, y + 28, { align: "center" });

            // Catégorie
            doc.setFontSize(7);
            doc.setFont("helvetica", "italic");
            doc.text(`(${person.category})`, x + 20, y + 33, { align: "center" });
        }

        doc.save(`Trombinoscope_${trombiName.replace(' ', '_')}.pdf`);
    };

    return (
        <button onClick={generatePDF}>
            📄 Télécharger le PDF
        </button>
    );
};

export default PdfGenerator;
