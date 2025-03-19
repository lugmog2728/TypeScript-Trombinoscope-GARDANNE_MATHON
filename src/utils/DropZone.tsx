import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

interface DropZoneProps {
    onFileSelect: (file: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileSelect }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
            onFileSelect(imageUrl);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Déposez l'image ici...</p> :
                    <p>Glissez et déposez une image ici, ou cliquez pour sélectionner une image</p>
            }
            {imageSrc &&
                <img src={imageSrc} alt='previsualisation' className="preview" />
            }
        </div>
    );
};

export default DropZone;
