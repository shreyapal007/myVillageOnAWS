import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [objects, setObjects] = useState<Array<Schema["Object"]["type"]>>([]);

  useEffect(() => {
    client.models.Object.observeQuery().subscribe({
      next: (data) => setObjects([...data.items]),
    });
  }, []);

  function createObject() {
    client.models.Object.create({ content: window.prompt("Object content") });
  }
    
  function deleteObject(id: string) {
    client.models.Object.delete({ id })
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s objects</h1>
          <button onClick={createObject}>+ new</button>
          <ul>
            {objects.map((object) => (
              <li 
              onClick={() => deleteObject(object.id)}
              key={object.id}>{objects.content}
              </li>
            ))}
          </ul>
          <button onClick={signOut}>Sign out</button>
        </main>
        
      )}
      </Authenticator>
  );
}

export default App;
