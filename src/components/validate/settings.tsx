import { useUser } from "@auth0/nextjs-auth0/client";
import Login from "@/src/components/validate/login";
import { hasAllPermissions } from "@/src/components/dashboard/navbar";
import Loading from "@/src/components/dashboard/loading";
import AccessDenied from "@/src/components/validate/accessDenied";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { tokenAtom } from "@/src/state/states";
import { getPermissions } from "@/src/services/auth/service";
import React from "react";

export default function Settings({
  children,
  permissionsList,
}: {
  children: React.ReactNode;
  permissionsList: string[];
}) {
  const { user, isLoading: userLoading } = useUser();
  const [permissions, setPermissions] = useState<any[]>([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [token] = useAtom(tokenAtom);

  useEffect(() => {
    let permis: any = [];
    let hasPermis = false;
    if (user && token) {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}/permissions`;
      const _getPermissions = async () => {
        const { data } = await getPermissions(token, url);
        data.forEach((permission: any) => {
          permis.push(permission.permission_name);
        });
        hasPermis = hasAllPermissions(permis, permissionsList);
        setPermissions(permis);
        setHasPermission(hasPermis);
        setDataLoaded(true);
      };
      _getPermissions();
    }
  }, [user, token]);
  if (userLoading && !dataLoaded) return <Loading />;
  if (!userLoading && !user) return <Login />;
  if (!userLoading && dataLoaded && (!user || !hasPermission))
    return <AccessDenied />;
  if (
    !userLoading &&
    dataLoaded &&
    user &&
    hasAllPermissions(permissions, permissionsList)
  )
    return <>{children}</>;
}
