import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '../graphql-fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};

export type CoAuthor = {
  __typename?: 'CoAuthor';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  result: Result;
  user: User;
};

export type CreateCoAuthorInput = {
  result_id: Scalars['ID'];
  user_id: Scalars['ID'];
};

export type CreateInvolvedUserInput = {
  note?: InputMaybe<Scalars['String']>;
  phase_id: Scalars['ID'];
  user_id: Scalars['ID'];
};

export type CreateMilestoneInput = {
  date: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  project_id: Scalars['ID'];
};

export type CreatePhaseInput = {
  date_begin: Scalars['DateTime'];
  date_end: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  result_id: Scalars['ID'];
};

export type CreateProjectInput = {
  code: Scalars['String'];
  date_begin: Scalars['DateTime'];
  date_end: Scalars['DateTime'];
  name: Scalars['String'];
  projects_color_set_id: Scalars['ID'];
  short_name: Scalars['String'];
  solver: Scalars['ID'];
};

export type CreateResultCategoryInput = {
  acronym: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  rank_id: Scalars['ID'];
  type: ResultCategoryType;
  url: Scalars['String'];
};

export type CreateResultInput = {
  author: Scalars['ID'];
  comment?: InputMaybe<Scalars['String']>;
  result_category_id?: InputMaybe<Scalars['ID']>;
  status: Status;
  title: Scalars['String'];
  type_id: Scalars['ID'];
};

export type CreateResultProjectInput = {
  project_id: Scalars['ID'];
  result_id: Scalars['ID'];
};

export type CreateUserProjectInput = {
  occupancy: Scalars['Int'];
  project_id: Scalars['ID'];
  user_id: Scalars['ID'];
};

export type CreateUserResultInput = {
  date_begin: Scalars['DateTime'];
  date_end: Scalars['DateTime'];
  result_id: Scalars['ID'];
  user_id: Scalars['ID'];
};

export type InvolvedUser = {
  __typename?: 'InvolvedUser';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  phase: Phase;
  user: User;
};

export type KeywordStatistics = {
  __typename?: 'KeywordStatistics';
  text: Scalars['String'];
  value: Scalars['Int'];
};

export type Link = {
  __typename?: 'Link';
  distance: Scalars['Int'];
  source: Scalars['ID'];
  target: Scalars['ID'];
};

export type Milestone = {
  __typename?: 'Milestone';
  date: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  project: Project;
};

export type Mutation = {
  __typename?: 'Mutation';
  blockUser?: Maybe<User>;
  createCoAuthor?: Maybe<CoAuthor>;
  createInvolvedUser?: Maybe<InvolvedUser>;
  createMilestone?: Maybe<Milestone>;
  createPhase?: Maybe<Phase>;
  createProject?: Maybe<Project>;
  createProjectColor?: Maybe<ProjectColor>;
  createRank?: Maybe<Rank>;
  createResult?: Maybe<Result>;
  createResultCategory?: Maybe<ResultCategory>;
  createResultProject?: Maybe<ResultProject>;
  createTag?: Maybe<Tag>;
  createTagAttachResult?: Maybe<Tag>;
  createTags?: Maybe<Array<Maybe<Tag>>>;
  createType?: Maybe<Type>;
  createUser?: Maybe<User>;
  createUserProject?: Maybe<UserProject>;
  createUserProjectRole?: Maybe<UserProjectRole>;
  createUserResult?: Maybe<UserResult>;
  deleteUser?: Maybe<User>;
  filterTimelineProjects: Array<Project>;
  login?: Maybe<Scalars['String']>;
  logout: Scalars['Boolean'];
  register?: Maybe<User>;
  removeCoAuthor?: Maybe<CoAuthor>;
  removeInvolvedUser: Scalars['Boolean'];
  removeMilestone?: Maybe<Milestone>;
  removePhase?: Maybe<Phase>;
  removePhasesByResult?: Maybe<Array<Maybe<Phase>>>;
  removeProject?: Maybe<Project>;
  removeProjectColor: Scalars['Boolean'];
  removeRank: Scalars['Boolean'];
  removeResult?: Maybe<Result>;
  removeResultCategory?: Maybe<ResultCategory>;
  removeResultProject: Scalars['Boolean'];
  removeTag?: Maybe<Tag>;
  removeType: Scalars['Boolean'];
  removeUserProject?: Maybe<UserProject>;
  removeUserProjectRole: Scalars['Boolean'];
  removeUserResult: Scalars['Boolean'];
  resetPassword?: Maybe<User>;
  updateAuthor?: Maybe<Result>;
  updateInvolvedUser?: Maybe<InvolvedUser>;
  updateMilestone?: Maybe<Milestone>;
  updatePhase?: Maybe<Phase>;
  updateProject?: Maybe<Project>;
  updateProjectColor?: Maybe<ProjectColor>;
  updateRank?: Maybe<Rank>;
  updateResult?: Maybe<Result>;
  updateResultCategory?: Maybe<ResultCategory>;
  updateResultSyncTags?: Maybe<Result>;
  updateTag?: Maybe<Tag>;
  updateType?: Maybe<Type>;
  updateUser?: Maybe<User>;
  updateUserProject?: Maybe<UserProject>;
  updateUserResult: Array<UserResult>;
};


export type MutationBlockUserArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCoAuthorArgs = {
  input?: InputMaybe<CreateCoAuthorInput>;
};


export type MutationCreateInvolvedUserArgs = {
  input?: InputMaybe<CreateInvolvedUserInput>;
};


export type MutationCreateMilestoneArgs = {
  input?: InputMaybe<CreateMilestoneInput>;
};


export type MutationCreatePhaseArgs = {
  input?: InputMaybe<CreatePhaseInput>;
};


export type MutationCreateProjectArgs = {
  input?: InputMaybe<CreateProjectInput>;
};


export type MutationCreateProjectColorArgs = {
  hex: Scalars['String'];
};


export type MutationCreateRankArgs = {
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
};


export type MutationCreateResultArgs = {
  input: CreateResultInput;
};


export type MutationCreateResultCategoryArgs = {
  input?: InputMaybe<CreateResultCategoryInput>;
};


export type MutationCreateResultProjectArgs = {
  input?: InputMaybe<CreateResultProjectInput>;
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
};


export type MutationCreateTagAttachResultArgs = {
  name: Scalars['String'];
  result_id: Scalars['ID'];
};


export type MutationCreateTagsArgs = {
  names: Array<Scalars['String']>;
  result_id: Scalars['ID'];
};


export type MutationCreateTypeArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  status: UserStatus;
};


export type MutationCreateUserProjectArgs = {
  input?: InputMaybe<CreateUserProjectInput>;
};


export type MutationCreateUserProjectRoleArgs = {
  user_project_id: Scalars['ID'];
};


