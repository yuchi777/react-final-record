import { useState } from "react";
function Message() {

  const [message, setMessage] = useState({});

  return (
    <>
      <button type="button" onClick={() => {

        setMessage({
          type: 'danger',
          title: '成功',
          text: '你已完成訊息'
        });
        setTimeout(() => {
          setMessage({})
        }, 3000)

      }}>按我</button>
      <div
        className="toast-container position-fixed"
        style={{ top: '60px', right: '15px' }}
      >
        {
          message.title && (
            <div
              className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className={`toast-header text-white bg-${message.type}`}>
                <strong className="me-auto">{message.title}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close">

                </button>
              </div>
              <div className="toast-body">{message.text}</div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Message;