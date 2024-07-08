import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { CreateTripContext } from "./../../context/CreateTripContext"
import Autocomplete from 'react-native-autocomplete-input';

export default function SearchPlace() {
    const navigation = useNavigation();
    const router = useRouter();
    const [places, setPlaces] = useState(require('./../../assets/JSON/places.json'));
    const [query, setQuery] = useState('');
    const {tripData, setTripData} = useContext(CreateTripContext);

    useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            headerTransparent:true,
            headerTitle: 'Search'
        })
    },[]);

    return (
        <View style={{
            padding: 25,
            paddingTop: 90, 
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainer}
            placeholder = 'Search Place'

            renderInput={(props) => (
                <TextInput value={query} onChangeText={setQuery} style={styles.textInput}/>
            )}
            flatListProps={{
                keyExtractor: (item) => item.geonameid.toString(),
                renderItem: ({ item }) => (
                <TouchableOpacity 
                    onPress={() => {
                        const place = item.name + ", " + item.subcountry + ", " + item.country;
                        setQuery(place);
                        setTripData({
                            locationInfo: {
                                name: place,
                                coordinates: item.geonameid
                            }
                        })
                        router.push('/create-trip/select-traveler')
                    }
                    }>
                    <Text style={styles.itemText}>{item.name + ", " + item.subcountry + ", " + item.country}</Text>
                </TouchableOpacity>
                ),
            }}
            data={places.filter((item) => item.name.toLowerCase().startsWith(query.toLowerCase()) || item.subcountry.toLowerCase().startsWith(query.toLowerCase()) || item.country.toLowerCase().startsWith(query.toLowerCase()))}
            defaultValue={query}
            onChangeText={(text) => setQuery(text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 2,
        paddingVertical: 14,
      },
      inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 5
      },
      itemText: {
        fontSize: 15,
        padding: 10,
        fontFamily: 'outfit'
      },
})