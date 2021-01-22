import { useEffect, useState, useRef } from 'react';

export const useFetch = ( url ) => {

    
    const [state, setstate] = useState({data : null, loading: true, error: null});
    //useRef
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect( () => {

        setstate({data:null, loading: true, error: null})

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                //***simulacion de tiempo en peticion***
                setTimeout(() => {

                    if(isMounted.current){
                        setstate({
                            loading: false,
                            error: null,
                            data: data
                        })
                    } else {
                        console.log('setState no se llamó')
                    }
                }, 1000)
            })
            .catch( () => {
                setstate({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })
    }, [ url ])

    return state;
}