export type MutationCreateUserResultArgs = {
  input?: InputMaybe<CreateUserResultInput>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationFilterTimelineProjectsArgs = {
  search_text: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  stay: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  status: UserStatus;
};


export type MutationRemoveCoAuthorArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveInvolvedUserArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveMilestoneArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePhaseArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePhasesByResultArgs = {
  result_id: Scalars['ID'];
};


export type MutationRemoveProjectArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProjectColorArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveRankArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveResultArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveResultCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveResultProjectArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveTypeArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserProjectArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserProjectRoleArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserResultArgs = {
  result_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationUpdateAuthorArgs = {
  author: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationUpdateInvolvedUserArgs = {
  input?: InputMaybe<UpdateInvolvedUserInput>;
};


export type MutationUpdateMilestoneArgs = {
  input?: InputMaybe<UpdateMilestoneInput>;
};


export type MutationUpdatePhaseArgs = {
  input?: InputMaybe<UpdatePhaseInput>;
};


export type MutationUpdateProjectArgs = {
  input?: InputMaybe<UpdateProjectInput>;
};


export type MutationUpdateProjectColorArgs = {
  hex?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};


export type MutationUpdateRankArgs = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateResultArgs = {
  input?: InputMaybe<UpdateResultInput>;
};


export type MutationUpdateResultCategoryArgs = {
  input?: InputMaybe<UpdateResultCategoryInput>;
};


export type MutationUpdateResultSyncTagsArgs = {
  result_id: Scalars['ID'];
  tag_ids: Array<Scalars['ID']>;
};


export type MutationUpdateTagArgs = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTypeArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  last_name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<UserStatus>;
};


export type MutationUpdateUserProjectArgs = {
  id: Scalars['ID'];
  occupancy?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateUserResultArgs = {
  input?: InputMaybe<UpdateUserResultInput>;
};

export type Node = {
  __typename?: 'Node';
  color: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  size: Scalars['Int'];
  type: NodeType;
};

export enum NodeType {
  Result = 'RESULT',
  User = 'USER'
}

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  field: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Pagination information about the corresponding list of items. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Count of nodes in current request. */
  count?: Maybe<Scalars['Int']>;
  /** Current page of request. */
  currentPage?: Maybe<Scalars['Int']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Last page in connection. */
  lastPage?: Maybe<Scalars['Int']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** Total number of node in connection. */
  total?: Maybe<Scalars['Int']>;
};

/** Pagination information about the corresponding list of items. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Total count of available items in the page. */
  count: Scalars['Int'];
  /** Current pagination page. */
  currentPage: Scalars['Int'];
  /** Index of first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** If collection has more pages. */
  hasMorePages: Scalars['Boolean'];
  /** Index of last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Last page number of the collection. */
  lastPage: Scalars['Int'];
  /** Number of items per page in the collection. */
  perPage: Scalars['Int'];
  /** Total items available in the collection. */
  total: Scalars['Int'];
};

export type Phase = {
  __typename?: 'Phase';
  created_at: Scalars['DateTime'];
  date_begin: Scalars['DateTime'];
  date_end: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  result: Result;
  updated_at: Scalars['DateTime'];
  users: Array<Maybe<InvolvedUser>>;
};

export type Project = {
  __typename?: 'Project';
  code: Scalars['String'];
  color: ProjectColor;
  date_begin: Scalars['DateTime'];
  date_end: Scalars['DateTime'];
  id: Scalars['ID'];
  milestones: Array<Maybe<Milestone>>;
  name: Scalars['String'];
  results: Array<Maybe<ResultProject>>;
  short_name: Scalars['String'];
  solver: User;
  users: Array<Maybe<UserProject>>;
};

export type ProjectColor = {
  __typename?: 'ProjectColor';
  created_at: Scalars['DateTime'];
  hex: Scalars['String'];
  id: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type ProjectStatistics = {
  __typename?: 'ProjectStatistics';
  involved?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  result_number?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  currentUserProjects: Array<Project>;
  currentUserStatistics: Array<ResultStatistics>;
  keywordsStatistics: Array<KeywordStatistics>;
  me?: Maybe<User>;
  milestoneById?: Maybe<Milestone>;
  phaseById?: Maybe<Phase>;
  projectById?: Maybe<Project>;
  projectUsers: Array<UserProject>;
  projectUsersNetwork?: Maybe<UsersNetwork>;
  projects: Array<Project>;
  projectsStatistics: Array<ResultStatistics>;
  projects_color_sets: Array<ProjectColor>;
  ranks: Array<Rank>;
  resultById?: Maybe<Result>;
  resultCategories: Array<ResultCategory>;
  results: Array<Result>;
  resultsByProjectAndUser: Array<Result>;
  resultsByStatus: Array<Result>;
  tags: Array<Tag>;
  types: Array<Type>;
  userById?: Maybe<User>;
  userProjectByUserId: Array<UserProject>;
  userResultByUserId: Array<UserResult>;
  userSchedule: Array<ScheduleRecord>;
  userStatistics: Array<ResultStatistics>;
  users: Array<User>;
  usersAssistance: Array<UsersAssistanceStatistics>;
  usersNetwork?: Maybe<UsersNetwork>;
  usersUtilization?: Maybe<Array<Maybe<UserUtilization>>>;
};


export type QueryMilestoneByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPhaseByIdArgs = {
  id: Scalars['ID'];
};


export type QueryProjectByIdArgs = {
  id: Scalars['ID'];
};


export type QueryProjectUsersArgs = {
  project_id: Scalars['ID'];
};


export type QueryProjectUsersNetworkArgs = {
  project_id: Scalars['ID'];
};


export type QueryResultByIdArgs = {
  id: Scalars['ID'];
};


export type QueryResultCategoriesArgs = {
  trash: Scalars['Boolean'];
};


export type QueryResultsByProjectAndUserArgs = {
  project_ids: Array<InputMaybe<Scalars['ID']>>;
  user_ids: Array<InputMaybe<Scalars['ID']>>;
};


export type QueryResultsByStatusArgs = {
  status?: InputMaybe<Status>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserProjectByUserIdArgs = {
  user_id: Scalars['ID'];
};


export type QueryUserResultByUserIdArgs = {
  result_id: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type QueryUserScheduleArgs = {
  user_id: Scalars['ID'];
};


export type QueryUserStatisticsArgs = {
  user_id: Scalars['ID'];
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<UsersOrderByOrderByClause>>;
};


export type QueryUsersAssistanceArgs = {
  user_id: Scalars['ID'];
};

export type Rank = {
  __typename?: 'Rank';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  resultCategories: Array<Maybe<ResultCategory>>;
  updated_at: Scalars['DateTime'];
};

export type Result = {
  __typename?: 'Result';
  author: User;
  coauthors: Array<Maybe<CoAuthor>>;
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  phases: Array<Maybe<Phase>>;
  projects: Array<Maybe<ResultProject>>;
  resultCategory?: Maybe<ResultCategory>;
  status?: Maybe<Status>;
  tags: Array<Maybe<Tag>>;
  title: Scalars['String'];
  type: Type;
  users: Array<Maybe<UserResult>>;
};

export type ResultCategory = {
  __typename?: 'ResultCategory';
  acronym: Scalars['String'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  rank: Rank;
  results: Array<Maybe<Result>>;
  type: ResultCategoryType;
  url: Scalars['String'];
};

export enum ResultCategoryType {
  Conference = 'conference',
  Journal = 'journal',
  Workshop = 'workshop'
}

export type ResultProject = {
  __typename?: 'ResultProject';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  project: Project;
  result: Result;
};

export type ResultStatistics = {
  __typename?: 'ResultStatistics';
  delayed?: Maybe<Scalars['Int']>;
  in_progress?: Maybe<Scalars['Int']>;
  scheduled?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  user: User;
};

export type ScheduleRecord = {
  __typename?: 'ScheduleRecord';
  day?: Maybe<Scalars['Date']>;
  value?: Maybe<Scalars['Int']>;
};

/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export enum Status {
  Delayed = 'delayed',
  Done = 'done',
  InProgress = 'in_progress',
  Scheduled = 'scheduled'
}

export type Tag = {
  __typename?: 'Tag';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  results: Array<Maybe<Result>>;
  updated_at: Scalars['DateTime'];
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type Type = {
  __typename?: 'Type';
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  resultCategories: Array<Maybe<ResultCategory>>;
  updated_at: Scalars['DateTime'];
};

export type UpdateInvolvedUserInput = {
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
};

export type UpdateMilestoneInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdatePhaseInput = {
  date_begin?: InputMaybe<Scalars['DateTime']>;
  date_end?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  code?: InputMaybe<Scalars['String']>;
  date_begin?: InputMaybe<Scalars['DateTime']>;
  date_end?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  projects_color_set_id?: InputMaybe<Scalars['ID']>;
  short_name?: InputMaybe<Scalars['String']>;
  solver?: InputMaybe<Scalars['ID']>;
};

export type UpdateResultCategoryInput = {
  acronym?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
  rank_id?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<ResultCategoryType>;
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateResultInput = {
  author?: InputMaybe<Scalars['ID']>;
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  result_category_id?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<Status>;
  title?: InputMaybe<Scalars['String']>;
  type_id?: InputMaybe<Scalars['ID']>;
};

export type UpdateUserResultInput = {
  date_begin?: InputMaybe<Scalars['DateTime']>;
  date_end?: InputMaybe<Scalars['DateTime']>;
  result_id: Scalars['ID'];
  user_id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  author: Array<Maybe<Result>>;
  block: Scalars['Boolean'];
  coauthor: Array<Maybe<CoAuthor>>;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['ID'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  phases: Array<Maybe<InvolvedUser>>;
  projects: Array<Maybe<UserProject>>;
  results: Array<Maybe<UserResult>>;
  role?: Maybe<Role>;
  status: UserStatus;
  updated_at: Scalars['DateTime'];
};

export type UserProject = {
  __typename?: 'UserProject';
  id: Scalars['ID'];
  occupancy: Scalars['Int'];
  project: Project;
  role?: Maybe<UserProjectRole>;
  user: User;
};

export type UserProjectRole = {
  __typename?: 'UserProjectRole';
  id: Scalars['ID'];
  user: UserProject;
};

export type UserResult = {
  __typename?: 'UserResult';
  created_at: Scalars['DateTime'];
  date_begin: Scalars['DateTime'];
  date_end: Scalars['DateTime'];
  id: Scalars['ID'];
  result: Result;
  user: User;
};

export enum UserStatus {
  Alumni = 'ALUMNI',
  ExternalCollaborator = 'EXTERNAL_COLLABORATOR',
  TeamMember = 'TEAM_MEMBER'
}

export type UserUtilization = {
  __typename?: 'UserUtilization';
  overlapping_results?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
  user_name?: Maybe<Scalars['String']>;
};

export type UsersAssistanceStatistics = {
  __typename?: 'UsersAssistanceStatistics';
  assistances: Array<Maybe<Result>>;
  assistances_count: Scalars['Int'];
  user: User;
};

export type UsersNetwork = {
  __typename?: 'UsersNetwork';
  links: Array<Link>;
  nodes: Array<Node>;
};

/** Allowed column names for the `orderBy` argument on the query `users`. */
export enum UsersOrderByColumn {
  LastName = 'LAST_NAME'
}

/** Order by clause for the `orderBy` argument on the query `users`. */
export type UsersOrderByOrderByClause = {
  /** The column that is used for ordering. */
  field: UsersOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  stay: Scalars['Boolean'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: string | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  status: UserStatus;
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id: string } | null };

export type ResetPasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'User', id: string } | null };

export type GetLoggedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoggedUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, email: string, role?: { __typename?: 'Role', id: string } | null, projects: Array<{ __typename?: 'UserProject', occupancy: number, role?: { __typename?: 'UserProjectRole', id: string } | null, project: { __typename?: 'Project', id: string } } | null> } | null };

export type CreateCoAuthorMutationVariables = Exact<{
  result_id: Scalars['ID'];
  user_id: Scalars['ID'];
}>;


export type CreateCoAuthorMutation = { __typename?: 'Mutation', createCoAuthor?: { __typename?: 'CoAuthor', id: string } | null };

export type RemoveCoAuthorMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveCoAuthorMutation = { __typename?: 'Mutation', removeCoAuthor?: { __typename?: 'CoAuthor', id: string, result: { __typename?: 'Result', id: string }, user: { __typename?: 'User', id: string } } | null };

export type CreateUserResultMutationVariables = Exact<{
  result_id: Scalars['ID'];
  user_id: Scalars['ID'];
  date_begin: Scalars['DateTime'];
  date_end: Scalars['DateTime'];
}>;


export type CreateUserResultMutation = { __typename?: 'Mutation', createUserResult?: { __typename?: 'UserResult', id: string } | null };

export type UpdateUserResultMutationVariables = Exact<{
  user_id: Scalars['ID'];
  result_id: Scalars['ID'];
  date_begin?: InputMaybe<Scalars['DateTime']>;
  date_end?: InputMaybe<Scalars['DateTime']>;
}>;


export type UpdateUserResultMutation = { __typename?: 'Mutation', updateUserResult: Array<{ __typename?: 'UserResult', id: string }> };

export type RemoveUserResultMutationVariables = Exact<{
  user_id: Scalars['ID'];
  result_id: Scalars['ID'];
}>;


export type RemoveUserResultMutation = { __typename?: 'Mutation', removeUserResult: boolean };

export type GetUserResultQueryVariables = Exact<{
  user_id: Scalars['ID'];
  result_id: Scalars['ID'];
}>;


export type GetUserResultQuery = { __typename?: 'Query', userResultByUserId: Array<{ __typename?: 'UserResult', id: string }> };

export type CreateResultProjectMutationVariables = Exact<{
  result_id: Scalars['ID'];
  project_id: Scalars['ID'];
}>;


export type CreateResultProjectMutation = { __typename?: 'Mutation', createResultProject?: { __typename?: 'ResultProject', id: string } | null };

export type RemoveResultProjectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveResultProjectMutation = { __typename?: 'Mutation', removeResultProject: boolean };

export type CreateUserProjectMutationVariables = Exact<{
  user_id: Scalars['ID'];
  project_id: Scalars['ID'];
  occupancy: Scalars['Int'];
}>;


export type CreateUserProjectMutation = { __typename?: 'Mutation', createUserProject?: { __typename?: 'UserProject', id: string } | null };

export type RemoveUserProjectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveUserProjectMutation = { __typename?: 'Mutation', removeUserProject?: { __typename?: 'UserProject', id: string } | null };

export type CreateMilestoneMutationVariables = Exact<{
  date: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  project_id: Scalars['ID'];
}>;


export type CreateMilestoneMutation = { __typename?: 'Mutation', createMilestone?: { __typename?: 'Milestone', id: string } | null };

export type UpdateMilestoneMutationVariables = Exact<{
  id: Scalars['ID'];
  date?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type UpdateMilestoneMutation = { __typename?: 'Mutation', updateMilestone?: { __typename?: 'Milestone', id: string } | null };

export type RemoveMilestoneMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveMilestoneMutation = { __typename?: 'Mutation', removeMilestone?: { __typename?: 'Milestone', id: string } | null };

export type GetMilestoneQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMilestoneQuery = { __typename?: 'Query', milestoneById?: { __typename?: 'Milestone', id: string, date: any, description?: string | null, name: string } | null };

export type CreatePhaseMutationVariables = Exact<{
  date_begin: Scalars['DateTime'];
  date_end: Scalars['DateTime'];
  result_id: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
}>;


export type CreatePhaseMutation = { __typename?: 'Mutation', createPhase?: { __typename?: 'Phase', id: string } | null };

export type UpdatePhaseMutationVariables = Exact<{
  id: Scalars['ID'];
  date_begin?: InputMaybe<Scalars['DateTime']>;
  date_end?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePhaseMutation = { __typename?: 'Mutation', updatePhase?: { __typename?: 'Phase', id: string, date_begin: any, date_end: any, result: { __typename?: 'Result', id: string }, users: Array<{ __typename?: 'InvolvedUser', id: string } | null> } | null };

export type RemovePhaseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemovePhaseMutation = { __typename?: 'Mutation', removePhase?: { __typename?: 'Phase', id: string, result: { __typename?: 'Result', id: string }, users: Array<{ __typename?: 'InvolvedUser', id: string } | null> } | null };

export type RemovePhasesOfResultMutationVariables = Exact<{
  result_id: Scalars['ID'];
}>;


export type RemovePhasesOfResultMutation = { __typename?: 'Mutation', removePhasesByResult?: Array<{ __typename?: 'Phase', id: string } | null> | null };

export type GetPhaseQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPhaseQuery = { __typename?: 'Query', phaseById?: { __typename?: 'Phase', id: string, date_begin: any, date_end: any, description?: string | null, name: string } | null };

export type GetProjectUsersQueryVariables = Exact<{
  project_id: Scalars['ID'];
}>;


export type GetProjectUsersQuery = { __typename?: 'Query', projectUsers: Array<{ __typename?: 'UserProject', id: string, user: { __typename?: 'User', id: string, name: string, email: string } }> };

export type GetProjectDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectDetailQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', id: string, name: string, date_begin: any, date_end: any, code: string, short_name: string, color: { __typename?: 'ProjectColor', id: string, hex: string }, solver: { __typename?: 'User', id: string, name: string, email: string }, users: Array<{ __typename?: 'UserProject', id: string, occupancy: number, user: { __typename?: 'User', id: string, name: string, email: string } } | null>, milestones: Array<{ __typename?: 'Milestone', id: string, name: string, description?: string | null, date: any } | null>, results: Array<{ __typename?: 'ResultProject', result: { __typename?: 'Result', id: string, title: string, status?: Status | null, author: { __typename?: 'User', name: string, id: string, email: string }, coauthors: Array<{ __typename?: 'CoAuthor', id: string } | null>, type: { __typename?: 'Type', id: string, name: string }, phases: Array<{ __typename?: 'Phase', date_begin: any, date_end: any } | null> } } | null> } | null };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', id: string, name: string, short_name: string, code: string, date_begin: any, date_end: any, color: { __typename?: 'ProjectColor', hex: string, id: string }, solver: { __typename?: 'User', id: string } } | null };

export type GetProjectColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectColorsQuery = { __typename?: 'Query', projects_color_sets: Array<{ __typename?: 'ProjectColor', hex: string, id: string }> };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, name: string, short_name: string, solver: { __typename?: 'User', id: string }, color: { __typename?: 'ProjectColor', id: string, hex: string } }> };

export type GetCurrentUserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserProjectsQuery = { __typename?: 'Query', currentUserProjects: Array<{ __typename?: 'Project', id: string, name: string }> };

export type GetUserProjectsQueryVariables = Exact<{
  user_id: Scalars['ID'];
}>;


export type GetUserProjectsQuery = { __typename?: 'Query', userProjectByUserId: Array<{ __typename?: 'UserProject', project: { __typename?: 'Project', id: string, name: string, short_name: string } }> };

export type GetProjectUsersNetworkQueryVariables = Exact<{
  project_id: Scalars['ID'];
}>;


export type GetProjectUsersNetworkQuery = { __typename?: 'Query', projectUsersNetwork?: { __typename?: 'UsersNetwork', nodes: Array<{ __typename?: 'Node', id: string, name: string, type: NodeType, email?: string | null, height: number, size: number, color: string }>, links: Array<{ __typename?: 'Link', source: string, target: string, distance: number }> } | null };

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String'];
  date_begin: Scalars['DateTime'];
  date_end: Scalars['DateTime'];
  projects_color_set_id: Scalars['ID'];
  code: Scalars['String'];
  short_name: Scalars['String'];
  solver: Scalars['ID'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: string, solver: { __typename?: 'User', id: string } } | null };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  date_begin?: InputMaybe<Scalars['DateTime']>;
  date_end?: InputMaybe<Scalars['DateTime']>;
  projects_color_set_id?: InputMaybe<Scalars['ID']>;
  code?: InputMaybe<Scalars['String']>;
  short_name?: InputMaybe<Scalars['String']>;
  solver?: InputMaybe<Scalars['ID']>;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id: string, solver: { __typename?: 'User', id: string } } | null };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', removeProject?: { __typename?: 'Project', id: string } | null };

export type GetRanksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRanksQuery = { __typename?: 'Query', ranks: Array<{ __typename?: 'Rank', id: string, name: string, note?: string | null }> };

export type CreateRankMutationVariables = Exact<{
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
}>;


export type CreateRankMutation = { __typename?: 'Mutation', createRank?: { __typename?: 'Rank', id: string } | null };

export type UpdateRankMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
}>;


export type UpdateRankMutation = { __typename?: 'Mutation', updateRank?: { __typename?: 'Rank', id: string } | null };

export type RemoveRankMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveRankMutation = { __typename?: 'Mutation', removeRank: boolean };

export type GetFilteredResultsQueryVariables = Exact<{
  project_ids: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
  user_ids: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
}>;


export type GetFilteredResultsQuery = { __typename?: 'Query', resultsByProjectAndUser: Array<{ __typename?: 'Result', id: string, title: string }> };

export type GetAllResultsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllResultsQuery = { __typename?: 'Query', results: Array<{ __typename?: 'Result', id: string, title: string, status?: Status | null, author: { __typename?: 'User', name: string, id: string, email: string }, coauthors: Array<{ __typename?: 'CoAuthor', id: string } | null>, type: { __typename?: 'Type', id: string, name: string }, phases: Array<{ __typename?: 'Phase', date_begin: any, date_end: any } | null> }> };

export type GetPhasesQueryVariables = Exact<{
  result_id: Scalars['ID'];
}>;


export type GetPhasesQuery = { __typename?: 'Query', resultById?: { __typename?: 'Result', phases: Array<{ __typename?: 'Phase', id: string, name: string, description?: string | null, date_begin: any, date_end: any } | null> } | null };

export type GetCoauthorsQueryVariables = Exact<{
  result_id: Scalars['ID'];
}>;


export type GetCoauthorsQuery = { __typename?: 'Query', resultById?: { __typename?: 'Result', coauthors: Array<{ __typename?: 'CoAuthor', user: { __typename?: 'User', id: string, name: string } } | null> } | null };

export type GetKeywordsQueryVariables = Exact<{
  result_id: Scalars['ID'];
}>;


export type GetKeywordsQuery = { __typename?: 'Query', resultById?: { __typename?: 'Result', tags: Array<{ __typename?: 'Tag', id: string, name: string } | null> } | null };

export type GetResultQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetResultQuery = { __typename?: 'Query', resultById?: { __typename?: 'Result', id: string, title: string, status?: Status | null, comment?: string | null, resultCategory?: { __typename?: 'ResultCategory', id: string } | null, author: { __typename?: 'User', id: string, name: string }, type: { __typename?: 'Type', id: string }, tags: Array<{ __typename?: 'Tag', id: string, name: string } | null>, projects: Array<{ __typename?: 'ResultProject', project: { __typename?: 'Project', id: string, name: string, short_name: string } } | null> } | null };

