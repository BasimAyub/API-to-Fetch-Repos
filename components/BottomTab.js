import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Entypo,
} from '@expo/vector-icons';

import { List, ListItem, Card, CardItem, Body } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const TabScreen1 = (props, { route }) => {
  const allUsers = props.route.params.data;
  const data = allUsers.filter((item) => item.id == props.route.params.id);

  return (
    <View style={{ backgroundColor: '#265478', width: '100%', height: '100%' }}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Card style={styles.card}>
          <CardItem header style={styles.customHeader}>
            <Text style={styles.headertxt}>Basic Info</Text>
          </CardItem>

          <CardItem style={styles.customField}>
            <Body style={{ paddingHorizontal: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>Name: </Text>
                <Text style={styles.customText2}> {data[0].name}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>Username: </Text>
                <Text style={styles.customText2}> {data[0].username}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>Email: </Text>
                <Text style={styles.customText2}> {data[0].email}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>Phone: </Text>
                <Text style={styles.customText2}> {data[0].phone}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>Website: </Text>
                <Text style={styles.customText2}> {data[0].website}</Text>
              </View>
            </Body>
          </CardItem>

          <CardItem header style={styles.customHeader}>
            <Text style={styles.headertxt}>Address</Text>
          </CardItem>

          <CardItem style={styles.customField}>
            <Body style={{ paddingHorizontal: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>Street: </Text>
                <Text style={styles.customText2}>
                  {data[0].address['street']}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>Suite: </Text>
                <Text style={styles.customText2}>
                  {data[0].address['suite']}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>City: </Text>
                <Text style={styles.customText2}>
                  {data[0].address['city']}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>ZipCode: </Text>
                <Text style={styles.customText2}>
                  {data[0].address['zipcode']}
                </Text>
              </View>
            </Body>
          </CardItem>
          <CardItem header style={styles.customHeader}>
            <Text style={styles.headertxt}>Company Details</Text>
          </CardItem>

          <CardItem style={styles.customField}>
            <Body style={{ paddingHorizontal: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>CompanyName: </Text>
                <Text style={styles.customText2}>
                  {data[0].company['name']}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', width: '80%' }}>
                <Text style={styles.customText1}>CatchPhrase: </Text>
                <Text style={styles.customText2}>
                  {data[0].company['catchPhrase']}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.customText1}>BS: </Text>
                <Text style={styles.customText2}>{data[0].company['bs']}</Text>
              </View>
            </Body>
          </CardItem>
        </Card>
      </View>
    </View>
  );
};

const TabScreen2 = (props, { navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const api =
      'https://jsonplaceholder.typicode.com/users/' +
      props.route.params.id +
      '/albums';
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
        <View style={{ paddingTop: 10, backgroundColor: '#22527A' }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <List>
                <ListItem style={{ borderBottomWidth: 0 }}>
                  <View
                    style={{
                      backgroundColor: '#4FC8D3',
                      paddingVertical: 20,
                      borderRadius: 10,
                      width: '100%',
                      paddingHorizontal: 20,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '90%',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('AlbumDetail', {
                              id: item.id,
                            })
                          }>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#fff',
                              fontStyle: 'italic',
                              fontWeight: '700',
                            }}>
                            {' '}
                            {item.title}
                          </Text>
                        </TouchableOpacity>
                      </View>
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

const TabScreen3 = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const api =
      'https://jsonplaceholder.typicode.com/users/' +
      props.route.params.id.toString() +
      '/posts';
    fetch(api)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  });

  const gotoTestStackScreen = (id) => {
    const newdata = data.filter((item) => item.id == id);
    props.navigation.navigate('PostDetail', { postdata: newdata, id: id });
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <List>
                <ListItem style={{ borderBottomWidth: 0 }}>
                  <View style={styles.textField1}>
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => gotoTestStackScreen(item.id)}>
                        <Text style={styles.customText2}> {item.title}</Text>
                      </TouchableOpacity>
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

const TabScreen4 = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const api =
      'https://jsonplaceholder.typicode.com/users/' +
      props.route.params.id +
      '/todos';
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
        <View style={{ padding: 20, backgroundColor: '#265478' }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.textField2}>
                  <View style={{ alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.customText1}>Title: </Text>
                      <Text style={styles.customText2}>{item.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.customText1}>Completed: </Text>
                      {item.completed.toString() == 'true' ? (
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={24}
                          color="white"
                        />
                      ) : (
                        <Entypo name="cross" size={24} color="white" />
                      )}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation, route }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        initialParams={{ data: route.params.data, id: route.params.id }}
        name="User Details"
        component={TabScreen1}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="account-details"
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        initialParams={{ id: route.params.id }}
        name="Albums"
        component={TabScreen2}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="album" size={24} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        initialParams={{ id: route.params.id }}
        name="Post"
        component={TabScreen3}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="local-post-office" size={24} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        initialParams={{ id: route.params.id }}
        name="Todos"
        component={TabScreen4}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="user" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
  },
  customHeader: {
    backgroundColor: '#24B39F',
  },
  customField: {
    backgroundColor: '#4FC8D3',
  },
  headertxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
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
  container: {
    backgroundColor: '#22527A',
    paddingTop: 10,
  },
  textField1: {
    paddingHorizontal: 15,
    backgroundColor: '#4FC8D3',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
  },
  textField2: {
    paddingHorizontal: 40,
    marginBottom: 20,
    backgroundColor: '#4FC8D3',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
  },
});

export default BottomTab;
