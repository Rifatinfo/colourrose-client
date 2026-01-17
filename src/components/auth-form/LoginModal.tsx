"use client";
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')
  //================= Close on ESC key ================= //
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])
  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-sm shadow-2xl relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/*======== Close Button ===========*/}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/*======== Header with Toggle ===========*/}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-4 text-sm font-bold uppercase cursor-pointer transition-colors ${activeTab === 'signin' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-4 text-sm font-bold uppercase cursor-pointer transition-colors ${activeTab === 'signup' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/*======== Form Content ===========*/}
        <div className="p-6">
          {activeTab === 'signin' ? <SignInForm onClose={onClose} /> : <SignUpForm onClose={onClose} />}
        </div>
      </div>
    </div>
  )
}

export default LoginModal;