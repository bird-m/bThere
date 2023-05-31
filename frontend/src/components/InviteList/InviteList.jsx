import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../../store/contactReducer";

export default function InviteList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    return null;
}