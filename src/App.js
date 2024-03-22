import {NewsItem} from "./newsitem/NewsItem";
import {useEffect, useState} from "react";

const initNews = [
    {
        id: 1,
        title: 'Первая новость',
        url: 'www.example.com',
        username: 'Пользователь',
        date: '10.10.11',
        score: 100
    },
    {
        id: 2,
        title: 'Вторая новость',
        url: 'www.example.com',
        username: 'Администратор',
        date: '11.01.12',
        score: 1000
    },
    {
        id: 3,
        title: 'Третья новость',
        url: 'www.example.com',
        username: 'Гость',
        date: '10.10.21',
        score: 1
    }
]

function App() {

    const checkStorage = () => JSON.parse(window.localStorage.getItem('newsKey')) || initNews

    const [news, setNews] = useState(checkStorage)
    const [count, setCount] = useState(0)

    let idCurrent = news.length + 1

    const newsNew = {
        id: idCurrent.toString(),
        title: 'Новая новость',
        url: 'www.example.com',
        username: 'Пользователь',
        date: '10.10.24',
        score: 100
    }

    useEffect(() => {
            window.localStorage.setItem('newsKey', JSON.stringify(news))
        }, [news]
    )

    const newsCountHandler = () => {
        idCurrent++
        setNews((prevState) => [...prevState, newsNew])
        console.log(newsNew.id)
    }

    return (
        <>
            <div>Количество новостей: {news.length}</div>
            <button onClick={newsCountHandler}>Добавить новость</button>
            <button onClick={() => setCount(count + 1)}>{count}</button>
            {
                news.map(item => {
                    return <NewsItem
                        key={item.id}
                        title={item.title}
                        url={item.url}
                        username={item.username}
                        date={item.date}
                        points={item.score}
                    />
                })
            }
        </>
    )
}

export default App;