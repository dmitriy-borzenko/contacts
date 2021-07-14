import { useEffect,useState } from 'react'
import { DATA_VIEW_MODES } from '../Contacts/constansts/view_mode';


const getInitialViewMode = () => {
  return localStorage.getItem("dataViewMode") || DATA_VIEW_MODES.TABLE;
};
export const useDataViewMode = () => {
  const [dataViewMode, setdataViewMode] = useState(getInitialViewMode);

  useEffect(() => {
    localStorage.setItem("dataViewMode", dataViewMode);
  }, [dataViewMode]);
  return [dataViewMode, setdataViewMode];
}
