import { Colors } from '@utils/ui/colors'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

type TLoaderProps = { message: string }

const Loader = ({ message }: TLoaderProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.PrimaryText} />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    marginTop: 12,
    fontSize: 18,
    color: Colors.PrimaryText,
    textAlign: 'center',
  },
})

export { Loader }
