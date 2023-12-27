"use client"

import {useState, useEffect} from 'react'

import PromptCard from './PromptCard'


const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>

    </div>
  )
}


const Feed = () => {

  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState("")

 
  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
    }
  }, [])
  
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
      <PromptCardList
        data={[]}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed