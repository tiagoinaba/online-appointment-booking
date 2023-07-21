import DataTable from '@/components/reservations/DataTable';
import { columns } from '@/components/reservations/columns';
import { api } from '@/utils/api'
import { format } from 'date-fns';
import Head from 'next/head'
import React from 'react'

export default function reservations() {
    const { data: reservations, } = api.reservation.getAll.useQuery();
    return (
        <>
            <Head>
                <title>Reservas - Admin</title>
            </Head>
            <main className='h-screen flex flex-col justify-center items-center'>
                <h1 className='font-bold text-2xl'>Reservas</h1>
                {reservations && (<div className="container mx-auto py-10">
                    <DataTable columns={columns} data={reservations} />
                </div>)}
            </main>
        </>
    )
}