export type GetResultDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetResultDetailQuery = { __typename?: 'Query', resultById?: { __typename?: 'Result', id: string, title: string, comment?: string | null, status?: Status | null, resultCategory?: { __typename?: 'ResultCategory', id: string, acronym: string } | null, type: { __typename?: 'Type', id: string, name: string }, projects: Array<{ __typename?: 'ResultProject', project: { __typename?: 'Project', id: string, name: string, short_name: string } } | null>, author: { __typename?: 'User', email: string, id: string, name: string }, coauthors: Array<{ __typename?: 'CoAuthor', user: { __typename?: 'User', email: string, id: string, name: string } } | null>, phases: Array<{ __typename?: 'Phase', date_begin: any, date_end: any, description?: string | null, id: string, name: string, users: Array<{ __typename?: 'InvolvedUser', note?: string | null, user: { __typename?: 'User', email: string, id: string, name: string } } | null> } | null> } | null };

export type CreateResultMutationVariables = Exact<{
  title: Scalars['String'];
  status: Status;
  comment?: InputMaybe<Scalars['String']>;
  type_id: Scalars['ID'];
  result_category_id?: InputMaybe<Scalars['ID']>;
  author: Scalars['ID'];
}>;


export type CreateResultMutation = { __typename?: 'Mutation', createResult?: { __typename?: 'Result', id: string } | null };

export type UpdateResultMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  status?: InputMaybe<Status>;
  comment?: InputMaybe<Scalars['String']>;
  type_id?: InputMaybe<Scalars['ID']>;
  result_category_id?: InputMaybe<Scalars['ID']>;
  author?: InputMaybe<Scalars['ID']>;
}>;


export type UpdateResultMutation = { __typename?: 'Mutation', updateResult?: { __typename?: 'Result', id: string } | null };

export type DeleteResultMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteResultMutation = { __typename?: 'Mutation', removeResult?: { __typename?: 'Result', id: string } | null };

export type UpdateAuthorMutationVariables = Exact<{
  id: Scalars['ID'];
  author: Scalars['ID'];
}>;


export type UpdateAuthorMutation = { __typename?: 'Mutation', updateAuthor?: { __typename?: 'Result', id: string } | null };

export type UpdateResultSyncTagsMutationVariables = Exact<{
  result_id: Scalars['ID'];
  tag_ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type UpdateResultSyncTagsMutation = { __typename?: 'Mutation', updateResultSyncTags?: { __typename?: 'Result', id: string } | null };

export type GetResultCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetResultCategoriesQuery = { __typename?: 'Query', resultCategories: Array<{ __typename?: 'ResultCategory', acronym: string, id: string, note?: string | null, type: ResultCategoryType, url: string, rank: { __typename?: 'Rank', id: string, name: string }, results: Array<{ __typename?: 'Result', id: string, title: string } | null> }> };

export type CreateResultCategoryMutationVariables = Exact<{
  url: Scalars['String'];
  acronym: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  type: ResultCategoryType;
  rank_id: Scalars['ID'];
}>;


export type CreateResultCategoryMutation = { __typename?: 'Mutation', createResultCategory?: { __typename?: 'ResultCategory', id: string } | null };

export type UpdateResultCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
  url?: InputMaybe<Scalars['String']>;
  acronym?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ResultCategoryType>;
  rank_id?: InputMaybe<Scalars['ID']>;
}>;


export type UpdateResultCategoryMutation = { __typename?: 'Mutation', updateResultCategory?: { __typename?: 'ResultCategory', id: string } | null };

export type RemoveResultCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveResultCategoryMutation = { __typename?: 'Mutation', removeResultCategory?: { __typename?: 'ResultCategory', id: string } | null };

export type TableResultFragment = { __typename?: 'Result', id: string, title: string, status?: Status | null, author: { __typename?: 'User', name: string, id: string, email: string }, coauthors: Array<{ __typename?: 'CoAuthor', id: string } | null>, type: { __typename?: 'Type', id: string, name: string }, phases: Array<{ __typename?: 'Phase', date_begin: any, date_end: any } | null> };

export type StatsFragment = { __typename?: 'ResultStatistics', type?: string | null, scheduled?: number | null, delayed?: number | null, in_progress?: number | null };

export type ResultStatsFragment = { __typename?: 'Result', id: string, title: string, status?: Status | null, tags: Array<{ __typename?: 'Tag', id: string, name: string } | null> };

export type GetUserResultsStatsQueryVariables = Exact<{
  user_id: Scalars['ID'];
}>;


export type GetUserResultsStatsQuery = { __typename?: 'Query', userStatistics: Array<{ __typename?: 'ResultStatistics', type?: string | null, scheduled?: number | null, delayed?: number | null, in_progress?: number | null }> };

export type GetUserScheduleQueryVariables = Exact<{
  user_id: Scalars['ID'];
}>;


export type GetUserScheduleQuery = { __typename?: 'Query', userSchedule: Array<{ __typename?: 'ScheduleRecord', day?: any | null, value?: number | null }> };

export type GetUsersUtilizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersUtilizationQuery = { __typename?: 'Query', usersUtilization?: Array<{ __typename?: 'UserUtilization', user_name?: string | null, user_id?: string | null, overlapping_results?: number | null } | null> | null };

export type GetUsersNetworkQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersNetworkQuery = { __typename?: 'Query', usersNetwork?: { __typename?: 'UsersNetwork', nodes: Array<{ __typename?: 'Node', id: string, name: string, email?: string | null, type: NodeType, color: string, height: number, size: number }>, links: Array<{ __typename?: 'Link', source: string, target: string, distance: number }> } | null };

export type GetUsersAssistancesQueryVariables = Exact<{
  user_id: Scalars['ID'];
}>;


export type GetUsersAssistancesQuery = { __typename?: 'Query', usersAssistance: Array<{ __typename?: 'UsersAssistanceStatistics', assistances_count: number, user: { __typename?: 'User', id: string, name: string }, assistances: Array<{ __typename?: 'Result', id: string, title: string } | null> }> };

export type GetResultsByStatusQueryVariables = Exact<{
  status?: InputMaybe<Status>;
}>;


export type GetResultsByStatusQuery = { __typename?: 'Query', resultsByStatus: Array<{ __typename?: 'Result', id: string, title: string, status?: Status | null, tags: Array<{ __typename?: 'Tag', id: string, name: string } | null> }> };

export type GetGlobalsStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGlobalsStatsQuery = { __typename?: 'Query', projectsStatistics: Array<{ __typename?: 'ResultStatistics', type?: string | null, scheduled?: number | null, delayed?: number | null, in_progress?: number | null }>, results: Array<{ __typename?: 'Result', id: string, title: string, status?: Status | null, tags: Array<{ __typename?: 'Tag', id: string, name: string } | null> }> };

export type GetKeywordStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetKeywordStatsQuery = { __typename?: 'Query', keywordsStatistics: Array<{ __typename?: 'KeywordStatistics', text: string, value: number }> };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string }> };

export type CreateTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag?: { __typename?: 'Tag', id: string } | null };

export type CreateTagsMutationVariables = Exact<{
  names: Array<Scalars['String']> | Scalars['String'];
  result_id: Scalars['ID'];
}>;


export type CreateTagsMutation = { __typename?: 'Mutation', createTags?: Array<{ __typename?: 'Tag', id: string } | null> | null };

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag?: { __typename?: 'Tag', id: string } | null };

export type RemoveTagMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveTagMutation = { __typename?: 'Mutation', removeTag?: { __typename?: 'Tag', id: string } | null };

export type CreateTagAttachResultMutationVariables = Exact<{
  name: Scalars['String'];
  result_id: Scalars['ID'];
}>;


export type CreateTagAttachResultMutation = { __typename?: 'Mutation', createTagAttachResult?: { __typename?: 'Tag', id: string } | null };

export type ResultFragment = { __typename?: 'Result', id: string, title: string, projects: Array<{ __typename?: 'ResultProject', id: string } | null>, phases: Array<{ __typename?: 'Phase', created_at: any, date_begin: any, date_end: any, description?: string | null, id: string, name: string, users: Array<{ __typename?: 'InvolvedUser', user: { __typename?: 'User', email: string, id: string, name: string } } | null> } | null>, author: { __typename?: 'User', email: string, name: string, id: string }, resultCategory?: { __typename?: 'ResultCategory', acronym: string, id: string, note?: string | null, type: ResultCategoryType, url: string, rank: { __typename?: 'Rank', id: string, name: string } } | null };

export type MainProjectFragment = { __typename?: 'Project', id: string, date_begin: any, date_end: any, name: string, short_name: string, color: { __typename?: 'ProjectColor', hex: string, id: string }, milestones: Array<{ __typename?: 'Milestone', date: any, description?: string | null, id: string, name: string } | null>, users: Array<{ __typename?: 'UserProject', id: string, user: { __typename?: 'User', id: string, name: string, email: string } } | null>, results: Array<{ __typename?: 'ResultProject', result: { __typename?: 'Result', id: string, title: string, author: { __typename?: 'User', id: string, email: string, name: string }, coauthors: Array<{ __typename?: 'CoAuthor', id: string, user: { __typename?: 'User', id: string } } | null>, projects: Array<{ __typename?: 'ResultProject', id: string } | null>, phases: Array<{ __typename?: 'Phase', created_at: any, date_begin: any, date_end: any, description?: string | null, id: string, name: string, users: Array<{ __typename?: 'InvolvedUser', user: { __typename?: 'User', email: string, id: string, name: string } } | null> } | null>, resultCategory?: { __typename?: 'ResultCategory', acronym: string, id: string, note?: string | null, type: ResultCategoryType, url: string, rank: { __typename?: 'Rank', id: string, name: string } } | null } } | null> };

export type GetTimelineProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTimelineProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, date_begin: any, date_end: any, name: string, short_name: string, color: { __typename?: 'ProjectColor', hex: string, id: string }, milestones: Array<{ __typename?: 'Milestone', date: any, description?: string | null, id: string, name: string } | null>, users: Array<{ __typename?: 'UserProject', id: string, user: { __typename?: 'User', id: string, name: string, email: string } } | null>, results: Array<{ __typename?: 'ResultProject', result: { __typename?: 'Result', id: string, title: string, author: { __typename?: 'User', id: string, email: string, name: string }, coauthors: Array<{ __typename?: 'CoAuthor', id: string, user: { __typename?: 'User', id: string } } | null>, projects: Array<{ __typename?: 'ResultProject', id: string } | null>, phases: Array<{ __typename?: 'Phase', created_at: any, date_begin: any, date_end: any, description?: string | null, id: string, name: string, users: Array<{ __typename?: 'InvolvedUser', user: { __typename?: 'User', email: string, id: string, name: string } } | null> } | null>, resultCategory?: { __typename?: 'ResultCategory', acronym: string, id: string, note?: string | null, type: ResultCategoryType, url: string, rank: { __typename?: 'Rank', id: string, name: string } } | null } } | null> }> };

export type GetTimelineProjectsByUserIdQueryVariables = Exact<{
  user_id: Scalars['ID'];
}>;


export type GetTimelineProjectsByUserIdQuery = { __typename?: 'Query', userProjectByUserId: Array<{ __typename?: 'UserProject', project: { __typename?: 'Project', id: string, date_begin: any, date_end: any, name: string, short_name: string, color: { __typename?: 'ProjectColor', hex: string, id: string }, milestones: Array<{ __typename?: 'Milestone', date: any, description?: string | null, id: string, name: string } | null>, users: Array<{ __typename?: 'UserProject', id: string, user: { __typename?: 'User', id: string, name: string, email: string } } | null>, results: Array<{ __typename?: 'ResultProject', result: { __typename?: 'Result', id: string, title: string, author: { __typename?: 'User', id: string, email: string, name: string }, coauthors: Array<{ __typename?: 'CoAuthor', id: string, user: { __typename?: 'User', id: string } } | null>, projects: Array<{ __typename?: 'ResultProject', id: string } | null>, phases: Array<{ __typename?: 'Phase', created_at: any, date_begin: any, date_end: any, description?: string | null, id: string, name: string, users: Array<{ __typename?: 'InvolvedUser', user: { __typename?: 'User', email: string, id: string, name: string } } | null> } | null>, resultCategory?: { __typename?: 'ResultCategory', acronym: string, id: string, note?: string | null, type: ResultCategoryType, url: string, rank: { __typename?: 'Rank', id: string, name: string } } | null } } | null> } }> };

export type FilterTimelineProjectsMutationVariables = Exact<{
  search_text: Scalars['String'];
}>;


export type FilterTimelineProjectsMutation = { __typename?: 'Mutation', filterTimelineProjects: Array<{ __typename?: 'Project', id: string, date_begin: any, date_end: any, name: string, short_name: string, color: { __typename?: 'ProjectColor', hex: string, id: string }, milestones: Array<{ __typename?: 'Milestone', date: any, description?: string | null, id: string, name: string } | null>, users: Array<{ __typename?: 'UserProject', id: string, user: { __typename?: 'User', id: string, name: string, email: string } } | null>, results: Array<{ __typename?: 'ResultProject', result: { __typename?: 'Result', id: string, title: string, author: { __typename?: 'User', id: string, email: string, name: string }, coauthors: Array<{ __typename?: 'CoAuthor', id: string, user: { __typename?: 'User', id: string } } | null>, projects: Array<{ __typename?: 'ResultProject', id: string } | null>, phases: Array<{ __typename?: 'Phase', created_at: any, date_begin: any, date_end: any, description?: string | null, id: string, name: string, users: Array<{ __typename?: 'InvolvedUser', user: { __typename?: 'User', email: string, id: string, name: string } } | null> } | null>, resultCategory?: { __typename?: 'ResultCategory', acronym: string, id: string, note?: string | null, type: ResultCategoryType, url: string, rank: { __typename?: 'Rank', id: string, name: string } } | null } } | null> }> };

export type GetTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTypesQuery = { __typename?: 'Query', types: Array<{ __typename?: 'Type', id: string, name: string, description?: string | null }> };

export type CreateTypeMutationVariables = Exact<{
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateTypeMutation = { __typename?: 'Mutation', createType?: { __typename?: 'Type', id: string } | null };

export type UpdateTypeMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
}>;


export type UpdateTypeMutation = { __typename?: 'Mutation', updateType?: { __typename?: 'Type', id: string } | null };

export type RemoveTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveTypeMutation = { __typename?: 'Mutation', removeType: boolean };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', email: string, id: string, name: string, first_name: string, last_name: string, status: UserStatus, block: boolean, author: Array<{ __typename?: 'Result', id: string } | null>, coauthor: Array<{ __typename?: 'CoAuthor', id: string } | null>, projects: Array<{ __typename?: 'UserProject', id: string, project: { __typename?: 'Project', date_end: any } } | null>, results: Array<{ __typename?: 'UserResult', id: string } | null>, role?: { __typename?: 'Role', id: string } | null }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', userById?: { __typename?: 'User', id: string, email: string, first_name: string, last_name: string, status: UserStatus } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<UserStatus>;
  email?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string } | null };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'User', id: string } | null };

