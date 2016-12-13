import React, {PropTypes as P} from 'react'
import moment from 'moment'
import './styles.scss'


function Source({name, base, files, type}) {
    return (
        <tr>
            <td>{name}</td>
            <td>{files.map(file => <p><a href={base + file}>{base + file}</a></p>)}</td>
        </tr>)
}
Source.propTypes = {
    name: P.string.isRequired,
    base: P.string.isRequired,
    files: P.arrayOf(P.string).isRequired,
    type: P.string.isRequired,
}

export default function Meta({author, created, email, sources}) {
    return (
        <div className="meta">
            <h1>Metadata</h1>
            <div className="meta-cards">
                <div className="pt-card pt-elevation-0">
                    <h2>Author</h2>
                    <p>{author}</p>
                </div>
                <div className="pt-card pt-elevation-0">
                    <h2>Created</h2>
                    <p>{moment(created, 'YYYYMMDDTHH:mm:ss').format('LLLL').toString()}</p>
                </div>
                <div className="pt-card pt-elevation-0">
                    <h2>Sources</h2>
                    <table className="pt-table">
                        <thead>
                            <tr>
                                <td>Source</td>
                                <td>Location</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(sources).map(name => <Source key={name} name={name} {...sources[name]} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>)
}
Meta.propTypes = {
    author: P.string.isRequired,
    created: P.string.isRequired,
    email: P.string.isRequired,
    sources: P.objectOf(P.shape({
        base: P.string.isRequired,
        files: P.arrayOf(P.string).isRequired,
        type: P.string.isRequired,
    })).isRequired,
}
