import React, { useCallback, useState } from "react";
import { type FileRejection, type FileWithPath, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Button from "./Button";

type FileDropzoneProps = {
  file: File[];
  setFile:
    | React.Dispatch<React.SetStateAction<File[]>>
    | ((acceptedFiles: FileWithPath[]) => void);
  disabled: boolean;
  setPath: React.Dispatch<React.SetStateAction<string[]>>;
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
    <Button
      {...getInputProps}
      type="button"
      onClick={() => open}
      variant="ghost"
    >
      Escolher imagem
    </Button>
  );
}
