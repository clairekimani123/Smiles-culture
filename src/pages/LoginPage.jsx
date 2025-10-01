// import React, { useState } from 'react'
// import api from '../utils/axios'
// import { useNavigate } from 'react-router-dom'

// export default function LoginPage(){
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setError('')
//     try {
//       const res = await api.post('token/', { username, password }) // token endpoint
//       const { access, refresh } = res.data
//       localStorage.setItem('access_token', access)
//       localStorage.setItem('refresh_token', refresh)

//       // Optionally fetch profile for phone/email
//       const profile = await api.get('users/me/') // create endpoint on backend
//       localStorage.setItem('phone', profile.data.phone || '')
//       navigate('/products')
//     } catch (err) {
//       console.error('Login error', err)
//       setError('Invalid credentials')
//     }
//   }

//   return (
//     <div className="min-h-[60vh] flex items-center justify-center">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <div className="text-red-500 mb-2">{error}</div>}
//         <input className="w-full p-2 border rounded mb-3" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required/>
//         <input className="w-full p-2 border rounded mb-3" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
//         <button className="w-full bg-brand text-white py-2 rounded">Login</button>
//       </form>
//     </div>
//   )
// }
