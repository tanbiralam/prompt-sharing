"use client"

import {useState, useEffect} from 'react'

import PromptCard from './PromptCard'

const Feed = () => {

  const [searchText, setSearchText] = useState("")
  const handleSearchChange = (e) => {

  }
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for prompts...'
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
        />
      </form>
    </section>
  )
}

export default Feed