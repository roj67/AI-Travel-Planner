import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import { Colors } from '../../constants/Colors'
import UserTripCard from './UserTripCard'
import { useRouter } from 'expo-router'

export default function UserTripList({userTrips}) {
    const LatestTrip = JSON.parse(userTrips[0].tripData);
    const router = useRouter();

    return (
        <View>
            <View style={{
                marginTop: 20
            }}>
                <Image source={{uri: userTrips[0].imageURL}} 
                style={{width: '100%', height: 240, objectFit: 'cover', borderRadius: 15}}/>
                <View style={{
                    marginTop: 10
                }}>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 24
                    }}>{userTrips[0].tripPlan.trip.destination}</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5
                    }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 17,
                            color: Colors.GRAY
                        }}>{moment(LatestTrip.startDate).format('DD MMM yyyy')}</Text>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 17,
                            color: Colors.GRAY
                        }}>🚙 {LatestTrip.traveler.title}</Text>
                    </View>
                    <TouchableOpacity 
                    onPress={()=> router.push({pathname: '/trip-details', params:{
                        trip: JSON.stringify(userTrips[0]),
                        tripData: userTrips[0].tripData
                    }})}
                    style={{
                        backgroundColor: Colors.Primary,
                        padding: 15,
                        borderRadius: 15,
                        marginTop: 10
                    }}>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            color: Colors.WHITE,
                            textAlign: 'center',
                            fontSize: 15
                        }}>See your plan</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {userTrips.map((trip, index)=>{
                return(
                    <TouchableOpacity
                    onPress={()=> router.push({pathname: '/trip-details', params:{
                        trip: JSON.stringify(trip),
                        tripData: trip.tripData
                    }})}>
                        <UserTripCard trip={trip}/>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}