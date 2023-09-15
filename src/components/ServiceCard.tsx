import placeholder from "@/assets/placeholder-image.png";
import { api } from "@/utils/api";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
} from "@mui/material";
import { Service } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import CreateServiceForm from "./ServiceForm";
import { SubmitHandler } from "react-hook-form";
import { ServiceFormType } from "@/pages/admin/dashboard/services";
import { useUploadThing } from "@/utils/uploadthing";
import { z } from "zod";

export const ServiceEditForm = z.object({
  name: z.string(),
});

export default function ServiceCard({ service }: { service: Service }) {
  const utils = api.useContext();

  const { mutate: deleteService, isLoading } =
    api.service.deleteService.useMutation({
      onSuccess: () => {
        setOpen(false);
        toast.success("Serviço excluído com sucesso!");
        utils.invalidate();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const { mutate: updateService } = api.service.updateService.useMutation({
    onSuccess: () => {
      utils.service.invalidate();
      setModal(false);
      toast.success("Atualizado com sucesso!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      setFile([]);
    },
    onUploadError: () => {
      toast.error("Algo deu errado com o upload da imagem!");
    },
  });

  const [open, setOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [file, setFile] = useState<File[]>([]);

  const handleClick = () => {
    deleteService({ id: service.id });
  };

  const onSubmit: SubmitHandler<ServiceFormType> = async (data) => {
    if (file.length > 0) {
      const fileInfo = await startUpload(file);
      if (fileInfo && fileInfo[0]) {
        updateService({
          id: service.id,
          data,
          imageKey: fileInfo[0].fileKey,
          imageUrl: fileInfo[0].fileUrl,
        });
      }
    } else {
      updateService({
        id: service.id,
        data,
        imageKey: null,
        imageUrl: null,
      });
    }
  };

  return (
    <div>
      <div className="group relative mx-2 flex flex-col overflow-hidden rounded-2xl bg-transparent text-slate-100 shadow-md">
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center gap-2 bg-zinc-300 bg-opacity-40 opacity-0 backdrop-blur-xl transition-opacity duration-200 group-hover:bg-zinc-400 group-hover:opacity-100">
          <IconButton onClick={() => setOpen(true)}>
            <Delete color="error" />
          </IconButton>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Deseja mesmo excluir {service.name}?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Isso irá excluir todas as suas reservas também.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClick}
                className="bg-[#1976d2]"
                variant="contained"
              >
                Sim
              </Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Não
              </Button>
            </DialogActions>
          </Dialog>
          <IconButton onClick={() => setModal(true)}>
            <Edit color="info" />
          </IconButton>
          <Dialog
            onClose={() => setModal(false)}
            PaperProps={{ style: { backgroundColor: "transparent" } }}
            open={modal}
          >
            <CreateServiceForm
              file={file}
              onSubmit={onSubmit}
              setFile={setFile}
              setModal={setModal}
              defaultValues={{ name: service.name }}
              title="Editar"
              service={service}
            />
          </Dialog>
        </div>
        <div className="relative h-32  bg-slate-300">
          {service.imageUrl ? (
            <Image
              src={service.imageUrl}
              alt="Foto do serviço"
              sizes="300px"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Image
              src={placeholder}
              alt="Image placeholder"
              sizes="300px"
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="bg-slate-500 p-4 text-slate-100">
          <p className="truncate text-center">{service.name}</p>
        </div>
      </div>
    </div>
  );
}
