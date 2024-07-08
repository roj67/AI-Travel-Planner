import { View, Text, TouchableOpacity } from 'react-native'
import React, {useContext, useEffect} from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from "./../../context/CreateTripContext"
import moment from 'moment';

export default function ReviewTrip() {
    const navigation = useNavigation();
    const router = useRouter();

    const {tripData, setTripData} = useContext(CreateTripContext)

    useEffect(()=>{
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: ''
        })
    },[]);

  return (
    <View style={{paddingTop: 75, padding: 25, backgroundColor: Colors.WHITE, height: '100%'}}>
      <Text style={{
        fontSize: 35,
        fontFamily: 'outfit-bold',
        marginTop: 20
        }}>Review your trip</Text>

        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>Before generating your trip, please review your selection</Text>

            <View style={{marginTop:40 , display: 'flex', flexDirection: 'row', gap:20}}>
                <Text style={{fontSize: 30}}>📍</Text>
                <View>
                    <Text style={{fontFamily: 'outfit', fontSize:20, color: Colors.GRAY}}>Destination</Text>
                    <Text style={{fontFamily: 'outfit-medium', fontSize:20 }}>{tripData?.locationInfo?.name}</Text>
                </View>
            </View>

            <View style={{marginTop:25 , display: 'flex', flexDirection: 'row', gap:20}}>
                <Text style={{fontSize: 30}}>📆</Text>
                <View>
                    <Text style={{fontFamily: 'outfit', fontSize:20, color: Colors.GRAY}}>Travel Date</Text>
                    <Text style={{fontFamily: 'outfit-medium', fontSize:20 }}>{moment(tripData?.startDate).format('DD MMM') + " To " + moment(tripData?.endDate).format('DD MMM') + "  (" + tripData?.totalNoOfDays + " days)"}</Text>
                </View>
            </View>

            <View style={{marginTop:25 , display: 'flex', flexDirection: 'row', gap:20}}>
                <Text style={{fontSize: 30}}>🚙</Text>
                <View>
                    <Text style={{fontFamily: 'outfit', fontSize:20, color: Colors.GRAY}}>Who is Traveling</Text>
                    <Text style={{fontFamily: 'outfit-medium', fontSize:20 }}>{tripData?.traveler?.title}</Text>
                </View>
            </View>
            
            <View style={{marginTop:25 , display: 'flex', flexDirection: 'row', gap:20}}>
                <Text style={{fontSize: 30}}>💰</Text>
                <View>
                    <Text style={{fontFamily: 'outfit', fontSize:20, color: Colors.GRAY}}>Budget</Text>
                    <Text style={{fontFamily: 'outfit-medium', fontSize:20 }}>{tripData?.budget}</Text>
                </View>
            </View>
        </View>
        <TouchableOpacity 
        onPress={()=>router.replace('/create-trip/generate-trip')}
        style={{
            padding: 15, 
            backgroundColor: Colors.Primary,
            borderRadius: 15,
            marginTop: 80
        }}>
            <Text style={{
            textAlign: 'center',
            color: Colors.WHITE,
            fontFamily: 'outfit-medium',
            fontSize: 20
            }}>Build My Trip</Text>
      </TouchableOpacity>
    </View>
  )
}