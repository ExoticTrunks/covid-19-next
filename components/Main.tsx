import React, {useEffect, useState} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { forEachChild } from 'typescript';

const Main = () => {
    const currentDate = new Date();

    const [country, setCountry] = useState([]);

    const getSummary = async () => {
        try {
            const res = await fetch(`https://api.covid19api.com/country/singapore?from=${currentDate.getFullYear()-1}-${currentDate.getMonth()}-01T00:00:00Z&to=${currentDate.getFullYear()}-${currentDate.getMonth()}-01T00:00:00Z`);
            const data = await res.json()
            setCountry(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=> {
        getSummary()
    }, [])
    
    const convertDate = (data: any[]) => {
        data.map((item) => {
            const newDate = new Date(item.Date)
            item.Date = `${newDate.getDate()} + ${newDate.getMonth() + 1} + ${newDate.getFullYear()}`
        })
    }
    convertDate(country)
    console.log(country)
  return (
    <div style={{height: '80vh'}} className = 'pt-5'>
        <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={country}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Active" stroke="#f59e0b" />
                <Line type="monotone" dataKey="Deaths" stroke="#ef4444" />
                <Line type="monotone" dataKey="Recovered" stroke="#4ade80" />

                </LineChart>
            </ResponsiveContainer>
    </div>
  )
}

export default Main