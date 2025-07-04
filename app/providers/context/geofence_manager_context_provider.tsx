import { useLocationStore } from '@hooks/use_location_store'
import { GeofenceManager, geofenceManager } from '@services/geofence_manager'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

type GeofenceManagerContextType = {
  geofenceManager: GeofenceManager | null
  isReady: boolean
  error: Error | null
}

const GeofenceManagerContext = createContext<GeofenceManagerContextType>({
  geofenceManager: null,
  isReady: false,
  error: null,
})

const useGeofenceManager = () => useContext(GeofenceManagerContext)

export const GeofenceManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { locations } = useLocationStore()
  const geofenceManagerRef = useRef(geofenceManager)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        await geofenceManagerRef.current.configure(locations)
        setIsReady(true)
      } catch (err) {
        console.error('[GeofenceManager] Initialization error:', err)
        setError(err as Error)
      }
    }

    init()
  }, [locations])

  return (
    <GeofenceManagerContext.Provider
      value={{
        geofenceManager: geofenceManagerRef.current,
        isReady,
        error,
      }}>
      {children}
    </GeofenceManagerContext.Provider>
  )
}

export { useGeofenceManager }
