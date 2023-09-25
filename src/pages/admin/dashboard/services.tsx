import AdminBackButton from "@/components/AdminBackButton";
import FileDropzone from "@/components/FileDropzone";
import CreateServiceForm from "@/components/ServiceForm";
import ServicesCarousel from "@/components/ServicesCarousel";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { useUploadThing } from "@/utils/uploadthing";
import { Input, Link } from "@mui/material";
import "@uploadthing/react/styles.css";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { z } from "zod";
import { Label } from "~/components/ui/label";
import { FullAdmin } from ".";
import { Heading } from "@/components/Heading";
import Button from "@/components/Button";

export const ServiceForm = z.object({
  name: z.string().nonempty(),
});

export type ServiceFormType = z.infer<typeof ServiceForm>;

export default function Services({ admin }: { admin: FullAdmin }) {
  const multipleServices = admin?.AdminConfig?.multipleServices;

  const [modal, setModal] = useState<boolean>(false);

  const [file, setFile] = useState<File[]>([]);

  const onSubmit: SubmitHandler<ServiceFormType> = async (data) => {
    if (file.length > 0) {
      const fileInfo = await startUpload(file);
      if (fileInfo && fileInfo[0]) {
        createService({
          data,
          adminId: admin?.id!,
          imageUrl: fileInfo[0].fileUrl,
          imageKey: fileInfo[0].fileKey,
        });
      }
    } else {
      createService({
        data,
        adminId: admin?.id!,
        imageUrl: null,
        imageKey: null,
      });
    }
  };

  const { mutate: createService } = api.service.createService.useMutation({
    onSuccess: () => {
      toast.success("Serviço criado com sucesso!");
      utils.invalidate();
      setModal(false);
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

  const utils = api.useContext();

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center gap-8">
        <Heading>Serviços</Heading>
        {multipleServices ? (
          <div className="flex w-full max-w-[800px] flex-col gap-8 rounded-xl border p-12 transition duration-300 hover:bg-zinc-50">
            <ServicesCarousel services={admin.Service} />
            <Button
              className="self-center"
              onClick={() => setModal((prev) => !prev)}
            >
              Adicionar novo serviço
            </Button>
          </div>
        ) : (
          <div>
            Você deve ativar "múltiplos serviços" em{" "}
            <Link href="/admin/dashboard/options">Opções</Link>
          </div>
        )}
        {modal && (
          <div className="absolute left-0 top-0 z-20 flex h-screen w-screen items-center justify-center">
            <CreateServiceForm
              onSubmit={onSubmit}
              file={file}
              setFile={setFile}
              setModal={setModal}
            />
            <div
              className="absolute left-0 top-0 z-10 flex h-screen w-screen bg-zinc-600 opacity-80"
              onClick={() => setModal(false)}
            ></div>
          </div>
        )}
        <Toaster position="bottom-center" />
      </main>
    </>
  );
}
