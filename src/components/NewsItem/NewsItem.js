import style from './NewsItem.module.css'
import {Link} from "react-router-dom";
import {domainToHostName, openExternalUrl} from "../../utils/utils";

export function NewsItem(props) {

    const {className = '', title, username, date, score, id, url} = props
    const scoreClassArr = [style.score]

    if (score > 50) {
        scoreClassArr.push(style.highScore)
    } else if (score > 30) {
        scoreClassArr.push(style.middleScore)
    } else {
        scoreClassArr.push(style.lowScore)
    }

    return (
        <div className={`${style.container} ${className}`}>
            <Link className={style.link} to={`comments/${id}`}> {title}</Link>
            <div className={style.info}>
                <div className={style.userData}>
                    <span>{username} | </span>
                    <span>{date}</span>
                </div>

                {url ? (
                    <div
                        className={style.externalLink} onClick= {() => openExternalUrl(url)}>{domainToHostName(url)}</div>
                ) : (
                    <div className={scoreClassArr.join(' ')}>
                        {score} points
                    </div>
                )}
            </div>
        </div>
    )
}