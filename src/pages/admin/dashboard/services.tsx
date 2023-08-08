import AdminBackButton from "@/components/AdminBackButton";
import FileDropzone from "@/components/FileDropzone";
import ServicesCarousel from "@/components/ServicesCarousel";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { useUploadThing } from "@/utils/uploadthing";
import { Button, Input, Link } from "@mui/material";
import "@uploadthing/react/styles.css";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { z } from "zod";
import { Label } from "~/components/ui/label";

export const ServiceForm = z.object({
  name: z.string().nonempty(),
});

type ServiceFormType = z.infer<typeof ServiceForm>;

export default function Services({
  admin,
  notFound,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const multipleServices = admin?.AdminConfig?.multipleServices;

  const { mutate: createService } = api.service.createService.useMutation({
    onSuccess: () => {
      toast.success("Serviço criado com sucesso!");
      utils.service.invalidate();
      setModal(false);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  // const ServicesComponent = (services: GetResult<any, any, any>[]) => {
  //   services.map(service => )
  // }

  const [modal, setModal] = useState<boolean>(false);

  const [file, setFile] = useState<File[]>([]);
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      setFile([]);
      toast.success("Uploaded successfully!");
    },
    onUploadError: () => {
      toast.error("Something went wrong!");
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<ServiceFormType>();

  const utils = api.useContext();

  const onSubmit: SubmitHandler<ServiceFormType> = async (data) => {
    if (file) {
      const fileInfo = await startUpload(file);
      if (fileInfo && fileInfo[0]) {
        createService({
          data,
          adminId: admin!.id,
          imageUrl: fileInfo[0].fileUrl ? fileInfo[0]?.fileUrl : null,
        });
      }
    } else {
      createService({
        data,
        adminId: admin!.id,
        imageUrl: null,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Admin - Serviços</title>
      </Head>
      <main className="relative flex h-screen flex-col items-center justify-center">
        {multipleServices ? (
          <div className="flex max-w-sm flex-col gap-8 rounded-xl bg-slate-200 p-12 shadow-md">
            <span className="text-lg font-semibold">Serviços</span>
            <ServicesCarousel adminId={admin.id} />
            <Button onClick={() => setModal((prev) => !prev)}>
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
            <div className="z-20 flex flex-col gap-8 rounded-xl bg-slate-300 p-10">
              <span className="font-bold">Novo serviço</span>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input {...register("name")} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Imagem</Label>
                  <FileDropzone setFile={setFile} />
                </div>
                <Button
                  disabled={(!isDirty || !isValid) && file.length > 0}
                  className="self-center"
                  type="submit"
                >
                  Criar
                </Button>
              </form>
            </div>
            <div
              className="absolute left-0 top-0 z-10 flex h-screen w-screen bg-slate-600 opacity-80"
              onClick={() => setModal(false)}
            ></div>
          </div>
        )}
        <AdminBackButton />
        <Toaster position="bottom-center" />
      </main>
    </>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const adminName = getCookie("admin-name", { req, res });

  if (adminName && typeof adminName === "string") {
    let admin = await prisma.admin.findUnique({
      where: {
        name: adminName,
      },
      select: {
        id: true,
        name: true,
        AdminConfig: true,
        Service: true,
      },
    });

    if (admin) {
      admin = JSON.parse(JSON.stringify(admin));

      return {
        props: {
          admin: admin,
        },
      };
    }
  }

  return {
    props: {
      notFound: true,
    },
  };
};
