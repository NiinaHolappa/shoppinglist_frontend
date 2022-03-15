import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const URL = 'http://localhost/ostoslista/shoppinglist/';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      setItems(response.data);
    }).catch(error => {
      alert(error);
    });
  }, [])


  function add(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item, amount: amount});
    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItems(items => [...items,response.data]);
      setItem('');
      setAmount('');
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = items.filter((item) => item.id !== id);
      setItems(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    })
  }


  return (
    <div>
      <h3>Shopping list</h3>
      <form onSubmit={add}>
        <label>New item</label>
        <input type="text" value={item} placeholder='Add new item' onChange={e => setItem(e.target.value)}></input>
        <input type="number" placeholder='type amount' value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        <button>Add</button>
      </form>
      <table>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>
                <a href="#" onClick={() => remove(item.id)}>
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}

export default App;
