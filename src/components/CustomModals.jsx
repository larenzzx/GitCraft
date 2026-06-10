import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, FilePlus, Trash2, X } from 'lucide-react'

// Custom Modal overlay styles
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const modalVariants = {
  hidden: { scale: 0.95, opacity: 0, y: 10 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { scale: 0.95, opacity: 0, y: 10 }
}

export function NewFileModal({ isOpen, onClose, onCreate, existingFiles }) {
  const [filename, setFilename] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = filename.trim()
    if (!trimmed) {
      setError('Filename cannot be empty')
      return
    }
    // Validation
    if (existingFiles.some(f => f.name.toLowerCase() === trimmed.toLowerCase())) {
      setError(`A file named "${trimmed}" already exists.`)
      return
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(trimmed)) {
      setError('Invalid filename. Only alphanumeric, dashes, dots, and underscores allowed.')
      return
    }
    
    onCreate(trimmed)
    setFilename('')
    setError('')
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
      >
        <motion.div
          className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          variants={modalVariants}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-zinc-800/80 flex justify-between items-center">
            <h3 className="font-bold text-sm text-zinc-200 flex items-center">
              <FilePlus className="h-4.5 w-4.5 mr-2 text-zinc-400" />
              Create New Local File
            </h3>
            <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Filename</label>
              <input
                type="text"
                autoFocus
                value={filename}
                onChange={e => {
                  setFilename(e.target.value)
                  if (error) setError('')
                }}
                placeholder="e.g., login.html, styles.css"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-xl px-3.5 py-2 text-xs font-mono text-emerald-400 focus:outline-none transition-all"
              />
              {error && (
                <p className="text-[10px] text-rose-450 font-semibold mt-1.5 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {error}
                </p>
              )}
            </div>

            <div className="flex space-x-3 justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-800/60 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Create File
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
      >
        <motion.div
          className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
          variants={modalVariants}
        >
          <div className="p-6 text-center space-y-4">
            <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
              type === 'danger' ? 'bg-rose-950/40 border border-rose-900/30 text-rose-400' : 'bg-amber-950/40 border border-amber-900/30 text-amber-400'
            }`}>
              {type === 'danger' ? <Trash2 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
            </div>
            
            <div>
              <h3 className="font-bold text-zinc-200 text-sm">{title}</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{message}</p>
            </div>

            <div className="flex space-x-3 justify-center pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-800/60 transition-all flex-1 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
                className={`px-4 py-2 text-zinc-950 text-xs font-bold rounded-lg transition-all flex-1 cursor-pointer ${
                  type === 'danger' ? 'bg-rose-500 hover:bg-rose-450 shadow-sm' : 'bg-amber-500 hover:bg-amber-450 shadow-sm'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
