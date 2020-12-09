import React,{useEffect,useState} from 'react';
import {fetchDailyData} from '../../Api/Api'
import {Line,Bar} from 'react-chartjs-2'
import styles from './Chart.module.css'

function Chart({data:{confirmed,deaths,recovered},country}) {
    //Daily Update of number cases,death and recoveries
    const [dailyData,setDailyData]=useState([])
    useEffect(()=>{
        const fetchApi = async () =>{
             setDailyData(await fetchDailyData())
        }
        
        fetchApi()
    },[])
    
    // Charts (Line Chart)
    const lineChart=(
        dailyData.length ? 
        (<Line
        data={{
            labels:dailyData.map(({date}) => date),
            datasets:[{
                data:dailyData.map(({confirmed}) => confirmed),
                label:"Infected",
                borderColor:"#3333ff",
                backgroundColor:"rgba(0, 102, 255,0.5)",
                fill:true    

            },{
                data:dailyData.map(({deaths}) => deaths),
                label:"Deaths",
                borderColor:"red",
                backgroundColor:"rgba(255,0,0,0.5)",
                fill:true
            }]
        }}
        
        />):null
        
    );
    //Bar chart
    const barChart=(
    
        confirmed ? 
        <Bar
            data={{
                labels:["Infected","Recovered","Deaths"],
                datasets:[{
                    label:'People',
                    backgroundColor:["rgba(0, 0, 255, 0.5)","rgba(0, 255, 0, 0.5)","rgba(255, 0, 0, 0.5)"],
                    data:[confirmed.value,recovered.value,deaths.value]
                }]
            }}
            options={{
                legend:{display:false},
                title:{display:true,text:`Current state in ${country}`}
            }}
        
        />: null
    )


    return (
        <div className={styles.container}>
            {country? barChart: lineChart}
        </div>
    );
}

export default Chart;