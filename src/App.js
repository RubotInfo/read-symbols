import './App.css';
import React, { useEffect, useState } from "react";

function App() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://rubot.info/api/spa/symbols")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.symbols);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <table>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.symbol}-{item.title}</td>
                        {Object.values(item.options).map( (price) => (
                            <td>{price}</td>
                        ))}
                    </tr>
                ))}
            </table>
        );
    }
}

export default App;
