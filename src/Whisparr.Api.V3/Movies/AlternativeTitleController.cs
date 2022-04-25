using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NzbDrone.Core.Movies;
using NzbDrone.Core.Movies.AlternativeTitles;
using Whisparr.Http;
using Whisparr.Http.REST;

namespace Whisparr.Api.V3.Movies
{
    [V3ApiController("alttitle")]
    public class AlternativeTitleController : RestController<AlternativeTitleResource>
    {
        private readonly IAlternativeTitleService _altTitleService;
        private readonly IMovieService _movieService;

        public AlternativeTitleController(IAlternativeTitleService altTitleService, IMovieService movieService)
        {
            _altTitleService = altTitleService;
            _movieService = movieService;
        }

        protected override AlternativeTitleResource GetResourceById(int id)
        {
            return _altTitleService.GetById(id).ToResource();
        }

        [HttpGet]
        public List<AlternativeTitleResource> GetAltTitles(int? movieId, int? movieMetadataId)
        {
            if (movieMetadataId.HasValue)
            {
                return _altTitleService.GetAllTitlesForMovie(movieMetadataId.Value).ToResource();
            }

            if (movieId.HasValue)
            {
                var movie = _movieService.GetMovie(movieId.Value);
                return _altTitleService.GetAllTitlesForMovie(movie.MovieMetadataId).ToResource();
            }

            return _altTitleService.GetAllTitles().ToResource();
        }
    }
}
