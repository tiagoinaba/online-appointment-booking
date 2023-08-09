import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type FileDropzoneProps = {
  file: File[];
  setFile: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function FileDropzone({ file, setFile }: FileDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
  }, []);
  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="max-w-md border-2 border-dashed border-slate-400 p-4 py-8"
    >
      <input {...getInputProps()} />
      {file.length > 0 ? (
        <div className="text-center">
          Imagem selecionada!<p className="truncate">{file[0]!.name}</p>
        </div>
      ) : (
        "Clique ou arraste uma imagem!"
      )}
    </div>
  );
}
