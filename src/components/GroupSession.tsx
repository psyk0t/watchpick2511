import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Trash2 } from 'lucide-react';

export function GroupSession() {
  const [members, setMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState('');

  const addMember = () => {
    if (newMember.trim() && !members.includes(newMember.trim())) {
      setMembers([...members, newMember.trim()]);
      setNewMember('');
    }
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-indigo-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Group Session</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Enter member name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyPress={(e) => e.key === 'Enter' && addMember()}
          />
          <button
            onClick={addMember}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-2">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <span className="text-gray-700">{member}</span>
              <button
                onClick={() => removeMember(index)}
                className="text-rose-500 hover:text-rose-600 p-1"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        {members.length > 0 && (
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors mt-4"
          >
            Start Group Session
          </button>
        )}
      </div>
    </div>
  );
}