import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../componets/Loading";
import firebase from "firebase";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
    /* <---- check user is logged or not  -----> */
    const [user, loading] = useAuthState(auth);

    /* <---- New User stored in db   -----> */
    useEffect(() => {
        if (user) {
            db.collection("users")
                .doc(user.uid)
                .set(
                    {
                        email: user.email,
                        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
                        photoURL: user.photoURL,
                    },
                    {
                        merge: true,
                    }
                )
                .then(() => console.log("Document successfully written!"))
                .catch((err) => console.log(err, "Error writing document"));
        }
    }, [user]);

    /* <----- if true write in loading place loader will be show continued  ----> */
    if (loading) return <Loading />;

    if (!user) return <Login />;

    return <Component {...pageProps} />;
}

export default MyApp;
