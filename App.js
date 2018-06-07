import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
console.disableYellowBox = true
const width = Dimensions.get('window').width

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: -33.447487,
        longitude: -70.673676,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      marker: {
        latlng: {
          latitude: 0,
          longitude: 0
        },
        title: '',
      },
      places: []
    }
  }

  loadPlaces = () => {
    console.log('recargando')
    return fetch('http://localhost:3000/places')
      .then((response) => response.json())
      .then((places) => {
        console.log(places)
        this.setState({ places })
        return places
      })
      .catch((err) => {
        console.log(err);
      })
  }

  goToPlace = (name, coords) => {
    this.setState(() => {
      return (
        {
          marker: {
            latlng: {
              latitude: coords[0],
              longitude: coords[1]
            },
            title: name,
          },
          region: {
            latitude: coords[0],
            longitude: coords[1],
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00921
          }
        }
      )
    })
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.map_view}>
          <MapView style={styles.map} region={this.state.region}>
            <Marker
              coordinate={this.state.marker.latlng}
              title={this.state.marker.title}
              description={this.state.marker.description}
            />
          </MapView>
        </View>
        <View style={styles.fav_view}>
          <FlatList
            data={this.state.places}
            refreshing={false}
            onRefresh={this.loadPlaces}
            renderItem={({ item }) => {
              return (
                <Text
                  style={styles.listItems}
                  onPress={(name, coords) => this.goToPlace(item.name, item.coords)}
                >
                  {item.name}
                </Text>
              )
            }}
            ListHeaderComponent={
              <Text style={styles.listHeader}>
                Lugares Favoritos
              </Text>
            }
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          />
        </View>
      </View >
    )
  }

  componentDidMount() {
    this.loadPlaces()
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 24,
  },
  map_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: width,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fav_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  listItems: {
    backgroundColor: '#edf2f5',
    width: width,
    padding: 10,
    textAlign: 'center',
  },
  listHeader: {
    width: width,
    padding: 10,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
    fontSize: 18,
  },
})
