import {useState} from 'react'
import "./OrderDetails.scss"

export default function OrderDetails() {
  return (
    <div className="order-details">
      <h3 className="profile-page__header">Order details</h3>
        <div className="order-details__status-container">
            <div className="order-details__status-item">
                <i className="order-details__status-item__ic">ICON</i>
                <h4 className="order-details__status-item__title">Pending</h4>
            </div>
            <div className="order-details__status-item">
                <i className="order-details__status-item__ic">ICON</i>
                <h4 className="order-details__status-item__title">Confirmed</h4>
            </div>
            <div className="order-details__status-item">
                <i className="order-details__status-item__ic">ICON</i>
                <h4 className="order-details__status-item__title">In-delivery</h4>
            </div>
            <div className="order-details__status-item">
                <i className="order-details__status-item__ic">ICON</i>
                <h4 className="order-details__status-item__title">Complete</h4>
            </div>
        </div>
    </div>
  )
}
