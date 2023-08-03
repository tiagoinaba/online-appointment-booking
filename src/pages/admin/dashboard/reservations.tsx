import NotFound from "@/components/NotFound";
import DataTable from "@/components/reservations/DataTable";
import { columns } from "@/components/reservations/columns";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { Button } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export default function reservations({
  adminId,
  notFound,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: reservations } = api.reservation.getByDateAdmin.useQuery({
    date: null,
    adminId: adminId ? adminId : "error",
  });
  const router = useRouter();
  const { mutate: logout } = api.auth.logout.useMutation({
    onSuccess: () => {
      router.push("/admin");
    },
  });

  return (
    <>
      <Head>
        <title>Reservas - Admin</title>
      </Head>
      <main className="flex h-screen flex-col items-center justify-center">
        <Button
          href={`/admin/dashboard`}
          sx={{ position: "absolute", top: "1rem", left: "1rem" }}
        >
          Voltar
        </Button>
        {adminId ? (
          <div>
            <h1 className="text-2xl font-bold">Reservas</h1>
            {reservations && (
              <div className="container mx-auto py-10">
                <DataTable columns={columns} data={reservations} />
              </div>
            )}
          </div>
        ) : (
          <NotFound />
        )}
      </main>
    </>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  try {
    const adminName = req.cookies["admin-name"];

    if (adminName) {
      const admin = await prisma.admin.findUnique({
        where: {
          name: adminName,
        },
        select: {
          id: true,
        },
      });

      return { props: { adminId: admin?.id ? admin.id : null } };
    }

    throw new Error("Not found");
  } catch (err) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};
