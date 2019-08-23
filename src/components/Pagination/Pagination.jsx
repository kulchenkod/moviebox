import React from 'react';
import ReactPaginate from 'react-paginate';
import { withRouter } from "react-router";
import { connect } from "react-redux";

import * as actions from "../../stores/actions/action";
import "./pagination.css"

class Pagination extends React.Component {

    handlePageClick = (page) => {
        const selectedPage = page.selected + 1;
        this.props.fetchMovie(selectedPage);
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
                    pageCount={this.props.totalPages}
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
function mapStateToProps(store) {
    return {
      totalPages: store.totalPages
    };
}

function mapDispatcToProps(dispatch) {
    return {
        fetchMovie: (selectedPage) => dispatch(actions.fetchMovie(selectedPage)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatcToProps
)(withRouter(Pagination));