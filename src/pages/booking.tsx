import { now } from "@/utils/constants";
import { Button, Input, InputLabel, TextField } from "@mui/material";
import { parseISO } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    example: string,
    exampleRequired: string,
};

export default function Booking({ }) {
    const [dateTime, setDateTime] = useState<string | null>(null);
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    useEffect(() => {
        const selectedTime = localStorage.getItem('dateTime');

        if (!selectedTime) router.push('/');
        else {
            const date = parseISO(selectedTime);

            if (date < now) router.push('/');
            else {
                setDateTime(selectedTime);
            }
        }
    }, [])

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    return (
        <main className="h-screen flex justify-center items-center">
            <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)} >
                <InputLabel>Nome</InputLabel>
                <Input {...register("example", { required: true })} />
                {errors.example && <span className="text-red-500">Este campo é obrigatório</span>}

                <InputLabel className="mt-6">Sobrenome</InputLabel>
                <Input {...register("exampleRequired", { required: true })} />
                {errors.exampleRequired && <span className="text-red-500">Este campo é obrigatório</span>}

                <Button variant="outlined" sx={{ marginTop: "1.5rem" }}>Submit</Button>
            </form>
        </main>
    )
}