export type CreateInvolvedUserMutationVariables = Exact<{
  user_id: Scalars['ID'];
  phase_id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
}>;


export type CreateInvolvedUserMutation = { __typename?: 'Mutation', createInvolvedUser?: { __typename?: 'InvolvedUser', id: string } | null };

export type BlockUserMutationVariables = Exact<{
  user_id: Scalars['ID'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser?: { __typename?: 'User', id: string } | null };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CoAuthor: ResolverTypeWrapper<CoAuthor>;
  CreateCoAuthorInput: CreateCoAuthorInput;
  CreateInvolvedUserInput: CreateInvolvedUserInput;
  CreateMilestoneInput: CreateMilestoneInput;
  CreatePhaseInput: CreatePhaseInput;
  CreateProjectInput: CreateProjectInput;
  CreateResultCategoryInput: CreateResultCategoryInput;
  CreateResultInput: CreateResultInput;
  CreateResultProjectInput: CreateResultProjectInput;
  CreateUserProjectInput: CreateUserProjectInput;
  CreateUserResultInput: CreateUserResultInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InvolvedUser: ResolverTypeWrapper<InvolvedUser>;
  KeywordStatistics: ResolverTypeWrapper<KeywordStatistics>;
  Link: ResolverTypeWrapper<Link>;
  Milestone: ResolverTypeWrapper<Milestone>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<Node>;
  NodeType: NodeType;
  OrderByClause: OrderByClause;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaginatorInfo: ResolverTypeWrapper<PaginatorInfo>;
  Phase: ResolverTypeWrapper<Phase>;
  Project: ResolverTypeWrapper<Project>;
  ProjectColor: ResolverTypeWrapper<ProjectColor>;
  ProjectStatistics: ResolverTypeWrapper<ProjectStatistics>;
  Query: ResolverTypeWrapper<{}>;
  Rank: ResolverTypeWrapper<Rank>;
  Result: ResolverTypeWrapper<Result>;
  ResultCategory: ResolverTypeWrapper<ResultCategory>;
  ResultCategoryType: ResultCategoryType;
  ResultProject: ResolverTypeWrapper<ResultProject>;
  ResultStatistics: ResolverTypeWrapper<ResultStatistics>;
  Role: ResolverTypeWrapper<Role>;
  ScheduleRecord: ResolverTypeWrapper<ScheduleRecord>;
  SortOrder: SortOrder;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<Tag>;
  Trashed: Trashed;
  Type: ResolverTypeWrapper<Type>;
  UpdateInvolvedUserInput: UpdateInvolvedUserInput;
  UpdateMilestoneInput: UpdateMilestoneInput;
  UpdatePhaseInput: UpdatePhaseInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateResultCategoryInput: UpdateResultCategoryInput;
  UpdateResultInput: UpdateResultInput;
  UpdateUserResultInput: UpdateUserResultInput;
  User: ResolverTypeWrapper<User>;
  UserProject: ResolverTypeWrapper<UserProject>;
  UserProjectRole: ResolverTypeWrapper<UserProjectRole>;
  UserResult: ResolverTypeWrapper<UserResult>;
  UserStatus: UserStatus;
  UserUtilization: ResolverTypeWrapper<UserUtilization>;
  UsersAssistanceStatistics: ResolverTypeWrapper<UsersAssistanceStatistics>;
  UsersNetwork: ResolverTypeWrapper<UsersNetwork>;
  UsersOrderByColumn: UsersOrderByColumn;
  UsersOrderByOrderByClause: UsersOrderByOrderByClause;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CoAuthor: CoAuthor;
  CreateCoAuthorInput: CreateCoAuthorInput;
  CreateInvolvedUserInput: CreateInvolvedUserInput;
  CreateMilestoneInput: CreateMilestoneInput;
  CreatePhaseInput: CreatePhaseInput;
  CreateProjectInput: CreateProjectInput;
  CreateResultCategoryInput: CreateResultCategoryInput;
  CreateResultInput: CreateResultInput;
  CreateResultProjectInput: CreateResultProjectInput;
  CreateUserProjectInput: CreateUserProjectInput;
  CreateUserResultInput: CreateUserResultInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InvolvedUser: InvolvedUser;
  KeywordStatistics: KeywordStatistics;
  Link: Link;
  Milestone: Milestone;
  Mutation: {};
  Node: Node;
  OrderByClause: OrderByClause;
  PageInfo: PageInfo;
  PaginatorInfo: PaginatorInfo;
  Phase: Phase;
  Project: Project;
  ProjectColor: ProjectColor;
  ProjectStatistics: ProjectStatistics;
  Query: {};
  Rank: Rank;
  Result: Result;
  ResultCategory: ResultCategory;
  ResultProject: ResultProject;
  ResultStatistics: ResultStatistics;
  Role: Role;
  ScheduleRecord: ScheduleRecord;
  String: Scalars['String'];
  Tag: Tag;
  Type: Type;
  UpdateInvolvedUserInput: UpdateInvolvedUserInput;
  UpdateMilestoneInput: UpdateMilestoneInput;
  UpdatePhaseInput: UpdatePhaseInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateResultCategoryInput: UpdateResultCategoryInput;
  UpdateResultInput: UpdateResultInput;
  UpdateUserResultInput: UpdateUserResultInput;
  User: User;
  UserProject: UserProject;
  UserProjectRole: UserProjectRole;
  UserResult: UserResult;
  UserUtilization: UserUtilization;
  UsersAssistanceStatistics: UsersAssistanceStatistics;
  UsersNetwork: UsersNetwork;
  UsersOrderByOrderByClause: UsersOrderByOrderByClause;
};

export type CoAuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['CoAuthor'] = ResolversParentTypes['CoAuthor']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Result'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type InvolvedUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvolvedUser'] = ResolversParentTypes['InvolvedUser']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phase?: Resolver<ResolversTypes['Phase'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeywordStatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeywordStatistics'] = ResolversParentTypes['KeywordStatistics']> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = {
  distance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MilestoneResolvers<ContextType = any, ParentType extends ResolversParentTypes['Milestone'] = ResolversParentTypes['Milestone']> = {
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  blockUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationBlockUserArgs, 'id'>>;
  createCoAuthor?: Resolver<Maybe<ResolversTypes['CoAuthor']>, ParentType, ContextType, Partial<MutationCreateCoAuthorArgs>>;
  createInvolvedUser?: Resolver<Maybe<ResolversTypes['InvolvedUser']>, ParentType, ContextType, Partial<MutationCreateInvolvedUserArgs>>;
  createMilestone?: Resolver<Maybe<ResolversTypes['Milestone']>, ParentType, ContextType, Partial<MutationCreateMilestoneArgs>>;
  createPhase?: Resolver<Maybe<ResolversTypes['Phase']>, ParentType, ContextType, Partial<MutationCreatePhaseArgs>>;
  createProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, Partial<MutationCreateProjectArgs>>;
  createProjectColor?: Resolver<Maybe<ResolversTypes['ProjectColor']>, ParentType, ContextType, RequireFields<MutationCreateProjectColorArgs, 'hex'>>;
  createRank?: Resolver<Maybe<ResolversTypes['Rank']>, ParentType, ContextType, RequireFields<MutationCreateRankArgs, 'name'>>;
  createResult?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<MutationCreateResultArgs, 'input'>>;
  createResultCategory?: Resolver<Maybe<ResolversTypes['ResultCategory']>, ParentType, ContextType, Partial<MutationCreateResultCategoryArgs>>;
  createResultProject?: Resolver<Maybe<ResolversTypes['ResultProject']>, ParentType, ContextType, Partial<MutationCreateResultProjectArgs>>;
  createTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'name'>>;
  createTagAttachResult?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationCreateTagAttachResultArgs, 'name' | 'result_id'>>;
  createTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType, RequireFields<MutationCreateTagsArgs, 'names' | 'result_id'>>;
  createType?: Resolver<Maybe<ResolversTypes['Type']>, ParentType, ContextType, RequireFields<MutationCreateTypeArgs, 'name'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'first_name' | 'last_name' | 'password' | 'status'>>;
  createUserProject?: Resolver<Maybe<ResolversTypes['UserProject']>, ParentType, ContextType, Partial<MutationCreateUserProjectArgs>>;
  createUserProjectRole?: Resolver<Maybe<ResolversTypes['UserProjectRole']>, ParentType, ContextType, RequireFields<MutationCreateUserProjectRoleArgs, 'user_project_id'>>;
  createUserResult?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, Partial<MutationCreateUserResultArgs>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  filterTimelineProjects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationFilterTimelineProjectsArgs, 'search_text'>>;
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password' | 'stay'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'first_name' | 'last_name' | 'password' | 'status'>>;
  removeCoAuthor?: Resolver<Maybe<ResolversTypes['CoAuthor']>, ParentType, ContextType, RequireFields<MutationRemoveCoAuthorArgs, 'id'>>;
  removeInvolvedUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveInvolvedUserArgs, 'id'>>;
  removeMilestone?: Resolver<Maybe<ResolversTypes['Milestone']>, ParentType, ContextType, RequireFields<MutationRemoveMilestoneArgs, 'id'>>;
  removePhase?: Resolver<Maybe<ResolversTypes['Phase']>, ParentType, ContextType, RequireFields<MutationRemovePhaseArgs, 'id'>>;
  removePhasesByResult?: Resolver<Maybe<Array<Maybe<ResolversTypes['Phase']>>>, ParentType, ContextType, RequireFields<MutationRemovePhasesByResultArgs, 'result_id'>>;
  removeProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationRemoveProjectArgs, 'id'>>;
  removeProjectColor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveProjectColorArgs, 'id'>>;
  removeRank?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveRankArgs, 'id'>>;
  removeResult?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<MutationRemoveResultArgs, 'id'>>;
  removeResultCategory?: Resolver<Maybe<ResolversTypes['ResultCategory']>, ParentType, ContextType, RequireFields<MutationRemoveResultCategoryArgs, 'id'>>;
  removeResultProject?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveResultProjectArgs, 'id'>>;
  removeTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationRemoveTagArgs, 'id'>>;
  removeType?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveTypeArgs, 'id'>>;
  removeUserProject?: Resolver<Maybe<ResolversTypes['UserProject']>, ParentType, ContextType, RequireFields<MutationRemoveUserProjectArgs, 'id'>>;
  removeUserProjectRole?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveUserProjectRoleArgs, 'id'>>;
  removeUserResult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveUserResultArgs, 'result_id' | 'user_id'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'newPassword' | 'oldPassword'>>;
  updateAuthor?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<MutationUpdateAuthorArgs, 'author' | 'id'>>;
  updateInvolvedUser?: Resolver<Maybe<ResolversTypes['InvolvedUser']>, ParentType, ContextType, Partial<MutationUpdateInvolvedUserArgs>>;
  updateMilestone?: Resolver<Maybe<ResolversTypes['Milestone']>, ParentType, ContextType, Partial<MutationUpdateMilestoneArgs>>;
  updatePhase?: Resolver<Maybe<ResolversTypes['Phase']>, ParentType, ContextType, Partial<MutationUpdatePhaseArgs>>;
  updateProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, Partial<MutationUpdateProjectArgs>>;
  updateProjectColor?: Resolver<Maybe<ResolversTypes['ProjectColor']>, ParentType, ContextType, RequireFields<MutationUpdateProjectColorArgs, 'id'>>;
  updateRank?: Resolver<Maybe<ResolversTypes['Rank']>, ParentType, ContextType, RequireFields<MutationUpdateRankArgs, 'id'>>;
  updateResult?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, Partial<MutationUpdateResultArgs>>;
  updateResultCategory?: Resolver<Maybe<ResolversTypes['ResultCategory']>, ParentType, ContextType, Partial<MutationUpdateResultCategoryArgs>>;
  updateResultSyncTags?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<MutationUpdateResultSyncTagsArgs, 'result_id' | 'tag_ids'>>;
  updateTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'id'>>;
  updateType?: Resolver<Maybe<ResolversTypes['Type']>, ParentType, ContextType, RequireFields<MutationUpdateTypeArgs, 'id'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
  updateUserProject?: Resolver<Maybe<ResolversTypes['UserProject']>, ParentType, ContextType, RequireFields<MutationUpdateUserProjectArgs, 'id'>>;
  updateUserResult?: Resolver<Array<ResolversTypes['UserResult']>, ParentType, ContextType, Partial<MutationUpdateUserResultArgs>>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NodeType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatorInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatorInfo'] = ResolversParentTypes['PaginatorInfo']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  firstItem?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hasMorePages?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastItem?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PhaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Phase'] = ResolversParentTypes['Phase']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date_begin?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date_end?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Result'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['InvolvedUser']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['ProjectColor'], ParentType, ContextType>;
  date_begin?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date_end?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  milestones?: Resolver<Array<Maybe<ResolversTypes['Milestone']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  results?: Resolver<Array<Maybe<ResolversTypes['ResultProject']>>, ParentType, ContextType>;
  short_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  solver?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['UserProject']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectColorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectColor'] = ResolversParentTypes['ProjectColor']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  hex?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectStatistics'] = ResolversParentTypes['ProjectStatistics']> = {
  involved?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  result_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUserProjects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  currentUserStatistics?: Resolver<Array<ResolversTypes['ResultStatistics']>, ParentType, ContextType>;
  keywordsStatistics?: Resolver<Array<ResolversTypes['KeywordStatistics']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  milestoneById?: Resolver<Maybe<ResolversTypes['Milestone']>, ParentType, ContextType, RequireFields<QueryMilestoneByIdArgs, 'id'>>;
  phaseById?: Resolver<Maybe<ResolversTypes['Phase']>, ParentType, ContextType, RequireFields<QueryPhaseByIdArgs, 'id'>>;
  projectById?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectByIdArgs, 'id'>>;
  projectUsers?: Resolver<Array<ResolversTypes['UserProject']>, ParentType, ContextType, RequireFields<QueryProjectUsersArgs, 'project_id'>>;
  projectUsersNetwork?: Resolver<Maybe<ResolversTypes['UsersNetwork']>, ParentType, ContextType, RequireFields<QueryProjectUsersNetworkArgs, 'project_id'>>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  projectsStatistics?: Resolver<Array<ResolversTypes['ResultStatistics']>, ParentType, ContextType>;
  projects_color_sets?: Resolver<Array<ResolversTypes['ProjectColor']>, ParentType, ContextType>;
  ranks?: Resolver<Array<ResolversTypes['Rank']>, ParentType, ContextType>;
  resultById?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<QueryResultByIdArgs, 'id'>>;
  resultCategories?: Resolver<Array<ResolversTypes['ResultCategory']>, ParentType, ContextType, RequireFields<QueryResultCategoriesArgs, 'trash'>>;
  results?: Resolver<Array<ResolversTypes['Result']>, ParentType, ContextType>;
  resultsByProjectAndUser?: Resolver<Array<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<QueryResultsByProjectAndUserArgs, 'project_ids' | 'user_ids'>>;
  resultsByStatus?: Resolver<Array<ResolversTypes['Result']>, ParentType, ContextType, Partial<QueryResultsByStatusArgs>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  types?: Resolver<Array<ResolversTypes['Type']>, ParentType, ContextType>;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'id'>>;
  userProjectByUserId?: Resolver<Array<ResolversTypes['UserProject']>, ParentType, ContextType, RequireFields<QueryUserProjectByUserIdArgs, 'user_id'>>;
  userResultByUserId?: Resolver<Array<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<QueryUserResultByUserIdArgs, 'result_id' | 'user_id'>>;
  userSchedule?: Resolver<Array<ResolversTypes['ScheduleRecord']>, ParentType, ContextType, RequireFields<QueryUserScheduleArgs, 'user_id'>>;
  userStatistics?: Resolver<Array<ResolversTypes['ResultStatistics']>, ParentType, ContextType, RequireFields<QueryUserStatisticsArgs, 'user_id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
  usersAssistance?: Resolver<Array<ResolversTypes['UsersAssistanceStatistics']>, ParentType, ContextType, RequireFields<QueryUsersAssistanceArgs, 'user_id'>>;
  usersNetwork?: Resolver<Maybe<ResolversTypes['UsersNetwork']>, ParentType, ContextType>;
  usersUtilization?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserUtilization']>>>, ParentType, ContextType>;
};

