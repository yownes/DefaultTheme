import React from "react";
import { useQuery } from "@apollo/client";

import { ZONES_LIST } from "../../../api/queries";
import { ZonesList } from "../../../api/types/ZonesList";
import { Select, SelectItem } from "../../molecules";

interface ListZonesProps {
  countryId: string;
  onSelect: (country?: string | null) => void;
  defaultValue?: string;
}

const ListZones = ({ countryId, onSelect, defaultValue }: ListZonesProps) => {
  const { data } = useQuery<ZonesList>(ZONES_LIST, {
    variables: { countryId },
  });
  return (
    <Select
      placeholder="Selecciona la provincia"
      defaultValue={defaultValue}
      onChange={onSelect}
    >
      {data?.zonesList?.content?.map((zone) => (
        <SelectItem key={zone?.id} id={zone?.id} title={zone?.name} />
      ))}
    </Select>
  );
};

export default ListZones;
