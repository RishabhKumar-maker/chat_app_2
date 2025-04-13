import { set } from "mongoose";
import { useState, useEffect } from "react";

import React from 'react'
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState([]);


    useEffect(() => {
        setLoading(true);

        const getConversations = async () => {
            try {
                const res = await fetch("/api/users", {
                    method: "GET",
                    credentials: "include"
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            }
            finally {
                setLoading(false);
            }
        }

        getConversations();
    }, []);

    return { loading, conversations };
}


export default useGetConversations