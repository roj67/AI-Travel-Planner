import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from './../../components/CreateTrip/OptionCard'
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from "./../../context/CreateTripContext"

export default function SelectBudget() {
    const navigation = useNavigation();
    const router = useRouter();

    const [selectedOptions, setSelectedOptions] = useState();
    const {tripData, setTripData} = useContext(CreateTripContext);


    useEffect(()=>{
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: ''
        })
    },[]);

    useEffect(()=>{
        setTripData({
            ...tripData,
            budget: selectedOptions?.title
        })
    },[selectedOptions]);

    const onClickContinue=()=>{
        if(!selectedOptions){
            ToastAndroid.show("Please select an option", ToastAndroid.LONG);
            return;
        }
        router.push('/create-trip/review-trip');
    }

  return (
    <View style={{paddingTop: 75, padding: 25, backgroundColor: Colors.WHITE, height: '100%'}}>
      <Text style={{
        fontSize: 35,
        fontFamily: 'outfit-bold',
        marginTop: 20
        }}>Budget</Text>

        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>Choose spending habits for your trip</Text>

            <FlatList 
            data={SelectBudgetOptions}
            renderItem={({item, index})=>(
            <TouchableOpacity 
            onPress={()=>setSelectedOptions(item)}
            style={{
                marginVertical: 10
            }}>
                <OptionCard option={item} selectedOptions={selectedOptions}/>
            </TouchableOpacity>
            )}/>
        </View>

        <TouchableOpacity 
        onPress={onClickContinue}
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