'use client';

import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { customSelectStyles } from './custom-styles';
import { StateContextConfirm, StatesConfirmType } from '../uikit/state-context';

const apiKey = process.env.API_NOVA_POST;

type Region = {
  Description: string;
  Ref: string;
};

type City = {
  Description: string;
  Ref: string;
};

type Warehouse = {
  Description: string;
  Ref: string;
};

export type OptionType = {
  value: string;
  label: string;
};

export function FormPlace() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);

  const states: StatesConfirmType = useContext(StateContextConfirm);

  useEffect(() => {
    fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: apiKey,
        modelName: 'Address',
        calledMethod: 'getAreas',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRegions(data.data);
        }
      });
  }, []);

  // Fetch cities when region changes
  useEffect(() => {
    if (!selectedRegion) return;

    fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: apiKey,
        modelName: 'Address',
        calledMethod: 'getCities',
        methodProperties: {
          AreaRef: selectedRegion,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCities(data.data);
        }
      });
  }, [selectedRegion]);

  // Fetch warehouses when city changes
  useEffect(() => {
    if (!selectedCity) return;

    fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: apiKey,
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityRef: selectedCity,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWarehouses(data.data);
        }
      });
  }, [selectedCity]);

  return (
    <div className="flex flex-col">
      <h2 className="leading-cssnormal tracking-[2.24px] text-[2rem] text-white font-semibold max-sm:text-[16px] max-sm:tracking-[1.12px]">
        2. Дані для доставки
      </h2>
      <div className="flex flex-col pt-7 gap-[21px] max-sm:pt-1 max-sm:pl-[18px] max-sm:gap-[10px]">
        <div>
          <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
            <p className="text-[1.25rem]/[20px] tracking-[1.4px] text-white pl-[9px] font-medium max-sm:text-[14px] max-sm:tracking-[0.98px] max-sm:pl-0">Область*</p>
            <div className="w-[17.1875rem]">
              <Select<OptionType>
                  ref={states.regionSelectRef}
                options={regions.map((r) => ({ value: r.Ref, label: r.Description }))}
                isClearable
                placeholder="Оберіть область"
                styles={customSelectStyles}
                onChange={(option) => {
                  setSelectedRegion(option?.value || null);
                  setSelectedCity(null);
                  setSelectedWarehouse(null);
                  setCities([]);
                  setWarehouses([]);
                }}
                value={regions.find((r) => r.Ref === selectedRegion)
                  ? { value: selectedRegion, label: regions.find((r) => r.Ref === selectedRegion)?.Description || '' }
                  : null}
              />
            </div>
          </div>
          <p className={`${states.isRequiredRegionActive ? "block" : "hidden"} text-red-500 text-[0.775rem] pl-2`}>Це поле обов'язкове*</p>          
        </div>
        <div>
          <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
            <p className="text-[1.25rem]/[20px] tracking-[1.4px] text-white pl-[9px] font-medium max-sm:text-[14px] max-sm:tracking-[0.98px] max-sm:pl-0">Місто*</p>
            <div className="w-[17.1875rem]">
              <Select<OptionType>
              ref={states.citySelectRef}
                options={cities.map((c) => ({ value: c.Ref, label: c.Description }))}
                isClearable
                placeholder="Оберіть місто"
                styles={customSelectStyles}
                onChange={(option) => {
                  setSelectedCity(option?.value || null);
                  setSelectedWarehouse(null);
                  setWarehouses([]);
                }}
                isDisabled={!selectedRegion}
                value={cities.find((c) => c.Ref === selectedCity)
                  ? { value: selectedCity, label: cities.find((c) => c.Ref === selectedCity)?.Description || '' }
                  : null}
              />
            </div>
          </div>
          <p className={`${states.isRequiredCityActive ? "block" : "hidden"} text-red-500 text-[0.775rem] pl-2`}>Це поле обов'язкове*</p>          
        </div>
        <div>
          <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
            <p className="text-[1.25rem]/[20px] tracking-[1.4px] text-white pl-[9px] font-medium max-sm:text-[14px] max-sm:tracking-[0.98px] max-sm:pl-0">Відділення НП*</p>
            <div className="w-[17.1875rem]">
              <Select<OptionType>
              ref={states.warehouseSelectRef}
                options={warehouses.map((w) => ({ value: w.Ref, label: w.Description }))}
                isClearable
                placeholder="Оберіть відділення"
                styles={customSelectStyles}
                onChange={(option) => {
                  setSelectedWarehouse(option?.value || null);
                }}
                isDisabled={!selectedCity}
                value={warehouses.find((w) => w.Ref === selectedWarehouse)
                  ? {
                      value: selectedWarehouse,
                      label: warehouses.find((w) => w.Ref === selectedWarehouse)?.Description || '',
                    }
                  : null}
              />
            </div>
          </div>
          <p className={`${states.isRequiredWarehouseActive ? "block" : "hidden"} text-red-500 text-[0.775rem] pl-2`}>Це поле обов'язкове*</p>          
        </div>

      </div>
      <p className="text-[1.25rem] max-sm:text-[1rem] rounded-[20px] bg-[#5E5A53] leading-cssnormal p-4 max-md:p-2 mt-6 max-md:mt-4 max-sm:pt-[14px] max-sm:w-full pl-[11px] text-white font-normal">
        Доставка відбувається виключно Новою Поштою та <strong>накладеним платежем</strong>!
      </p>
    </div>
  );
}
