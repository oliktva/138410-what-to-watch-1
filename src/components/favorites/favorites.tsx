import React, {FunctionComponent, ReactElement} from 'react';

import needLogin from 'src/hocs/need-login/need-login';

import PageWrapper from 'src/components/page-wrapper/page-wrapper';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';

import {UserProps, UserPropTypes} from 'src/types/user';

interface Props {
  user: UserProps;
}

const Favorites: FunctionComponent<Props> = ({user}): ReactElement => (
  <PageWrapper>
    <div className="user-page">
      <Header user={user} className="user-page__head" heading="My list" />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__movies-list">
          <article className="small-movie-card catalog__movies-card">
            <button className="small-movie-card__play-btn" type="button">Play</button>
            <div className="small-movie-card__image">
              <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <button className="small-movie-card__play-btn" type="button">Play</button>
            <div className="small-movie-card__image">
              <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <button className="small-movie-card__play-btn" type="button">Play</button>
            <div className="small-movie-card__image">
              <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html">Macbeth</a>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <button className="small-movie-card__play-btn" type="button">Play</button>
            <div className="small-movie-card__image">
              <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html">Aviator</a>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <button className="small-movie-card__play-btn" type="button">Play</button>
            <div className="small-movie-card__image">
              <img src="img/we-need-to-talk-about-kevin.jpg" alt="We need to talk about Kevin" width="280" height="175" />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html">We need to talk about Kevin</a>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <button className="small-movie-card__play-btn" type="button">Play</button>
            <div className="small-movie-card__image">
              <img src="img/what-we-do-in-the-shadows.jpg" alt="What We Do in the Shadows" width="280" height="175" />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html">What We Do in the Shadows</a>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <button className="small-movie-card__play-btn" type="button">Play</button>
            <div className="small-movie-card__image">
              <img src="img/revenant.jpg" alt="Revenant" width="280" height="175" />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html">Revenant</a>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <button className="small-movie-card__play-btn" type="button">Play</button>
            <div className="small-movie-card__image">
              <img src="img/johnny-english.jpg" alt="Johnny English" width="280" height="175" />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html">Johnny English</a>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <button className="small-movie-card__play-btn" type="button">Play</button>
            <div className="small-movie-card__image">
              <img src="img/shutter-island.jpg" alt="Shutter Island" width="280" height="175" />
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html">Shutter Island</a>
            </h3>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  </PageWrapper>
);

Favorites.propTypes = {
  user: UserPropTypes.isRequired
};

export {Favorites};

export default needLogin(Favorites);
