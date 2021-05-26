import styled from "styled-components"
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { db,auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

export async function getServerSideProps(context){
    const ref = db.collection("chats").doc(context.query.id)

    const messagesRes = await ref
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .get()

    const messages = messagesRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    const chatRes = await ref.get()
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }
    console.log(chat)
    
    return {
        props: {
            messages: JSON.stringify(messages),
            chat
        }
    }
}

// export async function getServerSideProps(context){
//     const ref = db.collection("chats").doc(context.query.id);
//     // console.log(ref);
//     const messagesRes = await ref
//             .collection("messages")
//             .orderBy("timestamp","asc")
//             .get();
//     // console.log(messagesRes.docs);

//     const messages = messagesRes.docs.map((doc) =>({
//             id: doc.id,
//             ...doc.data(),
//             })).map(messages =>({
//                         ...messages,
//                         timestamp: messages.timestamp.toDate().getTime()
//             }));
//             //prep the chats
//             const chatRes = await ref.get();
//             const chat = {
//                 id: chatRes.id,
//                 ...chatRes.data()
//             }
//             // console.log(chat,messages);
//             console.log(chat,messages);
           
//             return{
//                 props:{
//                     messages: JSON.stringify(messages),
//                     chat: chat
//                 }
//             }
// }

function Chat({chat,messages}) {
    const [user] = useAuthState(auth);

    return (
        
            <Container>
                <Head>
                    {/* <title>chat with {getRecipientEmail(chat.users,user)}</title> */}
                    <title>chat with{chat.id}</title>
                </Head>
                
                <Sidebar />
                <Chatcontainer>
                    <ChatScreen />
                </Chatcontainer>

            </Container>
        
    )
}


export default Chat


const Container = styled.div`
display: flex;

`;
const Chatcontainer = styled.div`
flex: 1;
overflow: scroll;
height: 100vh;
::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`;