export type RankResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rank'] = ResolversParentTypes['Rank']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resultCategories?: Resolver<Array<Maybe<ResolversTypes['ResultCategory']>>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  coauthors?: Resolver<Array<Maybe<ResolversTypes['CoAuthor']>>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  phases?: Resolver<Array<Maybe<ResolversTypes['Phase']>>, ParentType, ContextType>;
  projects?: Resolver<Array<Maybe<ResolversTypes['ResultProject']>>, ParentType, ContextType>;
  resultCategory?: Resolver<Maybe<ResolversTypes['ResultCategory']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  tags?: Resolver<Array<Maybe<ResolversTypes['Tag']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['Type'], ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['UserResult']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResultCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResultCategory'] = ResolversParentTypes['ResultCategory']> = {
  acronym?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['Rank'], ParentType, ContextType>;
  results?: Resolver<Array<Maybe<ResolversTypes['Result']>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ResultCategoryType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResultProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResultProject'] = ResolversParentTypes['ResultProject']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResultStatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResultStatistics'] = ResolversParentTypes['ResultStatistics']> = {
  delayed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  in_progress?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  scheduled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScheduleRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduleRecord'] = ResolversParentTypes['ScheduleRecord']> = {
  day?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  results?: Resolver<Array<Maybe<ResolversTypes['Result']>>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Type'] = ResolversParentTypes['Type']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resultCategories?: Resolver<Array<Maybe<ResolversTypes['ResultCategory']>>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  author?: Resolver<Array<Maybe<ResolversTypes['Result']>>, ParentType, ContextType>;
  block?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coauthor?: Resolver<Array<Maybe<ResolversTypes['CoAuthor']>>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phases?: Resolver<Array<Maybe<ResolversTypes['InvolvedUser']>>, ParentType, ContextType>;
  projects?: Resolver<Array<Maybe<ResolversTypes['UserProject']>>, ParentType, ContextType>;
  results?: Resolver<Array<Maybe<ResolversTypes['UserResult']>>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProject'] = ResolversParentTypes['UserProject']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  occupancy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserProjectRole']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProjectRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProjectRole'] = ResolversParentTypes['UserProjectRole']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserProject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date_begin?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date_end?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Result'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserUtilizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserUtilization'] = ResolversParentTypes['UserUtilization']> = {
  overlapping_results?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersAssistanceStatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersAssistanceStatistics'] = ResolversParentTypes['UsersAssistanceStatistics']> = {
  assistances?: Resolver<Array<Maybe<ResolversTypes['Result']>>, ParentType, ContextType>;
  assistances_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersNetworkResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersNetwork'] = ResolversParentTypes['UsersNetwork']> = {
  links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Node']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CoAuthor?: CoAuthorResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  InvolvedUser?: InvolvedUserResolvers<ContextType>;
  KeywordStatistics?: KeywordStatisticsResolvers<ContextType>;
  Link?: LinkResolvers<ContextType>;
  Milestone?: MilestoneResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PaginatorInfo?: PaginatorInfoResolvers<ContextType>;
  Phase?: PhaseResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectColor?: ProjectColorResolvers<ContextType>;
  ProjectStatistics?: ProjectStatisticsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rank?: RankResolvers<ContextType>;
  Result?: ResultResolvers<ContextType>;
  ResultCategory?: ResultCategoryResolvers<ContextType>;
  ResultProject?: ResultProjectResolvers<ContextType>;
  ResultStatistics?: ResultStatisticsResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  ScheduleRecord?: ScheduleRecordResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Type?: TypeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserProject?: UserProjectResolvers<ContextType>;
  UserProjectRole?: UserProjectRoleResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
  UserUtilization?: UserUtilizationResolvers<ContextType>;
  UsersAssistanceStatistics?: UsersAssistanceStatisticsResolvers<ContextType>;
  UsersNetwork?: UsersNetworkResolvers<ContextType>;
};


export const TableResultFragmentDoc = `
    fragment TableResult on Result {
  id
  author {
    name
    id
    email
  }
  coauthors {
    id
  }
  title
  status
  type {
    id
    name
  }
  phases {
    date_begin
    date_end
  }
}
    `;
export const StatsFragmentDoc = `
    fragment Stats on ResultStatistics {
  type
  scheduled
  delayed
  in_progress
}
    `;
export const ResultStatsFragmentDoc = `
    fragment ResultStats on Result {
  id
  title
  status
  tags {
    id
    name
  }
}
    `;
export const ResultFragmentDoc = `
    fragment Result on Result {
  projects {
    id
  }
  phases {
    created_at
    date_begin
    date_end
    description
    id
    name
    description
    users {
      user {
        email
        id
        name
      }
    }
  }
  id
  title
  author {
    email
    name
    id
  }
  resultCategory {
    acronym
    id
    note
    type
    rank {
      id
      name
    }
    url
  }
}
    `;
export const MainProjectFragmentDoc = `
    fragment MainProject on Project {
  id
  color {
    hex
    id
  }
  date_begin
  date_end
  milestones {
    date
    description
    id
    name
  }
  users {
    id
    user {
      id
      name
      email
    }
  }
  name
  short_name
  results {
    result {
      author {
        id
      }
      coauthors {
        id
        user {
          id
        }
      }
      ...Result
    }
  }
}
    ${ResultFragmentDoc}`;
export const LoginDocument = `
    mutation Login($email: String!, $password: String!, $stay: Boolean!) {
  login(email: $email, password: $password, stay: $stay)
}
    `;
export const useLoginMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetchData<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;
export const useLogoutMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      ['Logout'],
      (variables?: LogoutMutationVariables) => fetchData<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables)(),
      options
    );
export const RegisterDocument = `
    mutation Register($email: String!, $first_name: String!, $last_name: String!, $status: UserStatus!, $password: String!) {
  register(
    email: $email
    first_name: $first_name
    last_name: $last_name
    status: $status
    password: $password
  ) {
    id
  }
}
    `;
export const useRegisterMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      ['Register'],
      (variables?: RegisterMutationVariables) => fetchData<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables)(),
      options
    );
export const ResetPasswordDocument = `
    mutation ResetPassword($oldPassword: String!, $newPassword: String!) {
  resetPassword(newPassword: $newPassword, oldPassword: $oldPassword) {
    id
  }
}
    `;
export const useResetPasswordMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>) =>
    useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      ['ResetPassword'],
      (variables?: ResetPasswordMutationVariables) => fetchData<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables)(),
      options
    );
export const GetLoggedUserDocument = `
    query GetLoggedUser {
  me {
    id
    name
    email
    role {
      id
    }
    projects {
      occupancy
      role {
        id
      }
      project {
        id
      }
    }
  }
}
    `;
export const useGetLoggedUserQuery = <
      TData = GetLoggedUserQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetLoggedUserQueryVariables,
      options?: UseQueryOptions<GetLoggedUserQuery, TError, TData>
    ) =>
    useQuery<GetLoggedUserQuery, TError, TData>(
      variables === undefined ? ['GetLoggedUser'] : ['GetLoggedUser', variables],
      fetchData<GetLoggedUserQuery, GetLoggedUserQueryVariables>(GetLoggedUserDocument, variables),
      options
    );
export const CreateCoAuthorDocument = `
    mutation CreateCoAuthor($result_id: ID!, $user_id: ID!) {
  createCoAuthor(input: {result_id: $result_id, user_id: $user_id}) {
    id
  }
}
    `;
export const useCreateCoAuthorMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateCoAuthorMutation, TError, CreateCoAuthorMutationVariables, TContext>) =>
    useMutation<CreateCoAuthorMutation, TError, CreateCoAuthorMutationVariables, TContext>(
      ['CreateCoAuthor'],
      (variables?: CreateCoAuthorMutationVariables) => fetchData<CreateCoAuthorMutation, CreateCoAuthorMutationVariables>(CreateCoAuthorDocument, variables)(),
      options
    );
export const RemoveCoAuthorDocument = `
    mutation RemoveCoAuthor($id: ID!) {
  removeCoAuthor(id: $id) {
    id
    result {
      id
    }
    user {
      id
    }
  }
}
    `;
export const useRemoveCoAuthorMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemoveCoAuthorMutation, TError, RemoveCoAuthorMutationVariables, TContext>) =>
    useMutation<RemoveCoAuthorMutation, TError, RemoveCoAuthorMutationVariables, TContext>(
      ['RemoveCoAuthor'],
      (variables?: RemoveCoAuthorMutationVariables) => fetchData<RemoveCoAuthorMutation, RemoveCoAuthorMutationVariables>(RemoveCoAuthorDocument, variables)(),
      options
    );
export const CreateUserResultDocument = `
    mutation CreateUserResult($result_id: ID!, $user_id: ID!, $date_begin: DateTime!, $date_end: DateTime!) {
  createUserResult(
    input: {result_id: $result_id, user_id: $user_id, date_begin: $date_begin, date_end: $date_end}
  ) {
    id
  }
}
    `;
export const useCreateUserResultMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateUserResultMutation, TError, CreateUserResultMutationVariables, TContext>) =>
    useMutation<CreateUserResultMutation, TError, CreateUserResultMutationVariables, TContext>(
      ['CreateUserResult'],
      (variables?: CreateUserResultMutationVariables) => fetchData<CreateUserResultMutation, CreateUserResultMutationVariables>(CreateUserResultDocument, variables)(),
      options
    );
export const UpdateUserResultDocument = `
    mutation UpdateUserResult($user_id: ID!, $result_id: ID!, $date_begin: DateTime, $date_end: DateTime) {
  updateUserResult(
    input: {user_id: $user_id, result_id: $result_id, date_begin: $date_begin, date_end: $date_end}
  ) {
    id
  }
}
    `;
export const useUpdateUserResultMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserResultMutation, TError, UpdateUserResultMutationVariables, TContext>) =>
    useMutation<UpdateUserResultMutation, TError, UpdateUserResultMutationVariables, TContext>(
      ['UpdateUserResult'],
      (variables?: UpdateUserResultMutationVariables) => fetchData<UpdateUserResultMutation, UpdateUserResultMutationVariables>(UpdateUserResultDocument, variables)(),
      options
    );
export const RemoveUserResultDocument = `
    mutation RemoveUserResult($user_id: ID!, $result_id: ID!) {
  removeUserResult(result_id: $result_id, user_id: $user_id)
}
    `;
export const useRemoveUserResultMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemoveUserResultMutation, TError, RemoveUserResultMutationVariables, TContext>) =>
    useMutation<RemoveUserResultMutation, TError, RemoveUserResultMutationVariables, TContext>(
      ['RemoveUserResult'],
      (variables?: RemoveUserResultMutationVariables) => fetchData<RemoveUserResultMutation, RemoveUserResultMutationVariables>(RemoveUserResultDocument, variables)(),
      options
    );
export const GetUserResultDocument = `
    query GetUserResult($user_id: ID!, $result_id: ID!) {
  userResultByUserId(user_id: $user_id, result_id: $result_id) {
    id
  }
}
    `;
export const useGetUserResultQuery = <
      TData = GetUserResultQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetUserResultQueryVariables,
      options?: UseQueryOptions<GetUserResultQuery, TError, TData>
    ) =>
    useQuery<GetUserResultQuery, TError, TData>(
      ['GetUserResult', variables],
      fetchData<GetUserResultQuery, GetUserResultQueryVariables>(GetUserResultDocument, variables),
      options
    );
export const CreateResultProjectDocument = `
    mutation CreateResultProject($result_id: ID!, $project_id: ID!) {
  createResultProject(input: {result_id: $result_id, project_id: $project_id}) {
    id
  }
}
    `;
export const useCreateResultProjectMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateResultProjectMutation, TError, CreateResultProjectMutationVariables, TContext>) =>
    useMutation<CreateResultProjectMutation, TError, CreateResultProjectMutationVariables, TContext>(
      ['CreateResultProject'],
      (variables?: CreateResultProjectMutationVariables) => fetchData<CreateResultProjectMutation, CreateResultProjectMutationVariables>(CreateResultProjectDocument, variables)(),
      options
    );
export const RemoveResultProjectDocument = `
    mutation RemoveResultProject($id: ID!) {
  removeResultProject(id: $id)
}
    `;
export const useRemoveResultProjectMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemoveResultProjectMutation, TError, RemoveResultProjectMutationVariables, TContext>) =>
    useMutation<RemoveResultProjectMutation, TError, RemoveResultProjectMutationVariables, TContext>(
      ['RemoveResultProject'],
      (variables?: RemoveResultProjectMutationVariables) => fetchData<RemoveResultProjectMutation, RemoveResultProjectMutationVariables>(RemoveResultProjectDocument, variables)(),
      options
    );
export const CreateUserProjectDocument = `
    mutation CreateUserProject($user_id: ID!, $project_id: ID!, $occupancy: Int!) {
  createUserProject(
    input: {occupancy: $occupancy, project_id: $project_id, user_id: $user_id}
  ) {
    id
  }
}
    `;
export const useCreateUserProjectMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateUserProjectMutation, TError, CreateUserProjectMutationVariables, TContext>) =>
    useMutation<CreateUserProjectMutation, TError, CreateUserProjectMutationVariables, TContext>(
      ['CreateUserProject'],
      (variables?: CreateUserProjectMutationVariables) => fetchData<CreateUserProjectMutation, CreateUserProjectMutationVariables>(CreateUserProjectDocument, variables)(),
      options
    );
export const RemoveUserProjectDocument = `
    mutation RemoveUserProject($id: ID!) {
  removeUserProject(id: $id) {
    id
  }
}
    `;
export const useRemoveUserProjectMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemoveUserProjectMutation, TError, RemoveUserProjectMutationVariables, TContext>) =>
    useMutation<RemoveUserProjectMutation, TError, RemoveUserProjectMutationVariables, TContext>(
      ['RemoveUserProject'],
      (variables?: RemoveUserProjectMutationVariables) => fetchData<RemoveUserProjectMutation, RemoveUserProjectMutationVariables>(RemoveUserProjectDocument, variables)(),
      options
    );
export const CreateMilestoneDocument = `
    mutation CreateMilestone($date: DateTime!, $description: String, $name: String!, $project_id: ID!) {
  createMilestone(
    input: {date: $date, description: $description, name: $name, project_id: $project_id}
  ) {
    id
  }
}
    `;
export const useCreateMilestoneMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateMilestoneMutation, TError, CreateMilestoneMutationVariables, TContext>) =>
    useMutation<CreateMilestoneMutation, TError, CreateMilestoneMutationVariables, TContext>(
      ['CreateMilestone'],
      (variables?: CreateMilestoneMutationVariables) => fetchData<CreateMilestoneMutation, CreateMilestoneMutationVariables>(CreateMilestoneDocument, variables)(),
      options
    );
export const UpdateMilestoneDocument = `
    mutation UpdateMilestone($id: ID!, $date: DateTime, $description: String, $name: String) {
  updateMilestone(
    input: {id: $id, date: $date, description: $description, name: $name}
  ) {
    id
  }
}
    `;
export const useUpdateMilestoneMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateMilestoneMutation, TError, UpdateMilestoneMutationVariables, TContext>) =>
    useMutation<UpdateMilestoneMutation, TError, UpdateMilestoneMutationVariables, TContext>(
      ['UpdateMilestone'],
      (variables?: UpdateMilestoneMutationVariables) => fetchData<UpdateMilestoneMutation, UpdateMilestoneMutationVariables>(UpdateMilestoneDocument, variables)(),
      options
    );
export const RemoveMilestoneDocument = `
    mutation RemoveMilestone($id: ID!) {
  removeMilestone(id: $id) {
    id
  }
}
    `;
export const useRemoveMilestoneMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemoveMilestoneMutation, TError, RemoveMilestoneMutationVariables, TContext>) =>
    useMutation<RemoveMilestoneMutation, TError, RemoveMilestoneMutationVariables, TContext>(
      ['RemoveMilestone'],
      (variables?: RemoveMilestoneMutationVariables) => fetchData<RemoveMilestoneMutation, RemoveMilestoneMutationVariables>(RemoveMilestoneDocument, variables)(),
      options
    );
export const GetMilestoneDocument = `
    query GetMilestone($id: ID!) {
  milestoneById(id: $id) {
    id
    date
    description
    name
  }
}
    `;
export const useGetMilestoneQuery = <
      TData = GetMilestoneQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetMilestoneQueryVariables,
      options?: UseQueryOptions<GetMilestoneQuery, TError, TData>
    ) =>
    useQuery<GetMilestoneQuery, TError, TData>(
      ['GetMilestone', variables],
      fetchData<GetMilestoneQuery, GetMilestoneQueryVariables>(GetMilestoneDocument, variables),
      options
    );
export const CreatePhaseDocument = `
    mutation CreatePhase($date_begin: DateTime!, $date_end: DateTime!, $result_id: ID!, $description: String, $name: String!) {
  createPhase(
    input: {date_begin: $date_begin, date_end: $date_end, result_id: $result_id, description: $description, name: $name}
  ) {
    id
  }
}
    `;
export const useCreatePhaseMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreatePhaseMutation, TError, CreatePhaseMutationVariables, TContext>) =>
    useMutation<CreatePhaseMutation, TError, CreatePhaseMutationVariables, TContext>(
      ['CreatePhase'],
      (variables?: CreatePhaseMutationVariables) => fetchData<CreatePhaseMutation, CreatePhaseMutationVariables>(CreatePhaseDocument, variables)(),
      options
    );
export const UpdatePhaseDocument = `
    mutation UpdatePhase($id: ID!, $date_begin: DateTime, $date_end: DateTime, $description: String, $name: String) {
  updatePhase(
    input: {id: $id, date_begin: $date_begin, date_end: $date_end, description: $description, name: $name}
  ) {
    id
    date_begin
    date_end
    result {
      id
    }
    users {
      id
    }
  }
}
    `;
export const useUpdatePhaseMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdatePhaseMutation, TError, UpdatePhaseMutationVariables, TContext>) =>
    useMutation<UpdatePhaseMutation, TError, UpdatePhaseMutationVariables, TContext>(
      ['UpdatePhase'],
      (variables?: UpdatePhaseMutationVariables) => fetchData<UpdatePhaseMutation, UpdatePhaseMutationVariables>(UpdatePhaseDocument, variables)(),
      options
    );
export const RemovePhaseDocument = `
    mutation RemovePhase($id: ID!) {
  removePhase(id: $id) {
    id
    result {
      id
    }
    users {
      id
    }
  }
}
    `;
export const useRemovePhaseMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemovePhaseMutation, TError, RemovePhaseMutationVariables, TContext>) =>
    useMutation<RemovePhaseMutation, TError, RemovePhaseMutationVariables, TContext>(
      ['RemovePhase'],
      (variables?: RemovePhaseMutationVariables) => fetchData<RemovePhaseMutation, RemovePhaseMutationVariables>(RemovePhaseDocument, variables)(),
      options
    );
export const RemovePhasesOfResultDocument = `
    mutation RemovePhasesOfResult($result_id: ID!) {
  removePhasesByResult(result_id: $result_id) {
    id
  }
}
    `;
export const useRemovePhasesOfResultMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemovePhasesOfResultMutation, TError, RemovePhasesOfResultMutationVariables, TContext>) =>
    useMutation<RemovePhasesOfResultMutation, TError, RemovePhasesOfResultMutationVariables, TContext>(
      ['RemovePhasesOfResult'],
      (variables?: RemovePhasesOfResultMutationVariables) => fetchData<RemovePhasesOfResultMutation, RemovePhasesOfResultMutationVariables>(RemovePhasesOfResultDocument, variables)(),
      options
    );
export const GetPhaseDocument = `
    query GetPhase($id: ID!) {
  phaseById(id: $id) {
    id
    date_begin
    date_end
    description
    name
  }
}
    `;
export const useGetPhaseQuery = <
      TData = GetPhaseQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetPhaseQueryVariables,
      options?: UseQueryOptions<GetPhaseQuery, TError, TData>
    ) =>
    useQuery<GetPhaseQuery, TError, TData>(
      ['GetPhase', variables],
      fetchData<GetPhaseQuery, GetPhaseQueryVariables>(GetPhaseDocument, variables),
      options
    );
export const GetProjectUsersDocument = `
    query GetProjectUsers($project_id: ID!) {
  projectUsers(project_id: $project_id) {
    id
    user {
      id
      name
      email
    }
  }
}
    `;
export const useGetProjectUsersQuery = <
      TData = GetProjectUsersQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetProjectUsersQueryVariables,
      options?: UseQueryOptions<GetProjectUsersQuery, TError, TData>
    ) =>
    useQuery<GetProjectUsersQuery, TError, TData>(
      ['GetProjectUsers', variables],
      fetchData<GetProjectUsersQuery, GetProjectUsersQueryVariables>(GetProjectUsersDocument, variables),
      options
    );
export const GetProjectDetailDocument = `
    query GetProjectDetail($id: ID!) {
  projectById(id: $id) {
    id
    name
    date_begin
    date_end
    color {
      id
      hex
    }
    code
    short_name
    solver {
      id
      name
      email
    }
    users {
      id
      occupancy
      user {
        id
        name
        email
      }
    }
    milestones {
      id
      name
      description
      date
    }
    results {
      result {
        ...TableResult
      }
    }
  }
}
    ${TableResultFragmentDoc}`;
export const useGetProjectDetailQuery = <
      TData = GetProjectDetailQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetProjectDetailQueryVariables,
      options?: UseQueryOptions<GetProjectDetailQuery, TError, TData>
    ) =>
    useQuery<GetProjectDetailQuery, TError, TData>(
      ['GetProjectDetail', variables],
      fetchData<GetProjectDetailQuery, GetProjectDetailQueryVariables>(GetProjectDetailDocument, variables),
      options
    );
export const GetProjectDocument = `
    query GetProject($id: ID!) {
  projectById(id: $id) {
    color {
      hex
      id
    }
    id
    name
    solver {
      id
    }
    short_name
    code
    date_begin
    date_end
  }
}
    `;
export const useGetProjectQuery = <
      TData = GetProjectQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetProjectQueryVariables,
      options?: UseQueryOptions<GetProjectQuery, TError, TData>
    ) =>
    useQuery<GetProjectQuery, TError, TData>(
      ['GetProject', variables],
      fetchData<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, variables),
      options
    );
export const GetProjectColorsDocument = `
    query GetProjectColors {
  projects_color_sets {
    hex
    id
  }
}
    `;
export const useGetProjectColorsQuery = <
      TData = GetProjectColorsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetProjectColorsQueryVariables,
      options?: UseQueryOptions<GetProjectColorsQuery, TError, TData>
    ) =>
    useQuery<GetProjectColorsQuery, TError, TData>(
      variables === undefined ? ['GetProjectColors'] : ['GetProjectColors', variables],
      fetchData<GetProjectColorsQuery, GetProjectColorsQueryVariables>(GetProjectColorsDocument, variables),
      options
    );
export const GetAllProjectsDocument = `
    query GetAllProjects {
  projects {
    id
    name
    solver {
      id
    }
    short_name
    color {
      id
      hex
    }
  }
}
    `;
export const useGetAllProjectsQuery = <
      TData = GetAllProjectsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetAllProjectsQueryVariables,
      options?: UseQueryOptions<GetAllProjectsQuery, TError, TData>
    ) =>
    useQuery<GetAllProjectsQuery, TError, TData>(
      variables === undefined ? ['GetAllProjects'] : ['GetAllProjects', variables],
      fetchData<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, variables),
      options
    );
export const GetCurrentUserProjectsDocument = `
    query GetCurrentUserProjects {
  currentUserProjects {
    id
    name
  }
}
    `;
export const useGetCurrentUserProjectsQuery = <
      TData = GetCurrentUserProjectsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetCurrentUserProjectsQueryVariables,
      options?: UseQueryOptions<GetCurrentUserProjectsQuery, TError, TData>
    ) =>
    useQuery<GetCurrentUserProjectsQuery, TError, TData>(
      variables === undefined ? ['GetCurrentUserProjects'] : ['GetCurrentUserProjects', variables],
      fetchData<GetCurrentUserProjectsQuery, GetCurrentUserProjectsQueryVariables>(GetCurrentUserProjectsDocument, variables),
      options
    );
export const GetUserProjectsDocument = `
    query GetUserProjects($user_id: ID!) {
  userProjectByUserId(user_id: $user_id) {
    project {
      id
      name
      short_name
    }
  }
}
    `;
export const useGetUserProjectsQuery = <
      TData = GetUserProjectsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetUserProjectsQueryVariables,
      options?: UseQueryOptions<GetUserProjectsQuery, TError, TData>
    ) =>
    useQuery<GetUserProjectsQuery, TError, TData>(
      ['GetUserProjects', variables],
      fetchData<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, variables),
      options
    );
export const GetProjectUsersNetworkDocument = `
    query GetProjectUsersNetwork($project_id: ID!) {
  projectUsersNetwork(project_id: $project_id) {
    nodes {
      id
      name
      type
      email
      height
      size
      color
    }
    links {
      source
      target
      distance
    }
  }
}
    `;
export const useGetProjectUsersNetworkQuery = <
      TData = GetProjectUsersNetworkQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetProjectUsersNetworkQueryVariables,
      options?: UseQueryOptions<GetProjectUsersNetworkQuery, TError, TData>
    ) =>
    useQuery<GetProjectUsersNetworkQuery, TError, TData>(
      ['GetProjectUsersNetwork', variables],
      fetchData<GetProjectUsersNetworkQuery, GetProjectUsersNetworkQueryVariables>(GetProjectUsersNetworkDocument, variables),
      options
    );
export const CreateProjectDocument = `
    mutation CreateProject($name: String!, $date_begin: DateTime!, $date_end: DateTime!, $projects_color_set_id: ID!, $code: String!, $short_name: String!, $solver: ID!) {
  createProject(
    input: {name: $name, date_begin: $date_begin, date_end: $date_end, projects_color_set_id: $projects_color_set_id, code: $code, short_name: $short_name, solver: $solver}
  ) {
    id
    solver {
      id
    }
  }
}
    `;
export const useCreateProjectMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>) =>
    useMutation<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>(
      ['CreateProject'],
      (variables?: CreateProjectMutationVariables) => fetchData<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, variables)(),
      options
    );
export const UpdateProjectDocument = `
    mutation UpdateProject($id: ID!, $name: String, $date_begin: DateTime, $date_end: DateTime, $projects_color_set_id: ID, $code: String, $short_name: String, $solver: ID) {
  updateProject(
    input: {id: $id, name: $name, date_begin: $date_begin, date_end: $date_end, projects_color_set_id: $projects_color_set_id, code: $code, short_name: $short_name, solver: $solver}
  ) {
    id
    solver {
      id
    }
  }
}
    `;
export const useUpdateProjectMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProjectMutation, TError, UpdateProjectMutationVariables, TContext>) =>
    useMutation<UpdateProjectMutation, TError, UpdateProjectMutationVariables, TContext>(
      ['UpdateProject'],
      (variables?: UpdateProjectMutationVariables) => fetchData<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, variables)(),
      options
    );
export const DeleteProjectDocument = `
    mutation DeleteProject($id: ID!) {
  removeProject(id: $id) {
    id
  }
}
    `;
export const useDeleteProjectMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<DeleteProjectMutation, TError, DeleteProjectMutationVariables, TContext>) =>
    useMutation<DeleteProjectMutation, TError, DeleteProjectMutationVariables, TContext>(
      ['DeleteProject'],
      (variables?: DeleteProjectMutationVariables) => fetchData<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, variables)(),
      options
    );
export const GetRanksDocument = `
    query GetRanks {
  ranks {
    id
    name
    note
  }
}
    `;
export const useGetRanksQuery = <
      TData = GetRanksQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetRanksQueryVariables,
      options?: UseQueryOptions<GetRanksQuery, TError, TData>
    ) =>
    useQuery<GetRanksQuery, TError, TData>(
      variables === undefined ? ['GetRanks'] : ['GetRanks', variables],
      fetchData<GetRanksQuery, GetRanksQueryVariables>(GetRanksDocument, variables),
      options
    );
