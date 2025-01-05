import { AchievementsTable } from './achievements';
import { CachedRecipeImagesTable } from './cached-recipe-images';
import { ChallengesTable } from './challenges';
import { FavoritePairingsTable } from './favorite-pairings';
import { StrainPairingsTable } from './strain-pairings';
import { FollowsTable } from './follows';
import { ProfilesTable } from './profiles';
import { LeaderboardsTable } from './leaderboards';
import { PairingVotesTable } from './pairing-votes';
import { UserAchievementsTable } from './user-achievements';
import { UserChallengesTable } from './user-challenges';
import { UserStatsTable } from './user-stats';

export interface SocialTables {
  achievements: AchievementsTable;
  cached_recipe_images: CachedRecipeImagesTable;
  challenges: ChallengesTable;
  favorite_pairings: FavoritePairingsTable;
  strain_pairings: StrainPairingsTable;
  follows: FollowsTable;
  profiles: ProfilesTable;
  leaderboards: LeaderboardsTable;
  pairing_votes: PairingVotesTable;
  user_achievements: UserAchievementsTable;
  user_challenges: UserChallengesTable;
  user_stats: UserStatsTable;
}
