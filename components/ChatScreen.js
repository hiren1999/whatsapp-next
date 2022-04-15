import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { Avatar, IconButton } from '@material-ui/core';
import Message from './Message';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { useState, useRef } from 'react';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

const ChatScreen = ({ chat, messages }) => {
	const [input, setInput] = useState('');
	const endOfMessageRef = useRef(null);
	const [user] = useAuthState(auth);
	const router = useRouter();
	const [recipientSnapshot] = useCollection(
		db
			.collection('users')
			.where('email', '==', getRecipientEmail(chat.users, user)),
	);

	const [messagesSnapshot] = useCollection(
		db
			.collection('chats')
			.doc(router.query.id)
			.collection('messages')
			.orderBy('timestamp', 'asc'),
	);

	const showMessages = () => {
		if (messagesSnapshot) {
			return messagesSnapshot?.docs.map((message) => (
				<Message
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime(),
					}}
				/>
			));
		} else {
			return JSON.parse(messages)?.map((message) => (
				<Message
					key={message.id}
					user={message.user}
					message={message}
				/>
			));
		}
	};

	const sendMessage = (e) => {
		e.preventDefault();

		// UPDATE THE LAST SEEN
		db.collection('users').doc(user.uid).set(
			{
				lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
			},
			{ merge: true },
		);

		// ADD THE MESSAGE TO THE DB
		db.collection('chats').doc(router.query.id).collection('messages').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			user: user.email,
			photoURL: user.photoURL,
		});

		setInput('');
		scrollToBottom();
	};

	const scrollToBottom = () => {
		endOfMessageRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	const recipient = recipientSnapshot?.docs[0]?.data();
	const recipientEmail = getRecipientEmail(chat.users, user);

	return (
		<Container>
			<Header>
				{recipient ? (
					<Avatar src={recipient?.photoURL} />
				) : (
					<Avatar>{recipientEmail[0]}</Avatar>
				)}
				<HeaderInfo>
					<h3>{recipientEmail}</h3>
					{recipientSnapshot ? (
						<p>
							Last active:{' '}
							{recipient?.lastSeen?.toDate() ? (
								<TimeAgo date={recipient?.lastSeen?.toDate()} />
							) : (
								'Unavailable'
							)}
						</p>
					) : (
						<p>Loading...</p>
					)}
				</HeaderInfo>
				<HeaderIcons>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</HeaderIcons>
			</Header>

			<MessageContainer>
				{showMessages()}
				<EndOfMessage ref={endOfMessageRef} />
			</MessageContainer>

			<InputContainer>
				<InsertEmoticon />
				<Input
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button
					hidden
					disabled={!input}
					type='submit'
					onClick={sendMessage}>
					Send Message
				</button>
				<MicIcon />
			</InputContainer>
		</Container>
	);
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
    position: sticky;
    background-color: #fff;
    z-index: 100;
    top 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
	margin-left: 15px;
	flex: 1;

	> h3 {
		margin-bottom: 3px;
	}
	> p {
		font-size: 14px;
		color: gray;
	}
`;

const HeaderIcons = styled.div``;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div`
	padding: 30px;
	background-color: #e5ded8;
	min-height: 90vh;
`;

const Input = styled.input`
	flex: 1;
	outline: none;
	border: none;
	border-radius: 10px;
	padding: 20px;
	margin: 0 15px;
	background-color: whitesmoke;
`;

const InputContainer = styled.form`
	display: flex;
	align-items: center;
	padding: 10px;
	position: sticky;
	bottom: 0;
	background-color: white;
	z-index: 100;
`;
