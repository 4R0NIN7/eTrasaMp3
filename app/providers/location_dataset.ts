import morskieOkoPoints from '@providers/cep_morskie_oko.json'
import palenicaWlosienicaPoints from '@providers/palenica_włosienica.json'

export type TGeoPoint = {
  id: string
  latitude: number
  longitude: number
  radius: number
  audioFile: string
}

export type DatasetName = 'palenica' | 'morskieOko'

export const LOCATION_DATASETS: Record<DatasetName, TGeoPoint[]> = {
  palenica: palenicaWlosienicaPoints.map((p) => ({ ...p })),
  morskieOko: morskieOkoPoints.map((p) => ({ ...p })),
}
