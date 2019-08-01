import React from 'react';
import { inject, observer } from "mobx-react";
import ReactPaginate from 'react-paginate';
import { withRouter } from "react-router";

import "./pagination.css"

@inject('movieStore')
@observer
class Pagination extends React.Component {

    handlePageClick = (page) => {
        const selectedPage = page.selected + 1;
        this.props.movieStore.fetchMovie(selectedPage);
        this.props.history.push(`/page/${selectedPage}`);
    }

    render() {
        const { page } = this.props.match.params;
        return (
            <div className="paginate">
                <ReactPaginate
                    previousLabel={'<'}
                    initialPage={!page ? 0 : page - 1 }
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.movieStore.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    disableInitialCallback
                />
            </div>
        )
    }
}
export default withRouter(Pagination);