import { ServiceFormType } from "@/pages/admin/dashboard/services";
import { api } from "@/utils/api";
import { useUploadThing } from "@/utils/uploadthing";
import { Button, Input } from "@mui/material";
import { Label } from "@radix-ui/react-label";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Renderable, Toast, ValueFunction, toast } from "react-hot-toast";
import FileDropzone from "./FileDropzone";
import { Service } from "@prisma/client";

export default function CreateServiceForm({
  onSubmit,
  file,
  setFile,
  setModal,
  defaultValues,
  title,
  service,
}: {
  onSubmit: SubmitHandler<ServiceFormType>;
  file: File[];
  setFile: Dispatch<SetStateAction<File[]>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  defaultValues?: ServiceFormType;
  title?: "Criar" | "Editar";
  service?: Service;
}) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ServiceFormType>({
    defaultValues,
  });

  const utils = api.useContext();

  const { mutate: removeImage } = api.service.removeImage.useMutation({
    onSuccess: () => {
      toast.success("Imagem removida com sucesso!");
      setModal(false);
      utils.service.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="z-20 flex flex-col gap-8 rounded-xl bg-slate-300 p-10">
      <span className="font-bold">
        {title ? title + " serviço" : "Criar serviço"}
      </span>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input placeholder="Escreva o nome" required {...register("name")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Imagem (opcional)</Label>
          <FileDropzone file={file} setFile={setFile} />
          {title === "Editar" && service?.imageKey && (
            <Button
              variant="text"
              onClick={() => removeImage({ id: service.id })}
            >
              Remover imagem
            </Button>
          )}
        </div>
        <Button
          disabled={title ? isSubmitting : !isDirty || !isValid || isSubmitting}
          className="self-center"
          type="submit"
        >
          {isSubmitting ? "Carregando..." : title ? title : "Criar"}
        </Button>
      </form>
    </div>
  );
}
