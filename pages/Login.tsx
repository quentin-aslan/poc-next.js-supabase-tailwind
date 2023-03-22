import React, {useState} from 'react'
import supabase from '@/lib/initSupabase'
export default function Login() {

    const [email, setEmail] = useState('')
    const [isWaitingForEmail, setIsWaitingForEmail] = useState(false)

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleLogin = async () => {
        setIsWaitingForEmail(true)
        if (!isValidEmail(email)) {
            // TODO: display a toast with daisy ui
            setIsWaitingForEmail(false)
            return alert('Please enter a valid email address')
        }

        const {data, error} = await supabase.auth.signInWithOtp({ email })
        if (error) {
            setIsWaitingForEmail(false)
            return alert(error.message)
        }

        setIsWaitingForEmail(true)
        console.log(data)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card-body card-bordered items-center text-center shadow-xl rounded-box max-w-max flex flex-col space-y-2">
                {isWaitingForEmail ? (
                    <div className="card-title text-white">Check your email for a magic link.</div>
                ) : (
                    <>
                        <div className="card-title text-white">Fill in your email, we'll send you a magic link.</div>
                        <div className="form-control w-full max-w-xs">
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="card-actions justify-end">
                            <button onClick={handleLogin} className="btn btn-primary">Send me a link</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}