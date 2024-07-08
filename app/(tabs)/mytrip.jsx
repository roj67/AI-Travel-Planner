import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import {React, useEffect, useState} from 'react'
import {Colors} from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig'
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';
import { fetchImageFromUnsplash } from '../../configs/UnsplashAPI';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false)
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(()=>{
    user && GetMyTrips()
  }, [user])

  const GetMyTrips = async () => {
    setLoading(true)
    setUserTrips([])
    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user.email))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const tempData = doc.data();
      const place = tempData.tripPlan.trip.destination;
      const imageURL = await fetchImageFromUnsplash(place);
      const data = 
        {
          ...tempData,
          imageURL: imageURL
        }
      setUserTrips(prev=> [...prev, data])
    });
    setLoading(false)
  }
  return (
    <ScrollView style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }} contentContainerStyle={{paddingBottom: 65}}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30
        }}>My Trips</Text>
        <TouchableOpacity onPress={() => router.push('/create-trip/search-place')}>
          <Ionicons name='add-circle' size={50} color="black"/>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size={'large'} color={Colors.Primary}/>}
      {
        userTrips?.length == 0?
        <StartNewTripCard/>: <UserTripList userTrips={userTrips}/>
      }
    </ScrollView>
  )
}