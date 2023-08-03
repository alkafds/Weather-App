import { useState } from "react";
import { Input, Card, CardBody, Stack, Heading, Text, Wrap, HStack, ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import "./App.css";

const api = {
  key: "0fc6c8bcf1e6d02bb5b5e2639362525d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (evt) => {
    if (evt.key === "Enter") {
      try {
        const response = await axios.get(
          `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
        );
        setQuery("");
        setWeather(response.data);

      } catch (error) {
        setWeather({ message: "city not found"});
      }
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <ChakraProvider>
    <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
      <Wrap justify='center' pb='10' pt='10'>
        <div className="search-box" >
          <Input
            type="text"
            variant="outline"
            placeholder="Search"
            value={query}
            bgColor='gray.100'
            opacity='90%'
            rounded='10px'
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        </Wrap>
        {(typeof weather.main !== "undefined") ? (
          <Wrap justify='center'>
          <Card maxW='xl' maxH='xl' py='10' px='10' mb='100' rounded='30px' bgColor='white' opacity='80%' color='gray.700'>
            <CardBody>
              <Stack>
            <div className="location-box">
              <div className="location">
                <Heading size='lg' mb='0'>
                {weather.name}, {weather.sys.country}
                </Heading>
              </div>
              <div className="date">
              <Text mb='3'>{dateBuilder(new Date())}
              </Text>
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                <HStack>
                <Heading fontSize='120px'>
                {Math.round(weather.main.temp)}
                </Heading>
                <Text fontSize='55px' as='sup'>
                °C
                </Text>
                </HStack>
              </div>
              <div className="weather">
                <Text fontSize='35px'>
                 {weather.weather[0].main}
                 </Text>
                 </div>
            </div>
            </Stack>
          </CardBody>
          </Card>
          </Wrap>
        ) : ('')}
      </main>
      
    </div>
    </ChakraProvider>
  );
}

export default App;