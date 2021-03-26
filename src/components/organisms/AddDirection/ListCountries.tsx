import React from "react";
import { useQuery } from "@apollo/client";

import { COUNTRIES_LIST } from "../../../api/queries";
import { CountriesList } from "../../../api/types/CountriesList";
import { Select, SelectItem } from "../../molecules";

interface ListCountriesProps {
  onSelect: (country?: string | null) => void;
  defaultValue?: string;
}

const ListCountries = ({ onSelect, defaultValue }: ListCountriesProps) => {
  const { data } = useQuery<CountriesList>(COUNTRIES_LIST);
  return (
    <Select
      placeholder="Selecciona el país"
      defaultValue={defaultValue}
      onChange={onSelect}
    >
      {data?.countriesList?.content?.map((country) => (
        <SelectItem key={country?.id} id={country?.id} title={country?.name} />
      ))}
    </Select>
  );
};

export default ListCountries;
