import React from 'react'
import { Folder, File, Plus, Trash2 } from 'lucide-react'

export default function FolderExplorer({ files, onTriggerNewFile, onTriggerDeleteFile, onMakeLocalModification }) {
  return (
    <div className="glass-premium rounded-2xl p-5 relative overflow-hidden h-[400px] flex flex-col justify-between">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h3 className="text-sm font-semibold text-zinc-200 flex items-center">
            <Folder className="h-4 w-4 mr-2 text-zinc-400" />
            Your Local Folder (`/project`)
          </h3>
          <button
            onClick={onTriggerNewFile}
            className="p-1 px-2 text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md flex items-center transition-colors"
          >
            <Plus className="h-3 w-3 mr-1" /> New File
          </button>
        </div>

        {/* Virtual File List */}
        <div className="space-y-2.5 flex-1 overflow-y-auto pr-1 min-h-0">
          {files.map(file => (
            <div
              key={file.name}
              className="flex justify-between items-center p-3 rounded-xl bg-zinc-900/60 border border-zinc-850 hover:border-zinc-800 transition-all hover:bg-zinc-900"
            >
              <div className="flex items-center space-x-3">
                <File className={`h-4.5 w-4.5 ${
                  file.state === 'staged' ? 'text-emerald-500' :
                  file.state === 'modified' ? 'text-amber-500 animate-pulse' :
                  file.state === 'committed' ? 'text-zinc-500' : 'text-zinc-650'
                }`} />
                <div>
                  <span className="font-mono text-xs font-semibold block text-zinc-200">{file.name}</span>
                  <span className={`text-[9px] font-semibold uppercase ${
                    file.state === 'staged' ? 'text-emerald-500' :
                    file.state === 'modified' ? 'text-amber-500' :
                    file.state === 'committed' ? 'text-zinc-500' : 'text-zinc-650'
                  }`}>
                    {file.state}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onMakeLocalModification(file.name)}
                  className="text-[10px] bg-zinc-800 text-zinc-300 hover:bg-zinc-700 px-2 py-1 rounded transition-colors"
                  title="Edit local file code content"
                >
                  Edit
                </button>
                <button
                  onClick={() => onTriggerDeleteFile(file.name)}
                  className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                  title="Delete file"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
