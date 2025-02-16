import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function FlightInfo({flightData}) {
  return (
    <View style={{
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY,
        padding: 10,
        borderRadius: 15
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20
            }}>✈️ Flights</Text>
            <TouchableOpacity style={{
            backgroundColor: Colors.Primary,
            padding: 5,
            width: 100,
            borderRadius: 7,
            marginTop: 7
            }}>
            <Text style={{
                fontFamily: 'outfit',
                color: Colors.WHITE,
                textAlign: 'center'
            }}>Book Here</Text>
        </TouchableOpacity>
        </View>
      
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 20,
      }}>Airline: Delta</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17,
      }}>Price: {flightData?.price ?? 'Unknown'}</Text>
    </View>
  )
}