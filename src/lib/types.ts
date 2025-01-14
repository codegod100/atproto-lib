interface ProfileViewDetailed {
  [Brand.Type]?: "app.bsky.actor.defs#profileViewDetailed";
  did: At.DID;
  handle: At.Handle;
  associated?: ProfileAssociated;
  avatar?: string;
  banner?: string;
  createdAt?: string;
  /**
   * Maximum string length: 2560 \
   * Maximum grapheme length: 256
   */
  description?: string;
  /**
   * Maximum string length: 640 \
   * Maximum grapheme length: 64
   */
  displayName?: string;
  followersCount?: number;
  followsCount?: number;
  indexedAt?: string;
  joinedViaStarterPack?: AppBskyGraphDefs.StarterPackViewBasic;
  labels?: ComAtprotoLabelDefs.Label[];
  pinnedPost?: ComAtprotoRepoStrongRef.Main;
  postsCount?: number;
  viewer?: ViewerState;
}
