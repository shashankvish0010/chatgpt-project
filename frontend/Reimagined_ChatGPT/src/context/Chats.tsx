import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

interface Contextvalue {
    id: string,
    createChatId: () => void
}

export const ChatContext = createContext<Contextvalue | null>(null)

export const ChatProvider = (props: any) => {
    const [id, setId] = useState<string>('');

    const createChatId = () => {
        setId(uuidv4());
    }

    const info = { id, createChatId };

    return (
        <ChatContext.Provider value={info}>
            {props.children}
        </ChatContext.Provider>
    )
}
