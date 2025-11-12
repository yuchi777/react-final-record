import ReactLoading from 'react-loading';
function Loading( {isLoading} ) {
  return (
    <>
      {
        isLoading && ( // isLoading為true時顯示
          <div style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(2px)'
          }}>
            <ReactLoading type='bubbles' color='white' height={60} width={100} />
          </div>
        )
      }
    </>
  )
}

export default Loading;