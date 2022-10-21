import {
  Box,
  ListItem,
  List,
  ListSubheader,
  Collapse,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
} from '@mui/material';
import { orange, green, grey, red } from '@mui/material/colors';
import React, { useState } from 'react';
import { GarageItem } from '../types/garage';
import FlightIcon from '@mui/icons-material/Flight';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import VehicleDetails from './VehicleDetails';

interface VehicleListProps {
  isDarkMode: boolean;
  vehicles: any;
}

export const VehicleList: React.FC<VehicleListProps> = ({ vehicles, isDarkMode }) => {
  const [collapseId, setCollapseId] = useState<string | null>('car');
  const typeIcon = {
    car: {
      icon: <DirectionsCarIcon sx={{ fontSize: 30 }} />,
      status: {
        out: orange[500],
        parked: green[500],
        impound: red[500],
      },
    },
    aircraft: {
      icon: <FlightIcon sx={{ fontSize: 30 }} />,
      status: {
        out: orange[500],
        parked: green[500],
        impound: red[500],
      },
    },
    boat: {
      icon: <DirectionsBoatIcon sx={{ fontSize: 30 }} />,
      status: {
        out: orange[500],
        parked: green[500],
        impound: red[500],
      },
    },
    bike: {
      icon: <PedalBikeIcon sx={{ fontSize: 30 }} />,
      status: {
        out: orange[500],
        parked: green[500],
        impound: red[500],
      },
    },
  };

  const expandItem = (id: string) => {
    setCollapseId(id);
  };

  return (
    <Box>
      {Object.keys(vehicles).map((key, i) => (
        <List
          key={i}
          subheader={
            <ListSubheader
              sx={{ cursor: 'pointer', position: 'static' }}
              onClick={() => expandItem(key)}
            >
              {key.toUpperCase()}
            </ListSubheader>
          }
        >
          <Collapse in={collapseId === key}>
            {vehicles[key].map((veh: GarageItem, i: number) => {
              return (
                <ListItem key={i}>
                  <Accordion
                    sx={{
                      width: '100%',
                      borderBottom: '5px solid',
                      borderBottomColor: typeIcon[veh.type].status[veh.state],
                      borderRadius: '8px!important',
                    }}
                  >
                    <AccordionSummary>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          {typeIcon[veh.type].icon}
                          <Stack spacing={0.5}>
                            <Typography>{veh.brand + ' ' + veh.vehicle}</Typography>
                            <Typography
                              sx={{
                                width: 'fit-content',
                                fontSize: 12,
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                color: orange[500],
                                background: 'black',
                                padding: '3px 7px',
                                borderRadius: '4px',
                              }}
                            >
                              {veh.plate}
                            </Typography>
                          </Stack>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginLeft: '7.5px',
                            color: typeIcon[veh.type].status[veh.state],
                          }}
                        >
                          {veh.state.toUpperCase()}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <VehicleDetails veh={veh} />
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
              );
            })}
          </Collapse>
        </List>
      ))}
    </Box>
  );
};
