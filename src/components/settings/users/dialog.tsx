import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Avatar,
} from "@material-tailwind/react";
import Select from "react-select";
import { useEffect, useState } from "react";
import User from "@/src/models/user";
import {
  assignUserRoles,
  removeUserRoles,
  useRoles,
  useUserRoles,
} from "@/src/services/users/service";
import makeAnimated from "react-select/animated";
import React from "react";

export default function UserDialog({
  user,
  open,
  mode,
  handleOpen,
  updateUser,
}: {
  user: User;
  open: boolean;
  mode: boolean;
  handleOpen: () => void;
  updateUser: () => void;
}) {
  const [, setUserName] = useState<any>(user?.nickname);
  const [, setUserEmail] = useState<any>(user?.email);
  const [selectedRoles, setSelectedRoles] = useState<any>([]);
  const [rolesList, setRolesList] = useState<any>([]);
  const { data: userRoles } = useUserRoles(user?.user_id);
  const { data: roles } = useRoles();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    if (user && userRoles && roles) {
      setUserName(user.name);
      setUserEmail(user.email);
      // console.log(userRoles);
      const userRole = userRoles.map((rol: any) => {
        return { value: rol.id, label: rol.name };
      });
      const allRoles = roles.map((rol: any) => {
        return { value: rol.id, label: rol.name };
      });
      setSelectedRoles(userRole);
      setRolesList(allRoles);
    }
  }, [userRoles, roles, user]);

  const handleUserSubmit = async () => {
    const roleIds = selectedRoles.map((role: any) => role.value);

    const _userRoles = {
      roles: roleIds,
    };
    assignUserRoles({
      id: user.user_id,
      data: _userRoles,
      handleOpen,
      updateUser,
    });

    const action = mode ? assignUserRoles : removeUserRoles;

    action({
      id: user.user_id,
      data: _userRoles,
      handleOpen,
      updateUser,
    });
  };

  return (
    <div>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>{mode ? "Asignar roles" : "Remover roles"}</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4 items-center">
            <Avatar src={`${user?.picture}`} className="w-40 h-40"></Avatar>
            <Input
              label="Nombre"
              crossOrigin={""}
              onChange={(e) => setUserEmail(e.target.value)}
              defaultValue={user?.name || ""}
              disabled
            />
            <Input
              label="Correo"
              crossOrigin={""}
              onChange={(e) => setUserEmail(e.target.value)}
              defaultValue={user?.email || ""}
              disabled
            />
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              placeholder="Seleccione los roles"
              onChange={(e) => setSelectedRoles(e)}
              value={selectedRoles}
              options={mode ? rolesList : selectedRoles}
              noOptionsMessage={() => "No hay mas roles"}
              className="w-full"
            />

            <Button
              className="bg-navy w-full"
              disabled={selectedRoles.length > 0 ? false : true}
              onClick={handleUserSubmit}
            >
              {mode ? "Asignar roles" : "Remover roles"}
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
