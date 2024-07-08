import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { fetchImageFromUnsplash } from '../../configs/UnsplashAPI';
import { Colors } from '../../constants/Colors';

export default function HotelList({hotelList}) {
    const [newHotelList, setNewHotelList] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getImage()
    },[])
    
    const getImage = async () =>{
      setLoading(true);
      var tempList = hotelList;
      for (let i = 0; i < tempList.length; i++) {
        const imageURL = await fetchImageFromUnsplash(tempList[i].name)
        tempList[i] = { ...tempList[i], imageURL: imageURL };
      }

      setNewHotelList(tempList)
      setLoading(false)
    }

  return (
    <View style={{
        marginTop: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }}>🌇 Hotel Recommendation</Text>
      {loading ? <ActivityIndicator size={'large'} color={Colors.Primary}/>:
      <FlatList data={newHotelList}
      style={{
        marginTop: 8
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index})=>(
        <View style={{
          marginRight: 20,
          width: 180
        }}>
            <Image source={{uri: item.imageURL}} style={{
              width: 180,
              height: 120,
              borderRadius: 15
            }}/>
            <View style={{
              padding: 5
            }}>
              <Text style={{fontFamily: 'outfit-medium', fontSize: 17}}>{item.name}</Text>
              <View>
                <Text style={{fontFamily: 'outfit'}}>⭐ {item.rating}</Text>
                <Text style={{fontFamily: 'outfit'}}>💰 {item.price}</Text>
              </View>
            </View>
        </View>
      )}/>
    }
    </View>
  )
}