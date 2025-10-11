"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Skill {
  id: number;
  name: string;
}

interface SkillInputProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
}

const SkillInput: React.FC<SkillInputProps> = ({ skills, setSkills }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Skill[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (inputValue.length < 2) {
        setSuggestions([]);
        setIsDropdownOpen(false);
        return;
      }

      try {
        const response = await fetch(`/api/skills?search=${inputValue}`);
        const data = await response.json();
        if (data.success) {
          setSuggestions(data.data);
          setIsDropdownOpen(true);
        }
      } catch (error) {
        console.error('Failed to fetch skills', error);
      }
    };

    const debounce = setTimeout(() => {
      fetchSkills();
    }, 300);

    return () => clearTimeout(debounce);
  }, [inputValue]);

  const addSkill = (skill: Skill) => {
    if (!skills.some(s => s.id === skill.id)) {
      setSkills([...skills, skill]);
    }
    setInputValue('');
    setIsDropdownOpen(false);
  };

  const removeSkill = (skillToRemove: Skill) => {
    setSkills(skills.filter(skill => skill.id !== skillToRemove.id));
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="glass-pane p-3 rounded-lg" style={{backgroundColor: "rgba(26, 26, 46, 0.5)", border: "1px solid rgba(159, 84, 255, 0.2)", backdropFilter: "blur(10px)", borderRadius: "10px"}}>
        <div className="tag-display-area min-h-[2.5rem] flex flex-wrap items-center gap-2 pb-2">
          {skills.map(skill => (
            <div key={skill.id} className="skill-tag bg-purple-600/50 border border-purple-500/50 text-purple-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
              {skill.name}
              <button type="button" onClick={() => removeSkill(skill)} className="text-purple-300 hover:text-white focus:outline-none">
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="border-t border-purple-500/20 pt-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) {
                setIsDropdownOpen(true);
              }
            }}
            placeholder="Start typing a skill (e.g., React, Python, IT Support)..."
            className="bg-transparent focus:outline-none text-white w-full"
          />
        </div>
      </div>
      {isDropdownOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 p-2 rounded-lg border shadow-lg" style={{backgroundColor: "rgba(26, 26, 46, 0.5)", border: "1px solid rgba(159, 84, 255, 0.2)", backdropFilter: "blur(10px)", borderRadius: "10px"}}>
          <ul>
            {suggestions.map(suggestion => (
              <li
                key={suggestion.id}
                onClick={() => addSkill(suggestion)}
                className="cursor-pointer p-2 hover:bg-purple-500/20 rounded-lg text-gray-300"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillInput;