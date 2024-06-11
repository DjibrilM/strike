import { createContext, useEffect, useState } from "react";
import { Connection, createConnection } from "typeorm";
import * as SQLite from 'expo-sqlite/legacy';
import {Credentials} from './credentials/credential.entity'
import { CredentialRepository } from "./credentials/credential.repository";
interface DatabaseConnectionContextData {
  credentialRepository: CredentialRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData
);

const DatabaseConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = async () => {
    try {
      const createdConnection = await createConnection({
        type: "expo",
        database: "strikeWallet.db",
        driver: SQLite,
        entities: [Credentials],
        synchronize: false,
      });

      setConnection(createdConnection);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connection, connect]);

  return (
    <DatabaseConnectionContext.Provider
      value={{ credentialRepository: new CredentialRepository() }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export default DatabaseConnectionProvider;