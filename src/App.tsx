import './App.css'
import * as localforage from "localforage";
import {useEffect, useState} from "react";

interface User {
    isLogin: false,
    accessToke: string | null,
    userName: string | null
}

const App = () => {

    const [name, setName] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const [store1Data, setStore1Data] = useState<string | null>("");
    const [store2Data, setStore2Data] = useState<string | null>("");
    const [storeWebSQLData, setStoreWebSQLData] = useState<string | null>("");

    /**
     * @des Handle multiple instances
     */
    const store1 = localforage.createInstance({
        name: "store_1"
    });

    const store2 = localforage.createInstance({
        name: "store_2"
    });

    /**
     * @des Handle WebSQL
     */
    const storeWebSql = localforage.createInstance({
        name: "store_3"
    });
    storeWebSql.config({
        driver: storeWebSql.WEBSQL, // Force WebSQL; same as using setDriver()
        name: 'myApp',
        version: 1.0,
        size: 4980736, // Size of database, in bytes. WebSQL-only for now.
        storeName: 'my_db', // Should be alphanumeric, with underscores.
        description: 'some description'
    });

    useEffect(() => {
        getItem().catch(console.error);
    }, []);

    /**
     * @des fetch stores data
     */
    const getItem = async () => {
        try {
            const valueName: string | null = await localforage.getItem('name');
            setName(valueName);

            const valueUser: User | null = await localforage.getItem('user');
            setUser(valueUser);

            const valueStore1: string | null = await store1.getItem('name');
            setStore1Data(valueStore1);

            const valueStore2: string | null = await store2.getItem('name');
            setStore2Data(valueStore2);

            const valueWebSQL: string | null = await storeWebSql.getItem('name');
            setStoreWebSQLData(valueWebSQL);

        } catch (err) {
            // This code runs if there were any errors.
            console.log(err);
        }
    }

    /**
     * @des store data into localforage
     */
    const setItem = async () => {
        try {
            const user = {
                isLogin: false,
                accessToke: null,
                userName: ""
            }
            await localforage.setItem('name', 'Eshan');
            await localforage.setItem('user', user);
            getItem().catch(console.error);
        } catch (err) {
            // This code runs if there were any errors.
            console.log(err);
        }
    }

    /**
     * @des store data into store_1
     */
    const addDataToStore1 = async () => {
        try {
            await store1.setItem('name', 'Eshan S1');
            getItem().catch(console.error);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @des store data into store_2
     */
    const addDataToStore2 = async () => {
        try {
            await store2.setItem('name', 'Eshan S2');
            getItem().catch(console.error);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @des store data into webSQL
     */
    const addDataToWebSQL = async () => {
        try {
            await storeWebSql.setItem('name', 'Eshan S2');
            getItem().catch(console.error);
        } catch (err) {
            console.log(err);
        }
    }

    const clearStorage = () => {
        localforage.clear();
        store1.clear();
        store2.clear();
        storeWebSql.clear();
    }

    return (
        <>
            <button onClick={setItem} className="mr-10">Add data to default store</button>
            <button onClick={addDataToStore1} className="mr-10">Add data to store 1</button>
            <button onClick={addDataToStore2} className="mr-10">Add data to store 2</button>
            <button onClick={addDataToWebSQL} className="mr-10">Add data to store 2</button>
            <button onClick={clearStorage}>Clear all storages</button>

            <table>
                <thead>
                <tr>
                    <th>Store Name</th>
                    <th>Data Type</th>
                    <th>Data</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Default</th>
                    <th>String</th>
                    <th>{name}</th>
                </tr>
                <tr>
                    <th>Default</th>
                    <th>Object</th>
                    <th>{JSON.stringify(user, null, 2)}</th>
                </tr>
                <tr>
                    <th>Store 1</th>
                    <th>String</th>
                    <th>{store1Data}</th>
                </tr>
                <tr>
                    <th>Store 2</th>
                    <th>String</th>
                    <th>{store2Data}</th>
                </tr>
                <tr>
                    <th>Web SQL</th>
                    <th>String</th>
                    <th>{storeWebSQLData}</th>
                </tr>
                </tbody>
            </table>
        </>
    )
}

export default App
