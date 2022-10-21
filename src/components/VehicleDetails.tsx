import React from 'react';
import { GarageItem } from '../types/garage';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';
import { ServerPromiseResp } from '../types/common';
import fetchNui from '../utils/fetchNui';
import { HelpOutline } from '@mui/icons-material';

const VehicleDetails = ({ veh }: { veh: GarageItem }) => {
  const handleTrackVehicle = (plate: string) => {
    fetchNui<ServerPromiseResp>('npwd:jg-advancedgarages:requestWaypoint', { plate }).then(
      (res) => {
        console.log(res.data);
      },
    );
  };

  return (
    <>
      <List sx={{ width: '90%', mb: '8px' }}>
        {veh.impound_reason ? (
          <ListItem disablePadding sx={{ borderBottom: '1px solid #666', padding: '8px 0' }}>
            <ListItemIcon sx={{ ml: '5px', mr: '20px', minWidth: '25px' }}>
              <Tooltip title="Impound Reason">
                <HelpOutline />
              </Tooltip>
            </ListItemIcon>
            <ListItemText
              primary={<Typography sx={{ fontSize: '15px' }}>{veh.impound_reason}</Typography>}
            />
          </ListItem>
        ) : (
          <ListItem disablePadding sx={{ borderBottom: '1px solid #666', padding: '8px 0' }}>
            <ListItemIcon sx={{ ml: '5px', mr: '20px', minWidth: '25px' }}>
              <Tooltip title="Location">
                <LocationOnIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText
              primary={<Typography sx={{ fontSize: '15px' }}>{veh.garage}</Typography>}
            />
          </ListItem>
        )}

        <ListItem disablePadding sx={{ borderBottom: '1px solid #666', padding: '8px 0' }}>
          <ListItemIcon sx={{ ml: '5px', mr: '20px', minWidth: '25px' }}>
            <Tooltip title="Engine">
              <BuildIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: '15px' }}>{Math.ceil(veh.engine / 10)}%</Typography>
            }
          />
        </ListItem>
        <ListItem disablePadding sx={{ borderBottom: '1px solid #666', padding: '8px 0' }}>
          <ListItemIcon sx={{ ml: '5px', mr: '20px', minWidth: '25px' }}>
            <Tooltip title="Fuel">
              <LocalGasStationIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontSize: '15px' }}>{Math.ceil(veh.fuel)}%</Typography>}
          />
        </ListItem>
        <ListItem disablePadding sx={{ borderBottom: '1px solid #666', padding: '8px 0' }}>
          <ListItemIcon sx={{ ml: '5px', mr: '20px', minWidth: '25px' }}>
            <Tooltip title="Body">
              <DirectionsCarIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontSize: '15px' }}>{Math.ceil(veh.body / 10)}%</Typography>}
          />
        </ListItem>
      </List>

      <Button
        color="primary"
        variant="contained"
        disabled={veh.state !== 'out'}
        onClick={() => handleTrackVehicle(veh.plate)}
      >
        Track
      </Button>
    </>
  );
};

export default VehicleDetails;
