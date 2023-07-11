import { MercadoPago } from "mercadopago/interface";

declare global {
    interface Window {
        MercadoPago: MercadoPago
    }
}