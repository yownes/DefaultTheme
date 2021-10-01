import React from "react";
import { useGetZones } from "@yownes/api";

import { Select, SelectItem } from "../../molecules";

interface ListZonesProps {
  countryId?: string | null;
  onSelect: (country?: string | null) => void;
  defaultValue?: string;
}

const ListZones = ({ countryId, onSelect, defaultValue }: ListZonesProps) => {
  const { data } = useGetZones(countryId);
  return (
    <Select
      placeholder="Selecciona la provincia"
      defaultValue={defaultValue}
      onChange={onSelect}
      formatSelectedValue={(value) =>
        data?.zonesList?.content?.find((c) => c?.id === value)?.name || ""
      }
    >
      {data?.zonesList?.content?.map((zone) => (
        <SelectItem key={zone?.id} id={zone?.id} title={zone?.name} />
      ))}
    </Select>
  );
};

export default ListZones;
