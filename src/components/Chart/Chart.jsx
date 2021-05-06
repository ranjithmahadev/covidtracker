import React, { useEffect, useState } from 'react';
import { fetchDailyData } from '../../api';
import { Bar, Line } from 'react-chartjs-2';

import styles from './Chart.module.css'


const Chart = ({data : {confirmed, deaths, recovered }, country}) => {
    const [dailyData, setDailyData] = useState({});

    useEffect (() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData());
        };

        fetchApi();
    }, []);

    

    // console.log(confirmed, deaths, recovered);
    console.log(country)

    const lineChart = (
        dailyData[0]
        ?
        (<Line 
                data={{
                    labels: dailyData.map( ({ date }) => date),
                    datasets: [{
                        data: dailyData.map( ({ confirmed}) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, 
                    {
                        data: dailyData.map( ({ deaths}) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true
                    }],
                }}
        />) : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgb(0, 0, 255, 0.5)',
                            'rgb(0, 255, 0, 0.5)',
                            'rgb(255, 0, 0, 0.5)'
                        ],
                        data: [confirmed.value, deaths.value, recovered.value],
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}`}
                }}
            />
        ) : null

    )



    return (
        <div className={styles.container}>
            { country ? barChart : lineChart }
        </div>
    )
}

export default Chart;
