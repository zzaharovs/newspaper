import {Link, useParams, useResolvedPath} from "react-router-dom";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {get} from "../../api/Api";
import {HACKER_NEWS_GET_BY_ID} from "../../const/HackerNewsConst";
import {useCallback, useEffect, useState} from "react";
import {CommentsWrapper} from "../../components/Comments/CommentsWrapper";

export function CommentsPage() {

    const {id} = useParams()
    const [news, setNews] = useState()
    const [comments, setComments] = useState([])

    const getNewsComments = useCallback(async (commentIds) => {
        return await Promise.all(
            commentIds.map(async commentId => {
                const comment = await get(`${HACKER_NEWS_GET_BY_ID}/${commentId}.json?print=pretty`)
                if (comment?.kids) {
                    comment.kids = await getNewsComments(comment.kids)
                }
                return comment
            }))
    }, [])

    const getNewsData = useCallback(async () => {
        const newsData = await get(`${HACKER_NEWS_GET_BY_ID}/${id}.json?print=pretty`)
        setNews(newsData)
        if (newsData?.kids) {
            const comments = await getNewsComments(newsData.kids)
            setComments(comments)
        }
    }, [id, getNewsComments])

    useEffect(() => {
        getNewsData()
    }, [getNewsData]);

    return (
        <div>
            <Link to='/'>Назад</Link>

            {news && (
                <NewsItem
                    title={news.title}
                    username={news.by}
                    date={news.time}
                    url={news.url}
                />
            )}

            {comments && (
                <CommentsWrapper comments={comments}/>
            )}

        </div>
    )
}