import { DatasetName, LOCATION_DATASETS, TGeoPoint } from '@providers/location_dataset'
import { geofenceManager } from '@services/geofence_manager'
import { useMemo, useState } from 'react'

export const useLocationStore = () => {
  const [dataset, setDataset] = useState<DatasetName>('palenica')

  const locations: TGeoPoint[] = useMemo(() => {
    return LOCATION_DATASETS[dataset].map((p) => ({ ...p }))
  }, [dataset])

  const toggleDataset = () => {
    setDataset((prev) => (prev === 'palenica' ? 'morskieOko' : 'palenica'))
    geofenceManager.updateLocations(locations)
  }

  return { dataset, locations, toggleDataset }
}
