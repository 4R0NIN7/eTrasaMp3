import { LOCATIONS } from '@providers/data'
import { formatDistance, getDistanceMeters } from '@utils/functions'
import { capitalize } from 'lodash'
import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

type Props = {
  position: { latitude: number; longitude: number }
  highlightId?: string
}

export const LocationList = ({ position, highlightId }: Props) => {
  const data = LOCATIONS.map((point) => ({
    id: point.id,
    distance: getDistanceMeters(position.latitude, position.longitude, point.latitude, point.longitude),
  })).sort((a, b) => a.distance - b.distance)

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        const isClosest = item.id === highlightId
        return (
          <Text style={[styles.itemText, isClosest && styles.highlight]}>
            {isClosest ? '🚩 ' : ''}
            {index + 1}. {capitalize(item.id)}: {formatDistance(item.distance)}
          </Text>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  itemText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 2,
    color: '#d2e1df',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
})