export const CreateRankDocument = `
    mutation CreateRank($name: String!, $note: String) {
  createRank(name: $name, note: $note) {
    id
  }
}
    `;
export const useCreateRankMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateRankMutation, TError, CreateRankMutationVariables, TContext>) =>
    useMutation<CreateRankMutation, TError, CreateRankMutationVariables, TContext>(
      ['CreateRank'],
      (variables?: CreateRankMutationVariables) => fetchData<CreateRankMutation, CreateRankMutationVariables>(CreateRankDocument, variables)(),
      options
    );
export const UpdateRankDocument = `
    mutation UpdateRank($id: ID!, $name: String, $note: String) {
  updateRank(id: $id, name: $name, note: $note) {
    id
  }
}
    `;
export const useUpdateRankMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateRankMutation, TError, UpdateRankMutationVariables, TContext>) =>
    useMutation<UpdateRankMutation, TError, UpdateRankMutationVariables, TContext>(
      ['UpdateRank'],
      (variables?: UpdateRankMutationVariables) => fetchData<UpdateRankMutation, UpdateRankMutationVariables>(UpdateRankDocument, variables)(),
      options
    );
export const RemoveRankDocument = `
    mutation RemoveRank($id: ID!) {
  removeRank(id: $id)
}
    `;
export const useRemoveRankMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemoveRankMutation, TError, RemoveRankMutationVariables, TContext>) =>
    useMutation<RemoveRankMutation, TError, RemoveRankMutationVariables, TContext>(
      ['RemoveRank'],
      (variables?: RemoveRankMutationVariables) => fetchData<RemoveRankMutation, RemoveRankMutationVariables>(RemoveRankDocument, variables)(),
      options
    );
export const GetFilteredResultsDocument = `
    query GetFilteredResults($project_ids: [ID]!, $user_ids: [ID]!) {
  resultsByProjectAndUser(project_ids: $project_ids, user_ids: $user_ids) {
    id
    title
  }
}
    `;
export const useGetFilteredResultsQuery = <
      TData = GetFilteredResultsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetFilteredResultsQueryVariables,
      options?: UseQueryOptions<GetFilteredResultsQuery, TError, TData>
    ) =>
    useQuery<GetFilteredResultsQuery, TError, TData>(
      ['GetFilteredResults', variables],
      fetchData<GetFilteredResultsQuery, GetFilteredResultsQueryVariables>(GetFilteredResultsDocument, variables),
      options
    );
export const GetAllResultsDocument = `
    query GetAllResults {
  results {
    ...TableResult
  }
}
    ${TableResultFragmentDoc}`;
export const useGetAllResultsQuery = <
      TData = GetAllResultsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetAllResultsQueryVariables,
      options?: UseQueryOptions<GetAllResultsQuery, TError, TData>
    ) =>
    useQuery<GetAllResultsQuery, TError, TData>(
      variables === undefined ? ['GetAllResults'] : ['GetAllResults', variables],
      fetchData<GetAllResultsQuery, GetAllResultsQueryVariables>(GetAllResultsDocument, variables),
      options
    );
export const GetPhasesDocument = `
    query GetPhases($result_id: ID!) {
  resultById(id: $result_id) {
    phases {
      id
      name
      description
      date_begin
      date_end
    }
  }
}
    `;
export const useGetPhasesQuery = <
      TData = GetPhasesQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetPhasesQueryVariables,
      options?: UseQueryOptions<GetPhasesQuery, TError, TData>
    ) =>
    useQuery<GetPhasesQuery, TError, TData>(
      ['GetPhases', variables],
      fetchData<GetPhasesQuery, GetPhasesQueryVariables>(GetPhasesDocument, variables),
      options
    );
export const GetCoauthorsDocument = `
    query GetCoauthors($result_id: ID!) {
  resultById(id: $result_id) {
    coauthors {
      user {
        id
        name
      }
    }
  }
}
    `;
export const useGetCoauthorsQuery = <
      TData = GetCoauthorsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetCoauthorsQueryVariables,
      options?: UseQueryOptions<GetCoauthorsQuery, TError, TData>
    ) =>
    useQuery<GetCoauthorsQuery, TError, TData>(
      ['GetCoauthors', variables],
      fetchData<GetCoauthorsQuery, GetCoauthorsQueryVariables>(GetCoauthorsDocument, variables),
      options
    );
export const GetKeywordsDocument = `
    query GetKeywords($result_id: ID!) {
  resultById(id: $result_id) {
    tags {
      id
      name
    }
  }
}
    `;
export const useGetKeywordsQuery = <
      TData = GetKeywordsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetKeywordsQueryVariables,
      options?: UseQueryOptions<GetKeywordsQuery, TError, TData>
    ) =>
    useQuery<GetKeywordsQuery, TError, TData>(
      ['GetKeywords', variables],
      fetchData<GetKeywordsQuery, GetKeywordsQueryVariables>(GetKeywordsDocument, variables),
      options
    );
export const GetResultDocument = `
    query GetResult($id: ID!) {
  resultById(id: $id) {
    resultCategory {
      id
    }
    id
    title
    status
    comment
    author {
      id
      name
    }
    type {
      id
    }
    tags {
      id
      name
    }
    projects {
      project {
        id
        name
        short_name
      }
    }
  }
}
    `;
export const useGetResultQuery = <
      TData = GetResultQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetResultQueryVariables,
      options?: UseQueryOptions<GetResultQuery, TError, TData>
    ) =>
    useQuery<GetResultQuery, TError, TData>(
      ['GetResult', variables],
      fetchData<GetResultQuery, GetResultQueryVariables>(GetResultDocument, variables),
      options
    );
export const GetResultDetailDocument = `
    query GetResultDetail($id: ID!) {
  resultById(id: $id) {
    resultCategory {
      id
    }
    id
    title
    comment
    status
    type {
      id
      name
    }
    resultCategory {
      id
      acronym
    }
    projects {
      project {
        id
        name
        short_name
      }
    }
    author {
      email
      id
      name
    }
    coauthors {
      user {
        email
        id
        name
      }
    }
    phases {
      date_begin
      date_end
      description
      id
      name
      users {
        note
        user {
          email
          id
          name
        }
      }
    }
  }
}
    `;
export const useGetResultDetailQuery = <
      TData = GetResultDetailQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetResultDetailQueryVariables,
      options?: UseQueryOptions<GetResultDetailQuery, TError, TData>
    ) =>
    useQuery<GetResultDetailQuery, TError, TData>(
      ['GetResultDetail', variables],
      fetchData<GetResultDetailQuery, GetResultDetailQueryVariables>(GetResultDetailDocument, variables),
      options
    );
export const CreateResultDocument = `
    mutation CreateResult($title: String!, $status: Status!, $comment: String, $type_id: ID!, $result_category_id: ID, $author: ID!) {
  createResult(
    input: {title: $title, comment: $comment, status: $status, type_id: $type_id, result_category_id: $result_category_id, author: $author}
  ) {
    id
  }
}
    `;
export const useCreateResultMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateResultMutation, TError, CreateResultMutationVariables, TContext>) =>
    useMutation<CreateResultMutation, TError, CreateResultMutationVariables, TContext>(
      ['CreateResult'],
      (variables?: CreateResultMutationVariables) => fetchData<CreateResultMutation, CreateResultMutationVariables>(CreateResultDocument, variables)(),
      options
    );
export const UpdateResultDocument = `
    mutation UpdateResult($id: ID!, $title: String!, $status: Status, $comment: String, $type_id: ID, $result_category_id: ID, $author: ID) {
  updateResult(
    input: {id: $id, title: $title, comment: $comment, status: $status, type_id: $type_id, result_category_id: $result_category_id, author: $author}
  ) {
    id
  }
}
    `;
export const useUpdateResultMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateResultMutation, TError, UpdateResultMutationVariables, TContext>) =>
    useMutation<UpdateResultMutation, TError, UpdateResultMutationVariables, TContext>(
      ['UpdateResult'],
      (variables?: UpdateResultMutationVariables) => fetchData<UpdateResultMutation, UpdateResultMutationVariables>(UpdateResultDocument, variables)(),
      options
    );
export const DeleteResultDocument = `
    mutation DeleteResult($id: ID!) {
  removeResult(id: $id) {
    id
  }
}
    `;
export const useDeleteResultMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<DeleteResultMutation, TError, DeleteResultMutationVariables, TContext>) =>
    useMutation<DeleteResultMutation, TError, DeleteResultMutationVariables, TContext>(
      ['DeleteResult'],
      (variables?: DeleteResultMutationVariables) => fetchData<DeleteResultMutation, DeleteResultMutationVariables>(DeleteResultDocument, variables)(),
      options
    );
export const UpdateAuthorDocument = `
    mutation UpdateAuthor($id: ID!, $author: ID!) {
  updateAuthor(id: $id, author: $author) {
    id
  }
}
    `;
export const useUpdateAuthorMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateAuthorMutation, TError, UpdateAuthorMutationVariables, TContext>) =>
    useMutation<UpdateAuthorMutation, TError, UpdateAuthorMutationVariables, TContext>(
      ['UpdateAuthor'],
      (variables?: UpdateAuthorMutationVariables) => fetchData<UpdateAuthorMutation, UpdateAuthorMutationVariables>(UpdateAuthorDocument, variables)(),
      options
    );
export const UpdateResultSyncTagsDocument = `
    mutation UpdateResultSyncTags($result_id: ID!, $tag_ids: [ID!]!) {
  updateResultSyncTags(result_id: $result_id, tag_ids: $tag_ids) {
    id
  }
}
    `;
export const useUpdateResultSyncTagsMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateResultSyncTagsMutation, TError, UpdateResultSyncTagsMutationVariables, TContext>) =>
    useMutation<UpdateResultSyncTagsMutation, TError, UpdateResultSyncTagsMutationVariables, TContext>(
      ['UpdateResultSyncTags'],
      (variables?: UpdateResultSyncTagsMutationVariables) => fetchData<UpdateResultSyncTagsMutation, UpdateResultSyncTagsMutationVariables>(UpdateResultSyncTagsDocument, variables)(),
      options
    );
export const GetResultCategoriesDocument = `
    query GetResultCategories {
  resultCategories(trash: false) {
    acronym
    id
    note
    rank {
      id
      name
    }
    results {
      id
      title
    }
    type
    url
  }
}
    `;
export const useGetResultCategoriesQuery = <
      TData = GetResultCategoriesQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetResultCategoriesQueryVariables,
      options?: UseQueryOptions<GetResultCategoriesQuery, TError, TData>
    ) =>
    useQuery<GetResultCategoriesQuery, TError, TData>(
      variables === undefined ? ['GetResultCategories'] : ['GetResultCategories', variables],
      fetchData<GetResultCategoriesQuery, GetResultCategoriesQueryVariables>(GetResultCategoriesDocument, variables),
      options
    );
export const CreateResultCategoryDocument = `
    mutation CreateResultCategory($url: String!, $acronym: String!, $note: String, $type: ResultCategoryType!, $rank_id: ID!) {
  createResultCategory(
    input: {url: $url, acronym: $acronym, note: $note, type: $type, rank_id: $rank_id}
  ) {
    id
  }
}
    `;
export const useCreateResultCategoryMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateResultCategoryMutation, TError, CreateResultCategoryMutationVariables, TContext>) =>
    useMutation<CreateResultCategoryMutation, TError, CreateResultCategoryMutationVariables, TContext>(
      ['CreateResultCategory'],
      (variables?: CreateResultCategoryMutationVariables) => fetchData<CreateResultCategoryMutation, CreateResultCategoryMutationVariables>(CreateResultCategoryDocument, variables)(),
      options
    );
export const UpdateResultCategoryDocument = `
    mutation UpdateResultCategory($id: ID!, $url: String, $acronym: String, $note: String, $type: ResultCategoryType, $rank_id: ID) {
  updateResultCategory(
    input: {id: $id, url: $url, acronym: $acronym, note: $note, type: $type, rank_id: $rank_id}
  ) {
    id
  }
}
    `;
export const useUpdateResultCategoryMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateResultCategoryMutation, TError, UpdateResultCategoryMutationVariables, TContext>) =>
    useMutation<UpdateResultCategoryMutation, TError, UpdateResultCategoryMutationVariables, TContext>(
      ['UpdateResultCategory'],
      (variables?: UpdateResultCategoryMutationVariables) => fetchData<UpdateResultCategoryMutation, UpdateResultCategoryMutationVariables>(UpdateResultCategoryDocument, variables)(),
      options
    );
export const RemoveResultCategoryDocument = `
    mutation RemoveResultCategory($id: ID!) {
  removeResultCategory(id: $id) {
    id
  }
}
    `;
export const useRemoveResultCategoryMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemoveResultCategoryMutation, TError, RemoveResultCategoryMutationVariables, TContext>) =>
    useMutation<RemoveResultCategoryMutation, TError, RemoveResultCategoryMutationVariables, TContext>(
      ['RemoveResultCategory'],
      (variables?: RemoveResultCategoryMutationVariables) => fetchData<RemoveResultCategoryMutation, RemoveResultCategoryMutationVariables>(RemoveResultCategoryDocument, variables)(),
      options
    );
export const GetUserResultsStatsDocument = `
    query GetUserResultsStats($user_id: ID!) {
  userStatistics(user_id: $user_id) {
    ...Stats
  }
}
    ${StatsFragmentDoc}`;
export const useGetUserResultsStatsQuery = <
      TData = GetUserResultsStatsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetUserResultsStatsQueryVariables,
      options?: UseQueryOptions<GetUserResultsStatsQuery, TError, TData>
    ) =>
    useQuery<GetUserResultsStatsQuery, TError, TData>(
      ['GetUserResultsStats', variables],
      fetchData<GetUserResultsStatsQuery, GetUserResultsStatsQueryVariables>(GetUserResultsStatsDocument, variables),
      options
    );
export const GetUserScheduleDocument = `
    query GetUserSchedule($user_id: ID!) {
  userSchedule(user_id: $user_id) {
    day
    value
  }
}
    `;
export const useGetUserScheduleQuery = <
      TData = GetUserScheduleQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetUserScheduleQueryVariables,
      options?: UseQueryOptions<GetUserScheduleQuery, TError, TData>
    ) =>
    useQuery<GetUserScheduleQuery, TError, TData>(
      ['GetUserSchedule', variables],
      fetchData<GetUserScheduleQuery, GetUserScheduleQueryVariables>(GetUserScheduleDocument, variables),
      options
    );
export const GetUsersUtilizationDocument = `
    query GetUsersUtilization {
  usersUtilization {
    user_name
    user_id
    overlapping_results
  }
}
    `;
export const useGetUsersUtilizationQuery = <
      TData = GetUsersUtilizationQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetUsersUtilizationQueryVariables,
      options?: UseQueryOptions<GetUsersUtilizationQuery, TError, TData>
    ) =>
    useQuery<GetUsersUtilizationQuery, TError, TData>(
      variables === undefined ? ['GetUsersUtilization'] : ['GetUsersUtilization', variables],
      fetchData<GetUsersUtilizationQuery, GetUsersUtilizationQueryVariables>(GetUsersUtilizationDocument, variables),
      options
    );
