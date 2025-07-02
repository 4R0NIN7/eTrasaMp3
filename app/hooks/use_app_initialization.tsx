import { audioPlayer } from '@services/audio_player'
import { geofenceManager } from '@services/geofence_manager'
import { useEffect, useState } from 'react'

export const useAppInitialization = () => {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        await audioPlayer.configure()
        await geofenceManager.configure()
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
