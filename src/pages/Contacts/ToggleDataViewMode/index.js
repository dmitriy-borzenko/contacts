import React, { useCallback } from 'react'
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Button from '@material-ui/core/Button';

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import { DATA_VIEW_MODES } from '../constansts/view_mode';
import RefreshIcon from '@material-ui/icons/Refresh';

export const ToggleDataViewMode = ({ dataViewMode, setdataViewMode, setIsRefresh, isRefresh }) => {
  const handleChangeViewMode = useCallback((_, nextView) => {
    setdataViewMode(nextView);
  }, [setdataViewMode]);

  return (
    <>
      <ToggleButtonGroup orientation="horizontal" value={dataViewMode} exclusive onChange={handleChangeViewMode}>
        <Button onClick={
         () => setIsRefresh(!isRefresh)}>
          <RefreshIcon />
        </Button>
        <ToggleButton value={DATA_VIEW_MODES.TABLE} aria-label={DATA_VIEW_MODES.TABLE}>
          <Tooltip title={DATA_VIEW_MODES.TABLE}>
            <ViewListIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value={DATA_VIEW_MODES.GRID} aria-label={DATA_VIEW_MODES.GRID}>
          <Tooltip title={DATA_VIEW_MODES.GRID}>
            <ViewModuleIcon />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}
