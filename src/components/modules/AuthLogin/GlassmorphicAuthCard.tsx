
"use client"
import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

type AuthMode = 'login' | 'signup'

const GlassmorphicAuthCard = ({redirect} : {redirect? : string}) => {
  const [mode, setMode] = useState<AuthMode>('login')
  const [isLoading, setIsLoading] = useState(false)

  const toggleMode = (newMode: AuthMode) => {
    setMode(newMode)
    setIsLoading(false)
  }

  return (
    <div className="relative w-full max-w-[420px] mx-auto z-20 perspective-1000">
      <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden transition-all duration-500 ease-out">
        {/* Toggle */}
        <div className="p-2">
          <div className="relative flex w-full bg-gray-100/80 rounded-2xl p-1">
            <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-spring ${mode === 'login' ? 'left-1' : 'left-[calc(50%+4px)]'}`} />
            <button
              onClick={() => toggleMode('login')}
              className={`relative flex-1 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 z-10 ${mode === 'login' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
              LOG IN
            </button>
            <button
              onClick={() => toggleMode('signup')}
              className={`relative flex-1 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 z-10 ${mode === 'signup' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
              SIGN UP
            </button>
          </div>
        </div>

        <div className="px-8 pb-10 pt-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black mb-2 tracking-tight">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-500 text-sm">
              {mode === 'login'
                ? 'Enter your credentials to access your account'
                : 'Join our exclusive community today'}
            </p>
          </div>

          {/* Render SignIn or SignUp */}
          {mode === 'login' ? (
            <SignIn isLoading={isLoading} setIsLoading={setIsLoading} redirect={redirect} />
          ) : (
            <SignUp isLoading={isLoading} setIsLoading={setIsLoading} />
          )}
        </div>
      </div>
    </div>
  )
}

export default GlassmorphicAuthCard
