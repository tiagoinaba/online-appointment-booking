import { api } from '@/utils/api';
import { Inputs } from '@/utils/types';
import { Button } from '@mui/material';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

export default function Callback() {
    const [dateReserved, setDateReserved] = useState<Date | null>(null);
    const [reservationData, setReservationData] = useState<Inputs | null>(null);

    const { mutate: getPayment, data: paymentData, isLoading: paymentLoading } = api.mercadopago.getPayment.useMutation();
    const { mutate: createReservation, data: reservationResponse, isLoading: reservationLoading } = api.reservation.createReservation.useMutation({
        onSuccess: () => {
            localStorage.clear();
        }
    });

    const router = useRouter();
    const { status, payment_id: paymentId } = router.query;
    const isApproved = status === "approved";

    useEffect(() => {
        const data = localStorage.getItem('reservationInfo')
        if (data) {
            setReservationData(JSON.parse(data));
        }
    })

    useEffect(() => {
        if (paymentData && reservationData) {
            const { name, email } = reservationData;
            const dateString = paymentData.additional_info.items[0].description;
            const date = parseISO(dateString);
            createReservation({ date, name, email });
            setDateReserved(date);
            return;
        }
        if (status === "approved" && typeof paymentId === "string" && paymentId.length > 0) {
            getPayment({ paymentId });
        }
    }, [paymentData])

    return (
        <main className='h-screen flex justify-center items-center text-center relative'>
            <Button href={'/'} sx={{ position: 'absolute', top: '1rem', left: '1rem' }} >Voltar para o início</Button>
            {paymentLoading || reservationLoading ? (
                <h1 className='text-3xl'>Loading...</h1>
            ) : (
                <div>
                    <h1 className='text-3xl'>{reservationResponse}</h1>
                    {dateReserved && reservationData && (<p className='font-bold text-2xl mt-4'>{format(dateReserved, "dd/MM/yyyy '->' HH:mm")} - {reservationData.name}</p>)}
                </div>
            )}

        </main>
    )
}
