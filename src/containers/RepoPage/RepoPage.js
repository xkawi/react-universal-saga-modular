import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { viewActions } from 'modules/github/actions';
import { Repo, User, List } from 'components';
import styles from './RepoPage.scss'; // eslint-disable-line

class RepoPage extends Component {
  constructor(props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadRepoPage(this.props.fullName);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      this.props.actions.loadRepoPage(nextProps.fullName);
    }
  }

  handleLoadMoreClick() {
    this.props.actions.loadMoreStargazers(this.props.fullName);
  }

  renderUser(user) {
    return (<User user={user} key={user.login} />);
  }

  render() {
    const { repo, owner, name } = this.props;
    if (!repo || !owner) {
      return (<h1><i>Loading {name} details...</i></h1>);
    }

    const { stargazers, stargazersPagination } = this.props;
    return (
      <div className={styles.container}>
        <Repo repo={repo} owner={owner} />
        <hr />
        <List
          renderItem={this.renderUser}
          items={stargazers}
          onLoadMoreClick={this.handleLoadMoreClick}
          loadingLabel={`Loading stargazers of ${name}...`}
          {...stargazersPagination}
        />
      </div>
      );
  }
}

RepoPage.propTypes = {
  repo: PropTypes.object,
  fullName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.object,
  stargazers: PropTypes.array.isRequired,
  stargazersPagination: PropTypes.object,
  actions: PropTypes.shape({
    loadRepoPage: PropTypes.func.isRequired,
    loadMoreStargazers: PropTypes.func.isRequired
  })
};

function mapStateToProps(state) {
  const { login, name } = state.router.params;
  const {
    pagination: { stargazersByRepo },
    entities: { users, repos }
  } = state;

  const fullName = `${login}/${name}`;
  const stargazersPagination = stargazersByRepo[fullName] || { ids: [] };
  const stargazers = stargazersPagination.ids.map(id => users[id]);

  return {
    fullName,
    name,
    stargazers,
    stargazersPagination,
    repo: repos[fullName],
    owner: users[login]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(viewActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoPage);
