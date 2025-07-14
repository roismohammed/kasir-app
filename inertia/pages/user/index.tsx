import { Head } from "@inertiajs/react";
import React from "react";
import { PageTitle } from "~/components/page-title";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import AppLayout from "~/layouts/app-layout";
import { UserProps } from "~/types";



const breadcrumbs = [
  {
    title: "Beranda",
    url: "/",
  },
  {
    title: "User",
    url: "/user",
  },
];


const UserComponent: React.FC<UserProps> = ({ name, email, avatar }) => {
  return (
   <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="User"/>
    <PageTitle title="User" subtitle="klik simpan untuk membuat data user"/>
     <div className="flex items-center gap-4">
   
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{email}</div>

      </div>
    </div>
   </AppLayout>
  );
};

export default UserComponent;


