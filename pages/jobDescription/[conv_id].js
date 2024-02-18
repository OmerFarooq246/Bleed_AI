import React from 'react'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'

export default function index() {
  const [JD, setJD] = useState('')
  const router = useRouter()
  const { conv_id } = router.query
  // get latest JD
  // curl -X 'GET' \
  // 'https://talentai-service-5oyupglq2q-uc.a.run.app/get-job-description?conversation_id=conversation_20240218065333-akfN5QV59n' \
  // -H 'accept: application/json'
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://talentai-service-5oyupglq2q-uc.a.run.app/get-job-description?conversation_id=${conv_id}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      })
      const data = await response.json()
      console.log(data)
      if (data.response)
        setJD(data.response)
      else setJD('No JD found')
    }
    fetchData()
  }, [conv_id])
  return (
    <div>{JD}</div>
  )
}
