import React from "react";
import { useGetCountries } from "@yownes/api";

import { Select, SelectItem } from "../../molecules";

interface ListCountriesProps {
  onSelect: (country?: string | null) => void;
  defaultValue?: string;
}

const ListCountries = ({ onSelect, defaultValue }: ListCountriesProps) => {
  const { data } = useGetCountries();
  return (
    <Select
      placeholder="Selecciona el país"
      defaultValue={defaultValue}
      onChange={onSelect}
      formatSelectedValue={(value) =>
        data?.countriesList?.content?.find((c) => c?.id === value)?.name || ""
      }
    >
      {data?.countriesList?.content?.map((country) => (
        <SelectItem key={country?.id} id={country?.id} title={country?.name} />
      ))}
    </Select>
  );
};

export default ListCountries;
