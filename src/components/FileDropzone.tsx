import React, { useCallback, useState } from "react";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

type FileDropzoneProps = {
  file: File[];
  setFile:
    | React.Dispatch<React.SetStateAction<File[]>>
    | ((acceptedFiles: FileWithPath[]) => void);
  disabled: boolean;
  setPath?: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FileDropzone({
  file,
  setFile,
  disabled,
  setPath,
}: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
      fileRejections.map((file) => toast.error("A imagem é grande demais!"));
      setFile(acceptedFiles);
      if (setPath)
        setPath(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
    []
  );
  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    multiple: false,
    maxFiles: 1,
    disabled,
    maxSize: 4 * 1024 * 1024,
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
        <div className="text-center">Clique ou arraste uma imagem!</div>
      )}
    </div>
  );
}
