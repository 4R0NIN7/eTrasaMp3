import { useLocationStore } from '@hooks/use_location_store'
import { geofenceManager } from '@services/geofence_manager'
import { useEffect, useState } from 'react'

export const useAppInitialization = () => {
  const { locations } = useLocationStore()
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [initCount, setInitCount] = useState(0)

  useEffect(() => {
    const init = async () => {
      setIsReady(false)
      try {
        await geofenceManager.configure(locations)
        setIsReady(true)
        setInitCount((prev) => prev + 1)
      } catch (err) {
        console.error('[App Initialization] Error:', err)
        setError(err as Error)
      }
    }

    init()
  }, [locations])

  return { isReady, error, initCount }
}
