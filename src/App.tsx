import React, { useEffect, useState } from 'react';
import { NuiProvider } from 'react-fivem-hooks';
import styled from 'styled-components';
import { IPhoneSettings } from '@project-error/npwd-types';
import { i18n } from 'i18next';
import { Theme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { GarageItem } from './types/garage';
import { MockGarage } from './utils/constants';
import { VehicleList } from './components/VehicleList';
import fetchNui from './utils/fetchNui';
import Header from './components/Header';

const Container = styled.div<{ isDarkMode: any }>`
  flex: 1;
  padding: 1rem;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  overflow: auto;
  max-height: 100%;
  background-color: #fafafa;
  ${({ isDarkMode }) =>
    isDarkMode &&
    `
    background-color: #212121;
  `}
`;
interface AppProps {
  theme: Theme;
  i18n: i18n;
  settings: IPhoneSettings;
}

const App = (props: AppProps) => {
  const [vehicles, setVehicles] = useState<GarageItem[] | undefined>([]);
  const [mappedVeh, setMappedVeh] = useState<any>(null);

  const isDarkMode = props.theme.palette.mode === 'dark';

  useEffect(() => {
    const getVehicles = async () => {
      const resp = await fetchNui<any>('npwd:jg-advancedgarages:getVehicles', false, MockGarage);
      setVehicles(resp);
    };

    getVehicles();
  }, []);

  useEffect(() => {
    if (vehicles) {
      const mappedVehicles = vehicles?.reduce((vehs: any, vehicle: any) => {
        if (!vehs[vehicle.type]) vehs[vehicle.type] = [];
        vehs[vehicle.type].push(vehicle);
        return vehs;
      }, {});

      setMappedVeh(mappedVehicles);
    }
  }, [vehicles]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={props.theme}>
        <Header>Garage</Header>
        <Container isDarkMode={isDarkMode}>
          {mappedVeh && <VehicleList isDarkMode={isDarkMode} vehicles={mappedVeh} />}
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <NuiProvider>
    <App {...props} />
  </NuiProvider>
);

export default WithProviders;
