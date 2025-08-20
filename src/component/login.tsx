import { useState, type FormEvent, type ChangeEvent} from "react";
import { supabase } from "../lib/supabase";

interface signUpType {
    username: string,
    email: string,
    image: string,
    password: string,
}

function Signup(){

    const [data, setData] = useState<signUpType>({
        username: '',
        email: '',
        image: '',
        password: ''
    })
    

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setData(prev => ({
            ...prev,
            [name]:value
        }))
    };;

    async function handleSubmit (e: FormEvent){
       e.preventDefault();
       try {

         const {data: authData, error: authError} = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
         });

         if(authError) throw authError
         console.log(authData)
         // how come am getting an empty session
         if(authData.user){

            const { error: ProfilerError} = await supabase
                .from('profiles')
                .insert([
                    {
                        id: authData.user.id, // ← Use the auth user ID
                        username: data.username,
                        email: data.email,
                        image: data.image,
                        subscribers: 0
                    }
                ]);

                if(ProfilerError) throw ProfilerError
         }

         setData({
            username: '',
            email: '',
            image: '',
            password: ''
            }
         )

       } catch (error) {
        console.log(error)
       }
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">username</label>
                <input 
                    type="text"
                    id="username"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    minLength={1}
                    maxLength={10}
                    required 
                />
            </div>
            <div>
                <label htmlFor="email">email</label>
                <input 
                type="text"
                name="email"
                minLength={1}
                maxLength={25}
                value={data.email}
                id="email"
                onChange={handleChange}
                required 
                />
            </div>
            <div>
                <label htmlFor="image">image</label>
                <input 
                type="text"
                name="image"
                value={data.image}
                onChange={handleChange}
                id="image"
                required 
                />
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input 
                type="text"
                name="password"
                value={data.password}
                onChange={handleChange}
                id="password"
                required 
                />
            </div>
            <button>sign up</button>
        </form>
    )
};

export default Signup;