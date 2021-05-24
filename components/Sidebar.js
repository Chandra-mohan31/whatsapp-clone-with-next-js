import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth,db } from "../firebase";
import { useAuthState} from "react-firebase-hooks/auth";

function Sidebar() {
    const [user] = useAuthState(auth);
    const createChat = () =>{
        const input = prompt('please enter the email you wish to chat');
        if(!input){
            return null;
        }
        if(EmailValidator.validate(input)){
            //we need to add the chat into chat db
            db.collection('chats').add({
                users: [user.email,input],
            })
        }
        
    }
    return (
        <Container>
            <Header>
                <UserAvatar onClick={()=> auth.signOut()} />
                <IconContainer>
                <IconButton>
                <ChatIcon />
                </IconButton>
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                   
                </IconContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="search for chat" />
            </Search>
            <SidebarButton onClick={createChat}>
                Start a new Chat
            </SidebarButton>
            {/* list of chats */}
        </Container>
    )
}

export default Sidebar
const Container = styled.div`
    /* background-color: black */
`;
const Header = styled.div`
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    ${'' /* cursor: pointer; */}
    cursor: pointer;
    ${'' /* margin-left: 10px; */}
    :hover{
        opacity: 0.8;

    }

`;
const IconContainer = styled.div`

`;
const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`;

const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1;
`;
const SidebarButton = styled(Button)`
width: 100%;
&&{
    border-top:1px solid whitesmoke ;
    border-bottom: 1px solid whitesmoke ;
}
${'' /* border-top:1px solid black !important;
border-bottom: 1px solid whitesmoke !important; */}

`;


