module Types
  class MutationType < Types::BaseObject
    field :update_post, resolver: Resolvers::UpdatePostResolver
  end
end
