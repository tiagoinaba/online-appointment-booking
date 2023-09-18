import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type FileDropzoneProps = {
  file: File[];
  setFile: React.Dispatch<React.SetStateAction<File[]>>;
  disabled: boolean;
};

export default function FileDropzone({
  file,
  setFile,
  disabled,
}: FileDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
  }, []);
  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    multiple: false,
    maxFiles: 1,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className="min-w-[300px] max-w-md border-2 border-dashed border-zinc-400 p-4 py-8"
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
