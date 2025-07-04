import { DatasetName, LOCATION_DATASETS, TGeoPoint } from '@providers/location_dataset.types'
import { geofenceManager } from '@services/geofence_manager'
import { useEffect, useMemo, useState } from 'react'

export const useLocationStore = () => {
  const [dataset, setDataset] = useState<DatasetName>('palenica')

  const locations: TGeoPoint[] = useMemo(() => {
    return LOCATION_DATASETS[dataset].map((p) => ({ ...p }))
  }, [dataset])

  const toggleDataset = () => {
    setDataset((prev) => (prev === 'palenica' ? 'morskieOko' : 'palenica'))
  }

  useEffect(() => {
    geofenceManager.updateLocations(locations)
  }, [locations])

  return { dataset, locations, toggleDataset }
}
