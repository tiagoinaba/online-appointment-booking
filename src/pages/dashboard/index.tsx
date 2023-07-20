import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@mui/joy';

const adminFormSchema = z.object({
    email: z.string().nonempty('O email é obrigatório.').email('Email inválido'),
    password: z.string()
})

export default function index() {

    return (
        <main className='h-screen flex justify-center items-center bg-zinc-100'>
            <Link href='/dashboard/reservations'>Reservas</Link>
        </main>
    )
}

