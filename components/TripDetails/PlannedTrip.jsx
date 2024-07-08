import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors';
import { fetchImageFromUnsplash } from '../../configs/UnsplashAPI';


export function PlannedTripItem({item, index}) {
    const [image, setImage] = useState();
    useEffect(()=>{
        getImage()
    },[])
    
    const getImage = async () =>{
        const imageURL = await fetchImageFromUnsplash(item.activity);
        setImage(imageURL)
    }
  return (
    <View style={{
        padding: 8,
        backgroundColor: Colors.LIGHT_BLUE,
        borderRadius: 15,
        marginTop: 10
    }}>
        <Image source={{uri: image}} style={{
            width: '100%',
            height: 120,
            borderRadius: 15
            }}/>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize: 18,
            marginTop: 6
        }}>
            {item.activity}
        </Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize: 16,
            color: Colors.GRAY,
            marginTop: 6
        }}>
            {item.details}
        </Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize: 14,
            color: Colors.GRAY,
            marginTop: 6
        }}>
        ⏱️{item.time}
        </Text>
    </View>
  )
}