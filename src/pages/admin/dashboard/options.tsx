import Button from "@/components/Button";
import FileDropzone from "@/components/FileDropzone";
import { Heading } from "@/components/Heading";
import { api } from "@/utils/api";
import { useUploadThing } from "@/utils/uploadthing";
import { Input, Switch, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type FileWithPath } from "react-dropzone";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { z } from "zod";
import { Label } from "~/components/ui/label";
import { type FullAdmin } from ".";

export const ZodForm = z.object({
  requirePayment: z.boolean(),
  paymentValue: z.number(),
  description: z.string(),
  multipleServices: z.boolean(),
  phoneNumber: z.string(),
});

type FormType = z.infer<typeof ZodForm> & { logo: File[] };

export default function Options({ admin }: { admin: FullAdmin }) {
  const [isTouched, setIsTouched] = useState(false);

  const [path, setPath] = useState<string[]>([]);

  const { startUpload } = useUploadThing("imageUploader", {});

  const utils = api.useContext();

  const { mutate: updatePreferences, isLoading } =
    api.auth.updatePreferences.useMutation({
      onSuccess: async () => {
        await utils.invalidate();
        setIsTouched(false);
        setPath([]);
        setValue("logo", []);
        toast.success("Configurações atualizadas com sucesso!");
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, touchedFields, isSubmitting },
    setValue,
    reset,
  } = useForm<FormType>({
    defaultValues: {
      requirePayment: admin?.AdminConfig?.requirePayment ?? true,
      paymentValue: admin?.AdminConfig?.paymentValue,
      description: admin?.AdminConfig?.description,
      multipleServices: admin?.AdminConfig?.multipleServices,
      logo: [],
      phoneNumber: admin.AdminConfig?.phoneNumber,
    },
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    data.paymentValue = parseFloat(data.paymentValue.toFixed(2));

    if (data.logo.length > 0) {
      const logo = await startUpload(data.logo);

      if (logo && logo.length > 0) {
        const config = { ...data };
        updatePreferences({
          config: {
            ...config,
          },
          logo: logo[0] ?? { fileKey: null, fileUrl: null },
          adminId: admin?.id,
        });
      }
    } else {
      const config = { ...data };
      updatePreferences({
        config: {
          ...config,
        },
        adminId: admin?.id,
        logo: { fileKey: null, fileUrl: null },
      });
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center py-20">
        <div className="flex flex-col gap-6">
          <Heading>Opções</Heading>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <Label className="font-bold" htmlFor="requirePayment">
                Requerer pagamento na reserva?
              </Label>
              <Controller
                name="requirePayment"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="my-switch"
                    onChange={(e) => {
                      setIsTouched(true);
                      field.onChange(e);
                    }}
                    checked={field.value}
                  />
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="font-bold" htmlFor="paymentValue">
                Preço
              </Label>

              <span>R$</span>
              <Input
                type="number"
                inputProps={{ step: ".01" }}
                disabled={!watch("requirePayment")}
                {...register("paymentValue", {
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="flex items-center justify-between gap-8">
              <Label className="font-bold" htmlFor="multipleServices">
                Gostaria de oferecer múltiplos serviços?
              </Label>
              <Controller
                name="multipleServices"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="multipleServices"
                    onChange={(e) => {
                      setIsTouched(true);
                      field.onChange(e);
                    }}
                    checked={field.value}
                  />
                )}
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Label className="font-bold" htmlFor="phoneNumber">
                Contato
              </Label>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => {
                  return (
                    <TextField
                      value={field.value}
                      placeholder="Telefone para contato"
                      onChange={(e) => {
                        const regex = new RegExp(/^[0-9\-\+()]*$/);
                        if (regex.test(e.target.value)) field.onChange(e);
                        setIsTouched(true);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Label className="font-bold" htmlFor="paymentValue">
                Descrição
              </Label>
              <TextField multiline {...register("description")} />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-bold">Logo</Label>
              {admin.AdminConfig?.logoUrl ? (
                <>
                  <div className="relative h-40">
                    <Image
                      src={admin.AdminConfig?.logoUrl}
                      quality={80}
                      alt="logo"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  <Controller
                    control={control}
                    name="logo"
                    render={({ field }) => {
                      return (
                        <FileDropzone
                          setPath={setPath}
                          file={field.value}
                          setFile={(acceptedFiles: FileWithPath[]) => {
                            setIsTouched(true);
                            setValue("logo", acceptedFiles);
                          }}
                          disabled={false}
                        />
                      );
                    }}
                  />
                </>
              ) : (
                <Controller
                  control={control}
                  name="logo"
                  render={({ field }) => {
                    return (
                      <FileDropzone
                        setPath={setPath}
                        file={field.value}
                        setFile={(acceptedFiles: FileWithPath[]) => {
                          setIsTouched(true);
                          setValue("logo", acceptedFiles);
                        }}
                        disabled={false}
                      />
                    );
                  }}
                />
              )}
              {path.map((file) => (
                <div key={file} className="relative h-40">
                  <Image
                    src={file}
                    fill
                    quality={80}
                    style={{ objectFit: "contain" }}
                    alt="Logo"
                  />
                </div>
              ))}
            </div>
            <Button
              type="submit"
              className="self-stretch"
              disabled={
                isSubmitting ||
                isLoading ||
                (!touchedFields.description &&
                  !touchedFields.paymentValue &&
                  !isTouched)
              }
            >
              {!isLoading || !isSubmitting ? "Salvar" : "Salvando..."}
            </Button>
          </form>
        </div>

        <Toaster />
      </main>
    </>
  );
}
