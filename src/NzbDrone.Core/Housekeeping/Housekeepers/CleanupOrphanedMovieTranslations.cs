using Dapper;
using NzbDrone.Core.Datastore;

namespace NzbDrone.Core.Housekeeping.Housekeepers
{
    public class CleanupOrphanedMovieTranslations : IHousekeepingTask
    {
        private readonly IMainDatabase _database;

        public CleanupOrphanedMovieTranslations(IMainDatabase database)
        {
            _database = database;
        }

        public void Clean()
        {
            using (var mapper = _database.OpenConnection())
            {
                mapper.Execute(@"DELETE FROM ""MovieTranslations""
                                     WHERE ""Id"" IN (
                                     SELECT ""MovieTranslations"".""Id"" FROM ""MovieTranslations""
                                     LEFT OUTER JOIN ""MovieMetadata""
                                     ON ""MovieTranslations"".""MovieMetadataId"" = ""MovieMetadata"".""Id""
                                     WHERE ""MovieMetadata"".""Id"" IS NULL)");
            }
        }
    }
}
