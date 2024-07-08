import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { CreateTripContext } from "./../../context/CreateTripContext"

export default function SelectDates() {
    const navigation = useNavigation();
    const router = useRouter();

    const {tripData, setTripData} = useContext(CreateTripContext);
    const [ startDate, setStartDate ] = useState();
    const [ endDate, setEndDate ] = useState();

    useEffect(()=>{
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: ''
        })
    },[]);

    const onDateChange = (date, type) => {
        if(type == 'START_DATE'){
            setStartDate(moment(date))
        }
        else{
            setEndDate(moment(date))
        }
    }
    
    const OnDateSelectionContinue = () =>{
        if(!startDate && !endDate){
            ToastAndroid.show('Please select start date and end date', ToastAndroid.LONG)
            return
        }
        const totalNoOfDays = endDate.diff(startDate, 'days');
        setTripData({
            ...tripData,
            startDate: startDate,
            endDate: endDate,
            totalNoOfDays: totalNoOfDays + 1
        });
        router.push('/create-trip/select-budget')
    }
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
        marginTop: 20
        }}>Travel Dates</Text>
        
        <View style={{
            marginTop:30
        }}>
            <CalendarPicker 
            allowRangeSelection={true}
            minDate = {new Date()}
            onDateChange={onDateChange} 
            maxRangeDuration={5}
            selectedRangeStyle={{
                backgroundColor: Colors.Primary
            }}
            selectedDayTextStyle={{
                color: Colors.WHITE
            }}
            />
        </View>
        <TouchableOpacity 
        onPress={OnDateSelectionContinue}
        style={{
            padding: 15, 
            backgroundColor: Colors.Primary,
            borderRadius: 15,
            marginTop: 35
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