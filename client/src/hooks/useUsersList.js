import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const useUsersList = (searchValues) => {
    const { fetchData, loading } = useFetch();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const {
                username = "",
                email = "",
                firstName = "",
                lastName = "",
            } = searchValues;

            const body = await fetchData({
                url: `${VITE_API_URL}/api/players?username=${username}&email=${email}&firstName=${firstName}&lastName=${lastName}`,
                showToast: false,
            });

            if (body) {
                setUsers(body.data.users);
            }
        };

        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValues]);

    return { users, loading };
};

export default useUsersList;
