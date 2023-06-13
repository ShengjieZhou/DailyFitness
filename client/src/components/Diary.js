import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../stylesheets/Card.css"

const api = 'http://localhost:5000';

const Diary = () => {
    const [searchHistory, setSearchHistory] = useState([{key:{time: '2023-06-03 09:15:00', object: 'search history', target: 'function'}}]);

    useEffect(() => {
        fetchSearchHistory();
    }, []);

    const fetchSearchHistory = () => {
        fetch(api + '/api/diary/fetchUserHistory')
            .then(response => response.json())
            .then(data => {
                setSearchHistory(data);
            })
            .catch(error => console.error(error))
    };

    const deleteHistory = (historyId, rev) => {
        fetch(api + `/api/diary/deleteUserHistory/${historyId}?rev=${rev}`, {
            method: 'DELETE',
        }).then(response => response.json())
            .catch(err => console.log(err));
        // Retrieve the latest search history after deletion is complete
        fetchSearchHistory();
        window.location.reload();
    }

    const CardList = ({searchHistory}) => (
        <div className="card-list">
            {searchHistory.map((record, index) => (
                <Card key={index} className="my-3 my-card" style={{backgroundColor: "ghostwhite"}}>
                    <Card.Body>
                        <Card.Title className="text-center" style={{color: "gray"}}>{record.key.time}</Card.Title>
                        <Card.Text className="my-card-text">
                            <span style={{ color: 'orange' }}>Search History: </span>{record.key.target}<br/>
                            <span style={{ color: 'orange' }}>Search for: </span>{record.key.object}
                        </Card.Text>
                        <div className="delete-button" onClick={() => deleteHistory(record.id, record.key._rev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-x" viewBox="0 0 16 16">
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );

    return (
        <>
            <Header/>
            <div className="grid lg:grid-cols-sidebar-content">
                <Sidebar/>
                <main className="min-w-0 isolate">
                    <div>
                        <h1 className="mdx-heading mt-0 text-primary -mx-.5 break-words text-5xl font-bold">
                            Food Diary
                        </h1>
                        <CardList searchHistory={searchHistory}/>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Diary;