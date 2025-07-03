import morskieOkoPoints from '@providers/json/cep_morskie_oko.json'
import palenicaWlosienicaPoints from '@providers/json/palenica_włosienica.json'

type TGeoPoint = {
  id: string
  latitude: number
  longitude: number
  radius: number
  audioFile: string
}

type DatasetName = 'palenica' | 'morskieOko'

const LOCATION_DATASETS: Record<DatasetName, TGeoPoint[]> = {
  palenica: palenicaWlosienicaPoints.map((p) => ({ ...p })),
  morskieOko: morskieOkoPoints.map((p) => ({ ...p })),
}

export { DatasetName, LOCATION_DATASETS, TGeoPoint }
