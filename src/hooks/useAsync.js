import { useContext, useEffect, useState } from "react"
import { LoadingContext } from "../contexts/loading.context";

export const useAsync = ({ dependencies = [], services }) => {
    const [loadingState, setLoadingState] = useContext(LoadingContext);
    const [state, setState] = useState();

    useEffect(() => {
        fetchData();
    }, dependencies)

    const fetchData = async () => {
        setLoadingState({ isLoading: true });
        const result = await services();
        setLoadingState({ isLoading: false });
        setState(result.data.content);
    };

    return {
        state
    };
}