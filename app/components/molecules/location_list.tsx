import { AnimatedFlag } from '@atoms/animated_flag'
import { TGeoPoint } from '@providers/location_dataset.types'
import { formatDistance, getDistanceMeters } from '@utils/functions'
import { Colors } from '@utils/ui/colors'
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

type TProps = {
  position: { latitude: number; longitude: number }
  locations: TGeoPoint[]
}

type TListItem = {
  id: string
  distance: number
}

export const LocationList = ({ position, locations }: TProps) => {
  const data = locations
    .map((point) => ({
      id: point.id,
      distance: getDistanceMeters(position.latitude, position.longitude, point.latitude, point.longitude),
    }))
    .sort((a, b) => a.distance - b.distance)

  const nearbyPoint = useMemo(() => {
    if (!position) return undefined
    return locations.find((point) => {
      const dist = getDistanceMeters(position.latitude, position.longitude, point.latitude, point.longitude)
      return dist <= point.radius
    })
  }, [position, locations])

  const keyExtractor = (item: TListItem) => item.id
  const renderItem = ({ item, index }: { item: TListItem; index: number }) => {
    const isClosest = item.id === nearbyPoint?.id
    return (
      <Text style={[styles.itemText, isClosest && styles.highlight]}>
        {isClosest && <AnimatedFlag active={isClosest} />}
        {index + 1}. {item.id}: {formatDistance(item.distance)}
      </Text>
    )
  }

  return <FlatList data={data} keyExtractor={keyExtractor} renderItem={renderItem} />
}

const styles = StyleSheet.create({
  itemText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 2,
    color: Colors.PrimaryText,
  },
  highlight: {
    fontWeight: 'bold',
    color: Colors.HeadingText,
  },
})
