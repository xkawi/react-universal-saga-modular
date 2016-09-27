import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { viewActions } from 'modules/github/actions';
import { loadUser, loadStarred } from 'modules/github/sagas';
import { User, Repo, List } from 'components';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.renderRepo = this.renderRepo.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadUserPage(this.props.login);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.login !== nextProps.login) {
      this.props.actions.loadUserPage(nextProps.login);
    }
  }

  handleLoadMoreClick() {
    this.props.actions.loadMoreStarred(this.props.login);
  }

  renderRepo([repo, owner]) {
    return (<Repo repo={repo} owner={owner} key={repo.fullName} />);
  }

  render() {
    const { user, login } = this.props;

    if (!user) {
      return (<h1><i>Loading {login}’s profile...</i></h1>);
    }

    const { starredRepos, starredRepoOwners, starredPagination } = this.props;
    return (
      <div>
        <User user={user} />
        <hr />
        <List
          renderItem={this.renderRepo}
          items={_.zip(starredRepos, starredRepoOwners)}
          onLoadMoreClick={this.handleLoadMoreClick}
          loadingLabel={`Loading ${login}’s starred...`}
          {...starredPagination}
        />
      </div>
      );
  }
}

UserPage.propTypes = {
  login: PropTypes.string.isRequired,
  user: PropTypes.object,
  actions: PropTypes.shape({
    loadUserPage: PropTypes.func.isRequired,
    loadMoreStarred: PropTypes.func.isRequired
  }),
  starredPagination: PropTypes.object,
  starredRepos: PropTypes.array.isRequired,
  starredRepoOwners: PropTypes.array.isRequired
};

function preload({ login }) {
  return [
    [loadUser, login, []],
    [loadStarred, login]
  ];
}
UserPage.preload = preload;

function mapStateToProps(state) {
  const { login } = state.router.params;
  const {
    pagination: { starredByUser },
    entities: { users, repos }
  } = state;

  const starredPagination = starredByUser[login] || { ids: [] };
  const starredRepos = starredPagination.ids.map(id => repos[id]);
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner]);

  return {
    login,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(viewActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
