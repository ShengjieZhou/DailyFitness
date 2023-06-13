import React from 'react';
import Card from 'react-bootstrap/Card';
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../stylesheets/Card.css"

const Diary = () => {
    // 模拟搜索记录数据
    const searchHistory = [
        {time: '2023-06-01 10:00:00', object: '搜索记录1', historyId: '01'},
        {time: '2023-06-02 14:30:00', object: '搜索记录2', historyId: '02'},
        {time: '2023-06-03 09:15:00', object: '搜索记录3', historyId: '03'},
        {time: '2023-06-03 09:15:00', object: '搜索记录4', historyId: '04'},
        {time: '2023-06-03 09:15:00', object: '搜索记录5', historyId: '05'},
        {time: '2023-06-03 09:15:00', object: '搜索记录6', historyId: '06'},
    ];

    const deleteHistory = async (historyId) => {
        try {
            await fetch(`/api/diary/deleteUserHistory/${historyId}`, {
                method: 'DELETE',
            })
        } catch (e) {
            console.error(e);
        }
    }

    // 页面组件
    const CardList = ({searchHistory}) => (
        <div className="card-list">
            {searchHistory.map((record, index) => (
                <Card key={index} className="my-3 my-card" style={{backgroundColor: "ghostwhite"}}>
                    <Card.Body>
                        <Card.Title>{record.time}</Card.Title>
                        <Card.Text>{record.object}</Card.Text>
                        <div className="delete-button" onClick={() => deleteHistory(record.historyId)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
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