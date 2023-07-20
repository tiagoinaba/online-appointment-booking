import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { api } from '@/utils/api';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const adminFormSchema = z.object({
    email: z.string()
        .nonempty('O email é obrigatório.')
        .email('Email inválido')
        .toLowerCase(),
    password: z.string()
        .nonempty('A senha é obrigatória.')
})

type AdminFormData = z.infer<typeof adminFormSchema>;

export default function index() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AdminFormData>({
        resolver: zodResolver(adminFormSchema)
    });

    const router = useRouter();

    const { mutate: login } = api.auth.login.useMutation({
        onError: (err) => {
            toast.error(err.message)
        },
        onSuccess: () => {
            router.push('/dashboard');
        }
    });

    function onSubmit(data: AdminFormData) {
        login({ ...data })
    }

    return (
        <>
            <Head>
                <title>Admin Login</title>
            </Head>
            <main className='h-screen flex justify-center items-center bg-zinc-100'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-center max-w-xs'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='email'>Email</label>
                        <input type="email" className='px-3 py-1 rounded-md' {...register('email')} />
                        {errors.email && (<span>{errors.email.message}</span>)}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='password'>Password</label>
                        <input type="password" className='px-3 py-1 rounded-md' {...register('password')} />
                        {errors.password && (<span>{errors.password.message}</span>)}
                    </div>
                    <button type='submit' className='bg-teal-800 text-zinc-50 px-4 py-1 rounded-lg font-bold'>Login</button>
                </form>
                <Toaster position='bottom-center' />
            </main>
        </>
    )
}

