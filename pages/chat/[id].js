// import styled from "styled-components"
// import Head from "next/head";
// import Sidebar from "../../components/Sidebar";
// import ChatScreen from "../../components/ChatScreen";
// import { db,auth } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import getRecipientEmail from "../../utils/getRecipientEmail";


// // export async function getServerSideProps(context){
// //     const ref = db.collection("chats").doc(context.query.id);
// //     // console.log(ref);
// //     const messagesRes = await ref
// //             .collection("messages")
// //             .orderBy("timestamp","asc")
// //             .get();
// //     // console.log(messagesRes.docs);

// //     const messages = messagesRes.docs.map((doc) =>({
// //             id: doc.id,
// //             ...doc.data(),
// //             })).map(messages =>({
// //                         ...messages,
// //                         timestamp: messages.timestamp.toDate().getTime()
// //             }));
// //             //prep the chats
// //             const chatRes = await ref.get();
// //             const chat = {
// //                 id: chatRes.id,
// //                 ...chatRes.data()
// //             }
// //             // console.log(chat,messages);
// //             console.log(chat,messages);
           
// //             return{
// //                 props:{
// //                     messages: JSON.stringify(messages),
// //                     chat: chat
// //                 }
// //             }
// // }

// function Chat({chat,messages}) {
//     const [user] = useAuthState(auth);

//     return (
        
//             <Container>
//                 <Head>
//                     {/* <title>chat with {getRecipientEmail(chat.users,user)}</title> */}
//                     <title>chat with{chat.id}</title>
//                 </Head>
                
//                 <Sidebar />
//                 <Chatcontainer>
//                     <ChatScreen />
//                 </Chatcontainer>

//             </Container>
        
//     )
// }


// export async function getServerSideProps(context){
//     const ref = db.collection("chats").doc(context.query.id);

//     const messagesRes = await ref
//         .collection('messages')
//         .orderBy('timestamp', 'asc')
//         .get()

//     const messages = messagesRes.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//     })).map(messages => ({
//         ...messages,
//         timestamp: messages.timestamp.toDate().getTime()
//     }))

//     const chatRes = await ref.get()
//     const chat = {
//         id: chatRes.id,
//         data: chatRes.data
//     }
// console.log('====================================');
// console.log(chat);
// console.log('====================================');
    
//     return {
//         props: {
//             messages: JSON.stringify(messages),
//             chat: JSON.stringify(chat)
//         }
//     }
// }

// export default Chat


// const Container = styled.div`
// display: flex;

// `;
// const Chatcontainer = styled.div`
// flex: 1;
// overflow: scroll;
// height: 100vh;
// ::-webkit-scrollbar{
//     display: none;
// }
// -ms-overflow-style: none;
// scrollbar-width: none;
// `;
///////////////////////////////////////////////////////////

import styled from 'styled-components'
import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { db, auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipientEmail from '../../utils/getRecipientEmail'
import { useCollection } from 'react-firebase-hooks/firestore'

export async function getServerSideProps(context){
    const ref = db.collection('chats').doc(context.query.id)

    //prep the messaages on the server
    const messagesRes = await ref
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .get()

    const messages = messagesRes.docs?.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    //prep the chats
    const chatRes = await ref.get()
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }
    // console.log('====================================');
    // console.log(chat,messages);
    // console.log('====================================');

    return {
        props: {
            messages: JSON.stringify(messages),
            chat
        }
    }
}

function Chat({chat, messages}) {

    const [user] = useAuthState(auth)

 
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users,user)}
                    {/* {recipient ? (
                        recipient?.name
                    ) : (
                        getRecipientEmail(chat.users, user)
                    )} */}
                </title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}  />
            </ChatContainer>
        </Container>
    )
}

export default Chat


const Container = styled.div`
    display: flex;
`

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`