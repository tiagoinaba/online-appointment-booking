import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type FileDropzoneProps = {
  setFile: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function FileDropzone({ setFile }: FileDropzoneProps) {
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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      Drop files here!
    </div>
  );
}
