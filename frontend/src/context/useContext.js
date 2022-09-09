import { createContext, useState } from "react";

//export le UserContext qui est l'objet du context qui permet d'accéder aux valeurs du context défini dans le Provider dans les composant en faisant useContext(UserContext);
export const UserContext = createContext();

// composant d'ordre supérieur qui emballe les composants permettant d'accéder aux valeurs communes du context remise à jour pour les composants (enfant ou pas)
export function UserContextProvider(props) {
  const [feedback, setFeedback] = useState({
    state: false,
    type: "",
    msg: "",
  });

  const toggleFeed = (feed) => {
    setFeedback({
      state: feed.state,
      type: feed.type,
      msg: feed.msg,
    });
  };

  return (
    //props.children représente tous les comopsant qui seront à l'intéreiur de la balise dans index.js
    // !loadingData représente le retour de la connexion à firebase tant qu'il est false on ne peut accéder au routye privée
    // on se passe currentUser pour l'utilser n'importe ou en appelant useContext
    <UserContext.Provider
      value={{
        feedback,
        toggleFeed,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
