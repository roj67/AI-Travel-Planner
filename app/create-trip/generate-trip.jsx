import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { CreateTripContext } from "./../../context/CreateTripContext"
import { AI_PROMPT } from '../../constants/Options'
import { chatSession } from '../../configs/AiModel'
import { useRouter } from 'expo-router'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from './../../configs/FirebaseConfig'

export default function GenerateTrip() {
    const router = useRouter();

    const user = auth.currentUser

    const {tripData, setTripData} = useContext(CreateTripContext);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        GenerateAiTrip()
    },[])

    const GenerateAiTrip = async () => {
        setLoading(true)
        const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.locationInfo?.name)
        .replace('{totalDays}', tripData.totalNoOfDays)
        .replace('{totalNights}', tripData.totalNoOfDays-1)
        .replace('{traveler}', tripData.traveler?.title)
        .replace('{budget}', tripData.budget)
        .replace('{totalDays}', tripData.totalNoOfDays)
        .replace('{totalNights}', tripData.totalNoOfDays-1)

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        const tripResponse = JSON.parse(result.response.text());

        setLoading(false)

        const docId = (Date.now().toString());
        const result_ = await setDoc(doc(db, "UserTrips", docId),{
            docId: docId,
            userEmail: user.email,
            tripPlan: tripResponse,
            tripData: JSON.stringify(tripData)
        })

        router.push('/mytrip')
    }

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 35, 
            textAlign: 'center'
        }}>Please Wait...</Text>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20, 
            textAlign: 'center',
            marginTop: 40
        }}>We are working to generate your dream trip</Text>

        <Image source={require('./../../assets/images/plane.gif')} style={{
            width: '100%',
            height: 200,
            objectFit: 'contain'
        }}/>

        <Text style={{
            fontFamily: 'outfit',
            color: Colors.GRAY,
            fontSize: 20,
            textAlign: 'center'
        }}>Do Not Go Back</Text>
        </View>
    )
}