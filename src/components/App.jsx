import Screen from './Screen';
import React from 'react';
import Button from './Button';
import "../styles/app.css"
let url = 'https://api.nasa.gov/planetary/apod?api_key=4tuFbbP1EHOrCYHe1fjM98UJIKfyMIWiU8xq5tDT&date='
function formatDate(date) {
    let { month, day, year } = date
    month = `${parseInt(month) + 1}`
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

function stripDate(date){
    return {
        text: date.toDateString(),
        month: `${date.getMonth()}`,
        day: `${date.getDate()}`,
        year: `${date.getFullYear()}`
    }
}

export default function App() {
    const [data, setData] = React.useState({
        type: "",
        url: "",
        text: ""
    })
    const [date, setDate] = React.useState({
        ...stripDate(new Date())
    })

    function nextDay() {
        if (date.text != new Date().toDateString()) {
            setDate((date) => {
                let temp = new Date()
                temp.setMonth(date.month)
                temp.setFullYear(date.year)
                temp.setDate(parseInt(date.day) + 1)
                return {
                    ...stripDate(temp)
                }
            })
        }
    }
    function pastDay() {
        if (!(date.month == 5 && date.year == 1995 && date.day == 16)) {
            setDate((date) => {
                let temp = new Date()
                temp.setMonth(date.month)
                temp.setFullYear(date.year)
                temp.setDate(parseInt(date.day) - 1)
                return {
                    ...stripDate(temp)
                }
            })
        }
    }


    React.useEffect(() => {
        fetch(url + formatDate(date))
            .then(response => response.json())
            .then(res => {
                let type = (("" + res.url).includes("youtube")) ? "iframe" : "img" // figure out if url is video or not
                let { url, explanation } = res
                setData(data => ({
                    type: type, // set that type 
                    url: url, // pass the url of video/img
                    text: explanation
                }))


            })
    }, [date.text])


    return (
        <div>
            <h1>NASA APOD API</h1>
            <h2>{date.text}</h2>
            <div id="input-container">
                <input id="input" type="date" value={formatDate(date)} min="1995-06-16" max={formatDate(stripDate(new Date()))} onChange={(event) => {
                    let temp = new Date()
                    let value = event.target.value
                    temp.setDate(value.slice(8, 10))
                    temp.setFullYear(parseInt(value.slice(0, 4)))
                    temp.setMonth(parseInt(value.slice(5, 7)) - 1)
                    setDate((date) => ({
                        ...stripDate(temp)
                    }))
                }}></input>
            </div>
            <div id = "slider">
                <Button id="left-btn" text="Yesterday" handleClick={pastDay}></Button>
                <Screen data={data}></Screen>
                <Button id="right-btn" text="Tomarrow" handleClick={nextDay}></Button>
            </div>
            
            <div id="explanation">{data.text}</div>
        </div>


    );
}

