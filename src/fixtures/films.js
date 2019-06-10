export const films = [{
  name: `Pulp Fiction`,
  posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Pulp_Fiction.jpg`,
  previewImage: `https://es31-server.appspot.com/wtw/static/film/preview/pulp-fiction.jpg`,
  backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/Pulp_Fiction.jpg`,
  backgroundColor: `#795433`,
  description: `The lives of two mob hitmen, a boxer, a gangster & his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`,
  rating: 8.9,
  scoresCount: 1635992,
  director: `Quentin Tarantino`,
  starring: [`John Travolta`, `Uma Thurman`, `Samuel L. Jackson`],
  runTime: 153,
  genre: `Crime`,
  released: 1994,
  id: 1,
  isFavorite: false,
  videoLink: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
}, {
  name: `War of the Worlds`,
  posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/War_of_the_Worlds.jpg`,
  previewImage: `https://es31-server.appspot.com/wtw/static/film/preview/war-of-the-worlds.jpg`,
  backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/War_of_the_Worlds.jpg`,
  backgroundColor: `#9B7E61`,
  description: `As Earth is invaded by alien tripod fighting machines, one family fights for survival.`,
  rating: 6.5,
  scoresCount: 386834,
  director: `Steven Spielberg`,
  starring: [`Tom Cruise`, `Dakota Fanning`, `Tim Robbins`],
  runTime: 116,
  genre: `Adventure`,
  released: 2005,
  id: 2,
  isFavorite: false,
  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
}, {
  name: `Gangs of new york`,
  posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  previewImage: `https://es31-server.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
  backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  backgroundColor: `#A6B7AC`,
  description: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
  rating: 7.5,
  scoresCount: 370881,
  director: `Martin Scorsese`,
  starring: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
  runTime: 167,
  genre: `Crime`,
  released: 2002,
  id: 3,
  isFavorite: false,
  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
}];

export const film = films[0];

export const reviews = [{
  comment: `This is comment`,
  date: `54367894`,
  id: 1,
  rating: 8,
  user: {
    id: 2,
    name: `Joe`
  }
}, {
  comment: `This is comment`,
  date: `54367892`,
  id: 2,
  rating: 6,
  user: {
    id: 2,
    name: `Ivan`
  }
}, {
  comment: `This is comment`,
  date: `54367893`,
  id: 3,
  rating: 7,
  user: {
    id: 2,
    name: `Tatiana`
  }
}];

export const review = reviews[0];
