// NEXT:
// - Finish "get emails" part article #3
// - Integrate webservices and idb to cache emails' info (specially idb part)
// - document that
// - manual batch call for GET emails (so many calls now...)
// - use immutable.js

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as gmailActions } from 'redux/modules/gmail'
import classes from './HomeView.scss'
import UserLabelList from 'containers/UserLabelList'
import SystemLabelList from 'containers/SystemLabelList'
import EmailList from 'containers/EmailList'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  email: state.gmail.profile.emailAddress,
  loading: state.gmail.loading
})

const actions = Object.assign({}, gmailActions)

export class HomeView extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired,
    checkAuth: PropTypes.func.isRequired,
    connect: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.checkAuth()
  }

  render () {
    const email = this.props.email
    const loading = this.props.loading
    return (
      <div className='container'>
        <h1>
          Gmail<small>ite</small>
        </h1>

        <span className={ loading ? '' : classes.hidden }>
          Loading...
        </span>

        <button
          onClick={this.props.connect}
          className={ !loading && !email ? '' : classes.hidden }>
          Connect To Gmail
        </button>

        <h1 className={ !loading && email ? '' : classes.hidden }>
          Welcome, {email}
        </h1>

        <div className='row'>
          <div className='col-md-3'>
            <h3>System labels</h3>
            <SystemLabelList />

            <h3>User labels</h3>
            <UserLabelList />
          </div>

          <div className='col-md-9'>
            <h3>Emails</h3>
            <EmailList />
          </div>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(HomeView)