export const GetUsersNetworkDocument = `
    query GetUsersNetwork {
  usersNetwork {
    nodes {
      id
      name
      email
      type
      color
      height
      size
    }
    links {
      source
      target
      distance
    }
  }
}
    `;
export const useGetUsersNetworkQuery = <
      TData = GetUsersNetworkQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetUsersNetworkQueryVariables,
      options?: UseQueryOptions<GetUsersNetworkQuery, TError, TData>
    ) =>
    useQuery<GetUsersNetworkQuery, TError, TData>(
      variables === undefined ? ['GetUsersNetwork'] : ['GetUsersNetwork', variables],
      fetchData<GetUsersNetworkQuery, GetUsersNetworkQueryVariables>(GetUsersNetworkDocument, variables),
      options
    );
export const GetUsersAssistancesDocument = `
    query GetUsersAssistances($user_id: ID!) {
  usersAssistance(user_id: $user_id) {
    user {
      id
      name
    }
    assistances_count
    assistances {
      id
      title
    }
  }
}
    `;
export const useGetUsersAssistancesQuery = <
      TData = GetUsersAssistancesQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetUsersAssistancesQueryVariables,
      options?: UseQueryOptions<GetUsersAssistancesQuery, TError, TData>
    ) =>
    useQuery<GetUsersAssistancesQuery, TError, TData>(
      ['GetUsersAssistances', variables],
      fetchData<GetUsersAssistancesQuery, GetUsersAssistancesQueryVariables>(GetUsersAssistancesDocument, variables),
      options
    );
export const GetResultsByStatusDocument = `
    query GetResultsByStatus($status: Status) {
  resultsByStatus(status: $status) {
    ...ResultStats
  }
}
    ${ResultStatsFragmentDoc}`;
export const useGetResultsByStatusQuery = <
      TData = GetResultsByStatusQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetResultsByStatusQueryVariables,
      options?: UseQueryOptions<GetResultsByStatusQuery, TError, TData>
    ) =>
    useQuery<GetResultsByStatusQuery, TError, TData>(
      variables === undefined ? ['GetResultsByStatus'] : ['GetResultsByStatus', variables],
      fetchData<GetResultsByStatusQuery, GetResultsByStatusQueryVariables>(GetResultsByStatusDocument, variables),
      options
    );
export const GetGlobalsStatsDocument = `
    query GetGlobalsStats {
  projectsStatistics {
    ...Stats
  }
  results {
    ...ResultStats
  }
}
    ${StatsFragmentDoc}
${ResultStatsFragmentDoc}`;
export const useGetGlobalsStatsQuery = <
      TData = GetGlobalsStatsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetGlobalsStatsQueryVariables,
      options?: UseQueryOptions<GetGlobalsStatsQuery, TError, TData>
    ) =>
    useQuery<GetGlobalsStatsQuery, TError, TData>(
      variables === undefined ? ['GetGlobalsStats'] : ['GetGlobalsStats', variables],
      fetchData<GetGlobalsStatsQuery, GetGlobalsStatsQueryVariables>(GetGlobalsStatsDocument, variables),
      options
    );
export const GetKeywordStatsDocument = `
    query GetKeywordStats {
  keywordsStatistics {
    text
    value
  }
}
    `;
export const useGetKeywordStatsQuery = <
      TData = GetKeywordStatsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetKeywordStatsQueryVariables,
      options?: UseQueryOptions<GetKeywordStatsQuery, TError, TData>
    ) =>
    useQuery<GetKeywordStatsQuery, TError, TData>(
      variables === undefined ? ['GetKeywordStats'] : ['GetKeywordStats', variables],
      fetchData<GetKeywordStatsQuery, GetKeywordStatsQueryVariables>(GetKeywordStatsDocument, variables),
      options
    );
export const GetTagsDocument = `
    query GetTags {
  tags {
    id
    name
  }
}
    `;
export const useGetTagsQuery = <
      TData = GetTagsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetTagsQueryVariables,
      options?: UseQueryOptions<GetTagsQuery, TError, TData>
    ) =>
    useQuery<GetTagsQuery, TError, TData>(
      variables === undefined ? ['GetTags'] : ['GetTags', variables],
      fetchData<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, variables),
      options
    );
export const CreateTagDocument = `
    mutation CreateTag($name: String!) {
  createTag(name: $name) {
    id
  }
}
    `;
export const useCreateTagMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateTagMutation, TError, CreateTagMutationVariables, TContext>) =>
    useMutation<CreateTagMutation, TError, CreateTagMutationVariables, TContext>(
      ['CreateTag'],
      (variables?: CreateTagMutationVariables) => fetchData<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, variables)(),
      options
    );
export const CreateTagsDocument = `
    mutation CreateTags($names: [String!]!, $result_id: ID!) {
  createTags(names: $names, result_id: $result_id) {
    id
  }
}
    `;
export const useCreateTagsMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateTagsMutation, TError, CreateTagsMutationVariables, TContext>) =>
    useMutation<CreateTagsMutation, TError, CreateTagsMutationVariables, TContext>(
      ['CreateTags'],
      (variables?: CreateTagsMutationVariables) => fetchData<CreateTagsMutation, CreateTagsMutationVariables>(CreateTagsDocument, variables)(),
      options
    );
export const UpdateTagDocument = `
    mutation UpdateTag($id: ID!, $name: String!) {
  updateTag(id: $id, name: $name) {
    id
  }
}
    `;
export const useUpdateTagMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateTagMutation, TError, UpdateTagMutationVariables, TContext>) =>
    useMutation<UpdateTagMutation, TError, UpdateTagMutationVariables, TContext>(
      ['UpdateTag'],
      (variables?: UpdateTagMutationVariables) => fetchData<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, variables)(),
      options
    );
export const RemoveTagDocument = `
    mutation RemoveTag($id: ID!) {
  removeTag(id: $id) {
    id
  }
}
    `;
export const useRemoveTagMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemoveTagMutation, TError, RemoveTagMutationVariables, TContext>) =>
    useMutation<RemoveTagMutation, TError, RemoveTagMutationVariables, TContext>(
      ['RemoveTag'],
      (variables?: RemoveTagMutationVariables) => fetchData<RemoveTagMutation, RemoveTagMutationVariables>(RemoveTagDocument, variables)(),
      options
    );
export const CreateTagAttachResultDocument = `
    mutation CreateTagAttachResult($name: String!, $result_id: ID!) {
  createTagAttachResult(name: $name, result_id: $result_id) {
    id
  }
}
    `;
export const useCreateTagAttachResultMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateTagAttachResultMutation, TError, CreateTagAttachResultMutationVariables, TContext>) =>
    useMutation<CreateTagAttachResultMutation, TError, CreateTagAttachResultMutationVariables, TContext>(
      ['CreateTagAttachResult'],
      (variables?: CreateTagAttachResultMutationVariables) => fetchData<CreateTagAttachResultMutation, CreateTagAttachResultMutationVariables>(CreateTagAttachResultDocument, variables)(),
      options
    );
export const GetTimelineProjectsDocument = `
    query GetTimelineProjects {
  projects {
    ...MainProject
  }
}
    ${MainProjectFragmentDoc}`;
export const useGetTimelineProjectsQuery = <
      TData = GetTimelineProjectsQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetTimelineProjectsQueryVariables,
      options?: UseQueryOptions<GetTimelineProjectsQuery, TError, TData>
    ) =>
    useQuery<GetTimelineProjectsQuery, TError, TData>(
      variables === undefined ? ['GetTimelineProjects'] : ['GetTimelineProjects', variables],
      fetchData<GetTimelineProjectsQuery, GetTimelineProjectsQueryVariables>(GetTimelineProjectsDocument, variables),
      options
    );
export const GetTimelineProjectsByUserIdDocument = `
    query GetTimelineProjectsByUserId($user_id: ID!) {
  userProjectByUserId(user_id: $user_id) {
    project {
      ...MainProject
    }
  }
}
    ${MainProjectFragmentDoc}`;
export const useGetTimelineProjectsByUserIdQuery = <
      TData = GetTimelineProjectsByUserIdQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetTimelineProjectsByUserIdQueryVariables,
      options?: UseQueryOptions<GetTimelineProjectsByUserIdQuery, TError, TData>
    ) =>
    useQuery<GetTimelineProjectsByUserIdQuery, TError, TData>(
      ['GetTimelineProjectsByUserId', variables],
      fetchData<GetTimelineProjectsByUserIdQuery, GetTimelineProjectsByUserIdQueryVariables>(GetTimelineProjectsByUserIdDocument, variables),
      options
    );
export const FilterTimelineProjectsDocument = `
    mutation FilterTimelineProjects($search_text: String!) {
  filterTimelineProjects(search_text: $search_text) {
    ...MainProject
  }
}
    ${MainProjectFragmentDoc}`;
export const useFilterTimelineProjectsMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<FilterTimelineProjectsMutation, TError, FilterTimelineProjectsMutationVariables, TContext>) =>
    useMutation<FilterTimelineProjectsMutation, TError, FilterTimelineProjectsMutationVariables, TContext>(
      ['FilterTimelineProjects'],
      (variables?: FilterTimelineProjectsMutationVariables) => fetchData<FilterTimelineProjectsMutation, FilterTimelineProjectsMutationVariables>(FilterTimelineProjectsDocument, variables)(),
      options
    );
export const GetTypesDocument = `
    query GetTypes {
  types {
    id
    name
    description
  }
}
    `;
export const useGetTypesQuery = <
      TData = GetTypesQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetTypesQueryVariables,
      options?: UseQueryOptions<GetTypesQuery, TError, TData>
    ) =>
    useQuery<GetTypesQuery, TError, TData>(
      variables === undefined ? ['GetTypes'] : ['GetTypes', variables],
      fetchData<GetTypesQuery, GetTypesQueryVariables>(GetTypesDocument, variables),
      options
    );
export const CreateTypeDocument = `
    mutation CreateType($name: String!, $description: String) {
  createType(name: $name, description: $description) {
    id
  }
}
    `;
export const useCreateTypeMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateTypeMutation, TError, CreateTypeMutationVariables, TContext>) =>
    useMutation<CreateTypeMutation, TError, CreateTypeMutationVariables, TContext>(
      ['CreateType'],
      (variables?: CreateTypeMutationVariables) => fetchData<CreateTypeMutation, CreateTypeMutationVariables>(CreateTypeDocument, variables)(),
      options
    );
export const UpdateTypeDocument = `
    mutation UpdateType($id: ID!, $name: String, $description: String) {
  updateType(id: $id, name: $name, description: $description) {
    id
  }
}
    `;
export const useUpdateTypeMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateTypeMutation, TError, UpdateTypeMutationVariables, TContext>) =>
    useMutation<UpdateTypeMutation, TError, UpdateTypeMutationVariables, TContext>(
      ['UpdateType'],
      (variables?: UpdateTypeMutationVariables) => fetchData<UpdateTypeMutation, UpdateTypeMutationVariables>(UpdateTypeDocument, variables)(),
      options
    );
export const RemoveTypeDocument = `
    mutation RemoveType($id: ID!) {
  removeType(id: $id)
}
    `;
export const useRemoveTypeMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<RemoveTypeMutation, TError, RemoveTypeMutationVariables, TContext>) =>
    useMutation<RemoveTypeMutation, TError, RemoveTypeMutationVariables, TContext>(
      ['RemoveType'],
      (variables?: RemoveTypeMutationVariables) => fetchData<RemoveTypeMutation, RemoveTypeMutationVariables>(RemoveTypeDocument, variables)(),
      options
    );
export const GetAllUsersDocument = `
    query GetAllUsers {
  users {
    author {
      id
    }
    coauthor {
      id
    }
    email
    id
    name
    first_name
    last_name
    status
    projects {
      id
      project {
        date_end
      }
    }
    results {
      id
    }
    role {
      id
    }
    block
  }
}
    `;
export const useGetAllUsersQuery = <
      TData = GetAllUsersQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables?: GetAllUsersQueryVariables,
      options?: UseQueryOptions<GetAllUsersQuery, TError, TData>
    ) =>
    useQuery<GetAllUsersQuery, TError, TData>(
      variables === undefined ? ['GetAllUsers'] : ['GetAllUsers', variables],
      fetchData<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, variables),
      options
    );
export const GetUserDocument = `
    query GetUser($id: ID!) {
  userById(id: $id) {
    id
    email
    first_name
    last_name
    status
  }
}
    `;
export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = { message: string | undefined, cause: string | undefined }
    >(
      variables: GetUserQueryVariables,
      options?: UseQueryOptions<GetUserQuery, TError, TData>
    ) =>
    useQuery<GetUserQuery, TError, TData>(
      ['GetUser', variables],
      fetchData<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables),
      options
    );
export const UpdateUserDocument = `
    mutation UpdateUser($id: ID!, $first_name: String, $last_name: String, $status: UserStatus, $email: String) {
  updateUser(
    id: $id
    first_name: $first_name
    last_name: $last_name
    status: $status
    email: $email
  ) {
    id
  }
}
    `;
export const useUpdateUserMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetchData<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables)(),
      options
    );
export const DeleteUserDocument = `
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
  }
}
    `;
export const useDeleteUserMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>) =>
    useMutation<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>(
      ['DeleteUser'],
      (variables?: DeleteUserMutationVariables) => fetchData<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, variables)(),
      options
    );
export const CreateInvolvedUserDocument = `
    mutation CreateInvolvedUser($user_id: ID!, $phase_id: ID!, $note: String) {
  createInvolvedUser(input: {user_id: $user_id, phase_id: $phase_id, note: $note}) {
    id
  }
}
    `;
export const useCreateInvolvedUserMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<CreateInvolvedUserMutation, TError, CreateInvolvedUserMutationVariables, TContext>) =>
    useMutation<CreateInvolvedUserMutation, TError, CreateInvolvedUserMutationVariables, TContext>(
      ['CreateInvolvedUser'],
      (variables?: CreateInvolvedUserMutationVariables) => fetchData<CreateInvolvedUserMutation, CreateInvolvedUserMutationVariables>(CreateInvolvedUserDocument, variables)(),
      options
    );
export const BlockUserDocument = `
    mutation BlockUser($user_id: ID!) {
  blockUser(id: $user_id) {
    id
  }
}
    `;
export const useBlockUserMutation = <
      TError = { message: string | undefined, cause: string | undefined },
      TContext = unknown
    >(options?: UseMutationOptions<BlockUserMutation, TError, BlockUserMutationVariables, TContext>) =>
    useMutation<BlockUserMutation, TError, BlockUserMutationVariables, TContext>(
      ['BlockUser'],
      (variables?: BlockUserMutationVariables) => fetchData<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, variables)(),
      options
    );