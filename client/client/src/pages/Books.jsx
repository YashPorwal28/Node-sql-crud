import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Books = () => {
  const [books, setBooks] = useState([]) // use state to store al the books

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8800/books')
        //console.log(res)
        setBooks(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchAllBooks()
  }, []) // empty array means only will run once


  const handleDelete = async(id)=>{
    try {
      // console.log(id)
        await axios.delete("http://localhost:8800/books/" + id)
        window.location.reload();
    } catch (error) {
      
    }
  }

  return (
    <div>
      <h1>Doon Book shop</h1>
      <div className='books'>
        {books.map(book => {
          return (
            <div className='book' key={book.id}>
              {/* {book.cover && <img src={book.cover} alt=' ' />} */}
              <img src={book.cover} alt= ""></img>
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>{book.price}</span>
              <button className="delete" onClick={()=> handleDelete(book.id)} >Delete</button>
              <button className="update"> <Link to={`/update/${book.id}`}> Update</Link></button>
            </div>
          )
        })}
      </div>
      <button>
        <Link to='/add'>Add new book</Link>
      </button>  
    </div>
  )
}
// onClick={()=>(handleDelete(book.id))}
export default Books
