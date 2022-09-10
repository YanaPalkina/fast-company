import React, { useState, useEffect } from "react";
import api from "../api";
import { useHistory, useParams } from "react-router-dom";
import QualitiesList from "./qualitiesList";

const UsersPage = () => {
    const [user, setUser] = useState({});
    const history = useHistory();
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            if (typeof data !== "undefined") {
                setUser(data);
            }
        });
    }, []);

    const handelReplaceToUsers = () => {
        history.push("/users");
    };

    return JSON.stringify(user) !== "{}" ? (
        <div>
            <h1>{user.name}</h1>
            <h2>{`Профессия: ${user.profession.name}`}</h2>
            <QualitiesList qualities={user.qualities} />
            <h4>{`Количество встреч: ${user.completedMeetings}`}</h4>
            <h3>{`Оценка: ${user.rate}`}</h3>
            <button
                className="btn btn-outline-primary"
                onClick={() => {
                    handelReplaceToUsers();
                }}
            >
                Все пользователи
            </button>
        </div>
    ) : (
        "Loading ..."
    );
};

export default UsersPage;
