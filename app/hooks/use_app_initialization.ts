import { useLocationStore } from '@hooks/use_location_store'
import { geofenceManager } from '@services/geofence_manager'
import { useEffect, useState } from 'react'

export const useAppInitialization = () => {
  const { locations } = useLocationStore()
  const [error, setError] = useState<Error | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      setIsReady(false)
      try {
        await geofenceManager.configure(locations)
        setIsReady(true)
      } catch (err) {
        console.error('[App Initialization] Error:', err)
        setError(err as Error)
      }
    }

    init()
  }, [])

  return { isReady, error }
}
