import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'

interface Message {
  sender: string;
  content: string;
  timestamp: string;
  isReaded?: boolean;
  isMedia?: string;
}

interface Chat {
  id: number;
  personId: number;
  messages: Message[];
}

interface People {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

interface ChatState {
  peoples: People[];
  chats: Chat[];
}


const initialState: ChatState = {
  peoples: [],
  chats: []
}

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<People>) => {
      state.peoples.push(action.payload)
    },
    removePerson: (state, action: PayloadAction<number>) => {
      state.peoples = state.peoples.filter(p => p.id !== action.payload)
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload)
    },
    removeChat: (state, action: PayloadAction<number>) => {
      state.chats = state.chats.filter(c => c.id !== action.payload)
    },
    addMessage: (
      state, 
      action: PayloadAction<{ chatId: number; message: Message }>
    ) => {
      const chat = state.chats.find(c => c.id === action.payload.chatId)
      if (chat) {
        chat.messages.push(action.payload.message)
      }
    }
  }
})


export const { addPerson, removePerson, addChat, removeChat, addMessage } = chatSlice.actions


const store = configureStore({
  reducer: {
    chats: chatSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
