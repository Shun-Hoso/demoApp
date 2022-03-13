module Resolvers
  class PostsResolver < Resolvers::BaseResolver
    description 'Find All posts'
    type [Types::PostType], null: false

    def resolve
      Post.all
    end
  end
end