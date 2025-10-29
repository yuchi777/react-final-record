

function Pagination({ pagination, changePage }){


  return(
    <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              aria-label="Previous"
              href="/"
              className={`page-link ${pagination.has_pre ? '' : 'disabled'}`}
              onClick={(e) => {
                e.preventDefault();
                changePage(pagination.current_page - 1); //當前頁面的前一頁
              }}
            >
              <span aria-hidden='true'>前一頁</span>
            </a>
          </li>
          {
            [...new Array(pagination.total_pages)].map((_, i) => { //i為索引位置
              return (
                <li className="page-item" key={`${i}_page`}>
                  <a
                    className={`page-link ${i + 1 === pagination.current_page && 'active'}`}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      changePage(i + 1);
                    }}
                  >

                    {i + 1}
                  </a>
                </li>
              )
            })
          }
          <li className="page-item">
            <a 
              href="/" 
              aria-label="Next"
              className={`page-link ${pagination.has_next ? '' : 'disabled'}`}
              onClick={(e) => {
                e.preventDefault();
                changePage(pagination.current_page + 1); //當前頁面的前一頁
              }}
            >
              <span aria-hidden='true'>下一頁</span>
            </a>
          </li>
        </ul>
      </nav>
  )

}
export default Pagination;