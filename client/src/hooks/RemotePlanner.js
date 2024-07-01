import {useContext} from "react";
import {RemotePlannerContext} from "../providers/RemotePlannerContext";

export default function useRemotePlanner(context = RemotePlannerContext) {
    return useContext(context);
}