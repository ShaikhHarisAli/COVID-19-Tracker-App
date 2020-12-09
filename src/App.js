import React, { useEffect, useState } from "react";
import { fetchData } from "../src/Api/Api";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPciker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import coronaImage from "./images/image.png";
import coronaImage2 from "./images/image2.png";
import MenuAppBar from "./components/Header/Header";



function App() {
  //Mode Dark or Light
  const [isDark,setisDark]=useState(true)

  function handleClick(){
    setisDark(!isDark)
  }
  // destructuring for fetch Data
  const [data, setData] = useState({});
  
  // Country which receive as parameter in handleCountryChange
  const [country, setCountry] = useState("");

  //Overall Cases,Recoveries And Deaths
  useEffect(() => {
    async function fetchedData() {
      const dataFromApi = await fetchData();
      setData(dataFromApi);
    }
    fetchedData();
  }, []);
  //For select individual data of country
  const handleCountryChange = async (country) => {
    //fetch the data
    const dataFromApi = await fetchData(country);
    //set the data
    setData(dataFromApi);
    setCountry(country);
  };
 //#ffff99 
  return (
    <div style={isDark ? {backgroundColor: "rgba(75,192,192,0.4)"}:{backgroundColor: "#ff9933"}}>
      
      <MenuAppBar handleClick={handleClick}/>
      <div className={styles.container}>
        {isDark?<img className={styles.image} alt="COVID-19" src={coronaImage} />:<img className={styles.image} alt="COVID-19" src={coronaImage2} />}
        
        <Cards data={data} />
        <CountryPciker handleCountyChange={handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    </div>
  );
}

export default App;
