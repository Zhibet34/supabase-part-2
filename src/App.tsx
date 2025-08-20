import { useState, useEffect } from 'react'
import axios from 'axios'
import './quotes.css'
import Signup from './component/login'

interface quoteType {
  id: number,
  created_at: string,
  Quote: string,
  user: string | null
};

interface userType {
  id: number,
  created_at: string,
  username: string,
  email: string,
  password: string,
  image: string,
  subscriber: number
}

function App() {
  const [quotes, setQuotes] = useState<quoteType[]>([]);
  const [users, setUser] = useState<userType[]>([]);
  const [error, setError] = useState(String);
  const [loading, setLoading] = useState<Boolean>(true);

  const api_Key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdHNmbXNheHJmbGpwYnNjb291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyOTE2ODMsImV4cCI6MjA3MDg2NzY4M30.vz-Tj-S9fYMIenDRLYH5OW7e8yUrU3zNttwCpWXFaIU';
  const endPointOne = 'https://pctsfmsaxrfljpbscoou.supabase.co/rest/v1/Quotes';
  const endPointTwo = 'https://pctsfmsaxrfljpbscoou.supabase.co/rest/v1/profiles';

  const fetchData = async () => {
    try {
      const [quotesResponse, usersResponse] = await Promise.all([
        axios.get(endPointOne,{
          headers: {
            'apikey': api_Key,
            'Authorization': `Bearer ${api_Key}`,
          }
        }),
        axios.get(endPointTwo,{
          headers: {
            'apikey': api_Key,
            'Authorization': `Bearer ${api_Key}`,
          }
        })
      ]);

      setQuotes(quotesResponse.data);
      setUser(usersResponse.data);
    } catch (error) {
      console.error(
        'Fetch error:', error
      )
    } finally {
      setLoading(false)
    }
  };

  useEffect(()=>{
    fetchData()
  },[]);


  const getUserImage = (userId: string | null) =>{
    if(!userId) return null;
    const user = users.find(user => user.id === userId);
    return user?.image
  };

  const QuotesList = () => {
    return(
      <>
        {quotes.map((quote)=>{
          const userImage = getUserImage(quote.user);
          return (
            <div key={quote.id} className='quotes'>
              {userImage && <img src={userImage} alt="User" />}
              <h4>'{quote.Quote}'</h4> - <p>{quote.user}</p>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div>
        <QuotesList/>
        <div>
          <Signup/>
        </div>
    </div>
    )
}

export default App
