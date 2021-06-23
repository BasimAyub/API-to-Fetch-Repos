import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import BottomTab from './components/BottomTab';

import { List, ListItem, Thumbnail, Left, Body } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const MainScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={route.params.userdata}
        renderItem={({ item }) => (
          <List>
            <ListItem style={{ borderBottomWidth: 0 }}>
              <View style={styles.textField1}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.customText1}>Name: </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('BottomTab', {
                          name: item.name,
                          id: item.id,
                          data: route.params.userdata,
                        })
                      }>
                      <Text style={styles.customText2}> {item.name}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.customText1}>Email: </Text>
                    <Text style={styles.customText2}>{item.email}</Text>
                  </View>
                </View>
              </View>
            </ListItem>
          </List>
        )}
      />
    </View>
  );
};

const AlbumDetails = ({ navigation, route }, props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => {
              return (
                <List>
                  <ListItem thumbnail>
                    <Left>
                      <TouchableOpacity
                        style={{ paddingTop: 15 }}
                        onPress={() => {
                          navigation.navigate('AlbumPic', { url: item.url });
                        }}>
                        <Thumbnail square source={{ uri: item.thumbnailUrl }} />
                      </TouchableOpacity>
                    </Left>
                    <Body style={{ borderBottomWidth: 0 }}>
                      <View style={styles.titleField}>
                        <Text style={styles.customText}>{item.title}</Text>
                      </View>
                    </Body>
                  </ListItem>
                </List>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const AlbumPic = ({ route, navigation }) => {
  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', margin: 30 }}>
      <Image
        style={{ width: '100%', height: '100%' }}
        source={{
          uri: route.params.url,
        }}
      />
    </View>
  );
};

const PostDetails = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const pdata = route.params.postdata;
  useEffect(() => {
    const api =
      'https://jsonplaceholder.typicode.com/posts/' +
      route.params.id +
      '/comments';
    fetch(api)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  });

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.textField2}>
            <Text style={styles.roundFeildText}>Details</Text>
          </View>

          <View style={styles.roundFeildDetails}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>Title: </Text>
                <Text style={styles.customText2}> {pdata[0].title}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>Body: </Text>
                <Text style={styles.customText2}>
                  {pdata[0].body.toString()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.textField3}>
            <Text style={styles.roundFeildText}>Post Comments</Text>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <List>
                <ListItem style={{ borderBottomWidth: 0 }}>
                  <View
                    style={{
                      backgroundColor: '#4FC8D3',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      paddingRight: 70,
                      borderRadius: 10,
                      width: '100%',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.customText1}>Post Id: </Text>
                      <Text style={styles.customText2}>{item.id}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.customText1}>Name: </Text>
                      <Text style={styles.customText2}>{item.name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.customText1}>Email: </Text>
                      <Text style={styles.customText2}>{item.email}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.customText1}>Body: </Text>
                      <Text style={styles.customText2}>{item.body}</Text>
                    </View>
                  </View>
                </ListItem>
              </List>
            )}
          />
        </View>
      )}
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <NavigationContainer>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 35,
              fontWeight: '650',
            },
            headerStyle: {
              backgroundColor: '#229BF8',
            },
            cardStyle: {
              backgroundColor: '#265478',
            },
          }}>
          <Stack.Screen
            name="User List"
            component={MainScreen}
            initialParams={{ userdata: data }}
            options={{
              title: 'Users',
            }}
          />
          <Stack.Screen
            initialParams={{ userdata: data }}
            name="BottomTab"
            component={BottomTab}
            options={{
              title: 'User Details',
            }}
          />
          <Stack.Screen
            name="PostDetail"
            component={PostDetails}
            options={{
              title: 'Post Details',
            }}
          />
          <Stack.Screen name="AlbumDetail" component={AlbumDetails} />
          <Stack.Screen
            name="AlbumPic"
            component={AlbumPic}
            options={{
              title: 'Album Image',
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  textField1: {
    backgroundColor: '#4FC8D3',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
  },
  textField2: {
    backgroundColor: '#24B39F',
    margin: 10,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 50,
  },
  textField3: {
    backgroundColor: '#24B39F',
    margin: 10,
    marginTop: 20,
    marginBottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 50,
  },
  customText1: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  customText2: {
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: '600',
  },
  titleField: {
    padding: 10,
    justifyContent: 'center',
  },
  customText: {
    fontSize: 20,
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: '700',
  },
  roundFeildText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  roundFeildDetails: {
    backgroundColor: '#4FC8D3',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '90%',
  },
});

export default App;
