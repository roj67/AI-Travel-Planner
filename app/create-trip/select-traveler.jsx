import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { SelectTravelersList} from '../../constants/Options'
import OptionCard from '../../components/CreateTrip/OptionCard'
import { CreateTripContext } from "./../../context/CreateTripContext"

export default function SelectTraveler() {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedTravelers, setSelectedTravelers] = useState();
  const {tripData, setTripData} = useContext(CreateTripContext);

  useEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    })
  },[])

  useEffect(()=>{
    setTripData({...tripData, traveler: selectedTravelers})
  }, [selectedTravelers])

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <Text style={{
        fontSize: 35,
        fontFamily: 'outfit-bold',
        marginTop: 30
      }}>Who's Traveling</Text>
      <View style={{marginTop: 20}}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 23
        }}>Choose your travelers</Text>

        <FlatList 
        data={SelectTravelersList}
        renderItem={({item, index})=>(
          <TouchableOpacity 
          onPress={()=>setSelectedTravelers(item)}
          style={{
            marginVertical: 10
          }}>
            <OptionCard option={item} selectedOptions={selectedTravelers}/>
          </TouchableOpacity>
        )}/>
      </View>

      <TouchableOpacity 
      onPress={()=> router.push('/create-trip/select-dates')}
      style={{
        padding: 15, 
        backgroundColor: Colors.Primary,
        borderRadius: 15,
        marginTop: 20
      }}>
        <Text style={{
          textAlign: 'center',
          color: Colors.WHITE,
          fontFamily: 'outfit-medium',
          fontSize: 20
        }}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}