import './index.css'
import {Component} from 'react'

class Pagination extends Component {
  state = {
    pageNo: 1,
  }

  onNextpage = () => {
    const {apiCallback, totalPages} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {pageNo: prevState.pageNo + 1}
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  onPreviouspage = () => {
    const {apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {pageNo: prevState.pageNo - 1}
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    return (
      <div className="paginationBg">
        <button
          type="button"
          onClick={this.onPreviouspage}
          className="paginationButton"
        >
          Prev
        </button>
        <p className="page-numbers">{pageNo}</p>
        <button
          type="button"
          onClick={this.onNextpage}
          className="paginationButton"
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
