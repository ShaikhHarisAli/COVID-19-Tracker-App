import React,{useState,useEffect} from 'react';
import {NativeSelect,FormControl} from '@material-ui/core'
import styles from './CountryPicker.module.css'
import {fetchCountries} from "../../Api/Api"

function CountryPicker({handleCountyChange}) {
    // Individual Country Update 
    const[fetchedCountires,setfetchedCountires]=useState([])
    useEffect  (() => {
        const fetchApi = async () =>{
            setfetchedCountires( await fetchCountries())
        }
        fetchApi()
       
    },[setfetchedCountires])
   
    return (
        <div>
            <FormControl className={styles.formControl}>
                <NativeSelect variant="outlined" defaultValue="" onChange={(e)=>handleCountyChange(e.target.value)}>
                    <option  value=""> Global </option>
                    {
                        fetchedCountires.map((country,index)=> <option key={index} value={country}> {country} </option>  )
                    }
                </NativeSelect>
            </FormControl>
        </div>
    );
}

export default CountryPicker;