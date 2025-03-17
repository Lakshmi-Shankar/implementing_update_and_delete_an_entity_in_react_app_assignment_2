  import ItemList from "./components/ItemList";
  import { useEffect, useState } from "react";

  // use the following link to get the data
  // `/doors` will give you all the doors.
  const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

  function App() {
    // Get the existing item from the server
    const [items, setItems] = useState([]);
    // pass the item to UpdateItem as a prop

    const fetchData = async()=>{
      try{
        const response = await fetch(API_URI,{
          method:"GET",
          headers: {"Content-Type":"application/json"}
        })
        const data = await response.json();
        setItems(data)
      }
      catch(err){
        console.log("Error:",err)
      }
    }

    useEffect(()=>{
      fetchData()
    },[])

    console.log(items)

    const handleDelete = async(e)=>{
      const id = e.target.value;
      console.log(id)
      try{
        const response = await fetch(`${API_URI}/${id}`,{
          method: "DELETE",
          headers: {"Content-Type":"application/json"}
        })
        if(response.ok){
          console.log("Deleted")
        }

        setItems((pre)=>pre.filter((item)=>item.id !== id))
      }catch(err){
        console.log("Error",err)
      }
    }

    // return <ItemList items={items} />;
    return(
      <>
        <div>
          {items.length === 0 ? <p>No Data Found</p>:
          items.map((data,index)=>(
            <div key={index}>
              <h4>Name: {data.name}</h4>
              <h5>Status: {data.status}</h5>
              <button value={data.id} onClick={handleDelete}>Delete</button>
            </div>
          ))
          }
          <ItemList items={items} />
        </div>
      </>
    )
  }

  export default App;
