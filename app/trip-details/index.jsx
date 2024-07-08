import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import { PlannedTripItem } from '../../components/TripDetails/PlannedTrip';

export default function TripDetails() {
    const navigation= useNavigation();
    const {trip, tripData} = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState(undefined);
    const [planDetails, setPlanDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
        setTripDetails(JSON.parse(trip));
    },[]);

    
    useEffect(()=>{
        if(tripDetails){
            setLoading(true);
            var tempList = [];
            const tempEntries = Object.entries(tripDetails.tripPlan?.trip.itinerary);
            tempEntries.sort((a, b) => a[0].localeCompare(b[0])); 
            for (const key in tempEntries) {
                tempList.push(
                    <View style={{
                        marginTop: 10
                    }} key={key}>
                        <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 20
                        }}>Day {Number(key) + 1}</Text>
                        <PlannedTripItem item={tempEntries[key][1].morning} index={Number(key) + 1}/>
                        <PlannedTripItem item={tempEntries[key][1].afternoon} index={Number(key) + 1}/>
                        <PlannedTripItem item={tempEntries[key][1].evening} index={Number(key) + 1}/>
                        <PlannedTripItem item={tempEntries[key][1].night} index={Number(key) + 1}/>
                    </View>
                );
            }
            setPlanDetails(tempList)
            setLoading(false)
        }
    },[tripDetails])
    
    const formatData = (data) => {
        return JSON.parse(data)
    }

  return tripDetails && (
    <ScrollView style={{
        backgroundColor: Colors.WHITE
    }}>
      <Image source={{uri: tripDetails.imageURL}} style={{width: '100%', height: 330}}/>
      <View style={{padding: 15, backgroundColor: Colors.WHITE, height: '100%', marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <Text style={{
            fontSize: 25, 
            fontFamily: 'outfit-bold',
        }}>{tripDetails.tripPlan?.trip.destination}</Text>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            marginTop: 5
        }}>
            <Text style={{fontFamily: 'outfit-medium', fontSize: 18, color: Colors.GRAY}}>{moment(formatData(tripData).startDate).format('DD MMM yyyy')}</Text>
            <Text style={{fontFamily: 'outfit-medium', fontSize: 18, color: Colors.GRAY}}>- {moment(formatData(tripData).endDate).format('DD MMM yyyy')}</Text>
        </View>
        <Text style={{
            fontFamily: 'outfit',
            fontSize: 17,
            color: Colors.GRAY
        }}>🚙 {formatData(tripData).traveler.title}</Text>
        {/* Flight info */}
            <FlightInfo flightData={tripDetails.tripPlan?.trip.flight} />
        {/* Hotels List */}
            <HotelList hotelList={tripDetails.tripPlan?.trip.hotel} />
        {/* trip day planner info */}
            <View style={{
                marginTop: 20
            }}>
            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit-bold'
            }}>🏕️ Plan Details</Text>

            {loading ? <ActivityIndicator  size={'large'} color={Colors.Primary}/> : planDetails }
            </View>
      </View>
    </ScrollView>
  )
}