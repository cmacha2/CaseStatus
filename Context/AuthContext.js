import * as React from "react";
import { Auth, API, graphqlOperation,Hub, Amplify } from "aws-amplify";
import { Platform,Linking } from "react-native";
import {createUser} from "../src/graphql/mutations"
import {useDispatch} from 'react-redux'
import { setUser } from "../src/features/user";
import { getUser } from "../src/graphql/queries";
import { setChatRooms } from "../src/features/chatRooms";
import * as WebBrowser from 'expo-web-browser';
import awsconfig from '../src/aws-exports'

async function urlOpener(url,redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});


const AuthContext = React.createContext({
  authState: "default",
  setAuthState: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  verificationCode: "",
  setVerificationCode: () => {},
  isLoading: false,
  firstName: "",
  setLastName: () => {},
  lastName: "",
  confirmPassword: "",
  setConfirmPassword: () => {},
  setFirstName: () => {},
  handleSignIn: () => {},
  handleSignUp: () => {},
  handleConfirmSignUp: () => {},
  handleForgotPassword: () => {},
  handleResetPassword: () => {},
  handleResendVerificationCode: () => {},
});

const { Provider } = AuthContext;

function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState("default");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const dispatch = useDispatch();


  React.useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn': {
          handleSignInWithProvider()
          console.log('sign in with provider detected')
          break;
        }
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }
    });
  }, []);

  async function handleSignInWithProvider() {
    try {
      setIsLoading(true);
      const { attributes } = await Auth.currentAuthenticatedUser();

      if (attributes.identities?.length > 0) {
        console.log("attributes", attributes);
        const { data } = await API.graphql(
          graphqlOperation(getUser, { id: attributes.sub })
        );
        if (data.getUser) {
          setIsLoading(true);
          console.log("user found!", data);
          const { notificationsList } = await getNotificationsByUserID(
            attributes.sub
          );
          if (notificationsList) dispatch(setNotifications(notificationsList));
          // console.log(data);
          if (data.getUser) {
            dispatch(
              setUser({
                id: attributes.sub,
                firstName: data.getUser.firstName,
                lastName: data.getUser.lastName,
                profilePicture: data.getUser.profilePicture,
                email: attributes.email.toLowerCase(),
                status: data.getUser.status,
                notificationToken: data.getUser.notificationToken,
                latitude: data.getUser.latitude,
                longitude: data.getUser.longitude,
                cases: data.getUser.cases.items,
              })
            );
            if (data.getUser.chatRooms.items !== null) {
              dispatch(setChatRooms(data.getUser.chatRooms.items));
            }
          }
          setIsLoading(false);
        } else {
          console.log("user not found!");
          const userToSave = {
            id: attributes.sub,
            firstName: attributes.email.slice(0, attributes.email.indexOf("@")),
            lastName: "",
            profilePicture: null,
            email: attributes.email.toLowerCase(),
            status: null,
            notificationToken: null,
            latitude: null,
            longitude: null,
          };
          try {
            const userFromDB = await API.graphql(
              graphqlOperation(createUser, {
                input: userToSave,
              })
            );
            dispatch(setUser(userToSave));
            console.log("user saved to DB and Redux", userFromDB);
            setIsLoading(false);
          } catch (e) {
            setIsLoading(false);
            console.log("error saving user", e);
          }
        }
      } else {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      // console.log(attributes);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }



  async function handleSignIn() {
    if (!email || !password) {
      alert("please enter an email and password");
      return;
    }
    try {
      setIsLoading(true);
      const user = await Auth.signIn({
        username: email,
        password,
      });
      const userFromDB = await API.graphql(
        graphqlOperation(getUser, { id: user.attributes.sub })
      );
      dispatch(
        setUser({
          id: user.attributes.sub,
          firstName: userFromDB.data.getUser.firstName,
          lastName: userFromDB.data.getUser.lastName,
          profilePicture: userFromDB.data.getUser.profilePicture,
          backgroundPicture: userFromDB.data.getUser.backgroundPicture,
          email: user.attributes.email.toLowerCase(),
          status: userFromDB.data.getUser.status,
          notificationToken: userFromDB.data.getUser.notificationToken,
          latitude:userFromDB.data.getUser.latitude,
          longitude:userFromDB.data.getUser.longitude,
          cases: userFromDB.data.getUser.cases.items,
        })
      );
      if(userFromDB.data.getUser.chatRooms.items !== null){
      dispatch(setChatRooms(userFromDB.data.getUser.chatRooms.items));
      }
      setIsLoading(false);
      console.log("user signed In");
      setAuthState("signedIn");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
      console.log(e);
    }
  }

  async function handleSignUp() {
    if (!email || !password) {
      alert("Please enter an email and password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
        },
      });
      setAuthState("confirmSignUp");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      console.log(error);
    }
  }

  async function handleConfirmSignUp() {
    if (!verificationCode) {
      alert("Please enter verification code");
      return;
    }
    try {
      setIsLoading(true);
      await Auth.confirmSignUp(email, verificationCode);
      const user = await Auth.signIn({
        username: email,
        password,
      });
      await saveUserToDatabase(user);
      alert("Welcome, account created succesfully");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      console.log(error);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      alert("Please enter an email");
      return;
    }
    try {
      setIsLoading(true);
      await Auth.forgotPassword(email);
      setAuthState("confirmForgotPassword");
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!verificationCode || verificationCode.length !== 6) {
      alert("Please enter a valid verification code");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      await Auth.forgotPasswordSubmit(email, verificationCode, password);
      alert("Password reset successfully, Now you can Sign In");
      setAuthState("signIn");
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleResendVerificationCode() {
    try {
      await Auth.resendSignUp(email);
      alert(`Successfully resent confirmation code to ${email}`);
    } catch (e) {
      alert(e);
    }
  }

  async function saveUserToDatabase(user) {
    const { attributes } = user;
    const userToSave = {
      id: attributes.sub,
      firstName: attributes.given_name,
      lastName: attributes.family_name,
      profilePicture: null,
      backgroundPicture: null,
      email: attributes.email.toLowerCase(),
      status: null,
      notificationToken: null,
      latitude:null,
      longitude:null,
    };
    try {
      const userFromDB = await API.graphql(
        graphqlOperation(createUser, {
          input: userToSave,
        })
      );
      dispatch(setUser(userToSave));
      console.log("user saved to DB and Redux", userFromDB);
    } catch (e) {
      console.log("error saving user", e);
    }
  }
  return (
    <Provider
      value={{
        authState,
        setAuthState,
        email,
        setEmail,
        password,
        setPassword,
        handleSignIn,
        handleSignUp,
        handleConfirmSignUp,
        verificationCode,
        setVerificationCode,
        isLoading,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        confirmPassword,
        setConfirmPassword,
        handleForgotPassword,
        handleResendVerificationCode,
        handleResetPassword,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };