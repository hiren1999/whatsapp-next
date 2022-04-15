import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';
import { db, auth } from '../../firebase';
import getRecipientEmail from '../../utils/getRecipientEmail';

const Chat = ({ chat, messages }) => {
	const [user] = useAuthState(auth);

	return (
		<Container>
			<Head>
				<title>Chat With {getRecipientEmail(chat.users, user)}</title>
			</Head>
			<Sidebar />
			<ChatContainer>
				<ChatScreen chat={chat} messages={messages} />
			</ChatContainer>
		</Container>
	);
};

export default Chat;

export async function getServerSideProps(context) {
	const ref = db.collection('chats').doc(context.query.id);

	// PREP THE MESSAGES
	const messageRes = await ref
		.collection('messages')
		.orderBy('timestamp', 'asc')
		.get();

	const messages = messageRes.docs
		?.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		.map((message) => ({
			...message,
			timestamp: message.timestamp.toDate().getTime(),
		}));

	// PREP THE CHATS
	const chatRes = await ref.get();
	const chat = {
		id: chatRes.id,
		...chatRes.data(),
	};

	return {
		props: {
			messages: JSON.stringify(messages),
			chat: chat,
		},
	};
}

const Container = styled.div`
	display: flex;
`;

const ChatContainer = styled.div`
	flex: 1;
	overflow: auto;
	height: 100vh;
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;
