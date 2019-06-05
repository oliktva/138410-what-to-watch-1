import React, {ComponentClass, ReactElement, PureComponent} from 'react';
import {connect, MapStateToProps, MapDispatchToProps} from 'react-redux';
import {compose} from 'recompose';

import needLogin from 'src/hocs/need-login/need-login';
import {getFavorite} from 'src/reducers/films/selectors';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';
import SmallMovieCard from 'src/components/small-movie-card/small-movie-card';

import {UserProps, UserPropTypes} from 'src/types/user';
import {State, ThunkDispatch} from 'src/types/reducer';
import {Operation} from 'src/reducers/films/films';
import {FilmProps} from 'src/types/films';

interface StateProps {
  favorite: FilmProps[];
}

interface DispatchProps {
  loadFavorite: () => Promise<void>;
}

interface OwnProps {
  user: UserProps;
}

type Props = StateProps & DispatchProps & OwnProps;

class Favorite extends PureComponent<Props> {
  public static propTypes = {
    user: UserPropTypes.isRequired
  }

  private _renderFilm(film: FilmProps): ReactElement {
    return (
      <SmallMovieCard
        key={film.id}
        film={film}
        isPlaying={false}
      />
    );
  }

  public render(): ReactElement {
    const {user, favorite} = this.props;

    return (
      <PageWrapper>
        <div className="user-page">
          <Header user={user} className="user-page__head" heading="My list" />
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <div className="catalog__movies-list">
              {favorite.map((film: FilmProps): ReactElement => {
                return this._renderFilm(film);
              })}
            </div>
          </section>
          <Footer />
        </div>
      </PageWrapper>
    );
  }
}

export {Favorite};

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (state: State): StateProps => ({
  favorite: getFavorite(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch: ThunkDispatch): DispatchProps => ({
  loadFavorite: (): Promise<void> => dispatch(Operation.loadFavorite())
});

const ConnectedComponent: any =
  compose<Props, ComponentClass<OwnProps>>(
    connect<StateProps, DispatchProps, OwnProps, State>(mapStateToProps, mapDispatchToProps),
    needLogin
  )(Favorite);

export default ConnectedComponent;
