import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPeding, setIsPeding] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abordCont = new AbortController();

        fetch(url, { signal: abordCont.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the date for that resource')
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPeding(false);
                setError(null);
            }).catch((error) => {
                if (error.name === 'AbordError') {
                    console.log('Fetch Aborted');
                } else {
                    setIsPeding(false);
                    setError(error.message);
                }
            });

        return () => abordCont.abort();

    }, [url, data]);

    return {
        data, isPeding, error
    }
}

export default useFetch;