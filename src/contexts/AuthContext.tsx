// import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
// import { authAPI } from '@/services/api'

// interface User {
//   user_id: number
//   nik: string
//   name: string
//   email: string
//   role: 'employee' | 'finance_area' | 'finance_regional'
//   department?: string
//   position?: string
//   office_location?: string
//   area_code?: string
//   regional_code?: string
// }

// interface AuthContextType {
//   user: User | null
//   token: string | null
//   isAuthenticated: boolean
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<User>
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null)
//   const [token, setToken] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const initAuth = () => {
//       const savedToken = localStorage.getItem('token')
//       const savedUser = localStorage.getItem('user')
      
//       if (savedToken && savedUser) {
//         try {
//           setToken(savedToken)
//           setUser(JSON.parse(savedUser))
//         } catch (error) {
//           console.error('Failed to parse saved user:', error)
//           localStorage.removeItem('token')
//           localStorage.removeItem('user')
//           setToken(null)
//           setUser(null)
//         }
//       }
      
//       setIsLoading(false)
//     }

//     initAuth()
//   }, [])

//   const login = async (email: string, password: string): Promise<User> => {
//     try {
//       console.log('🔐 Attempting login...', email)
//       const response = await authAPI.login(email, password)
//       const { access_token, user: userData } = response.data
      
//       console.log('✅ Login success:', userData)
      
//       localStorage.setItem('token', access_token)
//       localStorage.setItem('user', JSON.stringify(userData))
//       setToken(access_token)
//       setUser(userData)
      
//       return userData
//     } catch (error: any) {
//       console.error('❌ Login error:', error)
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//       setToken(null)
//       setUser(null)
//       throw new Error(error.response?.data?.error || 'Login failed')
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     setToken(null)
//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         isAuthenticated: !!token && !!user,
//         isLoading,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }




import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '@/services/api'

interface User {
  user_id: number
  nik: string
  name: string
  email: string
  role: 'employee' | 'finance_area' | 'finance_regional' | 'hr'
  department?: string
  position?: string
  office_location?: string
  area_code?: string
  regional_code?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<User>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = () => {
      const savedToken = localStorage.getItem('token')
      const savedUser = localStorage.getItem('user')
      
      if (savedToken && savedUser) {
        try {
          setToken(savedToken)
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error('Failed to parse saved user:', error)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setToken(null)
          setUser(null)
        }
      }
      
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    try {
      console.log('🔐 Attempting login...', email)
      const response = await authAPI.login(email, password)
      const { access_token, user: userData } = response.data
      
      console.log('✅ Login success:', userData)
      
      localStorage.setItem('token', access_token)
      localStorage.setItem('user', JSON.stringify(userData))
      setToken(access_token)
      setUser(userData)

      // ✅ Redirect based on role
      switch (userData.role) {
        case 'employee':
          navigate('/employee/dashboard')
          break
        case 'finance_area':
          navigate('/finance-area/dashboard')
          break
        case 'finance_regional':
          navigate('/finance-regional/dashboard')
          break
        case 'hr':
          navigate('/hr/dashboard')
          break
        default:
          navigate('/login')
      }
      
      return userData
    } catch (error: any) {
      console.error('❌ Login error:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setToken(null)
      setUser(null)
      throw new Error(error.response?.data?.error || 'Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}