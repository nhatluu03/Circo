import React from 'react'

export default function SuccessModal({msg, setShowSuccessModal}) {
  return (
    <div className="success-modal">
      <p>msg</p>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
