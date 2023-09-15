import { Service } from "@prisma/client";
import React from "react";
import Select, { ActionMeta, SingleValue, StylesConfig } from "react-select";

export const ServiceSelect = ({
  services,
  onChange,
}: {
  services: Service[];
  onChange:
    | ((
        newValue: SingleValue<{
          label: string;
          value: string;
        }>,
        actionMeta: ActionMeta<{
          label: string;
          value: string;
        }>
      ) => void)
    | undefined;
}) => {
  const selectStyles = {
    container: (base) => ({
      ...base,
    }),
    control: (base) => ({
      // ...base,
      display: "flex",
      border: "1px solid rgba(0, 0, 0, .1)",
      padding: ".25rem",
      borderRadius: ".25rem",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "white",
      padding: ".25rem",
      border: "1px solid rgba(0, 0, 0, .1)",
      borderRadius: ".25rem",
    }),
    input: (base) => ({ ...base }),
    placeholder: (base) => ({ ...base, opacity: "50%" }),
    option: (base) => ({
      ...base,
      ":hover": { backgroundColor: "#e4e4e7" },
      borderRadius: ".25rem",
      padding: ".25rem .5rem",
    }),
  } satisfies StylesConfig;
  return (
    <Select
      instanceId={"teste"}
      placeholder={"Escolha um serviço..."}
      options={services?.map((service) => ({
        label: service.name,
        value: service.name,
      }))}
      onChange={onChange}
      styles={selectStyles}
      isClearable
      unstyled
    />
  );
};
